<script setup lang="ts">
const base = import.meta.env.BASE_URL
</script>

<template>
    <section class="not-found">
        <img class="not-found__image" :src="`${base}assets/notfound.png`" alt="" />
        <h1 class="not-found__title">Page introuvable</h1>
        <p class="not-found__text">
            Cette adresse ne correspond à aucune page du portfolio. Le lien est peut-être ancien ou
            mal recopié.
        </p>
        <div class="not-found__actions">
            <RouterLink class="not-found__link" :to="{ name: 'home' }"
                >Revenir à l'accueil</RouterLink
            >
            <RouterLink class="not-found__link" :to="{ name: 'projects' }"
                >Voir les projets</RouterLink
            >
        </div>
    </section>
</template>

<style scoped>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 36rem;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: var(--radius-lg);
    background-color: var(--color-surface);
    text-align: center;
}

.not-found__image {
    width: 8rem;
    height: auto;
}

.not-found__title {
    margin: 0;
    font-size: 2em;
    color: var(--color-text-strong);
}

.not-found__text {
    margin: 0;
    line-height: 1.5;
}

.not-found__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
}

.not-found__link {
    padding: 0.6em 1.2em;
    border-radius: var(--radius-sm);
    background-color: #555c;
    color: var(--color-text-strong);
    font-weight: bold;
    text-decoration: none;
}

.not-found__link:hover {
    background-color: #666c;
}
</style>
