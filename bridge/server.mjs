/**
 * WeChat bridge service — standalone.
 *
 * Talks to the WeChat iLink bot API directly. No weixin-mcp daemon, no MCP
 * hop: this process owns the polling cursor and the outbound send path.
 *
 *   GET  /health   -> status
 *   GET  /inbound  -> pending messages (drains the queue)
 *   POST /send     -> { text, userId? } send a text to WeChat
 *
 * Protocol reference: iLink bot API
 *   POST {baseUrl}/ilink/bot/getupdates   { get_updates_buf, base_info }
 *   POST {baseUrl}/ilink/bot/sendmessage  { msg, base_info }
 * Headers: Content-Type, AuthorizationType: ilink_bot_token,
 *          Authorization: Bearer <token>, X-WECHAT-UIN
 *
 * IMPORTANT: only one process may poll a given account. Do not run this
 * together with a weixin-mcp daemon on the same account, or messages will be
 * consumed by whichever polls first.
 */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import net from 'node:net';

const PORT = Number(process.env.BRIDGE_PORT || 8080);
const HOST = process.env.BRIDGE_HOST || '127.0.0.1';
const BRIDGE_DIR = process.env.WECHAT_BRIDGE_DIR || path.join(os.homedir(), '.wechat-bridge');
const WEIXIN_MCP_DIR = process.env.WEIXIN_MCP_DIR || path.join(os.homedir(), '.weixin-mcp');
const WECHAT_ACP_DIR = process.env.WECHAT_ACP_DIR || path.join(os.homedir(), '.wechat-acp');
const CHANNEL_VERSION = '1.0.2';
const POLL_TIMEOUT_MS = 38000;
const MAX_SEEN = 500;
/** Recent messages kept for non-destructive reads (Agent tools). */
const MAX_HISTORY = Number(process.env.BRIDGE_MAX_HISTORY || 100);
/** Cap the in-memory queue so a paused extension cannot flood on resume. */
const MAX_PENDING = Number(process.env.BRIDGE_MAX_PENDING || 20);
/** Drop queued messages older than this. */
const PENDING_TTL_MS = Number(process.env.BRIDGE_PENDING_TTL_MS || 5 * 60 * 1000);

// ────────────────────────────── account ──────────────────────────────

function readJson(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch {
        return null;
    }
}

/**
 * Locate WeChat credentials. Prefers weixin-mcp's account layout, then falls
 * back to the wechat-acp login token. Both carry token + baseUrl.
 */
function loadAccount() {
    const accountsDir = path.join(WEIXIN_MCP_DIR, 'accounts');
    if (fs.existsSync(accountsDir)) {
        const files = fs
            .readdirSync(accountsDir)
            .filter((f) => f.endsWith('.json') && !f.endsWith('.cursor.json') && f !== 'contacts.json');
        for (const f of files) {
            const data = readJson(path.join(accountsDir, f));
            if (data && data.token) {
                return {
                    token: data.token,
                    baseUrl: data.baseUrl || 'https://ilinkai.weixin.qq.com',
                    accountId: data.accountId || f.replace(/\.json$/, ''),
                    userId: data.userId || null,
                };
            }
        }
    }

    const acpToken = readJson(path.join(WECHAT_ACP_DIR, 'token.json'));
    if (acpToken && acpToken.token) {
        return {
            token: acpToken.token,
            baseUrl: acpToken.baseUrl || 'https://ilinkai.weixin.qq.com',
            accountId: acpToken.accountId || 'imported',
            userId: acpToken.userId || null,
        };
    }

    return null;
}

// ─────────────────────────────── state ───────────────────────────────

const STATE_FILE = path.join(BRIDGE_DIR, 'state.json');

function loadState() {
    const s = readJson(STATE_FILE);
    return {
        cursor: typeof s?.cursor === 'string' ? s.cursor : '',
        users: s && typeof s.users === 'object' && s.users ? s.users : {},
    };
}

function saveState(state) {
    try {
        fs.mkdirSync(BRIDGE_DIR, { recursive: true });
        const tmp = STATE_FILE + '.tmp';
        fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
        fs.renameSync(tmp, STATE_FILE);
    } catch (err) {
        console.error('[bridge] failed to persist state:', err.message);
    }
}

/**
 * First-run migration: adopt the cursor and contacts left by a previous
 * weixin-mcp setup so already-delivered messages are not replayed.
 */
function seedFromLegacy(state, account) {
    if (!state.cursor) {
        const legacy = readJson(path.join(WEIXIN_MCP_DIR, 'accounts', account.accountId + '.cursor.json'));
        if (legacy && typeof legacy.cursor === 'string') {
            state.cursor = legacy.cursor;
            console.log('[bridge] adopted cursor from weixin-mcp (avoids replay)');
        }
    }
    if (Object.keys(state.users).length === 0) {
        const contacts = readJson(path.join(WEIXIN_MCP_DIR, 'contacts.json'));
        if (contacts && typeof contacts === 'object') {
            for (const [id, v] of Object.entries(contacts)) {
                if (v && v.contextToken) {
                    state.users[id] = { lastSeen: v.lastSeen || '', contextToken: v.contextToken };
                }
            }
            if (Object.keys(state.users).length > 0) {
                console.log('[bridge] imported ' + Object.keys(state.users).length + ' contact(s) from weixin-mcp');
            }
        }
    }
}

