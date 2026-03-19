<script setup lang="ts">
import CompetenceLevel from './CompetenceLevel.vue'
interface Props {
    name: string
    description: string
    level: 'acquired' | 'acquiring' | 'not acquired'
}
const { name, description, level } = defineProps<Props>()
</script>

<template>
    <div class="competence_card">
        <div class="competence_card__header">
            <CompetenceLevel :level="level" />
            <h3 class="competence_card__name">{{ name }}</h3>
        </div>
        <p class="competence_card__description">{{ description }}</p>
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
    background-color: #333;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 0 20px 20px 20px;
    margin: 3%;
    transition:
        transform 0.2s,
        background-color 0.2s;
}
.competence_card__header {
    display: flex;
    align-items: center;
}
.competence_card:hover {
    transform: scale(1.03);
    background-color: #444;
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
}
</style>
