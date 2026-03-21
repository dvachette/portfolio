<script setup lang="ts">
import type { ProjectModel } from '@/models/ProjectModel'
import LanguageTag from './LanguageTag.vue'
const base = import.meta.env.BASE_URL
const { project } = defineProps<{ project: ProjectModel }>()
const emit = defineEmits(['select'])
</script>
<template>
    <div class="project_card" @click="emit('select', project)">
        <div class="project_card__text">
            <h2>{{ project.title }}</h2>
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
            <img :src="`${base}images/${project.image}`" alt="Project image" />
        </div>
    </div>
</template>
<style scoped>
.project_card {
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 1em;
    border-radius: 8px;
    cursor: pointer;
    background-color: #333c;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    max-width: 500px;
    transition:
        transform 0.2s,
        background-color 0.2s;
}
div.project_card__text h2 {
    margin: 0;
    color: #eee;
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
.project_card:hover {
    transform: scale(1.03);
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
