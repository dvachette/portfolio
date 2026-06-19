<script setup lang="ts">
import { useLangStore } from '@/stores/langStore';

const base = import.meta.env.BASE_URL;
const texts = useLangStore().texts;
</script>
<template>
    <div class="me">
        <h1>{{ texts.about.title }}</h1>
        <div class="content">
            <div class="text">
                <p>
                    {{ texts.about.content.p1 }}
                    <br />
                    <br />
                    {{ texts.about.content.p2 }}
                    <br />
                    <br />
                    {{ texts.about.content.p3 }}
                    <br />
                    <br />
                    {{ texts.about.content.p4 }}
                </p>
            </div>
            <div class="image">
                <img :src="`${base}assets/me.jpg`" :alt="texts.about.content.image_alt" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.me {
    padding: 2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.content {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #3178c6;
}
.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.me h1 {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5em;
    color: #eee;
}
.text {
    text-justify: distribute-all-lines;
    flex: 1;
    line-height: 1.6;
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
    .content {
        flex-direction: column-reverse;
        align-items: center;
    }
    .text {
        width: 90%;
        font-size: 1.3em;
        text-align: left;
    }
    h1 {
        font-size: 2em;
        width: 100%;
    }
}
</style>
