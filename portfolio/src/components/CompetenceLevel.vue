<script setup lang="ts">
import { ref } from 'vue'
interface Props {
    level: 'acquired' | 'acquiring' | 'not_acquired'
}
const { level } = defineProps<Props>()
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
        <div class="competence_level" :class="`competence_level--${level}`"></div>
    </div>
    <div class="popup" v-if="isPopupVisible" @mouseleave="hidePopup" @click="hidePopup">
        <p v-if="level === 'acquired'">Cette compétence est acquise.</p>
        <p v-else-if="level === 'acquiring'">Cette compétence est en cours d'acquisition.</p>
        <p v-else>Cette compétence n'est pas encore acquise.</p>
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
.competence_level--acquired {
    background-color: rgb(59, 197, 4);
}
.competence_level--acquiring {
    background-color: orange;
}
.competence_level--not_acquired {
    background-color: red;
}
</style>
