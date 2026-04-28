<template>
    <div class="projects-list">
        <SkeletonBlock v-for="i in 6" :key="i" width="200px" height="160px" border-radius="8px" />
    </div>
</template>

<script setup lang="ts">
import SkeletonBlock from './SkeletonBlock.vue'
</script>

<style scoped>
.projects-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
}
</style>