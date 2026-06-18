<template>
    <div class="skeleton-block" :style="{ width, height, borderRadius }" />
</template>

<script setup lang="ts">
defineProps<{
    width?: string
    height?: string
    borderRadius?: string
}>()
</script>

<style scoped>
.skeleton-block {
    background: linear-gradient(90deg, #2e2e2e 25%, #3a3a3a 50%, #2e2e2e 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
</style>