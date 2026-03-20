<script setup lang="ts">
import { useProjectService } from '@/services/ProjectService'
import { ref } from 'vue'
import type { ProjectModel } from '@/models/ProjectModel'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectDetail from '@/components/ProjectDetail.vue'

const projectService = useProjectService()
const projects = ref<ProjectModel[]>([])
const selectedProject = ref<ProjectModel | null>(null)

projects.value = projectService.getProjectTab()

function selectProject(project: ProjectModel) {
    selectedProject.value = project
}

function unselectProject() {
    selectedProject.value = null
}

// Handle escape key to close the project detail
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        unselectProject()
    }
})
</script>
<template>
    <h1>Mes projets</h1>
    <div class="projects-list">
        <ProjectCard
            v-for="project in projects"
            :key="project.title"
            :project="project"
            @select="selectProject"
        />
    </div>
    <ProjectDetail v-if="selectedProject" :project="selectedProject" @close="unselectProject" />
</template>
<style scoped>
.projects-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
}
h1 {
    font-size: 2.3em;
    color: #eee;
    font-family: monospace;
}
@media (max-width: 600px) {
    .projects-list {
        flex-direction: column;
        align-items: center;
    }
}
</style>
