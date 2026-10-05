<script setup lang="ts">
import { computed } from 'vue';
import { useBridge } from '../../app/context';
import TestSendRow from '../../components/TestSendRow.vue';

const { runtime, settings } = useBridge();
const state = runtime.state;

const facts = computed(() => [
    { label: '桥接服务', value: state.connected ? '已连接' : '未连接', tone: state.connected ? 'ok' : 'bad' },
    { label: '当前阶段', value: state.busy ? '生成中' : '待机', tone: state.busy ? 'warn' : '' },
    { label: '轮询次数', value: String(state.polls), tone: '' },
    { label: '接收消息', value: String(state.received), tone: '' },
    { label: '发送消息', value: String(state.sent), tone: '' },
]);
</script>

<template>
    <div class="wb-view">
        <header class="wb-view-header">
            <h2>运行状态</h2>
            <p>微信与 TauriTavern 之间的桥接实时状态。</p>
        </header>

        <div class="wb-fact-strip">
            <div
                v-for="fact in facts"
                :key="fact.label"
                class="wb-fact"
                :class="fact.tone ? `is-${fact.tone}` : ''"
            >
                <span class="wb-fact-label">{{ fact.label }}</span>
                <strong class="wb-fact-value">{{ fact.value }}</strong>
            </div>
        </div>

        <section class="wb-card">
            <div class="wb-card-copy">
                <strong>桥接地址</strong>
                <span>{{ settings.bridgeUrl }}</span>
            </div>
            <span class="wb-chip">轮询 {{ settings.pollIntervalMs }}ms</span>
        </section>

        <section v-if="state.lastError" class="wb-card is-error">
            <div class="wb-card-copy">
                <strong>最近错误</strong>
                <span>{{ state.lastError }}</span>
            </div>
        </section>

        <section class="wb-card wb-card-col">
            <div class="wb-card-copy">
                <strong>测试发送</strong>
                <span>直接向微信发送一条文本，用于验证链路。</span>
            </div>
            <TestSendRow />
        </section>
    </div>
</template>

<style scoped>
.wb-view { display: flex; flex-direction: column; gap: 14px; }
.wb-view-header h2 { margin: 0 0 4px; font-size: 20px; }
.wb-view-header p { margin: 0; color: var(--wb-text-muted); font-size: 13px; }

.wb-fact-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
}

.wb-fact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 14px;
    border: 1px solid var(--wb-border);
    border-radius: 10px;
    background: var(--wb-bg-0);
}

.wb-fact-label { font-size: 11px; text-transform: uppercase; color: var(--wb-text-soft); }
.wb-fact-value { font-size: 18px; }
.wb-fact.is-ok .wb-fact-value { color: var(--wb-accent-green-soft-text); }
.wb-fact.is-bad .wb-fact-value { color: var(--wb-accent-red-soft-text); }
.wb-fact.is-warn .wb-fact-value { color: var(--wb-accent-amber-soft-text); }

.wb-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 14px 16px;
    border: 1px solid var(--wb-border);
    border-radius: 10px;
    background: var(--wb-bg-1);
}

.wb-card-col { flex-direction: column; align-items: stretch; }
.wb-card.is-error { border-color: var(--wb-accent-red-soft-text); }
.wb-card-copy { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.wb-card-copy strong { font-size: 14px; }
.wb-card-copy span { color: var(--wb-text-muted); font-size: 12px; word-break: break-all; }

.wb-chip {
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--wb-chip-bg);
    font-size: 11px;
    flex-shrink: 0;
}
</style>