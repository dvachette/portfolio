<script setup lang="ts">
interface CompetenceLevelProps {
    level: number
    max: number
}
const { level, max } = defineProps<CompetenceLevelProps>()
const emit = defineEmits<{
    levelSelected: [level: number]
}>()

function selectLevel(level: number) {
    emit('levelSelected', level)
}
</script>
<template>
    <div class="competence_level_progress_bar">
        <div
            class="progress_bar_fragment"
            v-for="i in max"
            :key="i"
            :class="`progress_bar_fragment--${i <= level ? 'filled' : 'empty'}`"
        >
            <span class="progress_bar_fill"></span>
            <p class="progress_bar_label" @click="selectLevel(i)">{{ i }}</p>
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
    font-size: 12px;
    color: #f3f3f3;
    /* Glowing circle */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 1.6em;
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
@media (max-width: 600px) {
    .progress_bar_fill {
        width: 100px;
    }
    .progress_bar_label {
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 1em;
    }
}
</style>
