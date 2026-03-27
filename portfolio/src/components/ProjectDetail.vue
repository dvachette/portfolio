<script setup lang="ts">
import type { ProjectModel } from '@/models/ProjectModel'
import LanguageTag from './LanguageTag.vue'
import ProjectCompetenceCard from './ProjectCompetenceCard.vue'
import { useRouter } from 'vue-router'
import { useProjectService } from '@/services/ProjectService'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import type { UEModel } from '@/models/UEModel'

const router = useRouter()
const projectService = useProjectService()
const projectId = ref(router.currentRoute.value.params.id as string)
const project = ref<ProjectModel>(projectService.getProjectById(projectId.value))

const modalRef = ref<HTMLElement | null>(null)
const scrollRatio = ref(0) // 0 = haut, 1 = tout en bas

const base = import.meta.env.BASE_URL

function closeDetail() {
    router.push({ name: 'projects' })
}
function goToCompetence(competence: UEModel) {
    router.push({ name: 'competence-details', params: { id: competence.id } })
}

watch(
    () => router.currentRoute.value.params.id,
    (newId) => {
        projectId.value = newId as string
        project.value = projectService.getProjectById(projectId.value)
        console.log('Route changed, new project ID:', projectId.value)
        console.log('Fetched new project:', project.value)
    },
)

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
    <div class="project-detail" ref="modalRef">
        <div class="project_detail__header">
            <h1>{{ project.title }}</h1>
            <span class="close-button" @click="closeDetail">&Cross;</span>
        </div>
        <div class="project_detail__content">
            <div class="project_detail_content__text">
                <div class="project_detail__languages">
                    <LanguageTag
                        :language="language"
                        v-for="language in project.programmingLanguages"
                        :key="language"
                    />
                </div>
                <p>{{ project.description }}</p>
                <div class="project_detail_content__links">
                    <a :href="project.sourceCodeLink" target="_blank" v-if="project.sourceCodeLink"
                        >Voir le code source</a
                    >
                    <a :href="project.liveDemoLink" target="_blank" v-if="project.liveDemoLink"
                        >Voir la démo en ligne</a
                    >
                </div>
            </div>

            <div class="project_detail_content__image">
                <img :src="`${base}images/${project.image}`" alt="Project image" />
            </div>
        </div>
        <div
            class="project_detail__competences"
            v-if="project.competences && project.competences.length > 0"
        >
            <h2>Compétences utilisées</h2>
            <ProjectCompetenceCard
                v-for="competence in project.competences"
                :key="competence.id"
                :competence="competence"
                @select="goToCompetence"
            />
        </div>
        <span class="scroll-arrow" :style="{ opacity: scrollRatio }" aria-hidden="true">▼</span>
    </div>
</template>
<style scoped>
.project-detail {
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
.project-detail::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
}
.project-detail:hover {
    box-shadow: 0px 0px 18px rgba(175, 175, 175, 0.8);
}
.project_detail__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
.project_detail__content {
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 1em;
}
.project_detail_content__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 1.1em;
    gap: 0.5em;
    color: #ddd;
}
.project_detail_content__image {
    width: 40%;
    height: fit-content;
    overflow: hidden;
    border-radius: 8px;
}
.project_detail_content__image img {
    width: 90%;
    height: 50%;
    object-fit: cover;
    object-position: center;
}
.project_detail__competences {
    padding: 1em;
}
.project_detail__competences h2 {
    font-size: 1.5em;
    color: #eee;
    margin-bottom: 0.5em;
}
.project_detail__languages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 1em;
}
.project_detail_content__links {
    display: flex;
    gap: 1em;
    margin-top: 1em;
}
.project_detail_content__links a {
    color: #42b883;
    text-decoration: none;
    font-weight: bold;
}
.project_detail_content__links a:hover {
    text-decoration: underline;
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
