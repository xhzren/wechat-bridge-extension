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

export interface BridgeStatus {
    ok: boolean;
    mode?: string;
    account?: string | null;
    pending: number;
    polls?: number;
    users?: number;
    lastError?: string | null;
}

export interface BridgeClient {
    poll: () => Promise<InboundMessage[]>;
    /** Non-destructive read of recent messages (does not consume the queue). */
    read: (limit?: number) => Promise<InboundMessage[]>;
    send: (input: { text: string; userId?: string }) => Promise<void>;
    status: () => Promise<BridgeStatus>;
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

    async function read(limit?: number): Promise<InboundMessage[]> {
        const query = limit && limit > 0 ? `?limit=${encodeURIComponent(String(limit))}` : '';
        const res = await fetchImpl(`${baseUrl}/messages${query}`, { method: 'GET' });
        if (!res.ok) {
            throw new Error(`bridge read failed: HTTP ${res.status}`);
        }
        const data = (await res.json()) as { messages?: InboundMessage[] };
        return Array.isArray(data.messages) ? data.messages : [];
    }

    async function status(): Promise<BridgeStatus> {
        const res = await fetchImpl(`${baseUrl}/health`, { method: 'GET' });
        if (!res.ok) {
            throw new Error(`bridge status failed: HTTP ${res.status}`);
        }
        return (await res.json()) as BridgeStatus;
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
        read,
        send,
        status,
        dispose() {
            /* no persistent resources */
        },
    };
}