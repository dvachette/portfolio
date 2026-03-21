<script setup lang="ts">
import CompetenceCard from '@/components/CompetenceCard.vue'
import type { CompetenceModel } from '@/models/CompetenceModel'
import { useCompetenceService } from '@/services/CompetenceService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const competenceService = useCompetenceService()
const competences = ref(competenceService.getCompetencesTab())

const openDetail = (competence: CompetenceModel) => {
    console.log('Selected competence:', competence)
    router.push(`/competences/${competence.id}`)
}
</script>

<template>
    <h1>Compétences</h1>
    <div class="competences">
        <CompetenceCard
            v-for="competence in competences"
            :key="competence.name"
            :competence="competence"
            @select="openDetail"
        />
    </div>
    <RouterView />
</template>
<style scoped>
h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.competences {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
/* Flex column for smaller screens */
@media (max-width: 600px) {
    .competences {
        flex-direction: column;
        align-items: center;
    }
}
</style>
