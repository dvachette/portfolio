<script setup lang="ts">
interface CompetenceLevelProps {
    level: number
    max: number
    /** Level whose details are currently displayed */
    selected?: number
}
const { level, max, selected } = defineProps<CompetenceLevelProps>()
const emit = defineEmits<{
    levelSelected: [level: number]
}>()

function selectLevel(level: number) {
    emit('levelSelected', level)
}
</script>
<template>
    <div class="competence_level_progress_bar" role="group" aria-label="Choisir un niveau">
        <div
            class="progress_bar_fragment"
            v-for="i in max"
            :key="i"
            :class="`progress_bar_fragment--${i <= level ? 'filled' : 'empty'}`"
        >
            <span class="progress_bar_fill"></span>
            <button
                type="button"
                :class="['progress_bar_label', { 'progress_bar_label--selected': i === selected }]"
                :aria-pressed="i === selected"
                :aria-label="`Niveau ${i}`"
                @click="selectLevel(i)"
            >
                {{ i }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.competence_level_progress_bar {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
}
.progress_bar_fragment {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}
.progress_bar_fill {
    width: 200px;
    height: 2px;
}
.progress_bar_fragment--filled .progress_bar_fill {
    background-color: rgb(4, 175, 197);
    /* Glowing effect */
    box-shadow: 0 0 10px rgb(4, 175, 197);
}
.progress_bar_fragment--empty .progress_bar_fill {
    background-color: #eee;
}
.progress_bar_label {
    flex: none;
    padding: 0;
    border: none;
    font-family: inherit;
    font-weight: bold;
    color: #f3f3f3;
    /* Glowing circle */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 1.6em;
}
.progress_bar_label--selected {
    outline: 3px solid #fff;
    outline-offset: 3px;
}
.progress_bar_fragment--filled .progress_bar_label {
    background-color: rgb(4, 175, 197);
    box-shadow: 0 0 10px rgb(4, 175, 197);
}
.progress_bar_fragment--empty .progress_bar_label {
    background-color: #eee;
    color: rgb(4, 175, 197);
}
/* Hover effect */
.progress_bar_label:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.2s;
}
/* Active state */
.progress_bar_label:active {
    transform: scale(0.9);
    transition: transform 0.1s;
}
/* Responsive design */
@media (max-width: 800px) {
    .progress_bar_fill {
        width: 20vw;
    }
}
@media (max-width: 600px) {
    .competence_level_progress_bar {
        gap: 4px;
        padding: 0 0.5rem;
    }
    .progress_bar_fill {
        width: auto;
        flex: 1;
    }
    .progress_bar_fragment {
        flex: 1;
    }
    /* Larger touch targets */
    .progress_bar_label {
        width: 40px;
        height: 40px;
        line-height: 40px;
    }
}
</style>
