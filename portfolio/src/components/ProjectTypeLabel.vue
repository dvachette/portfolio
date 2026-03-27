<script setup lang="ts">
import type { ProjectType } from '@/types/ProjectType';
import { ref } from 'vue'
interface CompetenceLevelProps {
    projectType: ProjectType
}
const { projectType } = defineProps<CompetenceLevelProps>()
const isPopupVisible = ref(false)
const base = import.meta.env.BASE_URL
function showPopup() {
    isPopupVisible.value = true
}
function hidePopup() {
    isPopupVisible.value = false
}


</script>
<template>
    <div class="project_type" @mouseover="showPopup" @click="showPopup">
        <img :src="`${base}images/${projectType === 'Academic' ? 'academic.png' : 'personal.png'}`" alt="Type de projet" class="project_type_icon" :class="`project_type--${projectType}`" />    
    </div>
    <div class="popup" v-if="isPopupVisible" @mouseleave="hidePopup" @click="hidePopup">
        <p v-if="projectType === 'Academic'">Projet scolaire</p>
        <p v-else-if="projectType === 'Personal'">Projet personnel</p>
        <p v-else>Type de projet inconnu</p>
    </div>
</template>
<style scoped>
.popup {
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    cursor: default;
}
.project_type {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.project_type_icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>