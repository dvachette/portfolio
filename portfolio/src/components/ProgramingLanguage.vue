<script setup lang="ts">
import type { ProgrammingLanguage } from '@/types/ProgramingLanguage';

const { name } = defineProps<{
    name: ProgrammingLanguage
}>()
const normalizedName = name.toLowerCase()
const base = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/';
const src = `${base}${normalizedName}/${normalizedName}-original.svg`
</script>
<template>
    <div class="language">
        <img :src="src" :alt="name" class="icon" />
    </div>
</template>
<style scoped>
.language {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #3338;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}   
</style>