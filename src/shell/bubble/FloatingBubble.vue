<script setup lang="ts">
import { computed } from 'vue';
import { useBridge } from '../../app/context';

const { runtime, shell } = useBridge();
const state = runtime.state;

const badge = computed(() => {
    if (!state.connected) return '';
    if (state.busy) return '…';
    return '';
});

const bubbleClass = computed(() => ({
    'is-busy': state.busy,
    'is-offline': !state.connected,
}));
</script>

<template>
    <button
        class="wb-bubble-btn"
        :class="bubbleClass"
        type="button"
        :title="state.connected ? 'WeChat Bridge' : 'WeChat Bridge (未连接)'"
        @click="shell.togglePanel()"
    >
        <span class="wb-bubble-icon">W</span>
        <span v-if="badge" class="wb-bubble-badge">{{ badge }}</span>
    </button>
</template>

<style scoped>
.wb-bubble-btn {
    position: fixed;
    right: 16px;
    bottom: 92px;
    z-index: 99999;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: var(--wb-bubble-button-bg);
    color: var(--wb-bubble-button-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--wb-shadow-floating);
    transition: transform 0.1s ease, background 0.2s ease;
}

.wb-bubble-btn:hover {
    transform: scale(1.05);
    background: var(--wb-bubble-button-hover);
}

.wb-bubble-btn:active { transform: scale(0.95); }

.wb-bubble-btn.is-busy { box-shadow: 0 0 0 3px var(--wb-accent-amber-soft-bg); }
.wb-bubble-btn.is-offline { opacity: 0.6; }

.wb-bubble-icon {
    font-family: var(--wb-font-mono);
    font-size: 17px;
    font-weight: 700;
}

.wb-bubble-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--wb-accent-amber);
    color: #111;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>