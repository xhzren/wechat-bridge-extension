/**
 * Core bridge runtime.
 *
 * Owns the inbound/outbound loop and the busy state machine. UI components
 * only read state and call actions; all host access goes through src/host.
 *
 * Event timing (verified against src/script.js):
 *   GENERATION_STARTED        - before the model call
 *   GENERATION_AFTER_COMMANDS - BEFORE the model call; never a completion signal
 *   MESSAGE_RECEIVED          - the assistant message is finalised into `chat`
 *   GENERATION_ENDED          - UI unblocked
 *
 * The reply must therefore be read on MESSAGE_RECEIVED, not on
 * GENERATION_AFTER_COMMANDS. Opening a chat with only a greeting also emits
 * MESSAGE_RECEIVED with type 'first_message', which must be ignored.
 */
import { reactive, ref, type Ref } from 'vue';
import {
    getSillyTavernContext,
    onHostEvent,
    quoteForSlashCommand,
    readAssistantMessageAt,
    readLastAssistantMessage,
    runSlashCommand,
    type SillyTavernContext,
} from '../host/api';
import { createBridgeClient, type BridgeClient, type InboundMessage } from '../host/bridge-client';
import { getAgentSessionsApi } from '../host/api';
import { ensureSession, runSessionTurn } from './agent-session-runner';
import { stripThoughtTags, type WechatBridgeSettings } from './settings';

export type BridgePhase = 'idle' | 'sending' | 'generating' | 'error';

export interface LogEntry {
    id: number;
    atMs: number;
    level: 'info' | 'warn' | 'error';
    text: string;
}

export interface BridgeState {
    phase: BridgePhase;
    busy: boolean;
    lastError: string | null;
    polls: number;
    sent: number;
    received: number;
    logs: LogEntry[];
    connected: boolean;
}

const MAX_LOGS = 200;
/** Grace period after GENERATION_ENDED before treating a run as lost. */
const LOST_RUN_GRACE_MS = 2500;

/**
 * Hard cap on a WeChat-triggered run, independent of which host events fire.
 * Session runs with many tool calls routinely take minutes (a 19-tool-call
 * turn was observed at ~2m10s), so this is deliberately generous.
 */
const RUN_TIMEOUT_MS = 300_000;

/**
 * Agent runs report completion/failure through a window CustomEvent, NOT via
 * eventSource. Without this, a failed Agent run leaves the bridge busy forever
 * because no generation event is ever emitted for it.
 */
const AGENT_RUN_EVENT = 'tauritavern-agent-run-event';
const AGENT_TERMINAL_EVENTS = new Set([
    'run_completed',
    'run_partial_success',
    'run_cancelled',
    'run_failed',
]);

export interface BridgeRuntime {
    state: BridgeState;
    settings: Ref<WechatBridgeSettings>;
    start: () => void;
    stop: () => void;
    applySettings: (next: WechatBridgeSettings) => void;
    testSend: (text: string) => Promise<void>;
    dispose: () => void;
}

/** A generation run that was started by an inbound WeChat message. */
interface WechatRun {
    target: string;
}

