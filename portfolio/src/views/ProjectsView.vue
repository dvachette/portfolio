<script setup lang="ts">
import { useProjectService } from '@/services/ProjectService'
import { ref, onMounted } from 'vue'
import type { ProjectModel } from '@/models/ProjectModel'
import ProjectCard from '@/components/ProjectCard.vue'
import { useRouter } from 'vue-router'
import SkeletonProjectsList from '@/components/skeletons/SkeletonProjectsList.vue'

const projectService = useProjectService()
const projects = ref<ProjectModel[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const router = useRouter()

onMounted(async function() {
    try {
        projects.value = await projectService.getProjectTab()
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
})

function selectProject(project: ProjectModel) {
    router.push({ path: `/projects/${project.id}` })
}
</script>
<template>
    <h1>Mes projets</h1>
    <SkeletonProjectsList v-if="loading" />
    <span v-else-if="error">{{ error }}</span>
    <div v-else class="projects-list">
        <ProjectCard
            v-for="project in projects"
            :key="project.title"
            :project="project"
            @select="selectProject"
        />
    </div>
    <RouterView />
</template>
<style scoped>
.projects-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
}
h1 {
    font-size: 2.5em;
    color: #eee;
    font-weight: bold;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: default;
}
@media (max-width: 600px) {
    .projects-list {
        flex-direction: column;
        align-items: center;
    }
}
</style>
