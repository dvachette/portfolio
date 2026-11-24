<script setup lang="ts">
import { computed, ref } from 'vue'

interface CompetenceLevelProps {
    level_title: string
    level: number
    max: number
    /**
     * When true, the indicator is a button whose tooltip toggles on tap (touch friendly).
     * Keep false inside links/cards: the tooltip then only shows on hover/focus of the card.
     */
    interactive?: boolean
}
const { level, max, level_title, interactive = false } = defineProps<CompetenceLevelProps>()

const open = ref(false)
const color = computed(() => `hsl(${level * (100 / max)}, 100%, 50%)`)
const label = computed(() => `Niveau ${level}/${max} : ${level_title}`)
</script>

<template>
    <button
        v-if="interactive"
        type="button"
        :class="['competence', { 'competence--open': open }]"
        :aria-label="label"
        :aria-expanded="open"
        @click.stop="open = !open"
        @blur="open = false"
    >
        <span class="competence_level" :style="{ backgroundColor: color }" />
        <span class="popup" role="tooltip">{{ level_title }}</span>
    </button>
    <span v-else class="competence" role="img" :aria-label="label">
        <span class="competence_level" :style="{ backgroundColor: color }" />
        <span class="popup" aria-hidden="true">{{ level_title }}</span>
    </span>
</template>

<style scoped>
/* The level indicator is a colored circle, from red (low) to green (high). */
.competence {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
}

button.competence {
    /* Comfortable touch target around the 20px dot */
    width: 2.75rem;
    height: 2.75rem;
    cursor: pointer;
}

.competence_level {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.popup {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 20;
    width: max-content;
    max-width: 14rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    background-color: var(--color-surface-solid);
    box-shadow: var(--shadow-card);
    color: #fff;
    font-size: 0.9rem;
    font-weight: normal;
    text-align: left;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
}

.competence:hover .popup,
.competence:focus-visible .popup,
.competence--open .popup {
    visibility: visible;
    opacity: 1;
}
</style>