// ──────────────────────────────── iLink API ────────────────────────────────

function randomWechatUin() {
    return crypto.randomBytes(4).toString('base64');
}

function buildHeaders(token, bodyStr) {
    return {
        'Content-Type': 'application/json',
        'Content-Length': String(Buffer.byteLength(bodyStr, 'utf-8')),
        AuthorizationType: 'ilink_bot_token',
        Authorization: 'Bearer ' + token,
        'X-WECHAT-UIN': randomWechatUin(),
    };
}

async function apiPost(baseUrl, endpoint, body, token, timeoutMs) {
    const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const url = new URL(endpoint, base).toString();
    const bodyStr = JSON.stringify(body);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: buildHeaders(token, bodyStr),
            body: bodyStr,
            signal: controller.signal,
        });
        const text = await res.text();
        if (res.status === 401 || res.status === 403) {
            throw new Error('认证失败（401/403），请重新登录微信');
        }
        if (!res.ok) {
            throw new Error('HTTP ' + res.status + ': ' + text.slice(0, 200));
        }
        const data = JSON.parse(text);
        if (data && ((data.ret !== undefined && data.ret !== 0) || (data.errcode !== undefined && data.errcode !== 0))) {
            throw new Error('API 拒绝（' + (data.errcode || data.ret) + '）：' + (data.errmsg || 'unknown'));
        }
        return data;
    } finally {
        clearTimeout(timer);
    }
}

function getUpdates(account, cursor) {
    return apiPost(
        account.baseUrl,
        'ilink/bot/getupdates',
        { get_updates_buf: cursor, base_info: { channel_version: CHANNEL_VERSION } },
        account.token,
        POLL_TIMEOUT_MS + 5000,
    );
}

function sendText(account, to, text, contextToken) {
    const clientId = 'wechat-bridge-' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    return apiPost(
        account.baseUrl,
        'ilink/bot/sendmessage',
        {
            msg: {
                from_user_id: '',
                to_user_id: to,
                client_id: clientId,
                message_type: 2,
                message_state: 2,
                ...(contextToken ? { context_token: contextToken } : {}),
                item_list: [{ type: 1, text_item: { text } }],
            },
            base_info: { channel_version: CHANNEL_VERSION },
        },
        account.token,
        20000,
    );
}

// ─────────────────────────────── runtime ───────────────────────────────

const pending = [];
/** Non-destructive view of recent messages, independent of the draining queue. */
const history = [];
const seen = new Set();
let seq = 0;
let polls = 0;
let lastError = null;
let account = null;
let state = { cursor: '', users: {} };

function extractText(items) {
    if (!Array.isArray(items)) return '';
    return items
        .filter((i) => i && i.type === 1 && i.text_item && i.text_item.text)
        .map((i) => i.text_item.text)
        .join('');
}

function ingest(messages) {
    let added = 0;
    for (const m of messages) {
        const id = String(m.message_id || (m.from_user_id + ':' + m.create_time_ms));
        if (seen.has(id)) continue;
        seen.add(id);
        if (seen.size > MAX_SEEN) seen.clear();

        const text = extractText(m.item_list);
        if (!text) continue;

        const from = m.from_user_id;
        if (from) {
            state.users[from] = { lastSeen: new Date().toISOString(), contextToken: m.context_token || '' };
        }

        const record = {
            id: 'wb_' + (++seq) + '_' + id,
            from,
            text,
            contextToken: m.context_token || '',
            receivedAtMs: Date.now(),
        };
        pending.push(record);
        history.unshift(record);
        if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
        added += 1;
    }
    if (added > 0) saveState(state);
    trimPending();
    return added;
}

/**
 * Enforce the queue cap. Oldest entries are dropped first so a long-paused
 * extension resumes with a bounded, recent backlog instead of a flood.
 */
function trimPending() {
    while (pending.length > MAX_PENDING) {
        const dropped = pending.shift();
        console.warn('[bridge] queue full (' + MAX_PENDING + '), dropped oldest:', dropped.text.slice(0, 40));
    }
}

/** Remove entries older than PENDING_TTL_MS. Returns the survivors. */
function drainPending() {
    const now = Date.now();
    const fresh = [];
    let expired = 0;
    for (const m of pending) {
        if (now - m.receivedAtMs > PENDING_TTL_MS) expired += 1;
        else fresh.push(m);
    }
    pending.length = 0;
    if (expired > 0) console.warn('[bridge] dropped ' + expired + ' expired message(s)');
    return fresh;
}

