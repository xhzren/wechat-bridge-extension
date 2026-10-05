/**
 * Appearance mode shared by the floating shell and the settings surface.
 */
import { ref, type Ref } from 'vue';

export type AppearanceMode = 'night' | 'day';

export interface AppearanceStore {
    state: Ref<AppearanceMode>;
    set: (mode: AppearanceMode) => void;
}

const STORAGE_KEY = 'wechat-bridge-appearance';

export function createAppearanceStore(): AppearanceStore {
    let initial: AppearanceMode = 'night';
    try {
        const stored = window.localStorage?.getItem(STORAGE_KEY);
        if (stored === 'day' || stored === 'night') initial = stored;
    } catch {
        /* localStorage may be unavailable */
    }

    const state = ref<AppearanceMode>(initial) as Ref<AppearanceMode>;

    return {
        state,
        set(mode: AppearanceMode) {
            state.value = mode;
            try {
                window.localStorage?.setItem(STORAGE_KEY, mode);
            } catch {
                /* non-fatal */
            }
        },
    };
}