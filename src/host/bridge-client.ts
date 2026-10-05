/**
 * Client for the local wechat-bridge Node service.
 *
 * The service owns all WeChat I/O (weixin-mcp polling / sending). The
 * extension only talks HTTP to it, so no WeChat logic lives in the WebView.
 */

export interface InboundMessage {
    id: string;
    from: string;
    text: string;
    contextToken?: string;
    receivedAtMs: number;
}

export interface BridgeClientOptions {
    baseUrl: string;
    pollIntervalMs: number;
    fetchImpl?: typeof fetch;
}

export interface BridgeClient {
    poll: () => Promise<InboundMessage[]>;
    send: (input: { text: string; userId?: string }) => Promise<void>;
    dispose: () => void;
}

const DEFAULT_BASE_URL = 'http://127.0.0.1:8080';

export function createBridgeClient(options: Partial<BridgeClientOptions> = {}): BridgeClient {
    const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);

    async function poll(): Promise<InboundMessage[]> {
        const res = await fetchImpl(`${baseUrl}/inbound`, { method: 'GET' });
        if (!res.ok) {
            throw new Error(`bridge poll failed: HTTP ${res.status}`);
        }
        const data = (await res.json()) as { messages?: InboundMessage[] };
        return Array.isArray(data.messages) ? data.messages : [];
    }

    async function send(input: { text: string; userId?: string }): Promise<void> {
        const res = await fetchImpl(`${baseUrl}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
        if (!res.ok) {
            throw new Error(`bridge send failed: HTTP ${res.status}`);
        }
    }

    return {
        poll,
        send,
        dispose() {
            /* no persistent resources */
        },
    };
}