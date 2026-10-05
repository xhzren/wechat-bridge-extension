<script setup lang="ts">
import { ref } from 'vue';
import { useBridge } from '../../app/context';

const { runtime } = useBridge();
const state = runtime.state;
const raw = ref(false);

function fmt(atMs: number): string {
    return new Date(atMs).toLocaleTimeString('zh-CN', { hour12: false });
}
</script>

<template>
    <div class="wb-view">
        <header class="wb-view-header wb-header-row">
            <div>
                <h2>消息记录</h2>
                <p>桥接运行期间的事件日志。</p>
            </div>
            <button class="wb-btn" type="button" @click="raw = !raw">
                {{ raw ? '简洁视图' : '原始数据' }}
            </button>
        </header>

        <div class="wb-log-list">
            <div v-if="!state.logs.length" class="wb-empty">暂无记录</div>
            <div
                v-for="entry in state.logs"
                :key="entry.id"
                class="wb-log-row"
                :class="`is-${entry.level}`"
            >
                <span class="wb-log-time">{{ fmt(entry.atMs) }}</span>
                <span class="wb-log-level">{{ entry.level }}</span>
                <span class="wb-log-text">{{ entry.text }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wb-view { display: flex; flex-direction: column; gap: 14px; min-height: 0; flex: 1; }
.wb-view-header h2 { margin: 0 0 4px; font-size: 20px; }
.wb-view-header p { margin: 0; color: var(--wb-text-muted); font-size: 13px; }
.wb-header-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }

.wb-btn {
    padding: 6px 14px;
    border: 1px solid var(--wb-border-strong);
    border-radius: 8px;
    background: var(--wb-bg-2);
    color: var(--wb-text);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
}
.wb-btn:hover { background: var(--wb-surface-hover); }

.wb-log-list {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    border: 1px solid var(--wb-border);
    border-radius: 10px;
    background: var(--wb-bg-0);
    padding: 8px;
}

.wb-log-row {
    display: grid;
    grid-template-columns: 70px 52px 1fr;
    gap: 8px;
    padding: 4px 6px;
    border-radius: 6px;
    font-family: var(--wb-font-mono);
    font-size: 12px;
}

.wb-log-row:hover { background: var(--wb-surface-hover); }
.wb-log-time { color: var(--wb-text-soft); }
.wb-log-level { text-transform: uppercase; font-size: 10px; align-self: center; }
.wb-log-row.is-info .wb-log-level { color: var(--wb-accent-blue-soft-text); }
.wb-log-row.is-warn .wb-log-level { color: var(--wb-accent-amber-soft-text); }
.wb-log-row.is-error .wb-log-level { color: var(--wb-accent-red-soft-text); }
.wb-log-text { word-break: break-word; }

.wb-empty { padding: 20px; text-align: center; color: var(--wb-text-soft); }
</style>