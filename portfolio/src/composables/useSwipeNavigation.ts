import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mobileNavOrder, type NavRouteName } from '@/router/navItems'

export type SwipeDirection = 'left' | 'right'

const MOBILE_QUERY = '(max-width: 800px)'
/** Minimal horizontal distance (px) for a swipe */
const MIN_DISTANCE = 60
/** Slower gestures are considered as scroll/drag, not swipes */
const MAX_DURATION = 600
/** Ignore gestures starting on screen edges: they belong to the OS/browser (back gesture) */
const EDGE_GUARD = 24
/** Elements where a horizontal gesture has its own meaning */
const IGNORED_SELECTOR = 'input, textarea, select, [contenteditable], [data-no-swipe]'

function isInsideHorizontalScroller(target: EventTarget | null): boolean {
    let el = target instanceof Element ? target : null
    while (el && el !== document.body) {
        if (el.matches(IGNORED_SELECTOR)) return true
        const overflowX = getComputedStyle(el).overflowX
        if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth) {
            return true
        }
        el = el.parentElement
    }
    return false
}

/**
 * On mobile, a horizontal swipe navigates to the previous/next page of the main navigation.
 * Returns the direction of the last swipe navigation (null for regular navigation), so the
 * caller can animate the page change accordingly.
 */
export function useSwipeNavigation() {
    const router = useRouter()
    const direction = ref<SwipeDirection | null>(null)
    let start: { x: number; y: number; time: number } | null = null
    let mediaQuery: MediaQueryList | null = null

    function onTouchStart(event: TouchEvent): void {
        start = null
        if (!mediaQuery?.matches || event.touches.length !== 1) return
        const touch = event.touches[0]!
        if (touch.clientX < EDGE_GUARD || touch.clientX > window.innerWidth - EDGE_GUARD) return
        if (isInsideHorizontalScroller(event.target)) return
        start = { x: touch.clientX, y: touch.clientY, time: event.timeStamp }
    }

    function onTouchEnd(event: TouchEvent): void {
        if (!start) return
        const touch = event.changedTouches[0]!
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        const elapsed = event.timeStamp - start.time
        start = null

        if (elapsed > MAX_DURATION) return
        // Mostly horizontal gestures only, so vertical scrolling never triggers a navigation
        if (Math.abs(dx) < MIN_DISTANCE || Math.abs(dx) < 2 * Math.abs(dy)) return

        const current = router.currentRoute.value
        // Detail modals are child routes: no page swipe while one is open
        if (current.matched.length !== 1) return
        const index = mobileNavOrder.indexOf(current.name as NavRouteName)
        if (index === -1) return
        const target = mobileNavOrder[index + (dx < 0 ? 1 : -1)]
        if (!target) return

        direction.value = dx < 0 ? 'left' : 'right'
        void router.push({ name: target })
    }

    function onTouchCancel(): void {
        start = null
    }

    onMounted(() => {
        mediaQuery = window.matchMedia(MOBILE_QUERY)
        document.addEventListener('touchstart', onTouchStart, { passive: true })
        document.addEventListener('touchend', onTouchEnd, { passive: true })
        document.addEventListener('touchcancel', onTouchCancel, { passive: true })
    })

    onUnmounted(() => {
        document.removeEventListener('touchstart', onTouchStart)
        document.removeEventListener('touchend', onTouchEnd)
        document.removeEventListener('touchcancel', onTouchCancel)
    })

    return { direction }
}
