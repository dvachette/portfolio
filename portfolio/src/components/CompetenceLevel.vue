<script setup lang="ts">
interface Props {
    level: 'acquired' | 'acquiring' | 'not acquired'
}
const { level } = defineProps<Props>()
</script>
<template>
    <div class="competence">
        <div class="competence_level" :class="`competence_level--${level}`"></div>
    </div>
</template>
<style scoped>
/*
    The level indicator is a colored circle 
    - green for "acquired"
    - orange for "acquiring"
    - red for "not acquired"
*/
.competence {
    display: flex;
    align-items: center;
    justify-content: center;
}
.competence_level {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.competence_level--acquired {
    background-color: green;
}
.competence_level--acquiring {
    background-color: orange;
}
.competence_level--not\ acquired {
    background-color: red;
}
</style>
