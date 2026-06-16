<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useSkillsService } from '@/services/SkillsService.ts'
import { useProjectService } from '@/services/ProjectService'
import type { SkillModel } from '@/models/SkillModel'
import type { ProjectModel } from '@/models/ProjectModel'
import CompetenceLevel from './CompetenceLevel.vue'
import ProjectCard from './ProjectCard.vue'
import CompetenceLevelCard from './CompetenceLevelCard.vue'
import LevelProgressBar from './LevelProgressBar.vue'
import SkeletonCompetenceDetail from './skeletons/SkeletonCompetenceDetail.vue'

const base = import.meta.env.BASE_URL

const router = useRouter()
const route = useRoute()
const ueService = useSkillsService()
const projectService = useProjectService()


const competenceId = ref(route.params.id as string)
const competence = ref<SkillModel | null>(null)
const projects = ref<ProjectModel[]>([])
const selectedLevel = ref(1)
const loading = ref(true)
const error = ref<string | null>(null)
const modalRef = ref<HTMLElement | null>(null)
const scrollRatio = ref(0)
const CLOSE_ANIMATION_DURATION = 300 // Durée de l'animation de fermeture en ms
const isClosing = ref(false)


async function loadData(id: string): Promise<void> {
    competence.value = null
    projects.value = []
    loading.value = true
    error.value = null
    try {
        const [ue, projs] = await Promise.all([
            ueService.getSkillById(id),
            projectService.getProjectsByCompetenceId(id),
        ])
        competence.value = ue
        projects.value = projs
        selectedLevel.value = ue.level || 1
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
}

watch(() => route.params.id, async function(newId) {
    competenceId.value = newId as string
    await loadData(competenceId.value)
})

onMounted(async function() {
    modalRef.value?.addEventListener('scroll', onScroll)
    document.addEventListener('keydown', onKeyDown)
    onScroll()
    await loadData(competenceId.value)
})

onUnmounted(function() {
    modalRef.value?.removeEventListener('scroll', onScroll)
    document.removeEventListener('keydown', onKeyDown)
})

function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        goBack()
    }
}

function goBack() {
    if (isClosing.value) return
    isClosing.value = true
    setTimeout(() => {
        void router.push('/competences')
    }, CLOSE_ANIMATION_DURATION)
}

function selectLevel(level: number) {
    selectedLevel.value = level
}

function onScroll() {
    const el = modalRef.value
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    scrollRatio.value = Math.min(remaining / 80, 1)
}
</script>

<template>
    <span v-if="error">{{ error }}</span>  
    <div
        v-else-if="competence || loading" 
        class="competence_detail"
        ref="modalRef"
        :class="{ 'competence_detail--closing': isClosing }"
    >
        <template v-if="competence">
            <div class="competence_detail__header">
                <div class="competence_level_container">
                    <CompetenceLevel
                        :level="competence!.level"
                        :max="competence!.levels.length"
                        :level_title="competence.levels.find((l) => l.level === competence!.level)!.levelName"
                        class="competence_level"
                    />
                    <h1 class="competence_detail__name">{{ competence!.name }}</h1>
                </div>
                <span class="close-button" @click="goBack">&Cross;</span>
            </div>
            <div class="competence_detail__content">
                <div>
                    <p class="competence_detail__description">{{ competence!.description }}</p>
                    <ul class="competence_detail__explaination">
                        <li v-for="(detail, index) in competence!.details" :key="index" class="competence_detail__explaination_item">
                            {{ detail.name }}
                        </li>
                    </ul>
                </div>
                <img
                    v-if="competence!.image"
                    :src="competence!.image.startsWith('http') ? competence!.image : `${base}assets/${competence!.image}`"
                    alt="Competence image"
                    class="skill-img"
                />
            </div>    
            <div class="competence_detail__details">
                <LevelProgressBar
                    :level="competence!.level"
                    :max="competence!.levels.length"
                    @levelSelected="selectLevel"
                />
                <div class="competence_detail__details_list">
                    <CompetenceLevelCard
                        :skill-level="competence!.levels.find((lvl) => lvl.level === selectedLevel)!"
                        :level="selectedLevel"
                    />
                </div>
            </div>
            <template v-if="projects.length > 0">
                <h2>Projets associés</h2>
                <div class="competence_detail__projects">
                    <ProjectCard
                        v-for="project in projects"
                        :key="project.title"
                        :project="project"
                        @select="(selectedProject) => router.push(`/projects/${selectedProject.id}`)"
                    />
                </div>
            </template> 
            <span class="scroll-arrow" :style="{ opacity: scrollRatio }" aria-hidden="true">▼</span>
        </template>
        <SkeletonCompetenceDetail v-else-if="loading" />
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
    animation: zoomAtOpen 0.3s ease;
}
@keyframes zoomAtOpen {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

@keyframes zoomAtClose {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
}
.competence_detail--closing {
    animation: zoomAtClose 0.3s ease forwards;
    pointer-events: none;
}
.competence_detail::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
.competence_detail:hover {
    box-shadow: 0px 0px 18px rgba(175, 175, 175, 0.8);
}
.competence_detail__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
}
.competence_detail__content img {
    max-width: 200px;
    max-height: 200px;
    margin-left: 20px;
    border-radius: 8px;
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
    color: #bbb;
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
.competence_detail__explaination {
    list-style-type: disc;
    padding-left: 40px;
    color: #aaa;
    font-size: 1.1em;
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

@media (max-width: 800px) {
    .competence_detail {
        width: 90vw;
        height: 80vh;
    }
    .competence_detail__content {
        flex-direction: column;
        align-items: center;
    }
    .competence_detail__content img {
        margin-left: 0;
        margin-top: 20px;
    }
}
@media (max-width: 500px) {
    .competence_detail {
        width: 95vw;
        height: 85vh;
    }
    .competence_detail__content {
        flex-direction: column;
        align-items: center;
    }
    .competence_detail__content img {
        margin-left: 0;
        margin-top: 20px;
    }
}
</style>
