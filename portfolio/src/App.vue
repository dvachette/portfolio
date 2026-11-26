<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue'
import { computed, defineAsyncComponent } from 'vue'
import { useSwipeNavigation } from '@/composables/useSwipeNavigation'
import { useMediaQuery } from '@/composables/useMediaQuery'

// The animated WebGL background (three.js) is heavy: load it in its own chunk, and only
// where it is shown. Small screens and reduced-motion users get a static gradient instead.
const FloatingLines = defineAsyncComponent(
    () => import('@/components/FloatingLines/FloatingLines.vue'),
)
const showAnimatedBackground = useMediaQuery(
    '(min-width: 601px) and (prefers-reduced-motion: no-preference)',
)

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
            v-if="showAnimatedBackground"
            :enabled-waves="['top', 'middle', 'bottom']"
            :line-count="[10, 15, 20]"
            :line-distance="[8, 6, 4]"
            :bend-radius="5.0"
            :bend-strength="-0.5"
            :interactive="true"
            :parallax="true"
            id="lines"
        />
        <div v-else class="static-bg" />
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
.static-bg {
    position: fixed;
    inset: 0;
    background: linear-gradient(to bottom, #8905a3, #0057da);
    z-index: -1;
    pointer-events: none;
}

@media (max-width: 800px) {
    main {
        padding-bottom: calc(
            var(--bottom-nav-height) + env(safe-area-inset-bottom) + var(--page-padding)
        );
    }
}
</style>
