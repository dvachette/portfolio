<script lang="ts">
/** Number of open modals: the page behind stays inert until the last one closes */
let openModals = 0

/** Makes the app (everything but the teleported modals) non-interactive */
function setBackgroundInert(inert: boolean): void {
    document.getElementById('app')?.toggleAttribute('inert', inert)
}
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const CLOSE_ANIMATION_DURATION = 300 // ms, must match the CSS animations below

const emit = defineEmits<{
    /** Fired once the closing animation is over */
    closed: []
}>()

const titleId = useId()
const dialogRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
const scrollRatio = ref(0)
const isClosing = ref(false)
let previouslyFocused: HTMLElement | null = null
let previousBodyOverflow = ''

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function close(): void {
    if (isClosing.value) return
    isClosing.value = true
    setTimeout(() => emit('closed'), CLOSE_ANIMATION_DURATION)
}

function onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        close()
        return
    }
    // Keep keyboard focus inside the dialog
    if (event.key === 'Tab' && dialogRef.value) {
        const focusable = Array.from(dialogRef.value.querySelectorAll<HTMLElement>(FOCUSABLE))
        if (focusable.length === 0) return
        const first = focusable[0]!
        const last = focusable[focusable.length - 1]!
        if (!dialogRef.value.contains(document.activeElement)) {
            // Focus got lost (e.g. click on the backdrop): bring it back into the dialog
            event.preventDefault()
            ;(event.shiftKey ? last : first).focus()
        } else if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    }
}

/** Fades the "scroll down" hint out as the bottom of the content gets close */
function updateScrollHint(): void {
    const el = dialogRef.value
    if (!el) return
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight
    scrollRatio.value = Math.min(remaining / 80, 1)
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
    previouslyFocused = document.activeElement as HTMLElement | null
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    openModals++
    setBackgroundInert(true)
    document.addEventListener('keydown', onKeyDown)
    await nextTick()
    closeButtonRef.value?.focus({ preventScroll: true })
    if (dialogRef.value) {
        // Content arrives asynchronously: recompute the hint whenever it changes size
        resizeObserver = new ResizeObserver(updateScrollHint)
        Array.from(dialogRef.value.children).forEach((child) => resizeObserver!.observe(child))
    }
    updateScrollHint()
})

onUnmounted(() => {
    document.body.style.overflow = previousBodyOverflow
    openModals = Math.max(0, openModals - 1)
    if (openModals === 0) setBackgroundInert(false)
    document.removeEventListener('keydown', onKeyDown)
    resizeObserver?.disconnect()
    if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true })
    }
})

defineExpose({ close })
</script>

<template>
    <Teleport to="body">
        <div :class="['modal', { 'modal--closing': isClosing }]">
            <div class="modal__backdrop" @click="close" />
            <div
                ref="dialogRef"
                class="modal__dialog"
                role="dialog"
                aria-modal="true"
                :aria-labelledby="titleId"
                @scroll.passive="updateScrollHint"
            >
                <header class="modal__header">
                    <div :id="titleId" class="modal__title">
                        <slot name="title" />
                    </div>
                    <button
                        ref="closeButtonRef"
                        type="button"
                        class="modal__close"
                        aria-label="Fermer"
                        title="Fermer (Échap)"
                        @click="close"
                    >
                        <AppIcon name="x" />
                    </button>
                </header>
                <div class="modal__body">
                    <slot />
                </div>
                <span
                    class="modal__scroll-hint"
                    :style="{ opacity: scrollRatio }"
                    aria-hidden="true"
                    >▼</span
                >
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__backdrop {
    position: absolute;
    inset: 0;
    background-color: #000a;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.3s ease;
}

.modal__dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    width: min(70vw, 1100px);
    height: 70vh;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    border-radius: var(--radius-md);
    background-color: #444757;
    box-shadow: 0 0 18px rgba(175, 175, 175, 0.4);
    animation: zoomIn 0.3s ease;
}

.modal__dialog::-webkit-scrollbar {
    display: none;
}

.modal--closing {
    pointer-events: none;
}

.modal--closing .modal__backdrop {
    animation: fadeOut 0.3s ease forwards;
}

.modal--closing .modal__dialog {
    animation: zoomOut 0.3s ease forwards;
}

.modal__header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.75rem 0.5rem 1.25rem;
    background-color: var(--color-surface-solid);
}

.modal__title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 0;
}

.modal__title :deep(h1) {
    margin: 0;
    font-size: 2em;
    color: var(--color-text-strong);
    overflow-wrap: anywhere;
}

.modal__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 2.75rem;
    height: 2.75rem;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--color-text-strong);
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.modal__close:hover {
    background-color: #fff2;
}

.modal__body {
    flex: 1;
}

.modal__scroll-hint {
    position: sticky;
    bottom: 12px;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1.6em;
    color: #ccc;
    pointer-events: none;
    transition: opacity 0.3s ease;
    animation: bounce 1.2s infinite ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}

@keyframes zoomIn {
    from {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes zoomOut {
    to {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
}

@keyframes slideDown {
    to {
        transform: translateY(100%);
    }
}

@keyframes bounce {
    50% {
        transform: translateY(6px);
    }
}

@media (max-width: 1000px) {
    .modal__dialog {
        width: 90vw;
        height: 80vh;
    }
}

/* Mobile: full-screen sheet sliding from the bottom */
@media (max-width: 600px) {
    .modal__dialog {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding-bottom: env(safe-area-inset-bottom);
        animation-name: slideUp;
    }

    .modal--closing .modal__dialog {
        animation-name: slideDown;
    }

    .modal__header {
        padding-top: calc(0.5rem + env(safe-area-inset-top));
    }

    .modal__title :deep(h1) {
        font-size: 1.5em;
    }
}
</style>
