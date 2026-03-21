<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useCompetenceService } from '@/services/CompetenceService'
import CompetenceLevel from './CompetenceLevel.vue'
import { useProjectService } from '@/services/ProjectService'
import ProjectCard from './ProjectCard.vue'
const router = useRouter()
const route = useRoute()
const competenceService = useCompetenceService()
const projectService = useProjectService()
const competenceId = ref(route.params.id)

const competence = ref(competenceService.getCompetenceById(competenceId.value as string))
const projects = ref(projectService.getProjectsByCompetenceId(competenceId.value as string))
watch(
    () => route.params.id,
    (newId) => {
        competenceId.value = newId as string
        competence.value = competenceService.getCompetenceById(competenceId.value)
        projects.value = projectService.getProjectsByCompetenceId(competenceId.value)
    },
)
function goBack() {
    router.push('/competences')
}
</script>
<template>
    <div class="competence_detail">
        <div class="competence_detail__header">
            <div class="competence_level_container">
                <CompetenceLevel :level="competence.level" class="competence_level" />
                <h1 class="competence_detail__name">{{ competence.name }}</h1>
            </div>
            <span class="close-button" @click="goBack">&Cross;</span>
        </div>
        <p class="competence_detail__description">{{ competence.description }}</p>
        <h2 v-if="projects.length > 0">Projets associés</h2>
        <div v-if="projects.length > 0" class="competence_detail__projects">
            <ProjectCard
                v-for="project in projects"
                :key="project.title"
                :project="project"
                @select="(selectedProject) => router.push(`/projects/${selectedProject.id}`)"
            />
        </div>
    </div>
</template>
<style scoped>
.competence_detail {
    border: none;
    border-radius: 8px;
    background-color: #444757;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 2em;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 70vh;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    box-shadow: 0px 0px 8px rgba(175, 175, 175, 0.411);
    transition: all 0.3s ease;
}
.competence_detail::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
.competence_detail:hover {
    box-shadow: 0px 0px 18px rgba(175, 175, 175, 0.8);
}
.competence_detail__header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background-color: #333;
    margin: 0;
    width: 100%;
    z-index: 10;
}
.close-button {
    font-size: 2em;
    cursor: pointer;
    font-weight: bold;
    color: #ff0000;
    position: relative;
    top: 0;
    right: 1%;
    transition: font-size 0.3s ease;
}
.close-button:hover {
    font-size: 2.4em;
}
h1 {
    font-size: 2em;
    color: #eee;
    margin: 0;
    padding: 0.5em;
}
.competence_level_container {
    display: flex;
    padding-left: 20px;
    align-items: center;
}
.competence_detail__description {
    font-size: 1.2em;
    color: #aaa;
    margin: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
h2 {
    font-size: 1.5em;
    color: #eee;
    margin: 20px;
}
.competence_detail__projects {
    list-style: none;
    padding: 0 40px;
}
.competence_detail__projects li {
    margin: 10px 0;
}
.competence_detail__projects a {
    color: #66ccff;
    text-decoration: none;
    font-weight: bold;
}
.competence_detail__projects a:hover {
    text-decoration: underline;
}
</style>
