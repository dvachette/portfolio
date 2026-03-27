<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useUEService } from '@/services/UEService'
import CompetenceLevel from './CompetenceLevel.vue'
import { useProjectService } from '@/services/ProjectService'
import ProjectCard from './ProjectCard.vue'
import CompetenceLevelCard from './CompetenceLevelCard.vue'
import LevelProgressBar from './LevelProgressBar.vue'
const router = useRouter()
const route = useRoute()
const ueService = useUEService()
const projectService = useProjectService()
const competenceId = ref(route.params.id)

const competence = ref(ueService.getUEById(competenceId.value as string))
const projects = ref(projectService.getProjectsByCompetenceId(competenceId.value as string))
const selectedLevel = ref(competence.value.level || 1)
const modalRef = ref<HTMLElement | null>(null)
const scrollRatio = ref(0) // 0 = haut, 1 = tout en bas

watch(
    () => route.params.id,
    (newId) => {
        competenceId.value = newId as string
        competence.value = ueService.getUEById(competenceId.value)
        projects.value = projectService.getProjectsByCompetenceId(competenceId.value)
        selectedLevel.value = competence.value.level || 1
    },
)
function goBack() {
    router.push('/competences')
}

function selectLevel(level: number) {
    selectedLevel.value = level
}

function onScroll() {
    const el = modalRef.value
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    // fade sur les derniers 80px
    scrollRatio.value = Math.min(remaining / 80, 1)
}

onMounted(() => {
    modalRef.value?.addEventListener('scroll', onScroll)
    onScroll() // init
})

onUnmounted(() => {
    modalRef.value?.removeEventListener('scroll', onScroll)
})
</script>
<template>
    <div class="competence_detail" ref="modalRef">
        <div class="competence_detail__header">
            <div class="competence_level_container">
                <CompetenceLevel
                    :level="competence.level"
                    :max="competence.levels.length"
                    class="competence_level"
                />
                <h1 class="competence_detail__name">{{ competence.name }}</h1>
            </div>
            <span class="close-button" @click="goBack">&Cross;</span>
        </div>
        <p class="competence_detail__description">{{ competence.description }}</p>
        <div class="competence_detail__details">
            <LevelProgressBar
                :level="competence.level"
                :max="competence.levels.length"
                @levelSelected="selectLevel"
            />
            <div class="competence_detail__details_list">
                <CompetenceLevelCard
                    :UELevel="competence.levels.find((lvl) => lvl.level === selectedLevel)!"
                    :level="selectedLevel"
                />
            </div>
        </div>
        <h2 v-if="projects.length > 0">Projets associés</h2>
        <div v-if="projects.length > 0" class="competence_detail__projects">
            <ProjectCard
                v-for="project in projects"
                :key="project.title"
                :project="project"
                @select="(selectedProject) => router.push(`/projects/${selectedProject.id}`)"
            />
        </div>
        <span class="scroll-arrow" :style="{ opacity: scrollRatio }" aria-hidden="true">▼</span>
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
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

.competence_detail__details_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
}
.scroll-arrow {
    position: sticky;
    bottom: 12px;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1.6em;
    color: #ccc;
    pointer-events: none;
    transition: opacity 0.3s ease;
    animation: bounce 1.2s infinite ease-in-out;
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(6px);
    }
}
</style>
