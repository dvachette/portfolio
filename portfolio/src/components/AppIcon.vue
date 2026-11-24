<script setup lang="ts">
import { computed } from 'vue'
import type { IconName } from '@/types/IconName'

// Lucide icons (ISC), vendored in src/assets/icons so the app does not depend on a CDN.
const sources = import.meta.glob<string>('../assets/icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
})
const icons: Record<string, string> = Object.fromEntries(
    Object.entries(sources).map(([path, svg]) => [
        path.split('/').pop()!.replace('.svg', ''),
        svg.replace(/<!--.*?-->/s, '').replace('<svg', '<svg aria-hidden="true" focusable="false"'),
    ]),
)

const { name } = defineProps<{ name: IconName }>()
// Trusted content: local files bundled at build time.
const svg = computed(() => icons[name] ?? '')
</script>

<template>
    <span class="app-icon" v-html="svg" />
</template>

<style scoped>
.app-icon {
    display: inline-flex;
    width: 1.15em;
    height: 1.15em;
    flex: none;
}
.app-icon :deep(svg) {
    width: 100%;
    height: 100%;
}
</style>