export function createBridgeRuntime(initial: WechatBridgeSettings): BridgeRuntime {
    const settings = ref<WechatBridgeSettings>({ ...initial }) as Ref<WechatBridgeSettings>;

    const state = reactive<BridgeState>({
        phase: 'idle',
        busy: false,
        lastError: null,
        polls: 0,
        sent: 0,
        received: 0,
        logs: [],
        connected: false,
    });

    let logSeq = 0;
    function log(level: LogEntry['level'], text: string): void {
        state.logs.unshift({ id: ++logSeq, atMs: Date.now(), level, text });
        if (state.logs.length > MAX_LOGS) state.logs.length = MAX_LOGS;
    }

    let ctx: SillyTavernContext | null = null;
    let client: BridgeClient | null = null;
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let lifecycle: Promise<void> = Promise.resolve();
    let inFlight = false;
    let eventsBound = false;
    const queue: InboundMessage[] = [];

    /** Set only while a WeChat-triggered generation is in flight. */
    let wechatRun: WechatRun | null = null;
    /** Hard watchdog so a run can never wedge the bridge. */
    let runWatchdog: ReturnType<typeof setTimeout> | null = null;

    function enqueue(fn: () => Promise<void>): Promise<void> {
        lifecycle = lifecycle.catch(() => {}).then(fn);
        return lifecycle;
    }

    /** Send a WeChat text through the local bridge service. */
    async function pushOutbound(text: string, userId?: string): Promise<void> {
        if (!client) return;
        const body = settings.value.stripThoughtTags ? stripThoughtTags(text) : text;
        if (!body) {
            log('warn', 'Refusing to send empty reply.');
            return;
        }
        state.phase = 'sending';
        try {
            await client.send({ text: body, userId });
            state.sent += 1;
            log('info', `Sent to WeChat (${body.length} chars).`);
        } catch (err) {
            state.phase = 'error';
            state.lastError = String(err);
            log('error', `Send failed: ${String(err)}`);
        } finally {
            if (state.phase === 'sending') state.phase = 'idle';
        }
    }

    function clearWatchdog(): void {
        if (runWatchdog) {
            clearTimeout(runWatchdog);
            runWatchdog = null;
        }
    }

    /** Hard cap: never let a run keep the bridge busy indefinitely. */
    function armWatchdog(): void {
        clearWatchdog();
        runWatchdog = setTimeout(() => {
            runWatchdog = null;
            if (!wechatRun) return;
            failRun(`生成超时（${Math.round(RUN_TIMEOUT_MS / 1000)} 秒未完成）`);
        }, RUN_TIMEOUT_MS);
    }

    /**
     * Abort the current WeChat run, release the busy state and tell WeChat.
     * Used for failures, cancellations and watchdogs so the bridge can never wedge.
     */
    function failRun(reason: string): void {
        const run = wechatRun;
        wechatRun = null;
        clearWatchdog();
        state.busy = false;
        state.phase = 'error';
        state.lastError = reason;
        log('error', `Run aborted: ${reason}`);
        if (run) {
            void pushOutbound(`[桥接] ${reason}`, run.target);
        }
        // Drain anything queued while we were busy.
        if (queue.length > 0) {
            const next = queue.shift();
            if (next) void enqueue(() => deliverToChat(next));
        }
    }

    /** Route one WeChat message according to the configured delivery mode. */
    async function deliverToChat(msg: InboundMessage): Promise<void> {
        if (settings.value.mode === 'session') {
            await deliverToSession(msg);
            return;
        }
        await deliverToCharacterChat(msg);
    }

    /** chat mode: user message into the current chat, then trigger generation. */
    async function deliverToCharacterChat(msg: InboundMessage): Promise<void> {
        if (!ctx) throw new Error('SillyTavern context unavailable');
        wechatRun = { target: msg.from };
        state.busy = true;
        state.phase = 'generating';
        armWatchdog();
        try {
            await runSlashCommand(ctx, `/send ${quoteForSlashCommand(msg.text)}`);
            // await=true makes /trigger reject when the run fails to start.
            // Without it the failure is only logged and the bridge waits for
            // the watchdog instead of telling WeChat immediately.
            await runSlashCommand(ctx, '/trigger await=true');
            log('info', `Injected message from ${msg.from} and triggered generation.`);
        } catch (err) {
            failRun(`注入聊天失败：${String(err)}`);
        }
    }

    /**
     * session mode: run the message against the dedicated in-app assistant
     * session, then push the reply straight to WeChat.
     */
    async function deliverToSession(msg: InboundMessage): Promise<void> {
        const sessions = getAgentSessionsApi();
        if (!sessions) {
            failRun('应用内助手 API 不可用（api.agent.sessions 缺失）。');
            return;
        }
        wechatRun = { target: msg.from };
        state.busy = true;
        state.phase = 'generating';
        // No wall-clock watchdog here: the session runner polls the run until
        // the host reports it finished, so a long tool-heavy turn is expected
        // and must not be cut short.
        log('info', `Session turn for ${msg.from}.`);
        const streaming = settings.value.sessionDelivery === 'stream';
        if (streaming) {
            log('info', '会话增量模式：助手每条输出都会转发微信。');
        }
        try {
            const session = await ensureSession(sessions, settings.value.sessionTitle);
            const result = await runSessionTurn(sessions, session.id, msg.text, {
                // In stream mode forward each assistant message as it appears;
                // in final mode the closing answer is sent once at the end.
                onAssistantText: streaming
                    ? (text) => {
                          const run = wechatRun;
                          if (!run) return;
                          void enqueue(() => pushOutbound(text, run.target));
                      }
                    : undefined,
            });
            if (!result.ok) {
                failRun(result.error);
                return;
            }
            const run = wechatRun;
            wechatRun = null;
            clearWatchdog();
            state.busy = false;
            if (run && !streaming) await pushOutbound(result.text, run.target);
            if (queue.length > 0) {
                const next = queue.shift();
                if (next) void enqueue(() => deliverToChat(next));
            }
        } catch (err) {
            failRun(`助手会话运行失败：${String(err)}`);
        }
    }

    /** Finish the current WeChat run: send the reply, then drain the queue. */
    function completeRun(resolveText: () => string | null): void {
        if (!wechatRun) return;
        const text = resolveText();
        if (text === null) return;
        const target = wechatRun.target;
        wechatRun = null;
        clearWatchdog();
        void enqueue(async () => {
            await pushOutbound(text, target);
            state.busy = false;
            if (queue.length > 0) {
                const next = queue.shift();
                if (next) await deliverToChat(next);
            }
        });
    }

    /**
     * MESSAGE_RECEIVED handler. `messageId` is the absolute chat index and
     * `type` the generation type ('first_message' for an opening greeting).
     */
    function handleMessageReceived(messageId: unknown, type: unknown): void {
        if (type === 'first_message') return; // greeting on chat open
        if (!wechatRun) return; // not a WeChat-triggered run
        if (type === 'quiet' || type === 'impersonate') return;
        if (settings.value.sendTiming !== 'afterCommands') return; // wait for ENDED
        if (typeof messageId !== 'number') return;
        completeRun(() => (ctx ? readAssistantMessageAt(ctx, messageId) : null));
    }

    /** GENERATION_ENDED handler: fallback send timing plus lost-run watchdog. */
    function handleGenerationEnded(): void {
        if (!wechatRun) {
            state.busy = false;
            return;
        }

        if (settings.value.sendTiming === 'generationEnded') {
            completeRun(() => (ctx ? readLastAssistantMessage(ctx) : null));
            return;
        }

        // afterCommands mode: MESSAGE_RECEIVED should already have fired.
        const scheduled = wechatRun;
        setTimeout(() => {
            if (wechatRun !== scheduled) return; // already completed
            const target = scheduled.target;
            wechatRun = null;
            state.busy = false;
            state.phase = 'error';
            state.lastError = '生成结束但没有产生新的对话消息';
            log('warn', 'Generation ended without a new assistant message.');
            void pushOutbound('[桥接] 生成结束但没有产生新消息，请重试。', target);
        }, LOST_RUN_GRACE_MS);
    }

    /**
     * Watch Agent run terminal events.
     *
     * Agent runs dispatch a window CustomEvent instead of eventSource events,
     * so a failed run (e.g. model.output_truncated) would otherwise never
     * release the busy state.
     */
    function handleAgentRunEvent(rawEvent: Event): void {
        const detail = (rawEvent as CustomEvent).detail as { event?: { type?: string } } | undefined;
        const type = detail?.event?.type;
        if (!type || !AGENT_TERMINAL_EVENTS.has(type)) return;

        if (!wechatRun) {
            // Not our run, but keep the bridge responsive.
            if (type === 'run_failed' || type === 'run_cancelled') {
                state.busy = false;
                clearWatchdog();
            }
            return;
        }

        if (type === 'run_failed') {
            failRun('生成失败，请稍后重试。');
        } else if (type === 'run_cancelled') {
            failRun('生成已被取消。');
        }
        // run_completed / run_partial_success: MESSAGE_RECEIVED normally
        // delivers the reply first; the watchdog covers the rest.
    }

    function bindHostEvents(): void {
        if (!ctx || eventsBound) return;
        eventsBound = true;

        onHostEvent(ctx, 'GENERATION_STARTED', () => {
            state.busy = true;
            state.phase = 'generating';
        });
        onHostEvent(ctx, 'MESSAGE_RECEIVED', (messageId, type) => {
            handleMessageReceived(messageId, type);
        });
        onHostEvent(ctx, 'GENERATION_ENDED', () => {
            handleGenerationEnded();
        });
        window.addEventListener(AGENT_RUN_EVENT, handleAgentRunEvent);
        onHostEvent(ctx, 'GENERATION_STOPPED', () => {
            // User pressed stop: drop the run instead of waiting for the watchdog.
            if (!wechatRun) {
                state.busy = false;
                return;
            }
            failRun('生成已被停止。');
        });
    }

    async function pollOnce(): Promise<void> {
        if (inFlight || !client) return;
        inFlight = true;
        try {
            const messages = await client.poll();
            state.polls += 1;
            state.connected = true;
            for (const msg of messages) {
                state.received += 1;
                if (state.busy || wechatRun) {
                    if (settings.value.busyPolicy === 'queue') {
                        queue.push(msg);
                        log('info', 'Busy: queued message.');
                    } else {
                        log('info', 'Busy: discarded message.');
                    }
                    await pushOutbound(settings.value.busyReplyText, msg.from);
                    continue;
                }
                await deliverToChat(msg);
            }
        } catch (err) {
            state.connected = false;
            state.lastError = String(err);
            log('warn', `Poll failed: ${String(err)}`);
        } finally {
            inFlight = false;
        }
    }

    function startPolling(): void {
        stopPolling();
        const interval = Math.max(1000, settings.value.pollIntervalMs);
        pollTimer = setInterval(() => {
            if (!settings.value.enabled) return;
            void enqueue(pollOnce);
        }, interval);
    }

    function stopPolling(): void {
        if (pollTimer) {
            clearInterval(pollTimer);
            pollTimer = null;
        }
    }

    return {
        state,
        settings,
        start() {
            ctx = getSillyTavernContext();
            if (!ctx) {
                log('warn', 'SillyTavern context not ready; retrying in 3s.');
                setTimeout(() => {
                    ctx = getSillyTavernContext();
                    if (ctx) {
                        bindHostEvents();
                        log('info', 'SillyTavern context acquired.');
                    } else {
                        log('error', 'SillyTavern context unavailable; bridge inactive.');
                    }
                }, 3000);
                client = createBridgeClient({ baseUrl: settings.value.bridgeUrl });
                startPolling();
                return;
            }
            client = createBridgeClient({ baseUrl: settings.value.bridgeUrl });
            bindHostEvents();
            startPolling();
            log('info', `Bridge started (${settings.value.bridgeUrl}).`);
        },
        stop() {
            stopPolling();
            log('info', 'Bridge stopped.');
        },
        applySettings(next: WechatBridgeSettings) {
            const wasEnabled = settings.value.enabled;
            settings.value = { ...next };
            if (!wasEnabled && next.enabled) {
                this.start();
            } else if (wasEnabled && !next.enabled) {
                this.stop();
            } else if (next.enabled) {
                client = createBridgeClient({ baseUrl: next.bridgeUrl });
                startPolling();
            }
        },
        async testSend(text: string) {
            await pushOutbound(text);
        },
        dispose() {
            stopPolling();
            clearWatchdog();
            window.removeEventListener(AGENT_RUN_EVENT, handleAgentRunEvent);
            client?.dispose();
            client = null;
        },
    };
}