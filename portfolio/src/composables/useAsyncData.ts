import {
    computed,
    onScopeDispose,
    shallowRef,
    watch,
    type ComputedRef,
    type WatchSource,
} from 'vue'

export interface UseAsyncDataOptions {
    /** Reload whenever this source changes (e.g. a route param) */
    watch?: WatchSource
}

export interface UseAsyncData<T> {
    data: ComputedRef<T | null>
    pending: ComputedRef<boolean>
    error: ComputedRef<string | null>
}

/**
 * Loads data with loading/error state. Results of outdated requests (source changed or
 * component unmounted meanwhile) are ignored.
 */
export function useAsyncData<T>(
    load: () => Promise<T>,
    options: UseAsyncDataOptions = {},
): UseAsyncData<T> {
    const data = shallowRef<T | null>(null)
    const pending = shallowRef(true)
    const error = shallowRef<string | null>(null)

    async function execute(isCurrent: () => boolean): Promise<void> {
        data.value = null
        pending.value = true
        error.value = null
        try {
            const result = await load()
            if (isCurrent()) data.value = result
        } catch (cause: unknown) {
            if (isCurrent()) error.value = cause instanceof Error ? cause.message : String(cause)
        } finally {
            if (isCurrent()) pending.value = false
        }
    }

    if (options.watch) {
        watch(
            options.watch,
            (_value, _previous, onCleanup) => {
                let current = true
                onCleanup(() => {
                    current = false
                })
                void execute(() => current)
            },
            { immediate: true },
        )
    } else {
        let current = true
        onScopeDispose(() => {
            current = false
        })
        void execute(() => current)
    }

    // Read-only views: state only changes through the loader
    return {
        data: computed(() => data.value),
        pending: computed(() => pending.value),
        error: computed(() => error.value),
    }
}