async function pollOnce() {
    if (!account) return;
    polls += 1;
    const resp = await getUpdates(account, state.cursor);
    if (resp && typeof resp.get_updates_buf === 'string' && resp.get_updates_buf !== '') {
        state.cursor = resp.get_updates_buf;
        saveState(state);
    }
    const msgs = Array.isArray(resp?.msgs) ? resp.msgs : [];
    if (msgs.length > 0) ingest(msgs);
}

let polling = false;
async function pollLoop() {
    for (;;) {
        if (!polling) {
            polling = true;
            try {
                await pollOnce();
                lastError = null;
            } catch (err) {
                lastError = String(err?.message || err);
                console.error('[bridge] poll error:', lastError);
                await new Promise((r) => setTimeout(r, 5000));
            } finally {
                polling = false;
            }
        } else {
            await new Promise((r) => setTimeout(r, 500));
        }
    }
}

function resolveUser(userId) {
    if (userId && state.users[userId]) {
        return { userId, contextToken: state.users[userId].contextToken };
    }
    const entries = Object.entries(state.users);
    if (entries.length === 0) return null;
    entries.sort((a, b) => String(b[1].lastSeen || '').localeCompare(String(a[1].lastSeen || '')));
    const [id, v] = entries[0];
    return { userId: id, contextToken: v.contextToken };
}

// ─────────────────────────────── HTTP ───────────────────────────────

const app = express();
app.use(express.json({ limit: '2mb' }));

const loopback = new Set(['127.0.0.1', 'localhost', '[::1]', '::1']);
app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0];
    if (!loopback.has(host)) {
        res.status(403).json({ error: 'local only' });
        return;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }
    next();
});

app.get('/health', (_req, res) => {
    res.json({
        ok: true,
        mode: 'standalone',
        account: account ? account.accountId : null,
        pending: pending.length,
        polls,
        users: Object.keys(state.users).length,
        cursor: state.cursor ? 'set' : 'empty',
        lastError,
    });
});

app.get('/inbound', (_req, res) => {
    const messages = drainPending();
    pending.length = 0;
    res.json({ messages });
});

/**
 * Non-destructive read of recent messages. Unlike /inbound this does NOT
 * consume the queue, so Agent tools can inspect history without stealing
 * messages from the extension's auto-poller.
 */
app.get('/messages', (req, res) => {
    const raw = Number(req.query?.limit);
    const limit = Number.isFinite(raw) && raw > 0 ? Math.min(Math.floor(raw), MAX_HISTORY) : 20;
    res.json({
        messages: history.slice(0, limit),
        total: history.length,
        pending: pending.length,
    });
});

app.post('/send', async (req, res) => {
    const text = String(req.body?.text || '');
    const userId = req.body?.userId ? String(req.body.userId) : null;
    if (!text.trim()) {
        res.status(400).json({ error: 'text required' });
        return;
    }
    if (!account) {
        res.status(503).json({ error: 'no WeChat account' });
        return;
    }
    const target = resolveUser(userId);
    if (!target) {
        res.status(400).json({ error: 'no known recipient' });
        return;
    }
    try {
        await sendText(account, target.userId, text, target.contextToken);
        res.json({ ok: true, to: target.userId });
    } catch (err) {
        lastError = String(err?.message || err);
        res.status(500).json({ error: lastError });
    }
});

// ─────────────────────────────── startup ───────────────────────────────

function warnIfDaemonRunning() {
    return new Promise((resolve) => {
        const sock = net.connect({ host: '127.0.0.1', port: 3001 });
        sock.setTimeout(800);
        sock.on('connect', () => {
            sock.destroy();
            console.warn('[bridge] WARNING: something is listening on :3001 (weixin-mcp daemon?).');
            console.warn('[bridge]          Two pollers on one WeChat account will steal messages.');
            console.warn('[bridge]          Stop the daemon to avoid cursor conflicts.');
            resolve();
        });
        sock.on('timeout', () => { sock.destroy(); resolve(); });
        sock.on('error', () => resolve());
    });
}

async function main() {
    account = loadAccount();
    if (!account) {
        console.error('[bridge] No WeChat credentials found.');
        console.error('[bridge]   looked in: ' + path.join(WEIXIN_MCP_DIR, 'accounts'));
        console.error('[bridge]   fallback : ' + path.join(WECHAT_ACP_DIR, 'token.json'));
        console.error('[bridge]   run a weixin-mcp login first.');
        process.exit(1);
    }

    state = loadState();
    seedFromLegacy(state, account);
    saveState(state);

    await warnIfDaemonRunning();

    app.listen(PORT, HOST, () => {
        console.log('wechat-bridge listening on http://' + HOST + ':' + PORT + '  (standalone)');
        console.log('  account   : ' + account.accountId);
        console.log('  baseUrl   : ' + account.baseUrl);
        console.log('  state     : ' + STATE_FILE);
        console.log('  users     : ' + Object.keys(state.users).length);
        console.log('  cursor    : ' + (state.cursor ? 'resumed' : 'from scratch'));
    });

    pollLoop().catch((err) => {
        console.error('[bridge] poll loop crashed:', err);
    });
}

main();