<script setup lang="ts">
import type { ProjectType } from '@/types/ProjectType'
import { computed, ref } from 'vue'

interface ProjectTypeLabelProps {
    projectType: ProjectType
    /**
     * When true, the icon is a button whose tooltip toggles on tap (touch friendly).
     * Keep false inside links/cards: the tooltip then only shows on hover.
     */
    interactive?: boolean
}
const { projectType, interactive = false } = defineProps<ProjectTypeLabelProps>()

const base = import.meta.env.BASE_URL
const open = ref(false)
const label = computed(() => {
    if (projectType === 'Academic') return 'Projet scolaire'
    if (projectType === 'Personal') return 'Projet personnel'
    return 'Type de projet inconnu'
})
const icon = computed(
    () => `${base}assets/${projectType === 'Academic' ? 'academic.png' : 'personal.png'}`,
)
</script>

<template>
    <button
        v-if="interactive"
        type="button"
        :class="['project_type', { 'project_type--open': open }]"
        :aria-label="label"
        :aria-expanded="open"
        @click.stop="open = !open"
        @blur="open = false"
    >
        <img :src="icon" alt="" class="project_type_icon" />
        <span class="popup" role="tooltip">{{ label }}</span>
    </button>
    <span v-else class="project_type">
        <img :src="icon" :alt="label" class="project_type_icon" />
        <span class="popup" aria-hidden="true">{{ label }}</span>
    </span>
</template>

<style scoped>
.project_type {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    padding: 0;
    border: none;
    background: none;
}

button.project_type {
    width: 2.75rem;
    height: 2.75rem;
    cursor: pointer;
}

.project_type_icon {
    width: 20px;
    height: 20px;
}

.popup {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 20;
    width: max-content;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface-solid);
    box-shadow: var(--shadow-card);
    color: #fff;
    font-size: 0.9rem;
    font-weight: normal;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
}

.project_type:hover .popup,
.project_type:focus-visible .popup,
.project_type--open .popup {
    visibility: visible;
    opacity: 1;
}
</style>
