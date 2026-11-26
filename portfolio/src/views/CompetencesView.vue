<script setup lang="ts">
import CompetenceCard from '@/components/CompetenceCard.vue'
import SkeletonBlock from '@/components/skeletons/SkeletonBlock.vue'
import { useSkillsService } from '@/services/SkillsService'
import { useAsyncData } from '@/composables/useAsyncData'
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useTemplateRef, watch } from 'vue'

const skillsService = useSkillsService()
const { data, pending, error } = useAsyncData(skillsService.getSkillTab)

function makeSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

const sections = computed(() =>
    (data.value ?? []).map((section) => ({ ...section, slug: makeSlug(section.section) })),
)

const contentRef = useTemplateRef<HTMLElement>('content')
const activeSection = shallowRef('')

/** Highlights the section whose heading is closest to the top of the viewport */
function updateActiveSection(): void {
    const headings = Array.from(contentRef.value?.querySelectorAll<HTMLElement>('h2[id]') ?? [])
    const last = headings[headings.length - 1]
    if (!last) return

    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
    if (isAtBottom) {
        activeSection.value = last.id
        return
    }

    let closest = ''
    let closestDistance = Infinity
    for (const heading of headings) {
        const distance = Math.abs(heading.getBoundingClientRect().top - 120)
        if (distance < closestDistance) {
            closestDistance = distance
            closest = heading.id
        }
    }
    if (closest) activeSection.value = closest
}

watch(sections, async () => {
    await nextTick()
    updateActiveSection()
})

onMounted(() => window.addEventListener('scroll', updateActiveSection, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateActiveSection))
</script>

<template>
    <div class="page">
        <nav v-if="sections.length" class="sections-nav" aria-label="Sections">
            <a
                v-for="section in sections"
                :key="section.slug"
                :href="`#${section.slug}`"
                :class="[
                    'sections-nav__item',
                    { 'sections-nav__item--active': activeSection === section.slug },
                ]"
                :aria-current="activeSection === section.slug ? 'true' : undefined"
                :title="section.section"
                @click="activeSection = section.slug"
            >
                <img :src="section.icon" :alt="section.section" />
            </a>
        </nav>

        <div ref="content" class="content">
            <h1>Compétences</h1>
            <p v-if="error" class="error" role="alert">{{ error }}</p>
            <div v-else-if="pending" class="competences" aria-busy="true">
                <SkeletonBlock v-for="n in 6" :key="n" height="12rem" border-radius="10px" />
            </div>
            <template v-for="section in sections" v-else :key="section.slug">
                <h2 :id="section.slug">{{ section.section }}</h2>
                <div class="competences">
                    <CompetenceCard
                        v-for="competence in section.skills"
                        :key="competence.id"
                        :competence="competence"
                    />
                </div>
            </template>
        </div>
    </div>
    <RouterView />
</template>

<style scoped>
h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    margin-bottom: 1rem;
}

h2 {
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

.error {
    background-color: var(--color-surface);
    padding: 1rem;
    border-radius: var(--radius-lg);
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