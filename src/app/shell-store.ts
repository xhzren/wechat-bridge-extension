/**
 * Shell UI state: panel visibility and active navigation tab.
 */
import { reactive } from 'vue';

export interface ShellState {
    panelOpen: boolean;
    activeTab: string;
}

export interface ShellStore {
    state: ShellState;
    openPanel: () => void;
    closePanel: () => void;
    togglePanel: () => void;
    setActiveTab: (id: string) => void;
}

export function createShellStore(): ShellStore {
    const state = reactive<ShellState>({
        panelOpen: false,
        activeTab: 'status',
    });

    return {
        state,
        openPanel() {
            state.panelOpen = true;
        },
        closePanel() {
            state.panelOpen = false;
        },
        togglePanel() {
            state.panelOpen = !state.panelOpen;
        },
        setActiveTab(id: string) {
            state.activeTab = id;
        },
    };
}