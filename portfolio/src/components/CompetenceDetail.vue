<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, shallowRef, watch } from 'vue'
import { useAsyncData } from '@/composables/useAsyncData'
import { useSkillsService } from '@/services/SkillsService'
import { useProjectService } from '@/services/ProjectService'
import CompetenceLevel from './CompetenceLevel.vue'
import ProjectCard from './ProjectCard.vue'
import CompetenceLevelCard from './CompetenceLevelCard.vue'
import LevelProgressBar from './LevelProgressBar.vue'
import SkeletonCompetenceDetail from './skeletons/SkeletonCompetenceDetail.vue'
import BaseModal from './BaseModal.vue'

const base = import.meta.env.BASE_URL

const router = useRouter()
const props = defineProps<{ id: string }>()
const skillsService = useSkillsService()
const projectService = useProjectService()

const { data, pending: loading, error } = useAsyncData(
    () =>
        Promise.all([
            skillsService.getSkillById(props.id),
            projectService.getProjectsByCompetenceId(props.id),
        ]),
    { watch: () => props.id },
)
const competence = computed(() => data.value?.[0] ?? null)
const projects = computed(() => data.value?.[1] ?? [])

/** Level whose details are displayed; defaults to the level reached */
const selectedLevel = shallowRef(1)
watch(competence, (value) => {
    if (value) selectedLevel.value = value.level || 1
})

const currentLevelName = computed(
    () => competence.value?.levels.find((l) => l.level === competence.value?.level)?.levelName ?? '',
)
const selectedSkillLevel = computed(() =>
    competence.value?.levels.find((lvl) => lvl.level === selectedLevel.value),
)

function onClosed(): void {
    void router.push({ name: 'competences' })
}
</script>

<template>
    <BaseModal @closed="onClosed">
        <template #title>
            <template v-if="competence">
                <CompetenceLevel
                    :level="competence.level"
                    :max="competence.levels.length"
                    :level_title="currentLevelName"
                    interactive
                />
                <h1>{{ competence.name }}</h1>
            </template>
        </template>

        <p v-if="error" class="competence_detail__error" role="alert">{{ error }}</p>
        <template v-else-if="competence">
            <div class="competence_detail__content">
                <div>
                    <p class="competence_detail__description">{{ competence.description }}</p>
                    <ul class="competence_detail__explaination">
                        <li
                            v-for="detail in competence.details"
                            :key="detail.id"
                            class="competence_detail__explaination_item"
                        >
                            {{ detail.name }}
                        </li>
                    </ul>
                </div>
                <img
                    v-if="competence.image"
                    :src="
                        competence.image.startsWith('http')
                            ? competence.image
                            : `${base}assets/${competence.image}`
                    "
                    alt=""
                    class="skill-img"
                />
            </div>
            <div class="competence_detail__details">
                <LevelProgressBar
                    :level="competence.level"
                    :max="competence.levels.length"
                    :selected="selectedLevel"
                    @level-selected="selectedLevel = $event"
                />
                <div class="competence_detail__details_list">
                    <CompetenceLevelCard
                        v-if="selectedSkillLevel"
                        :skill-level="selectedSkillLevel"
                        :level="selectedLevel"
                    />
                </div>
            </div>
            <template v-if="projects.length > 0">
                <h2>Projets associés</h2>
                <div class="competence_detail__projects">
                    <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
                </div>
            </template>
        </template>
        <SkeletonCompetenceDetail v-else-if="loading" />
    </BaseModal>
</template>
<style scoped>
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
.competence_detail__error {
    padding: 20px;
    color: #f88;
}
.competence_detail__description {
    font-size: 1.2em;
    color: #bbb;
    margin: 20px;
}
h2 {
    font-size: 1.5em;
    color: #eee;
    margin: 20px;
}
.competence_detail__projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
    gap: 20px;
    padding: 20px;
}

.competence_detail__details_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
}
.competence_detail__explaination {
    list-style-type: disc;
    padding-left: 40px;
    color: #aaa;
    font-size: 1.1em;
}

@media (max-width: 800px) {
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
