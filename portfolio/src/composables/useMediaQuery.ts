import { onMounted, onUnmounted, shallowRef, type ShallowRef } from 'vue'

/** Reactive state of a CSS media query */
export function useMediaQuery(query: string): Readonly<ShallowRef<boolean>> {
    // Client-only app: read the initial value synchronously to avoid a first-frame flash
    let mediaQuery: MediaQueryList | null = window.matchMedia(query)
    const matches = shallowRef(mediaQuery.matches)

    function update(event: MediaQueryListEvent | MediaQueryList): void {
        matches.value = event.matches
    }

    onMounted(() => mediaQuery?.addEventListener('change', update))
    onUnmounted(() => {
        mediaQuery?.removeEventListener('change', update)
        mediaQuery = null
    })

    return matches
}
