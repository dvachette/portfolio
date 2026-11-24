<script setup lang="ts">
import type { ProjectModel } from '@/models/ProjectModel'
import LanguageTag from './LanguageTag.vue'
import ProjectTypeLabel from './ProjectTypeLabel.vue'
const base = import.meta.env.BASE_URL
const { project } = defineProps<{ project: ProjectModel }>()
</script>
<template>
    <RouterLink class="project_card" :to="{ name: 'project-details', params: { id: project.id } }">
        <div class="project_card__text">
            <div class="project_card__header">
                <ProjectTypeLabel :projectType="project.projectType" />
                <h2>{{ project.title }}</h2>
            </div>
            <div class="languages">
                <LanguageTag
                    :language="language"
                    v-for="language in project.programmingLanguages"
                    :key="language"
                />
            </div>
            <p>
                {{
                    project.description.length > 100
                        ? project.description.substring(0, 100) + '...'
                        : project.description
                }}
            </p>
        </div>
        <div class="project_card__image">
            <img :src="`${base}images/projects/${project.image}`" :alt="project.title" loading="lazy" />
        </div>
    </RouterLink>
</template>
<style scoped>
.project_card {
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 1em;
    border-radius: 8px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    background-color: #333c;
    max-width: 500px;
    transition:
        transform 0.2s,
        background-color 0.2s;
}
div.project_card__text h2 {
    margin: 0;
    color: #eee;
}
.project_card__header {
    display: flex;
    align-items: center;
    gap: 0.5em;
}
.project_card__text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    color: #aaa;
    font-weight: bold;
}
.project_card__image {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
}
.project_card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.languages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}
@media (hover: hover) {
    .project_card:hover {
        transform: scale(1.03);
        background-color: #444c;
    }
}
.project_card:active {
    background-color: #444c;
}

@media (max-width: 600px) {
    .project_card {
        flex-direction: column;
    }
    .project_card__image {
        width: 100%;
        height: auto;
    }
}
</style>
