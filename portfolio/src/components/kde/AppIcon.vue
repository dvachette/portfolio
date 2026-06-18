<script setup lang="ts">
import type { AppIcon } from '@/types/kde/appBar';

const { app, minimized } = defineProps<{
    app: AppIcon
    minimized: boolean
}>();

const emit = defineEmits<{ appClicked: [appId: string] }>();
</script>

<template>
    <div class="app-icon" :class="{ 'app-icon--minimized': minimized }" @click="emit('appClicked', app.id)">
        <img :src="app.icon" :alt="app.name" class="app-icon__image" :title="app.name" />
        <div class="app-icon__dot" />
    </div>
</template>

<style scoped lang="scss">
.app-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 3px;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
}

.app-icon__image {
    width: 48px;
    height: 48px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    transition: opacity 0.2s;

    .app-icon--minimized & {
        opacity: 0.4;
    }
}

.app-icon__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.2s;

    .app-icon--minimized & {
        background-color: #888;
    }

    :not(.app-icon--minimized) & {
        background-color: #4fc3f7;
    }
}
</style>