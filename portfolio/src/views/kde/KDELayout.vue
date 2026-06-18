<script setup lang="ts">
import AppBar from '@/components/kde/AppBar.vue';

</script>


<template>
    <main class="kde-layout">
        <h1 class="kde-layout__title">KDE Layout</h1>
    </main>
    <AppBar />
</template>
<style scoped lang="scss">
.kde-layout {
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