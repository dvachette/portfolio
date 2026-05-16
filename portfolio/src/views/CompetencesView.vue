<script setup lang="ts">
import CompetenceCard from '@/components/CompetenceCard.vue'
import ProgramingLanguage from '@/components/ProgramingLanguage.vue'
import type { UEModel } from '@/models/UEModel'
import { useUEService } from '@/services/UEService'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ueService = useUEService()
const competences = ref<UEModel[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async function() {
    try {
        competences.value = await ueService.getUEsTab()
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
})

function openDetail(competence: UEModel) {
    router.push(`/competences/${competence.id}`)
}
</script>

<template>
    <h1>Compétences du référentiel</h1>
    <span v-if="error">{{ error }}</span>
    <div v-else class="competences">
        <CompetenceCard
            v-for="competence in competences"
            :key="competence.name"
            :competence="competence"
            @select="openDetail"
        />
    </div>
    <ProgramingLanguage name="Python" />
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
