/**
 * SillyTavern context adapter.
 *
 * Following the TauriTavern Creator Extension convention: this module is the
 * ONLY place that reaches into the host. Everything else talks to this facade.
 */

/** Minimal shape of the SillyTavern context we depend on. */
export interface SillyTavernChatMessage {
    mes?: string;
    name?: string;
    is_user?: boolean;
    is_system?: boolean;
    [key: string]: unknown;
}

export interface SillyTavernContext {
    chat: SillyTavernChatMessage[];
    name1?: string;
    name2?: string;
    characterId?: number | string;
    eventSource?: {
        on: (event: string, handler: (...args: unknown[]) => void) => void;
        emit?: (event: string, ...args: unknown[]) => Promise<unknown>;
    };
    eventTypes?: Record<string, string>;
    executeSlashCommandsWithOptions?: (text: string, options?: Record<string, unknown>) => Promise<unknown>;
    executeSlashCommands?: (text: string) => Promise<unknown>;
}

declare global {
    interface Window {
        SillyTavern?: {
            getContext?: () => SillyTavernContext;
        };
        __TAURITAVERN__?: {
            ready?: Promise<void> | null;
            api?: {
                agent?: {
                    tools?: AgentToolRegistrationApi;
                    sessions?: AgentSessionsApi;
                    readEvents?: (input: {
                        runId: string;
                        afterSeq?: number;
                        limit?: number;
                    }) => Promise<{ events: Array<{ type?: string; payload?: unknown }> }>;
                };
            };
        };
        __TAURITAVERN_MAIN_READY__?: Promise<void>;
    }
}

export const EVENT = {
    GENERATION_STARTED: 'generation_started',
    GENERATION_STOPPED: 'generation_stopped',
    GENERATION_ENDED: 'generation_ended',
    GENERATION_AFTER_COMMANDS: 'GENERATION_AFTER_COMMANDS',
    MESSAGE_RECEIVED: 'message_received',
    CHAT_CHANGED: 'chat_id_changed',
} as const;

/** Scope an extension tool can be offered in. */
export type AgentToolScope = 'chat' | 'session';

export interface AgentToolDefinition {
    extensionId: string;
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    contexts: readonly AgentToolScope[];
    enabled?: boolean;
}

export interface AgentToolContext {
    runId: string;
    invocationId: string;
    callId: string;
    signal: AbortSignal;
}

export type AgentToolExecute = (
    args: Record<string, unknown>,
    context: AgentToolContext,
) => unknown | Promise<unknown>;

export interface AgentToolRegistrationApi {
    register: (definition: AgentToolDefinition, execute: AgentToolExecute) => Promise<void>;
    setEnabled?: (toolId: string, enabled: boolean) => Promise<void>;
}

/** Agent tool registration API, when the host exposes it. */
export function getAgentToolsApi(): AgentToolRegistrationApi | null {
    return window.__TAURITAVERN__?.api?.agent?.tools ?? null;
}

// ───────────────────────── Agent sessions (in-app assistant) ─────────────────────────

export type AgentModelContentPart =
    | { type: 'text'; text: string }
    | { type: string; [key: string]: unknown };

export interface AgentModelMessage {
    role: 'system' | 'developer' | 'user' | 'assistant' | 'tool';
    parts: AgentModelContentPart[];
    providerMetadata?: unknown;
}

export interface AgentSession {
    id: string;
    createdAt: string;
    title: string | null;
    lastUsedAt: string | null;
}

export interface AgentSessionRunHandle {
    sessionId: string;
    runId: string;
    status: string;
}

export interface AgentSessionMessage {
    seq: number;
    runId: string;
    createdAt: string;
    message: AgentModelMessage;
    origin?: { invocationId: string; round: number };
}

