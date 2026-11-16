<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TimelineEntry from '@/components/TimelineEntry.vue'
import SkeletonBlock from '@/components/skeletons/SkeletonBlock.vue'
import type { CareerModel } from '@/models/CareerModel'
import { useCareerService } from '@/services/CareerService'
import { workloadLabels } from '@/types/ExperienceType'

const base = import.meta.env.BASE_URL
const careerService = useCareerService()
const career = ref<CareerModel | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const professional = computed(
    () => career.value?.experiences.filter((e) => e.type !== 'association') ?? [],
)
const associative = computed(
    () => career.value?.experiences.filter((e) => e.type === 'association') ?? [],
)

onMounted(async function () {
    try {
        career.value = await careerService.getCareer()
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Erreur de chargement'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="career">
        <div class="layout">
            <h1>Parcours</h1>
            <aside class="profile">
                <img class="profile__photo" :src="`${base}assets/me.jpg`" alt="Photo de moi" />
                <h2 class="profile__name">Donatien Vachette</h2>
                <p class="profile__headline">Étudiant en BUT Informatique · IUT Lyon 1</p>
                <p class="profile__summary">
                    Passionné par le développement web et l'informatique bas niveau, défenseur de
                    l'open source et engagé dans la vie associative.
                </p>
                <div class="profile__actions">
                    <a
                        class="btn"
                        :href="`${base}cv_donatien_vachette-latest.pdf`"
                        target="_blank"
                        rel="noopener"
                        >Télécharger le CV</a
                    >
                    <RouterLink class="btn" :to="{ name: 'contact' }"
                        >Me contacter</RouterLink
                    >
                </div>

                <template v-if="career?.certifications.length">
                    <h3 class="profile__subtitle">Formations complémentaires</h3>
                    <ul class="profile__certifications">
                        <li v-for="cert in career.certifications" :key="cert.id">
                            <span>{{ cert.name }}</span>
                            <small v-if="cert.context">{{ cert.context }}</small>
                        </li>
                    </ul>
                </template>
            </aside>

            <div class="sections">
                <p v-if="error" class="error">{{ error }}</p>

                <template v-else-if="loading">
                    <SkeletonBlock
                        v-for="n in 3"
                        :key="n"
                        width="100%"
                        height="10rem"
                        border-radius="10px"
                        class="skeleton"
                    />
                </template>

                <template v-else-if="career">
                    <section v-if="professional.length">
                        <h2>Expériences professionnelles</h2>
                        <ol class="timeline">
                            <TimelineEntry
                                v-for="exp in professional"
                                :key="exp.id"
                                :title="exp.title"
                                :organization="exp.organization"
                                :start-date="exp.startDate"
                                :end-date="exp.endDate"
                                :badge="
                                    exp.type === 'internship'
                                        ? 'Stage'
                                        : workloadLabels[exp.workload]
                                "
                                :highlights="exp.highlights"
                                :tags="exp.tags"
                            />
                        </ol>
                    </section>

                    <section v-if="associative.length">
                        <h2>Engagement associatif</h2>
                        <ol class="timeline">
                            <TimelineEntry
                                v-for="exp in associative"
                                :key="exp.id"
                                :title="exp.title"
                                :organization="exp.organization"
                                :start-date="exp.startDate"
                                :end-date="exp.endDate"
                                :badge="workloadLabels[exp.workload]"
                                :highlights="exp.highlights"
                                :tags="exp.tags"
                            />
                        </ol>
                    </section>

                    <section v-if="career.education.length">
                        <h2>Formation</h2>
                        <ol class="timeline">
                            <TimelineEntry
                                v-for="edu in career.education"
                                :key="edu.id"
                                :title="edu.title"
                                :organization="edu.establishment"
                                :start-date="edu.startDate"
                                :end-date="edu.endDate"
                                :badge="edu.endDate === null ? 'En cours' : undefined"
                                :description="edu.description"
                            >
                                <dl
                                    v-if="edu.specialities.length || edu.options.length"
                                    class="education__details"
                                >
                                    <template v-if="edu.specialities.length">
                                        <dt>Spécialités</dt>
                                        <dd>{{ edu.specialities.join(' · ') }}</dd>
                                    </template>
                                    <template v-if="edu.options.length">
                                        <dt>Options</dt>
                                        <dd>{{ edu.options.join(' · ') }}</dd>
                                    </template>
                                </dl>
                            </TimelineEntry>
                        </ol>
                    </section>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.career {
    /* Slightly below header + main padding, so the sidebar is pinned from the start */
    --profile-top: 5.5rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #ddd;
    max-width: 1200px;
    margin: 0 auto;
    cursor: default;
}

h1 {
    grid-area: title;
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    margin: 0;
    color: #eee;
}

h2 {
    font-size: 1.6em;
    color: #eee;
    margin: 0 0 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 2px solid #3178c6;
}

.layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
        'profile title'
        'profile sections';
    gap: 1.5rem 2rem;
    align-items: start;
}

.profile {
    grid-area: profile;
    position: sticky;
    top: var(--profile-top);
    /* Keep the whole sidebar in view on short screens: scroll inside instead of overflowing */
    max-height: calc(100vh - var(--profile-top) - 1rem);
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #333c;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
}

.profile__photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #3178c6;
}

.profile__name {
    border: none;
    margin: 0.75rem 0 0;
    padding: 0;
    font-size: 1.5em;
}

.profile__headline {
    color: #7ab4f5;
    margin: 0.25rem 0 0;
}

.profile__summary {
    line-height: 1.5;
}

.profile__actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.btn {
    display: block;
    color: #eee;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: bold;
    background-color: #555c;
    padding: 0.5em 1em;
    border-radius: 5px;
    text-align: center;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #666c;
    transform: scale(1.03);
}

.btn:hover::after {
    content: ' →';
}

.profile__subtitle {
    margin: 1.5rem 0 0.5rem;
    font-size: 1.1em;
    color: #eee;
    text-align: left;
}

.profile__certifications {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
}

.profile__certifications li {
    display: flex;
    flex-direction: column;
    padding: 0.4rem 0;
    border-top: 1px solid #555;
}

.profile__certifications small {
    color: #999;
}

.sections {
    grid-area: sections;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 0;
}

/* Vertical line of the timeline, dots are drawn by TimelineEntry */
.timeline {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}

.timeline::before {
    content: '';
    position: absolute;
    left: calc(9rem + 0.75rem - 1px);
    top: 0.5rem;
    bottom: 1.5rem;
    width: 2px;
    background-color: #3178c666;
}

.education__details {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25rem 1rem;
    margin: 0.75rem 0 0;
}

.education__details dt {
    color: #aaa;
}

.education__details dd {
    margin: 0;
}

.error {
    background-color: #333c;
    padding: 1rem;
    border-radius: 10px;
}

.skeleton {
    margin-bottom: 1rem;
}

@media (max-width: 900px) {
    .layout {
        grid-template-columns: 1fr;
        grid-template-areas:
            'title'
            'profile'
            'sections';
    }

    .profile {
        position: static;
        max-height: none;
        overflow: visible;
    }
}

@media (max-width: 700px) {
    h1 {
        font-size: 2em;
    }

    .timeline::before {
        left: -1px;
    }
}
</style>
