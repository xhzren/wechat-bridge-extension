/**
 * Dependency injection for the Vue tree.
 */
import { inject, provide, type InjectionKey, type Ref } from 'vue';
import type { createBridgeRuntime } from './bridge-runtime';
import type { ShellStore } from './shell-store';
import type { AppearanceStore } from './appearance-store';
import type { WechatBridgeSettings } from './settings';

export interface BridgeContext {
    runtime: ReturnType<typeof createBridgeRuntime>;
    settings: Ref<WechatBridgeSettings>;
    updateSettings: (patch: Partial<WechatBridgeSettings>) => void;
    shell: ShellStore;
    appearance: AppearanceStore;
}

export const BRIDGE_KEY: InjectionKey<BridgeContext> = Symbol('wechat-bridge');

export function provideBridge(context: BridgeContext): void {
    provide(BRIDGE_KEY, context);
}

export function useBridge(): BridgeContext {
    const ctx = inject(BRIDGE_KEY);
    if (!ctx) throw new Error('Bridge context missing');
    return ctx;
}