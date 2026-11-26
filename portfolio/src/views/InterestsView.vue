<script setup lang="ts">
import SkeletonBlock from '@/components/skeletons/SkeletonBlock.vue'
import { useInterestService } from '@/services/InterestService'
import { useAsyncData } from '@/composables/useAsyncData'

const interestService = useInterestService()
const { data: interests, pending: loading, error } = useAsyncData(interestService.getInterests)
</script>

<template>
    <div class="interests">
        <h1>Centres d'intérêt</h1>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <div v-else class="grid">
            <template v-if="loading">
                <SkeletonBlock
                    v-for="n in 4"
                    :key="n"
                    width="100%"
                    height="12rem"
                    border-radius="10px"
                />
            </template>
            <article v-for="interest in interests" v-else :key="interest.id" class="card">
                <header class="card__header">
                    <img class="card__icon" :src="interest.icon" alt="" aria-hidden="true" />
                    <h2>{{ interest.title }}</h2>
                </header>
                <p>{{ interest.description }}</p>
                <ul v-if="interest.tags.length" class="card__tags">
                    <li v-for="tag in interest.tags" :key="tag">{{ tag }}</li>
                </ul>
            </article>
        </div>
    </div>
</template>

<style scoped>
.interests {
    color: #ddd;
    max-width: 1100px;
    margin: 0 auto;
    cursor: default;
}

h1 {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #eee;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.card {
    display: flex;
    flex-direction: column;
    background-color: #333c;
    backdrop-filter: blur(4px);
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.card__icon {
    width: 1.75rem;
    height: 1.75rem;
    flex: none;
    filter: brightness(0) invert(1);
}

h2 {
    margin: 0;
    font-size: 1.5em;
    color: #fff;
}

.card p {
    line-height: 1.6;
    font-size: 1.1em;
    flex: 1;
}

.card__tags {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
}

.card__tags li {
    background-color: #3178c680;
    border: #3178c6 solid 2px;
    border-radius: 100px;
    padding: 0.15em 0.75em;
    font-size: 0.85em;
    font-weight: bold;
    font-family: monospace;
    color: #eee;
}

.error {
    background-color: #333c;
    padding: 1rem;
    border-radius: 10px;
}

@media (max-width: 800px) {
    .grid {
        grid-template-columns: 1fr;
    }

    h1 {
        font-size: 2em;
    }
}
</style>
