/**
 * Extension settings. Persisted under extension_settings["wechat-bridge"].
 */

export type BusyPolicy = 'discard' | 'queue';

export type SendTiming = 'afterCommands' | 'generationEnded';

export interface WechatBridgeSettings {
    enabled: boolean;
    bridgeUrl: string;
    pollIntervalMs: number;
    busyPolicy: BusyPolicy;
    sendTiming: SendTiming;
    busyReplyText: string;
    stripThoughtTags: boolean;
}

export const DEFAULT_SETTINGS: WechatBridgeSettings = {
    enabled: true,
    bridgeUrl: 'http://127.0.0.1:8080',
    pollIntervalMs: 3000,
    busyPolicy: 'discard',
    sendTiming: 'afterCommands',
    busyReplyText: '剧情正在生成，请稍候～',
    stripThoughtTags: true,
};

const STORAGE_KEY = 'wechat-bridge';

declare global {
    interface Window {
        extension_settings?: Record<string, unknown>;
        saveSettingsDebounced?: () => void;
    }
}

export function loadSettings(): WechatBridgeSettings {
    const stored = window.extension_settings?.[STORAGE_KEY];
    if (!stored || typeof stored !== 'object') {
        return { ...DEFAULT_SETTINGS };
    }
    return { ...DEFAULT_SETTINGS, ...(stored as Partial<WechatBridgeSettings>) };
}

export function saveSettings(settings: WechatBridgeSettings): void {
    if (!window.extension_settings) {
        window.extension_settings = {};
    }
    window.extension_settings[STORAGE_KEY] = { ...settings };
    window.saveSettingsDebounced?.();
}

/**
 * Remove common reasoning/thought wrappers before sending to WeChat.
 * Only strips well-known tags; ordinary text is untouched.
 */
export function stripThoughtTags(text: string): string {
    return text
        .replace(/<think>[\s\S]*?<\>/gi, '')
        .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
        .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '')
        .trim();
}