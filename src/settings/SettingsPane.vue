<script setup lang="ts">
import { computed } from 'vue';
import { useBridge } from '../app/context';
import type { BusyPolicy, SendTiming } from '../app/settings';

/**
 * Settings surface.
 *
 * `drawer` = Extensions-drawer surface: only the enable switch, appearance
 *            and the panel entry point.
 * `panel`  = floating-panel surface: connection and behaviour settings.
 */
const props = withDefaults(defineProps<{ surface?: 'drawer' | 'panel' }>(), {
    surface: 'drawer',
});

const { settings, updateSettings, shell, appearance } = useBridge();

const isPanel = computed(() => props.surface === 'panel');

const enabled = computed({
    get: () => settings.value.enabled,
    set: (v: boolean) => updateSettings({ enabled: v }),
});
const bridgeUrl = computed({
    get: () => settings.value.bridgeUrl,
    set: (v: string) => updateSettings({ bridgeUrl: v }),
});
const pollIntervalMs = computed({
    get: () => settings.value.pollIntervalMs,
    set: (v: number) => updateSettings({ pollIntervalMs: Number(v) || 3000 }),
});
const busyPolicy = computed({
    get: () => settings.value.busyPolicy,
    set: (v: BusyPolicy) => updateSettings({ busyPolicy: v }),
});
const busyReplyText = computed({
    get: () => settings.value.busyReplyText,
    set: (v: string) => updateSettings({ busyReplyText: v }),
});
const sendTiming = computed({
    get: () => settings.value.sendTiming,
    set: (v: SendTiming) => updateSettings({ sendTiming: v }),
});
const stripThoughtTags = computed({
    get: () => settings.value.stripThoughtTags,
    set: (v: boolean) => updateSettings({ stripThoughtTags: v }),
});

const appearanceValue = computed<string>({
    get: () => appearance.state.value,
    set: (v: string) => appearance.set(v === 'day' ? 'day' : 'night'),
});
</script>

