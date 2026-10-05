/**
 * WeChat Bridge — TauriTavern extension entry.
 *
 * Layout mirrors the TauriTavern Creator Extension:
 *   shell/        floating bubble + full panel (sidebar + content)
 *   settings/     card-based settings pane, reused by shell and drawer
 *   settings-page/ Extensions-drawer surface
 *   features/     per-tab content views
 *   host/         the only place touching SillyTavern / TauriTavern APIs
 *   app/          runtime, stores, dependency injection
 */
import { createApp, type App as VueApp } from 'vue';
import App from './App.vue';
import ExtensionsPagePanel from './settings-page/ExtensionsPagePanel.vue';
import './style.css';
import { createBridgeRuntime } from './app/bridge-runtime';
import { BRIDGE_KEY, type BridgeContext } from './app/context';
import { createSettingsStore } from './app/settings-store';
import { createShellStore } from './app/shell-store';
import { createAppearanceStore } from './app/appearance-store';
import { getAgentToolsApi, getSillyTavernContext } from './host/api';
import { registerWechatTools } from './app/agent-tools';

const SHELL_ROOT_ID = 'wechat-bridge-shell-root';
const DRAWER_ROOT_ID = 'wechat-bridge-drawer-root';

let shellApp: VueApp<Element> | null = null;
let shellMount: HTMLDivElement | null = null;
let drawerApp: VueApp<Element> | null = null;
let drawerMount: HTMLDivElement | null = null;
let bridge: BridgeContext | null = null;

function waitForDocumentReady(): Promise<void> {
    if (document.readyState !== 'loading') return Promise.resolve();
    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    });
}

function createMount(id: string, parent: HTMLElement): HTMLDivElement {
    document.getElementById(id)?.remove();
    const el = document.createElement('div');
    el.id = id;
    parent.appendChild(el);
    return el;
}

function getExtensionsSettingsHost(): HTMLElement | null {
    return document.getElementById('extensions_settings2')
        ?? document.getElementById('extensions_settings');
}

async function waitForHostReady(): Promise<void> {
    const readyPromise = window.__TAURITAVERN__?.ready ?? window.__TAURITAVERN_MAIN_READY__;
    if (readyPromise) {
        try {
            await readyPromise;
        } catch {
            /* readiness failures are surfaced by the runtime itself */
        }
    }
}

function mountShell(): void {
    if (shellApp || !bridge) return;
    shellMount = createMount(SHELL_ROOT_ID, document.body);
    shellApp = createApp(App);
    shellApp.provide(BRIDGE_KEY, bridge);
    shellApp.mount(shellMount);
}

function mountDrawer(): void {
    if (drawerApp || !bridge) return;
    const hostEl = getExtensionsSettingsHost();
    if (!hostEl) {
        console.warn('[wechat-bridge] Extensions settings container unavailable; retrying.');
        setTimeout(mountDrawer, 1000);
        return;
    }
    drawerMount = createMount(DRAWER_ROOT_ID, hostEl);
    drawerMount.classList.add('extension_container');
    drawerApp = createApp(ExtensionsPagePanel);
    drawerApp.provide(BRIDGE_KEY, bridge);
    drawerApp.mount(drawerMount);
}

async function bootstrap(): Promise<void> {
    await waitForDocumentReady();
    await waitForHostReady();

    if (!getSillyTavernContext()) {
        console.warn('[wechat-bridge] SillyTavern context not ready yet; runtime will retry.');
    }

    const settingsStore = createSettingsStore();
    const runtime = createBridgeRuntime(settingsStore.state.value);
    const shell = createShellStore();
    const appearance = createAppearanceStore();

    bridge = {
        runtime,
        settings: settingsStore.state,
        shell,
        appearance,
        updateSettings(patch) {
            settingsStore.update(patch);
            runtime.applySettings(settingsStore.state.value);
        },
    };

    mountShell();
    mountDrawer();
    runtime.start();

    // Register Agent tools so chat runs and the in-app assistant can drive WeChat.
    const agentTools = getAgentToolsApi();
    if (agentTools) {
        try {
            await registerWechatTools(agentTools, () => settingsStore.state.value);
            console.info('[wechat-bridge] Agent tools registered (wechat.send / wechat.read / wechat.status).');
        } catch (err) {
            console.error('[wechat-bridge] Agent tool registration failed:', err);
        }
    } else {
        console.warn('[wechat-bridge] api.agent.tools unavailable; WeChat tools not registered.');
    }

    window.addEventListener(
        'pagehide',
        () => {
            runtime.dispose();
            shellApp?.unmount();
            shellMount?.remove();
            drawerApp?.unmount();
            drawerMount?.remove();
        },
        { once: true },
    );
}

void bootstrap();