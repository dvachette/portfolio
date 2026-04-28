<template>
    <div class="project-detail">
        <div class="project_detail__header">
            <SkeletonBlock width="80px" height="24px" border-radius="4px" />
            <SkeletonBlock width="220px" height="28px" border-radius="4px" />
        </div>
        <div class="project_detail__content">
            <div class="text">
                <div class="languages">
                    <SkeletonBlock v-for="i in 3" :key="i" width="60px" height="24px" border-radius="12px" />
                </div>
                <SkeletonBlock width="100%" height="14px" border-radius="4px" />
                <SkeletonBlock width="90%" height="14px" border-radius="4px" />
                <SkeletonBlock width="80%" height="14px" border-radius="4px" />
            </div>
            <SkeletonBlock width="40%" height="180px" border-radius="8px" />
        </div>
        <div class="competences">
            <SkeletonBlock width="160px" height="20px" border-radius="4px" />
            <div class="competences_list">
                <SkeletonBlock v-for="i in 3" :key="i" width="140px" height="36px" border-radius="6px" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SkeletonBlock from './SkeletonBlock.vue'
</script>

<style scoped>
.project-detail {
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
.project_detail__header {
    display: flex;
    align-items: center;
    gap: 1em;
    background-color: #333;
    padding: 1em 1.5em;
}
.project_detail__content {
    display: flex;
    gap: 1em;
    padding: 1em 1.5em;
}
.text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
}
.languages {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
}
.competences {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    padding: 0 1.5em;
}
.competences_list {
    display: flex;
    gap: 0.75em;
    flex-wrap: wrap;
}
</style>