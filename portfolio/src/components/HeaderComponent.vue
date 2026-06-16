<script setup lang="ts">
type NavItem = {
    name: 'home' | 'me' | 'competences' | 'projects' | 'contact' | 'credits'
    label: string
    icon: string
}

const navItems: NavItem[] = [
    { name: 'home', label: 'Accueil', icon: 'https://unpkg.com/lucide-static@latest/icons/home.svg' },
    { name: 'me', label: 'À propos de moi', icon: 'https://unpkg.com/lucide-static@latest/icons/user-round.svg' },
    { name: 'competences', label: 'Compétences', icon: 'https://unpkg.com/lucide-static@latest/icons/code-2.svg' },
    { name: 'projects', label: 'Projets', icon: 'https://unpkg.com/lucide-static@latest/icons/folder-open.svg' },
    { name: 'contact', label: 'Contact', icon: 'https://unpkg.com/lucide-static@latest/icons/mail.svg' },
    { name: 'credits', label: 'Crédits', icon: 'https://unpkg.com/lucide-static@latest/icons/book-open-text.svg' },
]
</script>
<template>
    <header>
        <nav>
            <RouterLink
                v-for="item in navItems"
                :key="item.name"
                v-slot="{ href, navigate, isActive }"
                :to="{ name: item.name }"
                custom
            >
                <a
                    :href="href"
                    :class="['nav-link', { 'nav-link--active': isActive }]"
                    :aria-label="item.label"
                    :title="item.label"
                    @click="navigate"
                >
                        <img :src="item.icon" alt="" aria-hidden="true" />

                    <span class="nav-label">{{ item.label }}</span>
                </a>
            </RouterLink>
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
    gap: 2rem;
}
.nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    color: #ddd;
    text-decoration: none;
    font-size: 1.2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    line-height: 1;
}

.nav-link svg {
    width: 1.15em;
    height: 1.15em;
    flex: none;
}

.nav-link img {
    width: 1.15em;
    height: 1.15em;
    flex: none;
    filter: brightness(0) invert(1);
}

.nav-label {
    display: inline;
}

.nav-link--active {
    font-weight: bold;
    text-decoration: underline;
}

@media (max-width: 600px) {
    nav {
        justify-content: space-between;
        gap: 0.5rem;
    }

    .nav-link {
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;
        font-size: 0.82rem;
        min-width: 0;
        text-align: center;
        padding: 0.2rem 0;
        text-decoration: none;
        opacity: 0.72;
    }

    .nav-link svg {
        width: 1.35rem;
        height: 1.35rem;
    }

    .nav-link img {
        width: 1.35rem;
        height: 1.35rem;
        filter: brightness(0) invert(1);
    }

    .nav-label {
        display: none;
        white-space: nowrap;
    }

    .nav-link--active {
        opacity: 1;
        text-decoration: none;
    }

    .nav-link--active .nav-label {
        display: block;
        font-size: 0.72rem;
        line-height: 1;
    }
}
</style>
