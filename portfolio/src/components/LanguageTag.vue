<script setup lang="ts">
import type { ProgrammingLanguage } from '@/types/ProgramingLanguage'
const { language } = defineProps<{ language: ProgrammingLanguage }>()
let classLanguage = language.toLowerCase()
if (classLanguage === 'c#') {
    classLanguage = 'csharp'
}
if (classLanguage === 'c++') {
    classLanguage = 'cpp'
}
if (classLanguage === 'html/css') {
    classLanguage = 'html_css'
}
</script>
<template>
    <div :class="['language-tag', `language-tag--${classLanguage}`]">
        {{ language }}
    </div>
</template>
<style scoped>
/**
export type ProgrammingLanguage =
    | 'TypeScript'
    | 'JavaScript'
    | 'Python'
    | 'Java'
    | 'C#'
    | 'C++'
    | 'PHP'
    | 'Kotlin'
    | 'Assembly'
    | 'C'
    | 'Vue'
    | 'React'
    | 'Angular'
    | 'Bash'
    | 'HTML/CSS'

*/
.language-tag {
    display: inline-block;
    padding: 0.25em 0.75em;
    background-color: #f0f0f0;
    border-radius: 100px;
    font-size: 1em;
    font-weight: bold;
    font-family: monospace;
    color: #eee;
}
.language-tag--javascript {
    background-color: #f7df1e80;
    border: #f7df1e solid 3px;
}
.language-tag--typescript {
    background-color: #3178c680;
    border: #3178c6 solid 3px;
}
.language-tag--python {
    background-color: #30699880;
    border: #306998 solid 3px;
}
.language-tag--java {
    background-color: #b0721980;
    border: #b07219 solid 3px;
}
.language-tag--csharp {
    background-color: #17860080;
    border: #178600 solid 3px;
}
.language-tag--cpp {
    background-color: #f34b7d80;
    border: #f34b7d solid 3px;
}
.language-tag--php {
    background-color: #777bb480;
    border: #777bb4 solid 3px;
}
.language-tag--kotlin {
    background-color: #0095d580;
    border: #0095d5 solid 3px;
}
.language-tag--assembly {
    background-color: #6e4c1e80;
    border: #6e4c1e solid 3px;
}
.language-tag--c {
    background-color: #b3000080;
    border: #b30000 solid 3px;
}
.language-tag--vue {
    background-color: #42b88380;
    border: #42b883 solid 3px;
}
.language-tag--react {
    background-color: #61dafb80;
    border: #61dafb solid 3px;
}
.language-tag--angular {
    background-color: #dd003180;
    border: #dd0031 solid 3px;
}
.language-tag--bash {
    background-color: #89e05180;
    border: #89e051 solid 3px;
}
.language-tag--html_css {
    background-color: #e34c2680;
    border: #e34c26 solid 3px;
}
.language-tag--sql {
    background-color: #e38c0080;
    border: #e38c00 solid 3px;
}
</style>
