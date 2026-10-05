<script setup lang="ts">
import { ref } from 'vue';
import { useBridge } from '../app/context';

const { runtime } = useBridge();
const text = ref('这是一条测试消息');
const sending = ref(false);

async function send(): Promise<void> {
    sending.value = true;
    try {
        await runtime.testSend(text.value);
    } finally {
        sending.value = false;
    }
}
</script>

<template>
    <div class="wb-inline">
        <input v-model="text" class="wb-control" type="text" />
        <button class="wb-btn" type="button" :disabled="sending" @click="send">
            {{ sending ? '发送中…' : '发送到微信' }}
        </button>
    </div>
</template>

<style scoped>
.wb-inline { display: flex; gap: 8px; }
.wb-inline input { flex: 1; }
.wb-btn {
    padding: 6px 14px;
    border: 1px solid var(--wb-border-strong);
    border-radius: 8px;
    background: var(--wb-bg-2);
    color: var(--wb-text);
    cursor: pointer;
    white-space: nowrap;
}
.wb-btn:hover { background: var(--wb-surface-hover); }
.wb-btn:disabled { opacity: 0.6; cursor: default; }
</style>