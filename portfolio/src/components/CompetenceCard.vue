<script setup lang="ts">
import type { SkillModel } from '@/models/SkillModel'
import { computed } from 'vue'
import CompetenceLevel from './CompetenceLevel.vue'
const base = import.meta.env.BASE_URL
const { competence } = defineProps<{
    competence: SkillModel
}>()
const levelName = computed(
    () => competence.levels.find((l) => l.level === competence.level)?.levelName ?? '',
)
const imageSrc = computed(() =>
    competence.image.startsWith('http') ? competence.image : `${base}assets/${competence.image}`,
)
</script>
<template>
    <RouterLink
        class="competence_card"
        :to="{ name: 'competence-details', params: { id: competence.id } }"
    >
        <div class="content_text">
            <div class="competence_card__header">
                <CompetenceLevel
                    :level="competence.level"
                    :max="competence.levels.length"
                    :level_title="levelName"
                />
                <h3 class="competence_card__name">{{ competence.name }}</h3>
            </div>
            <p class="competence_card__description">{{ competence.description }}</p>
        </div>
        <img v-if="competence.image" :src="imageSrc" alt="" class="skill-img" loading="lazy" />
    </RouterLink>
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
    background-color: #333c;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 0 20px 20px 20px;
    transition:
        transform 0.2s,
        background-color 0.2s;
    max-width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    color: inherit;
    text-decoration: none;
}
.content_text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    margin-bottom: 0;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
}
.skill-img {
    flex: none;
    width: min(40%, 160px);
    margin-top: 20px;
    border-radius: 5px;
    /* make the image squared */
    aspect-ratio: 1 / 1;
    object-fit: contain;
}
/* Hover effect for pointer devices only (avoids sticky hover on touch) */
@media (hover: hover) and (min-width: 600px) {
    .competence_card:hover {
        transform: scale(1.03);
        background-color: #444c;
        cursor: pointer;
    }
}
@media (max-width: 600px) {
    .competence_card {
        width: 100%;
        padding: 0 16px 16px;
    }
    .competence_card__name {
        font-size: 1.3em;
    }
    .skill-img {
        width: 88px;
    }
}
</style>
