/**
 * Registers WeChat tools with the TauriTavern Agent runtime.
 *
 * Tools are exposed as `extension/wechat-bridge:<name>` and are available to
 * both chat-scoped Agent runs (character cards) and session-scoped runs (the
 * in-app assistant). Registration happens once per host session.
 *
 * The handlers run in the extension's WebView JS and talk to the local bridge
 * service over HTTP — the bridge still owns all WeChat I/O and the polling
 * cursor.
 */
import { createBridgeClient } from '../host/bridge-client';
import type { AgentToolRegistrationApi, AgentToolScope } from '../host/api';
import type { WechatBridgeSettings } from './settings';

/** Must match the extension folder name so tool ids stay stable. */
const EXTENSION_ID = 'wechat-bridge';

const CONTEXTS: readonly AgentToolScope[] = ['chat', 'session'];

function asString(value: unknown, field: string): string {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`${field} must be a non-empty string`);
    }
    return value;
}

function asLimit(value: unknown): number {
    if (value === undefined || value === null) return 20;
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) {
        throw new Error('limit must be a positive number');
    }
    return Math.min(Math.floor(n), 100);
}

/**
 * Register the WeChat tool set. Safe to call once host APIs are available.
 */
export async function registerWechatTools(
    tools: AgentToolRegistrationApi,
    getSettings: () => WechatBridgeSettings,
): Promise<void> {
    const client = () => createBridgeClient({ baseUrl: getSettings().bridgeUrl });

    await tools.register(
        {
            extensionId: EXTENSION_ID,
            name: 'wechat.send',
            description:
                'Send a text message to a WeChat user through the local WeChat bridge. ' +
                'Omit userId to send to the most recently active contact. ' +
                'Use this when the user asks you to notify someone on WeChat.',
            inputSchema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    text: {
                        type: 'string',
                        description: 'Text to send. Sent as-is; long text is not split.',
                    },
                    userId: {
                        type: 'string',
                        description: 'Target WeChat user id. Omit for the last active contact.',
                    },
                },
                required: ['text'],
            },
            contexts: CONTEXTS,
            enabled: true,
        },
        async (args) => {
            const text = asString(args.text, 'text');
            const userId = typeof args.userId === 'string' ? args.userId : undefined;
            await client().send({ text, userId });
            return { sent: true, to: userId ?? 'last-active-user' };
        },
    );

    await tools.register(
        {
            extensionId: EXTENSION_ID,
            name: 'wechat.read',
            description:
                'Read recent inbound WeChat messages without consuming them. ' +
                'Returns newest first. This does not mark messages as handled and does not ' +
                'remove them from the queue used by the bridge auto-poller.',
            inputSchema: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    limit: {
                        type: 'number',
                        description: 'Maximum messages to return (1-100, default 20).',
                    },
                },
            },
            contexts: CONTEXTS,
            enabled: true,
        },
        async (args) => {
            const limit = asLimit(args.limit);
            const messages = await client().read(limit);
            return {
                count: messages.length,
                messages: messages.map((m) => ({
                    from: m.from,
                    text: m.text,
                    receivedAtMs: m.receivedAtMs,
                })),
            };
        },
    );

    await tools.register(
        {
            extensionId: EXTENSION_ID,
            name: 'wechat.status',
            description:
                'Report the local WeChat bridge status: connection, account, queue depth and ' +
                'the last error. Use this to check whether WeChat integration is working before ' +
                'sending or after a failure.',
            inputSchema: {
                type: 'object',
                additionalProperties: false,
                properties: {},
            },
            contexts: CONTEXTS,
            enabled: true,
        },
        async () => {
            const s = await client().status();
            return {
                connected: s.ok === true,
                account: s.account ?? null,
                pending: s.pending,
                users: s.users ?? 0,
                lastError: s.lastError ?? null,
            };
        },
    );
}