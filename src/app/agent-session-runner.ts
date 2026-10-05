/**
 * Drives one turn against a dedicated in-app assistant session.
 *
 * The bridge reuses a single session (found by title, created on demand) so
 * WeChat traffic stays separate from the session the user chats in manually.
 */
import {
    assistantTextFrom,
    readRunTerminal,
    type AgentSession,
    type AgentSessionsApi,
} from '../host/api';

const POLL_INTERVAL_MS = 1000;
/**
 * Only reached if the host never reports the run as finished. Long, tool-heavy
 * turns are expected and must not be cut short, so this is deliberately far
 * beyond any realistic turn length.
 */
const DEFAULT_SAFETY_CEILING_MS = 60 * 60 * 1000;

export interface SessionTurnOptions {
    /**
     * Safety ceiling only. The turn normally ends when the session reports no
     * active run; this exists purely so a host that never clears the active
     * slot cannot wedge the bridge forever.
     */
    safetyCeilingMs?: number;
    /** Abort signal from the tool/run context. */
    signal?: AbortSignal;
    /**
     * Called for every assistant message this run produces, in order, as soon
     * as it appears. Intermediate preambles and the closing answer both arrive
     * here; callers decide what to forward.
     */
    onAssistantText?: (text: string) => void;
}

export type SessionTurnResult =
    | { ok: true; text: string }
    | { ok: false; error: string };

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, ms);
        signal?.addEventListener('abort', () => {
            clearTimeout(timer);
            resolve();
        }, { once: true });
    });
}

/** Find the dedicated WeChat session by title, creating it when missing. */
export async function ensureSession(
    sessions: AgentSessionsApi,
    title: string,
): Promise<AgentSession> {
    const wanted = title.trim() || '微信';
    const { sessions: existing } = await sessions.list();
    const match = existing.find((s) => (s.title ?? '').trim() === wanted);
    if (match) return match;

    const { session } = await sessions.create();
    try {
        const renamed = await sessions.rename({ sessionId: session.id, title: wanted });
        return renamed.session;
    } catch {
        // Renaming is cosmetic; keep the session even if the title failed.
        return session;
    }
}

/**
 * Send one message into the session and wait for the assistant reply.
 *
 * The reply is matched by runId so a concurrent manual turn in another session
 * cannot be mistaken for ours.
 */
export async function runSessionTurn(
    sessions: AgentSessionsApi,
    sessionId: string,
    text: string,
    options: SessionTurnOptions,
): Promise<SessionTurnResult> {
    let runId: string;
    try {
        const handle = await sessions.send({ sessionId, text });
        runId = handle.runId;
    } catch (err) {
        return { ok: false, error: `发送到助手会话失败：${String((err as Error)?.message ?? err)}` };
    }

    const deadline = Date.now() + (options.safetyCeilingMs ?? DEFAULT_SAFETY_CEILING_MS);
    /** Polls spent waiting for the run to finish after it left the active slot. */
    let settledPolls = 0;
    /** Highest session seq already reported, so nothing is sent twice. */
    let seenSeq = 0;
    /** Last assistant text seen, used as the closing answer in final mode. */
    let latestText: string | null = null;

    while (Date.now() < deadline) {
        if (options.signal?.aborted) {
            return { ok: false, error: '运行已取消。' };
        }

        await sleep(POLL_INTERVAL_MS, options.signal);

        let page;
        try {
            page = await sessions.read({ sessionId, limit: 50 });
        } catch (err) {
            return { ok: false, error: `读取助手会话失败：${String((err as Error)?.message ?? err)}` };
        }

        // Emit any assistant text produced since the previous poll. A run
        // writes intermediate messages before and between tool calls, so this
        // is what lets WeChat receive progress instead of one late answer.
        for (const entry of page.messages) {
            if (entry.runId !== runId) continue;
            if (entry.seq <= seenSeq) continue;
            seenSeq = entry.seq;
            sidelineAssistantText(entry, options, (text) => {
                latestText = text;
            });
        }

        // A run produces intermediate assistant messages before and between
        // tool calls. Returning the first one would send a preamble instead of
        // the answer, so wait until the run leaves the active slot and then
        // take the final assistant message.
        const active = page.activeRun;
        if (active) {
            // Ours, or another turn occupying the session: keep waiting.
            settledPolls = 0;
            continue;
        }

        settledPolls += 1;

        // The run may not be registered yet on the first polls, or may have
        // finished between polls. Give it a moment before reading the result.
        if (settledPolls < 2) continue;

        const reply = findLastReplyForRun(page.messages, runId);
        if (reply) return { ok: true, text: reply };
        if (latestText) return { ok: true, text: latestText };

        if (settledPolls >= 4) {
            const terminal = await readRunTerminal(runId);
            return {
                ok: false,
                error: terminal
                    ? `助手运行已结束（${terminal}）但没有产生回复。`
                    : '助手运行已结束但没有产生回复。',
            };
        }
    }

    return { ok: false, error: '助手运行超时。' };
}

/** Report one session entry's assistant text, if it has any. */
function sidelineAssistantText(
    entry: { message: { role: string; parts: unknown[] } },
    options: SessionTurnOptions,
    remember: (text: string) => void,
): void {
    if (entry.message?.role !== 'assistant') return;
    const text = assistantTextFrom(entry.message as never);
    if (!text) return;
    remember(text);
    options.onAssistantText?.(text);
}

/**
 * Final assistant message belonging to the given run.
 *
 * Intermediate assistant messages (preambles emitted before tool calls) are
 * skipped; the last one with text is the answer the run produced.
 */
function findLastReplyForRun(
    messages: Array<{ runId: string; message: { role: string; parts: unknown[] } }>,
    runId: string,
): string | null {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
        const entry = messages[i];
        if (entry.runId !== runId) continue;
        if (entry.message?.role !== 'assistant') continue;
        const text = assistantTextFrom(entry.message as never);
        if (text) return text;
    }
    return null;
}