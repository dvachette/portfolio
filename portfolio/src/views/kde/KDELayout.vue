<script setup lang="ts">
import AppBar from '@/components/kde/AppBar.vue';
import KDEApp from '@/components/kde/KDEApp.vue';
import { useKdeWindowsStore } from '@/stores/kde/appsStore';

const store = useKdeWindowsStore();
</script>

<template>
    <main class="kde-layout">
        <KDEApp
            v-for="app in store.windows"
            v-show="!app.minimized"
            :key="app.metaData.id"
            v-model="store.windows[store.windows.indexOf(app)]!"
        />
    </main>
    <AppBar />
</template>
<style scoped lang="scss">
.kde-layout {
    overflow: hidden;
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1e1e1e;
    color: #eee;
    width: 100vw;
    &__title {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 2.5em;
        font-weight: bold;
        margin-bottom: 1rem;
    }
}
</style>