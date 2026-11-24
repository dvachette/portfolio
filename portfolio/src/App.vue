<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import FloatingLines from '@/components/FloatingLines/FloatingLines.vue'
import { computed } from 'vue'
import { useSwipeNavigation } from '@/composables/useSwipeNavigation'

const { direction } = useSwipeNavigation()
// Pages only slide when the navigation comes from a swipe
const transitionName = computed(() => (direction.value ? `page-slide-${direction.value}` : 'page'))

function onPageLeft(): void {
    if (direction.value) {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }
}

function onPageEntered(): void {
    direction.value = null
}
</script>

<template>
    <HeaderComponent />
    <main>
        <FloatingLines
            :enabled-waves="['top', 'middle', 'bottom']"
            :line-count="[10, 15, 20]"
            :line-distance="[8, 6, 4]"
            :bend-radius="5.0"
            :bend-strength="-0.5"
            :interactive="true"
            :parallax="true"
            id="lines"
        />
        <RouterView v-slot="{ Component, route }">
            <Transition
                :name="transitionName"
                mode="out-in"
                @after-leave="onPageLeft"
                @after-enter="onPageEntered"
            >
                <!-- Keyed on the top-level route, so opening a detail modal is not a page change -->
                <div :key="route.matched[0]?.path">
                    <component :is="Component" />
                </div>
            </Transition>
        </RouterView>
        <div class="mobile-bg" />
    </main>
</template>

<style scoped>
main {
    padding: var(--page-padding);
    /* Pages slide horizontally on swipe: never show a horizontal scrollbar */
    overflow-x: clip;
}

.page-slide-left-enter-active,
.page-slide-left-leave-active,
.page-slide-right-enter-active,
.page-slide-right-leave-active {
    transition:
        transform 0.18s ease-out,
        opacity 0.18s ease-out;
}

.page-slide-left-enter-from,
.page-slide-right-leave-to {
    transform: translateX(25%);
    opacity: 0;
}

.page-slide-left-leave-to,
.page-slide-right-enter-from {
    transform: translateX(-25%);
    opacity: 0;
}
#lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.mobile-bg {
    display: none;
}

@media (max-width: 800px) {
    main {
        padding-bottom: calc(
            var(--bottom-nav-height) + env(safe-area-inset-bottom) + var(--page-padding)
        );
    }
}

@media (max-width: 600px) {
    .mobile-bg {
        display: block;
        position: fixed;
        inset: 0;
        background: linear-gradient(to bottom, #8905a3, #0057da);
        z-index: -1;
        pointer-events: none;
    }

    main {
        background: transparent;
    }
    #lines {
        display: none;
    }
}
</style>