<template>
    <div class="wb-settings-pane">
        <div class="wb-settings-header">
            <h2 class="wb-settings-title">微信桥接</h2>
            <p class="wb-settings-description">
                把微信消息接入当前角色卡聊天，并在生成完成后把回复发回微信。
            </p>
        </div>

        <label class="wb-settings-card wb-card-master">
            <div class="wb-card-copy">
                <strong>启用桥接</strong>
                <span>关闭后悬浮球与后台轮询都会停止。</span>
            </div>
            <input v-model="enabled" type="checkbox" />
        </label>

        <section class="wb-settings-group">
            <header class="wb-group-header">
                <h3>外观</h3>
            </header>
            <div class="wb-settings-card">
                <div class="wb-card-copy">
                    <strong>外观</strong>
                    <span>切换面板与悬浮球的夜间 / 日间主题。</span>
                </div>
                <div class="wb-appearance-toggle">
                    <button
                        type="button"
                        class="wb-appearance-option"
                        :class="{ active: appearanceValue === 'night' }"
                        @click="appearanceValue = 'night'"
                    >
                        夜间
                    </button>
                    <button
                        type="button"
                        class="wb-appearance-option"
                        :class="{ active: appearanceValue === 'day' }"
                        @click="appearanceValue = 'day'"
                    >
                        日间
                    </button>
                </div>
            </div>
        </section>

        <section class="wb-settings-group">
            <header class="wb-group-header">
                <h3>面板</h3>
            </header>
            <div class="wb-settings-card">
                <div class="wb-card-copy">
                    <strong>打开控制面板</strong>
                    <span>连接与行为设置、运行状态、消息记录都在面板中。</span>
                </div>
                <button class="wb-btn" type="button" @click="shell.openPanel()">打开</button>
            </div>
        </section>

        <template v-if="isPanel">
            <section class="wb-settings-group">
                <header class="wb-group-header">
                    <h3>连接</h3>
                </header>
                <div class="wb-settings-card wb-card-col">
                    <div class="wb-card-copy">
                        <strong>桥接服务地址</strong>
                        <span>本地 bridge 服务，默认 8080。</span>
                    </div>
                    <input v-model="bridgeUrl" class="wb-control" type="text" placeholder="http://127.0.0.1:8080" />
                </div>
                <div class="wb-settings-card wb-card-col">
                    <div class="wb-card-copy">
                        <strong>轮询间隔（毫秒）</strong>
                        <span>扩展读取桥接队列的频率。</span>
                    </div>
                    <input v-model="pollIntervalMs" class="wb-control" type="number" min="1000" step="500" />
                </div>
            </section>

            <section class="wb-settings-group">
                <header class="wb-group-header">
                    <h3>行为</h3>
                </header>
                <div class="wb-settings-card wb-card-col">
                    <div class="wb-card-copy">
                        <strong>忙碌时收到新消息</strong>
                        <span>生成进行中时，对新的微信消息的处理方式。</span>
                    </div>
                    <select v-model="busyPolicy" class="wb-control">
                        <option value="discard">丢弃（默认）</option>
                        <option value="queue">排队，生成结束后处理</option>
                    </select>
                </div>
                <div class="wb-settings-card wb-card-col">
                    <div class="wb-card-copy">
                        <strong>忙碌提示文案</strong>
                        <span>丢弃模式下回给微信的提示。</span>
                    </div>
                    <input v-model="busyReplyText" class="wb-control" type="text" />
                </div>
                <div class="wb-settings-card wb-card-col">
                    <div class="wb-card-copy">
                        <strong>回发时机</strong>
                        <span>决定在生成流程的哪一步把回复发往微信。</span>
                    </div>
                    <select v-model="sendTiming" class="wb-control">
                        <option value="afterCommands">正则/命令处理后立即发送（默认）</option>
                        <option value="generationEnded">生成完全结束后发送</option>
                    </select>
                </div>
                <label class="wb-settings-card">
                    <div class="wb-card-copy">
                        <strong>去除思维链标签</strong>
                        <span>发送前移除 think / reasoning 等标签内容。</span>
                    </div>
                    <input v-model="stripThoughtTags" type="checkbox" />
                </label>
            </section>
        </template>
    </div>
</template>

<style scoped>
.wb-settings-pane { display: flex; flex-direction: column; gap: 18px; color: var(--wb-text); }
.wb-settings-header { display: flex; flex-direction: column; gap: 6px; }
.wb-settings-title { margin: 0; font-size: 20px; }
.wb-settings-description {
    margin: 0;
    max-width: 64ch;
    color: var(--wb-text-muted);
    font-size: 13px;
    line-height: 1.55;
}

.wb-settings-group { display: flex; flex-direction: column; gap: 10px; }
.wb-group-header h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.wb-settings-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 14px 16px;
    border: 1px solid var(--wb-border);
    border-radius: 10px;
    background: var(--wb-bg-1);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.wb-settings-card:hover {
    background: var(--wb-surface-hover);
    border-color: var(--wb-border-strong);
}

.wb-card-master { background: var(--wb-bg-0); }
.wb-card-col { flex-direction: column; align-items: stretch; cursor: default; }
.wb-card-copy { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.wb-card-copy strong { font-size: 14px; font-weight: 600; }
.wb-card-copy span { color: var(--wb-text-muted); font-size: 12px; line-height: 1.45; }

.wb-appearance-toggle {
    display: inline-flex;
    gap: 6px;
    padding: 4px;
    border: 1px solid var(--wb-border);
    border-radius: 999px;
    background: var(--wb-bg-0);
    flex-shrink: 0;
}

.wb-appearance-option {
    min-width: 78px;
    padding: 7px 12px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;
    color: var(--wb-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.wb-appearance-option:hover { background: var(--wb-surface-hover); color: var(--wb-text); }
.wb-appearance-option.active {
    border-color: var(--wb-border-strong);
    background: var(--wb-surface-active);
    color: var(--wb-text);
}

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

@media (max-width: 760px) {
    .wb-settings-card { align-items: flex-start; }
    .wb-appearance-toggle { flex: 0 1 160px; }
}
</style>