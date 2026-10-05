<script setup lang="ts">
import { computed } from 'vue';
import FloatingBubble from './shell/bubble/FloatingBubble.vue';
import MainPanel from './shell/panel/MainPanel.vue';
import { useBridge } from './app/context';

const { shell, appearance, settings } = useBridge();
const appearanceMode = computed(() => appearance.state.value);
const enabled = computed(() => settings.value.enabled);
</script>

<template>
  <div class="wb-theme-root wb-shell-root" :data-wb-appearance="appearanceMode">
    <template v-if="enabled">
      <FloatingBubble />
      <Transition name="fade">
        <MainPanel v-if="shell.state.panelOpen" />
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.wb-shell-root { position: static; }
</style>