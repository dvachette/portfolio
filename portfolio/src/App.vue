<script setup lang="ts">
import CompetenceCard from './components/CompetenceCard.vue'
</script>

<template>
    <h1>You did it!</h1>
    <p>
        Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
    </p>
    <CompetenceCard
        name="TypeScript"
        description="TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
        level="acquired"
    />
</template>

<style scoped></style>
