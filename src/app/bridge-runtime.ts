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

    /** Feed one WeChat message into the chat as a user message, then trigger. */
    async function deliverToChat(msg: InboundMessage): Promise<void> {
        if (!ctx) throw new Error('SillyTavern context unavailable');
        wechatRun = { target: msg.from };
        state.busy = true;
        state.phase = 'generating';
        try {
            await runSlashCommand(ctx, `/send ${quoteForSlashCommand(msg.text)}`);
            await runSlashCommand(ctx, '/trigger');
            log('info', `Injected message from ${msg.from} and triggered generation.`);
        } catch (err) {
            const target = wechatRun?.target;
            wechatRun = null;
            state.busy = false;
            state.phase = 'error';
            state.lastError = String(err);
            log('error', `Injection failed: ${String(err)}`);
            void pushOutbound(`[桥接错误] 注入聊天失败：${String(err)}`, target);
        }
    }

    /** Finish the current WeChat run: send the reply, then drain the queue. */
    function completeRun(resolveText: () => string | null): void {
        if (!wechatRun) return;
        const text = resolveText();
        if (text === null) return;
        const target = wechatRun.target;
        wechatRun = null;
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
        onHostEvent(ctx, 'GENERATION_STOPPED', () => {
            // User pressed stop: drop the run instead of waiting for the watchdog.
            if (!wechatRun) {
                state.busy = false;
                return;
            }
            const target = wechatRun.target;
            wechatRun = null;
            state.busy = false;
            state.phase = 'idle';
            log('warn', 'Generation stopped by user.');
            void pushOutbound('[桥接] 生成已被停止。', target);
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
            client?.dispose();
            client = null;
        },
    };
}