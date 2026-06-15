<script setup lang="ts">
import { ref } from 'vue'
interface CompetenceLevelProps {
    level_title: string
    level: number
    max: number
}
const { level, max } = defineProps<CompetenceLevelProps>()
const isPopupVisible = ref(false)
function showPopup() {
    isPopupVisible.value = true
}
function hidePopup() {
    isPopupVisible.value = false
}
</script>
<template>
    <div class="competence" @mouseover="showPopup" @click="showPopup">
        <div class="competence_level" :style="`background-color: hsl(${(level) * (100 / (max))}, 100%, 50%)`"></div>
    </div>
    <div class="popup" v-if="isPopupVisible" @mouseleave="hidePopup" @click="hidePopup">
        <p>{{ level_title }}</p>
    </div>
</template>
<style scoped>
/*
    The level indicator is a colored circle 
    - green for "acquired"
    - orange for "acquiring"
    - red for "not_acquired"
*/
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
.competence {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.competence_level {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
</style>
