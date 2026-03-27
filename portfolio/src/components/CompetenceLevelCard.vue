<script setup lang="ts">
import type { UELevelModel } from '@/models/UELevelModel'
interface CompetenceLevelProps {
    UELevel: UELevelModel
    level: number
}
const { UELevel } = defineProps<CompetenceLevelProps>()
</script>
<template>
    <div class="competence_level">
        <h2 class="competence_level__title">Niveau {{ UELevel.level }}</h2>
        <h3>Apprentissages critiques</h3>

        <div
            v-for="detail in UELevel.apprentissagesCritiques"
            :key="detail.id"
            class="competence_level__detail"
        >
            <p class="competence_level__detail_id">{{ detail.id }}</p>
            <p class="competence_level__detail_name">{{ detail.name }}</p>
        </div>
    </div>
</template>
<style scoped>
.competence_level {
    border: none;
    /* Card style */
    background-color: #2c2c2c;
    border-radius: 8px;
    padding: 20px;
    color: #f3f3f3;
    /* Shadow effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Transition for hover effect */
    transition: all 0.3s ease;
}
.competence_level:hover {
    /* Hover effect */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

.competence_level__title {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #f3f3f3;
}
.competence_level__detail {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 5px;
}
.competence_level__detail_id {
    font-weight: bold;
    color: rgb(4, 175, 197);
}
.competence_level__detail_name {
    color: #f3f3f3;
}
</style>