export interface AgentSessionsApi {
    create: () => Promise<{ session: AgentSession }>;
    list: () => Promise<{ sessions: AgentSession[]; activeRuns: AgentSessionRunHandle[] }>;
    rename: (input: { sessionId: string; title: string }) => Promise<{ session: AgentSession }>;
    read: (input: { sessionId: string; beforeSeq?: number; limit?: number }) => Promise<{
        session: AgentSession;
        messages: AgentSessionMessage[];
        lastSeq: number;
        nextBeforeSeq: number | null;
        activeRun: AgentSessionRunHandle | null;
    }>;
    send: (input: {
        sessionId: string;
        text: string;
        variables?: { local?: Record<string, unknown> };
    }) => Promise<AgentSessionRunHandle>;
}

/** Agent session API (the in-app assistant), when the host exposes it. */
export function getAgentSessionsApi(): AgentSessionsApi | null {
    return window.__TAURITAVERN__?.api?.agent?.sessions ?? null;
}

/** Read a run's event log, used to report why a session turn ended. */
export async function readRunTerminal(runId: string): Promise<string | null> {
    const readEvents = window.__TAURITAVERN__?.api?.agent?.readEvents;
    if (typeof readEvents !== 'function') return null;
    try {
        const { events } = await readEvents({ runId, limit: 200 });
        for (let i = events.length - 1; i >= 0; i -= 1) {
            const type = events[i]?.type;
            if (typeof type === 'string' && type.startsWith('run_')) return type;
        }
    } catch {
        /* diagnostics only */
    }
    return null;
}

/** Join the text parts of an assistant message. */
export function assistantTextFrom(message: AgentModelMessage | undefined): string | null {
    if (!message || message.role !== 'assistant') return null;
    const text = (message.parts ?? [])
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof (p as { text?: unknown }).text === 'string')
        .map((p) => p.text)
        .join('')
        .trim();
    return text === '' ? null : text;
}

export function getSillyTavernContext(): SillyTavernContext | null {
    const ctx = window.SillyTavern?.getContext?.();
    return ctx ?? null;
}

export function getEventName(ctx: SillyTavernContext, key: keyof typeof EVENT): string {
    return ctx.eventTypes?.[key] ?? EVENT[key];
}

/** Subscribe to a host event, tolerating either eventSource or no-op. */
export function onHostEvent(
    ctx: SillyTavernContext,
    key: keyof typeof EVENT,
    handler: (...args: unknown[]) => void,
): boolean {
    const source = ctx.eventSource;
    if (!source?.on) return false;
    source.on(getEventName(ctx, key), handler);
    return true;
}

/**
 * Read the assistant (character) message at an absolute chat index.
 * Returns null when the index is absent or the message is not an assistant one.
 */
export function readAssistantMessageAt(ctx: SillyTavernContext, index: number): string | null {
    const m = ctx.chat?.[index];
    if (!m) return null;
    if (m.is_user || m.is_system) return null;
    return String(m.mes ?? '');
}

/** Read the last assistant (character) message text. */
export function readLastAssistantMessage(ctx: SillyTavernContext): string {
    for (let i = ctx.chat.length - 1; i >= 0; i -= 1) {
        const m = ctx.chat[i];
        if (m && !m.is_user && !m.is_system) {
            return String(m.mes ?? '');
        }
    }
    return '';
}

/** Run a slash command. Prefers the WithOptions variant exposed on the context. */
export async function runSlashCommand(ctx: SillyTavernContext, command: string): Promise<void> {
    const withOptions = ctx.executeSlashCommandsWithOptions;
    if (typeof withOptions === 'function') {
        await withOptions(command, {});
        return;
    }
    const plain = ctx.executeSlashCommands;
    if (typeof plain === 'function') {
        await plain(command);
        return;
    }
    throw new Error(
        'executeSlashCommands unavailable on SillyTavern context (keys: ' +
            Object.keys(ctx).slice(0, 12).join(',') +
            ')',
    );
}

/**
 * Quote a raw user string so the slash-command parser treats it as one
 * positional argument. /send declares rawQuotes, but messages may still
 * contain pipes, quotes or leading `=` which the parser would otherwise read
 * as named arguments.
 */
export function quoteForSlashCommand(text: string): string {
    const escaped = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n');
    return `"${escaped}"`;
}