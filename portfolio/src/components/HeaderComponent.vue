<script setup lang="ts"></script>
<template>
    <header>
        <nav>
            <RouterLink active-class="nav-active" :to="{ name: 'home' }">Accueil</RouterLink>
            <RouterLink active-class="nav-active" :to="{ name: 'me' }">À propos de moi</RouterLink>
            <RouterLink active-class="nav-active" :to="{ name: 'competences' }"
                >Compétences</RouterLink
            >
            <RouterLink active-class="nav-active" :to="{ name: 'projects' }">Projets</RouterLink>
            <RouterLink active-class="nav-active" :to="{ name: 'contact' }">Contact</RouterLink>
            <RouterLink active-class="nav-active" :to="{ name: 'credits' }">Crédits</RouterLink>
        </nav>
    </header>
</template>
<style scoped>
header {
    background-color: #111;
    padding: 1rem;
    margin: 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}
nav {
    display: flex;
    gap: 1rem;
}
a {
    color: #ddd;
    text-decoration: none;
    font-size: 1.2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.nav-active {
    font-weight: bold;
    text-decoration: underline;
}
</style>
