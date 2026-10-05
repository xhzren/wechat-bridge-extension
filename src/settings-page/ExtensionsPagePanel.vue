<script setup lang="ts">
import { computed } from 'vue';
import { useBridge } from '../app/context';
import SettingsPane from '../settings/SettingsPane.vue';

const { appearance, settings } = useBridge();
const appearanceMode = computed(() => appearance.state.value);
const enabled = computed(() => settings.value.enabled);
</script>

<template>
  <div class="inline-drawer wide100p wb-settings-drawer">
    <div class="inline-drawer-toggle inline-drawer-header">
      <div class="wb-settings-drawer-header">
        <i class="fa-solid fa-comment-dots"></i>
        <b>WeChat Bridge</b>
      </div>
      <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
    </div>

    <div class="inline-drawer-content">
      <div
        class="wb-theme-root wb-settings-surface"
        :data-wb-appearance="appearanceMode"
      >
        <p v-if="!enabled" class="wb-disabled-hint">桥接当前已关闭。</p>
        <SettingsPane />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wb-settings-drawer { margin-bottom: 10px; }
.wb-settings-drawer-header { display: inline-flex; align-items: center; gap: 8px; }
.wb-settings-drawer-header i { color: var(--SmartThemeEmColor); font-size: 14px; }
.wb-settings-surface { padding: 6px 2px 2px; }
.wb-disabled-hint {
    margin: 0 0 12px;
    color: var(--wb-text-muted);
    font-size: 12px;
}
</style>