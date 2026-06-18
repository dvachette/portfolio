<script setup lang="ts">
import type { AppBarIcon } from '@/types/kde/appBar';
import AppIcon from './AppIcon.vue';

const apps: AppBarIcon[] = [
    { id: 'kde-home', name: 'Accueil', icon: 'https://unpkg.com/lucide-static@latest/icons/home.svg' },
    { id: 'kde-me', name: 'À propos de moi', icon: 'https://unpkg.com/lucide-static@latest/icons/user-round.svg' },
    { id: 'kde-skills', name: 'Compétences', icon: 'https://unpkg.com/lucide-static@latest/icons/code-2.svg' },
    { id: 'kde-projects', name: 'Projets', icon: 'https://unpkg.com/lucide-static@latest/icons/folder-open.svg' },
    { id: 'kde-contact', name: 'Contact', icon: 'https://unpkg.com/lucide-static@latest/icons/mail.svg' },
    { id: 'kde-credits', name: 'Crédits', icon: 'https://unpkg.com/lucide-static@latest/icons/book-open-text.svg' },
]
function handleAppClick(appId: string) {
    console.log(`App clicked: ${appId}`);
}
</script>
<template>
    <div class="app-bar">
        <AppIcon
            v-for="app in apps"
            :key="app.id"
            :app="app"
            @appClicked="handleAppClick"
        />
    </div>
</template>
<style scoped lang="scss">
.app-bar {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    background-color: #111;
    padding: 0.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}
</style>