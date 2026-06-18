<script setup lang="ts">
import type { AppBarIcon } from '@/types/kde/appBar';

const { app } = defineProps<{
    app: AppBarIcon
}>()

const emit = defineEmits<{appClicked : [appId: string]}>();
</script>
<template>
    <div class="app-icon" @click="emit('appClicked', app.id)">
        <img :src="app.icon" :alt="app.name" class="app-icon__image" :title="app.name" />
    </div>
</template>
<style scoped lang="scss">
.app-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
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
}

</style>