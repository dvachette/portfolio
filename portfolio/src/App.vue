<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FloatingLines from '@/components/FloatingLines/FloatingLines.vue'
</script>

<template>
    <HeaderComponent />
    <main>
        <FloatingLines
            :enabled-waves="['top', 'middle', 'bottom']"
            :line-count="[10, 15, 20]"
            :line-distance="[8, 6, 4]"
            :bend-radius="5.0"
            :bend-strength="-0.5"
            :interactive="true"
            :parallax="true"
            id="lines"
        />
        <RouterView />
    </main>
</template>

<style scoped>
main {
    padding: 2em;
}
#lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>
