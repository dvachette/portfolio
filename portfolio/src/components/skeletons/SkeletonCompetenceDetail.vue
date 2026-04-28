<template>
    <div class="competence_detail">
        <div class="competence_detail__header">
            <div class="header_left">
                <SkeletonBlock width="32px" height="32px" border-radius="50%" />
                <SkeletonBlock width="200px" height="28px" border-radius="4px" />
            </div>
        </div>
        <div class="body">
            <SkeletonBlock width="90%" height="16px" border-radius="4px" />
            <SkeletonBlock width="75%" height="16px" border-radius="4px" />
            <SkeletonBlock width="60%" height="16px" border-radius="4px" />
            <SkeletonBlock width="100%" height="12px" border-radius="4px" style="margin-top: 1em" />
            <div class="projects">
                <SkeletonBlock v-for="i in 3" :key="i" width="180px" height="120px" border-radius="8px" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SkeletonBlock from './SkeletonBlock.vue'
</script>

<style scoped>
.competence_detail {
    border-radius: 8px;
    background-color: #444757;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    overflow: hidden;
}
.competence_detail__header {
    display: flex;
    align-items: center;
    background-color: #333;
    padding: 1em 1.5em;
}
.header_left {
    display: flex;
    align-items: center;
    gap: 1em;
}
.body {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    padding: 1.5em;
}
.projects {
    display: flex;
    gap: 1em;
    margin-top: 1em;
    flex-wrap: wrap;
}
</style>