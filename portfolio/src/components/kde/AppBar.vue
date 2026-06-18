<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { useKdeWindowsStore } from '@/stores/kde/appsStore';

const store = useKdeWindowsStore();

function handleAppClick(appId: string): void {
    const win = store.windows.find(w => w.metaData.id === appId);
    if (!win) return;

    if (win.minimized) {
        store.unminimize(appId);
        return;
    }

    const maxZ = store.windows.reduce((acc, w) => Math.max(acc, w.zIndex), 0);
    if (win.zIndex === maxZ) {
        store.minimize(appId);
    } else {
        store.focus(appId);
    }
}
</script>

<template>
    <div class="app-bar">
        <AppIcon
            v-for="app in store.windows"
            :key="app.metaData.id"
            :app="app.metaData"
            :minimized="app.minimized"
            @appClicked="handleAppClick"
        />
    </div>
</template>

<style scoped lang="scss">
.app-bar {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    background-color: #111;
    padding: 0.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}
</style>