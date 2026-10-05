<script setup lang="ts">
import { computed } from 'vue';
import { useBridge } from '../../app/context';
import ExtensionSettings from '../settings/ExtensionSettings.vue';
import BridgeStatusView from '../../features/bridge-status/BridgeStatusView.vue';
import MessageLogView from '../../features/message-log/MessageLogView.vue';

const { shell } = useBridge();

interface NavItem {
    id: string;
    label: string;
}

interface NavCategory {
    id: string;
    label: string;
    items: NavItem[];
}

const categories: NavCategory[] = [
    {
        id: 'bridge',
        label: '桥接',
        items: [
            { id: 'status', label: '运行状态' },
            { id: 'messages', label: '消息记录' },
        ],
    },
];

const mobileTabs = computed<NavItem[]>(() => [
    { id: 'settings', label: '设置' },
    ...categories.flatMap((c) => c.items),
]);

function setTab(id: string): void {
    shell.setActiveTab(id);
}
</script>

<template>
    <div class="wb-panel-backdrop" @click="shell.closePanel()">
        <div class="wb-panel-window" @click.stop>
            <!-- Sidebar -->
            <div class="wb-panel-sidebar">
                <div class="wb-sidebar-header">
                    <h3>微信桥接</h3>
                </div>

                <div class="wb-sidebar-nav wb-desktop-nav">
                    <div
                        class="wb-nav-item"
                        :class="{ active: shell.state.activeTab === 'settings' }"
                        @click="setTab('settings')"
                    >
                        设置
                    </div>
                    <div v-for="cat in categories" :key="cat.id" class="wb-nav-category">
                        <div class="wb-category-title">{{ cat.label }}</div>
                        <div
                            v-for="item in cat.items"
                            :key="item.id"
                            class="wb-nav-item wb-sub-item"
                            :class="{ active: shell.state.activeTab === item.id }"
                            @click="setTab(item.id)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>

                <div class="wb-mobile-nav">
                    <button
                        v-for="tab in mobileTabs"
                        :key="tab.id"
                        class="wb-mobile-tab"
                        :class="{ active: shell.state.activeTab === tab.id }"
                        @click="setTab(tab.id)"
                    >
                        {{ tab.label }}
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="wb-panel-content">
                <div class="wb-content-header">
                    <button class="wb-close-btn" @click="shell.closePanel()">✕</button>
                </div>
                <div class="wb-content-body">
                    <div v-if="shell.state.activeTab === 'settings'" class="wb-feature-host wb-settings-host">
                        <ExtensionSettings />
                    </div>
                    <div v-else-if="shell.state.activeTab === 'status'" class="wb-feature-host">
                        <BridgeStatusView />
                    </div>
                    <div v-else-if="shell.state.activeTab === 'messages'" class="wb-feature-host">
                        <MessageLogView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wb-panel-backdrop {
    position: fixed;
    inset: 0;
    z-index: 99998;
    background: var(--wb-backdrop);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
}

.wb-panel-window {
    width: min(96%, 1360px);
    height: min(94%, 1040px);
    background: var(--wb-bg-1);
    border: 1px solid var(--wb-border);
    border-radius: 8px;
    display: flex;
    overflow: hidden;
    min-height: 0;
    min-width: 0;
    box-shadow: var(--wb-shadow-panel);
    color: var(--wb-text);
    font-family: var(--wb-font-sans);
}

.wb-panel-sidebar {
    width: 220px;
    background: var(--wb-bg-sidebar);
    border-right: 1px solid var(--wb-border);
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.wb-sidebar-header {
    padding: 16px;
    border-bottom: 1px solid var(--wb-border);
}

.wb-sidebar-header h3 {
    margin: 0;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.wb-sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 12px 8px;
}

.wb-mobile-nav { display: none; }

.wb-nav-item {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 4px;
    color: var(--wb-text-muted);
    transition: background 0.15s, color 0.15s;
}

.wb-nav-item:hover {
    background: var(--wb-surface-hover);
    color: var(--wb-text);
}

.wb-nav-item.active {
    background: var(--wb-surface-active);
    color: var(--wb-text);
    font-weight: 500;
}

.wb-nav-category { margin-top: 16px; }

.wb-category-title {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--wb-text-soft);
    padding: 0 12px 8px;
    letter-spacing: 0.5px;
}

.wb-sub-item { padding-left: 20px; }

.wb-panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--wb-bg-1);
    min-height: 0;
    min-width: 0;
}

.wb-content-header {
    height: 36px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
    border-bottom: 1px solid var(--wb-border);
}

.wb-close-btn {
    background: transparent;
    border: none;
    color: var(--wb-text-muted);
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
}

.wb-close-btn:hover {
    background: var(--wb-surface-hover);
    color: var(--wb-text);
}

.wb-content-body {
    flex: 1;
    min-height: 0;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.wb-feature-host {
    flex: 1;
    min-height: 0;
    display: flex;
    overflow: hidden;
}

.wb-settings-host {
    overflow-y: auto;
    overscroll-behavior: contain;
}

@media (max-width: 768px) {
    .wb-panel-window {
        width: 100%;
        height: 100%;
        border-radius: 0;
        flex-direction: column;
    }

    .wb-panel-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--wb-border);
    }

    .wb-sidebar-header,
    .wb-desktop-nav { display: none; }

    .wb-mobile-nav {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 10px 12px;
    }

    .wb-mobile-tab {
        padding: 8px 12px;
        border: 1px solid var(--wb-border);
        border-radius: 999px;
        background: var(--wb-bg-0);
        color: var(--wb-text-muted);
        font-size: 13px;
        white-space: nowrap;
        cursor: pointer;
    }

    .wb-mobile-tab.active {
        border-color: var(--wb-border-strong);
        background: var(--wb-surface-active);
        color: var(--wb-text);
    }

    .wb-feature-host { overflow-y: auto; }
}
</style>