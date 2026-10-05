/**
 * Reactive settings store bound to SillyTavern extension_settings.
 */
import { ref, type Ref } from 'vue';
import { loadSettings, saveSettings, type WechatBridgeSettings } from './settings';

export interface SettingsStore {
    state: Ref<WechatBridgeSettings>;
    update: (patch: Partial<WechatBridgeSettings>) => void;
    reset: () => void;
}

export function createSettingsStore(): SettingsStore {
    const state = ref<WechatBridgeSettings>(loadSettings()) as Ref<WechatBridgeSettings>;

    function update(patch: Partial<WechatBridgeSettings>): void {
        const next = { ...state.value, ...patch };
        state.value = next;
        saveSettings(next);
    }

    return {
        state,
        update,
        reset() {
            const fresh = loadSettings();
            state.value = fresh;
            saveSettings(fresh);
        },
    };
}