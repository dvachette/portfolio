<template>
    <div class="competences">
        <SkeletonBlock v-for="i in 6" :key="i" width="180px" height="100px" border-radius="8px" />
    </div>
</template>

<script setup lang="ts">
import SkeletonBlock from './SkeletonBlock.vue'
</script>

<style scoped>
.competences {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>