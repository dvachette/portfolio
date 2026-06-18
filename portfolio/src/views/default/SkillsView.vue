<script setup lang="ts">
import CompetenceCard from '@/components/default/CompetenceCard.vue'
import type { SkillModel } from '@/models/SkillModel'
import { useSkillsService } from '@/services/SkillsService'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ueService = useSkillsService()
const competences = ref<{ section: string, icon: string, skills: SkillModel[] }[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const activeSection = ref<string>('')
let observer: IntersectionObserver

function openDetail(competence: SkillModel): void {
    router.push({ name: 'default-competence-details', params: { id: competence.id } })
}

function makeSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}
const updateActive = (): void => {
    const headings = Array.from(document.querySelectorAll('h2[id]'))

    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
    if (isAtBottom) {
        activeSection.value = headings[headings.length - 1]!.id
        return
    }

    let closest: string = ''
    let closestDistance = Infinity

    for (const heading of headings) {
        const distance = Math.abs(heading.getBoundingClientRect().top - 120)
        if (distance < closestDistance) {
            closestDistance = distance
            closest = heading.id
        }
    }

    if (closest) {
        activeSection.value = closest
    }
}

onMounted(async function () {
    try {
        competences.value = await ueService.getSkillTab()
        await nextTick()

        const updateActive = (): void => {
            const headings = Array.from(document.querySelectorAll('h2[id]')) as HTMLElement[]
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
            if (isAtBottom) {
                activeSection.value = headings[headings.length - 1]!.id
                return
            }

            let closest: string = ''
            let closestDistance = Infinity

            for (const heading of headings) {
                const distance = Math.abs(heading.getBoundingClientRect().top - 120)
                if (distance < closestDistance) {
                    closestDistance = distance
                    closest = heading.id
                }
            }

            if (closest) {
                activeSection.value = closest
            }
        }

        observer = new IntersectionObserver(updateActive, {
            threshold: Array.from({ length: 21 }, (_, i) => i * 0.05)
        })

        document.querySelectorAll('h2[id]').forEach(el => observer.observe(el))
        window.addEventListener('scroll', updateActive, { passive: true })
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
})

onUnmounted(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', updateActive)
})

function scrollToSection(slug: string): void {
    activeSection.value = slug
}
</script>

<template>
    <div class="page">
        <nav class="sections-nav">
            <a
                v-for="section in competences"
                :key="section.section"
                :href="`#${makeSlug(section.section)}`"
                :class="['sections-nav__item', { 'sections-nav__item--active': activeSection === makeSlug(section.section) }]"
                :title="section.section"
                @click="scrollToSection(makeSlug(section.section))"
            >
                <img :src="section.icon" :alt="section.section" />
            </a>
        </nav>

        <div class="content">
            <h1>Compétences</h1>
            <template v-for="section in competences" :key="section.section">
                <h2 :id="makeSlug(section.section)">{{ section.section }}</h2>
                <span v-if="error">{{ error }}</span>
                <div v-else class="competences">
                    <CompetenceCard
                        v-for="competence in section.skills"
                        :key="competence.name"
                        :competence="competence"
                        @select="openDetail"
                    />
                </div>
            </template>
        </div>
    </div>
    <RouterView />
</template>

<style scoped>
h1 {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    margin-bottom: 1rem;
}

h2 {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: #eee;
    margin-top: 2em;
}

.competences {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.page {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
}

.content {
    flex: 1;
    min-width: 0;
}

.sections-nav {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 100;
    background-color: #333c;
    border-radius: 8px;
    padding: 0.5rem 0.25rem;
    height: fit-content;
    backdrop-filter: blur(4px);
}

.sections-nav__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 6px;
    border: 2px solid transparent;
    opacity: 0.4;
    transition: opacity 0.2s, border-color 0.2s;
}

.sections-nav__item img {
    width: 28px;
    height: 28px;
    filter: invert(1);
}

.sections-nav__item:hover {
    opacity: 0.8;
}

.sections-nav__item--active {
    opacity: 1;
    border-color: var(--color-primary);
}

@media (max-width: 1200px) {
    .competences {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 700px) {
    .competences {
        grid-template-columns: 1fr;
        /* Add some margin between the cards */
        gap: 1rem;
        /* Center the cards */
        justify-items: center;
    }

    .sections-nav {
        display: none;
    }

}
</style>