<script setup lang="ts">
const { name } = defineProps<{
    name: string,
    displayName?: string
}>()
const base = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/';
const src = `${base}${name}/${name}-original.svg`
</script>
<template>
    <div class="language">
        <img :src="src" :alt="name" class="icon" />
        <span>{{ displayName || name }}</span>
    </div>
</template>
<style scoped>
.language {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    height: 120px;
    color: #eee;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    background-color: #3338;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    transition: transform 0.2s;
}   

</style>