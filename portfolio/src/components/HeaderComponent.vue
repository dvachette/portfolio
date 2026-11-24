<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import { navItems, secondaryNavItems } from '@/router/navItems'

const route = useRoute()
const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const secondaryActive = computed(() =>
    secondaryNavItems.some((item) => route.matched.some((record) => record.name === item.name)),
)

function onPointerDown(event: PointerEvent): void {
    if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        menuOpen.value = false
    }
}

function onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        menuOpen.value = false
    }
}

watch(menuOpen, (open) => {
    if (open) {
        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
    } else {
        document.removeEventListener('pointerdown', onPointerDown)
        document.removeEventListener('keydown', onKeyDown)
    }
})

watch(
    () => route.fullPath,
    () => {
        menuOpen.value = false
    },
)

onUnmounted(() => {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
    <header>
        <nav aria-label="Navigation principale">
            <RouterLink
                v-for="item in navItems"
                :key="item.name"
                v-slot="{ href, navigate, isActive }"
                :to="{ name: item.name }"
                custom
            >
                <a
                    :href="href"
                    :class="[
                        'nav-link',
                        { 'nav-link--active': isActive, 'nav-link--secondary': item.secondary },
                    ]"
                    :aria-current="isActive ? 'page' : undefined"
                    @click="navigate"
                >
                    <AppIcon :name="item.icon" class="nav-icon" />
                    <span class="nav-label">{{ item.label }}</span>
                </a>
            </RouterLink>

            <!-- Mobile only: secondary items are duplicated here, the bar copies are hidden -->
            <div ref="menuRef" class="nav-more">
                <button
                    type="button"
                    :class="[
                        'nav-link',
                        'nav-more__toggle',
                        { 'nav-link--active': secondaryActive },
                    ]"
                    :aria-expanded="menuOpen"
                    aria-controls="nav-more-menu"
                    @click="menuOpen = !menuOpen"
                >
                    <AppIcon name="ellipsis" class="nav-icon" />
                    <span class="nav-label">Plus</span>
                </button>
                <div
                    id="nav-more-menu"
                    :class="['nav-more__menu', { 'nav-more__menu--open': menuOpen }]"
                >
                    <RouterLink
                        v-for="item in secondaryNavItems"
                        :key="item.name"
                        v-slot="{ href, navigate, isActive }"
                        :to="{ name: item.name }"
                        custom
                    >
                        <a
                            :href="href"
                            :class="['nav-link', { 'nav-link--active': isActive }]"
                            :aria-current="isActive ? 'page' : undefined"
                            @click="navigate"
                        >
                            <AppIcon :name="item.icon" class="nav-icon" />
                            <span class="nav-label">{{ item.label }}</span>
                        </a>
                    </RouterLink>
                </div>
            </div>
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
    line-height: 1;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
}

.nav-link:hover {
    color: #fff;
}

.nav-link--active {
    font-weight: bold;
    text-decoration: underline;
}

/* Desktop: secondary items are shown inline, the "More" menu is not needed */
.nav-more {
    display: none;
}

@media (max-width: 800px) {
    header {
        position: fixed;
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        height: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom));
        padding: 0 0.25rem env(safe-area-inset-bottom);
        border-top: 1px solid var(--color-border);
        background-color: #111e;
        backdrop-filter: blur(8px);
    }

    nav {
        height: 100%;
        gap: 0;
    }

    .nav-link--secondary {
        display: none;
    }

    .nav-link {
        flex: 1 1 0;
        min-width: 0;
        flex-direction: column;
        justify-content: center;
        gap: 0.25rem;
        padding: 0 0.1rem;
        font-size: 0.68rem;
        color: #aaa;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }

    .nav-icon {
        width: 1.4rem;
        height: 1.4rem;
    }

    .nav-label {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .nav-link--active {
        color: #fff;
    }

    .nav-link--active .nav-icon {
        color: var(--color-primary-light);
    }

    .nav-more {
        display: flex;
        flex: 1 1 0;
        min-width: 0;
        position: relative;
    }

    .nav-more__menu {
        display: none;
        position: absolute;
        right: 0.25rem;
        bottom: calc(100% + 0.5rem);
        flex-direction: column;
        min-width: 13rem;
        padding: 0.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background-color: #1a1a1af5;
        box-shadow: var(--shadow-card);
    }

    .nav-more__menu--open {
        display: flex;
    }

    .nav-more__menu .nav-link {
        flex: none;
        flex-direction: row;
        justify-content: flex-start;
        gap: 0.75rem;
        min-height: 2.75rem;
        padding: 0 0.75rem;
        border-radius: var(--radius-md);
        font-size: 1rem;
    }

    .nav-more__menu .nav-link--active {
        background-color: var(--color-surface);
    }
}
</style>
