<script setup lang="ts">
import type { UEModel } from '@/models/UEModel'
import CompetenceLevel from './CompetenceLevel.vue'
const { competence } = defineProps<{
    competence: UEModel
}>()
const emit = defineEmits(['select'])
function selectCompetence() {
    emit('select', competence)
}
</script>
<template>
    <div class="competence_card" @click="selectCompetence">
        <div class="competence_card__header">
            <CompetenceLevel :level="competence.level" :max="competence.levels.length" />
            <h3 class="competence_card__name">{{ competence.name }}</h3>
        </div>
        <p class="competence_card__description">
            {{
                competence.description.length > 100
                    ? competence.description.substring(0, 100) + '...'
                    : competence.description
            }}
        </p>
    </div>
</template>
<style scoped>
/*
    The competence card is a simple card that displays the name, description and level of a competence.
    The level is displayed as a colored circle, using the CompetenceLevel component. It should be on the topleft of the card, next to the name of the competence.
    The description is displayed below the name of the competence, and should be smaller than the name. The card should have a dark background color and a border radius.
    It should also have a box shadow to make it look like a card. The name of the competence should be bold and larger than the description. The description should be in a lighter color than the name.
    There should be some hover effect on the card, such as a slight increase in size and a change in background color. The card should be responsive and look good on different screen sizes.
 */
.competence_card {
    background-color: #3338;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 0 20px 20px 20px;
    transition:
        transform 0.2s,
        background-color 0.2s;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    max-width: 300px;
}
.competence_card__header {
    display: flex;
    align-items: center;
}
.competence_card__name {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    margin-left: 10px;
}
.competence_card__description {
    font-size: 1em;
    color: #aaa;
    margin-top: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
} /* Hover effect for larger screens */
@media (min-width: 600px) {
    .competence_card:hover {
        transform: scale(1.03);
        background-color: #4448;
    }
}
/* Fixed size and no hover effect for smaller screens */
@media (max-width: 600px) {
    .competence_card {
        width: 95%;
        max-width: none;
    }
    .competence_card:hover {
        transform: none;
        background-color: #3338;
    }
}
</style>
