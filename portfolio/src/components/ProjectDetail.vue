<script setup lang="ts">
import type { ProjectModel } from '@/models/ProjectModel'
import LanguageTag from './LanguageTag.vue'
import ProjectCompetenceCard from './ProjectCompetenceCard.vue'
import { useRouter } from 'vue-router'
import { useProjectService } from '@/services/ProjectService'
import { ref, watch } from 'vue'
import ProjectTypeLabel from './ProjectTypeLabel.vue'
import SkeletonProjectDetail from './skeletons/SkeletonProjectDetail.vue'
import BaseModal from './BaseModal.vue'

const router = useRouter()
const props = defineProps<{ id: string }>()
const projectService = useProjectService()
const project = ref<ProjectModel | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const base = import.meta.env.BASE_URL

async function loadData(id: string): Promise<void> {
    loading.value = true
    error.value = null
    project.value = null
    try {
        project.value = await projectService.getProjectById(id)
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
}

watch(
    () => props.id,
    (id) => void loadData(id),
    { immediate: true },
)

function onClosed(): void {
    void router.push({ name: 'projects' })
}
</script>
<template>
    <BaseModal @closed="onClosed">
        <template #title>
            <template v-if="project">
                <ProjectTypeLabel :project-type="project.projectType" interactive />
                <h1>{{ project.title }}</h1>
            </template>
        </template>

        <p v-if="error" class="project_detail__error">{{ error }}</p>
        <template v-else-if="project">
            <div class="project_detail__content">
                <div class="project_detail_content__text">
                    <div class="project_detail__languages">
                        <LanguageTag
                            v-for="language in project.programmingLanguages"
                            :key="language"
                            :language="language"
                        />
                    </div>
                    <p>{{ project.description }}</p>
                    <div class="project_detail_content__links">
                        <a
                            v-if="project.sourceCodeLink"
                            :href="project.sourceCodeLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Voir le code source</a
                        >
                        <a
                            v-if="project.liveDemoLink"
                            :href="project.liveDemoLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Voir la démo en ligne</a
                        >
                    </div>
                </div>

                <div class="project_detail_content__image">
                    <img :src="`${base}images/projects/${project.image}`" :alt="project.title" />
                </div>
            </div>
            <div v-if="project.competences?.length" class="project_detail__competences">
                <h2>Compétences utilisées</h2>
                <ProjectCompetenceCard
                    v-for="competence in project.competences"
                    :key="competence.id"
                    :competence="competence"
                />
            </div>
        </template>
        <SkeletonProjectDetail v-else-if="loading" />
    </BaseModal>
</template>
<style scoped>
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
.project_detail__error {
    padding: 1em;
    color: #f88;
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

@media (max-width: 800px) {
    .project_detail__content {
        flex-direction: column;
    }
    .project_detail_content__image {
        width: 100%;
        height: fit-content;
    }
    .project_detail_content__image img {
        width: 100%;
    }
}
</style>
