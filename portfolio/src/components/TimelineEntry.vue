<script setup lang="ts">
import { computed } from 'vue'
import type { OrganizationModel } from '@/models/CareerModel'
import { formatDuration, formatPeriod } from '@/utils/formatPeriod'

const props = withDefaults(
    defineProps<{
        title: string
        organization: OrganizationModel
        startDate: string
        endDate: string | null
        badge?: string
        description?: string
        highlights?: string[]
        tags?: string[]
    }>(),
    { highlights: () => [], tags: () => [] },
)

const period = computed(() => formatPeriod(props.startDate, props.endDate))
const duration = computed(() => formatDuration(props.startDate, props.endDate))
const ongoing = computed(() => props.endDate === null)
</script>

<template>
    <li :class="['entry', { 'entry--ongoing': ongoing }]">
        <div class="entry__meta">
            <span class="entry__period">{{ period }}</span>
            <span class="entry__duration">{{ duration }}</span>
        </div>
        <article class="entry__card">
            <header class="entry__header">
                <h3 class="entry__title">{{ title }}</h3>
                <span v-if="badge" class="entry__badge">{{ badge }}</span>
            </header>
            <p class="entry__org">
                <a
                    v-if="organization.website"
                    :href="organization.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ organization.name }}</a
                >
                <span v-else>{{ organization.name }}</span>
                <span class="entry__location"> · {{ organization.location }}</span>
            </p>
            <p v-if="description" class="entry__description">{{ description }}</p>
            <ul v-if="highlights.length" class="entry__highlights">
                <li v-for="item in highlights" :key="item">{{ item }}</li>
            </ul>
            <slot />
            <ul v-if="tags.length" class="entry__tags">
                <li v-for="tag in tags" :key="tag">{{ tag }}</li>
            </ul>
        </article>
    </li>
</template>

<style scoped>
.entry {
    position: relative;
    display: grid;
    grid-template-columns: 9rem 1fr;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
}

/* Timeline dot, aligned on the line drawn by the parent list */
.entry::before {
    content: '';
    position: absolute;
    left: calc(9rem + 0.75rem - 6px);
    top: 0.4rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #3178c6;
    box-shadow: 0 0 0 4px #1118;
}

.entry--ongoing::before {
    background-color: #4caf50;
}

.entry__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: start;
    text-align: right;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    background-color: #222c;
    backdrop-filter: blur(4px);
}

.entry__period {
    color: #eee;
    font-weight: bold;
    text-transform: capitalize;
}

.entry__duration {
    color: #aaa;
    font-size: 0.9em;
}

.entry__card {
    background-color: #333c;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-left: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
}

.entry__header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
}

.entry__title {
    margin: 0;
    font-size: 1.25em;
    color: #fff;
}

.entry__badge {
    font-size: 0.8em;
    color: #ddd;
    border: 1px solid #3178c6;
    border-radius: 999px;
    padding: 0.1rem 0.6rem;
    white-space: nowrap;
}

.entry__org {
    margin: 0.25rem 0 0;
    color: #ccc;
}

.entry__org a {
    color: #7ab4f5;
    text-decoration: none;
}

.entry__org a:hover {
    text-decoration: underline;
}

.entry__location {
    color: #999;
}

.entry__description {
    color: #ddd;
    margin: 0.75rem 0 0;
}

.entry__highlights {
    margin: 0.75rem 0 0;
    padding-left: 1.2rem;
    color: #ddd;
    line-height: 1.5;
}

.entry__tags {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.75rem 0 0;
    padding: 0;
}

.entry__tags li {
    background-color: #3178c680;
    border: #3178c6 solid 2px;
    border-radius: 100px;
    padding: 0.15em 0.75em;
    font-size: 0.85em;
    font-weight: bold;
    font-family: monospace;
    color: #eee;
}

@media (max-width: 700px) {
    .entry {
        grid-template-columns: 1fr;
        gap: 0.4rem;
        padding-left: 1.5rem;
    }

    .entry::before {
        left: -6px;
    }

    .entry__meta {
        flex-direction: row;
        align-items: baseline;
        gap: 0.5rem;
        text-align: left;
    }

    .entry__card {
        margin-left: 0;
    }
}
</style>
