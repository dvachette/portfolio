<script setup lang="ts">
import CompetenceCard from '@/components/CompetenceCard.vue'
import ToolCard from '@/components/ToolCard.vue'
import type { SkillModel } from '@/models/SkillModel'
import { useToolsService } from '@/services/toolsService'
import { useSkillsService } from '@/services/SkillsService'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ueService = useSkillsService()
const toolsService = useToolsService()
const competences = ref<SkillModel[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
    const tools = ref({} as {[key: string]: { name:string, displayName: string} []})
    onMounted(async function() {
        try {
            competences.value = await ueService.getSkillTab()
            tools.value = await toolsService.getToolsData()
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur de chargement'
        } finally {
            loading.value = false
        }
    })
    
    function openDetail(competence: SkillModel) {
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
    <h1>Langages, frameworks et outils</h1>
    <details v-for="[category, languages] in Object.entries(tools)" :key="category">
        <summary>{{ category }}</summary>
        <div class="languages_content">
            <ToolCard
            v-for="tool in languages"
            :key="tool.name"
            :name="tool.name"
            :displayName="tool.displayName"
            />
        </div>
    </details>
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
.languages {
    margin-top: 2em;
}
.languages_content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 1em;
}

details {
    background-color: #3338;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    overflow: hidden;
    transition: background-color 0.2s;
}

details[open] {
    background-color: #4448;
}

summary {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    color: #eee;
    padding: 14px 20px;
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
}

summary::before {
    content: '▶';
    font-size: 0.75em;
    color: #aaa;
    transition: transform 0.2s;
}

details[open] summary::before {
    transform: rotate(90deg);
}

summary:hover {
    color: #fff;
}
</style>
