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