<script setup lang="ts">
import { useLangStore } from '@/stores/langStore';
const texts = useLangStore().texts;
</script>
<template>
    <div class="home">
        <h1>{{texts.home.title}}</h1>
        <p>
            {{texts.home.content.p1}}
            <br />
            <br />
            {{texts.home.content.p2}}
        </p>
    </div>
</template>
<style scoped>
.home {
    color: #eee;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: default;
    justify-self: center;
    align-self: center;
}
.home h1 {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5em;
}
p {
    font-size: 1.25em;
    color: #ddd;
    text-align: center;
    background-color: #333c;
    padding: 1em;
    border-radius: 10px;
    width: 80%;
    margin: 2em auto;
    cursor: default;
}

@media (max-width: 600px) {
    p {
        width: 80%;
        font-size: 1.4em;
        text-align: left;
    }
}
</style>
