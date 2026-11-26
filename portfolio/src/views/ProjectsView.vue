<script setup lang="ts">
import { useProjectService } from '@/services/ProjectService'
import { useAsyncData } from '@/composables/useAsyncData'
import ProjectCard from '@/components/ProjectCard.vue'
import SkeletonBlock from '@/components/skeletons/SkeletonBlock.vue'

const projectService = useProjectService()
const { data: projects, pending, error } = useAsyncData(projectService.getProjectTab)
</script>
<template>
    <h1 class="projects-title">Mes projets</h1>
    <p v-if="error" class="projects-error" role="alert">{{ error }}</p>
    <div v-else class="projects-list" :aria-busy="pending">
        <template v-if="pending">
            <SkeletonBlock v-for="n in 4" :key="n" height="182px" border-radius="8px" />
        </template>
        <ProjectCard v-for="project in projects" v-else :key="project.id" :project="project" />
    </div>
    <RouterView />
</template>
<style scoped>
.projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 460px), 1fr));
    gap: 1em;
}
.projects-title {
    font-size: 2.5em;
    color: #eee;
    font-weight: bold;
    cursor: default;
}
.projects-error {
    background-color: var(--color-surface);
    padding: 1rem;
    border-radius: var(--radius-lg);
}
</style>
