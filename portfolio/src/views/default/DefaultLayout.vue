<script setup lang="ts">
import FloatingLines from '@/components/default/FloatingLines/FloatingLines.vue';
import HeaderComponent from '@/components/default/HeaderComponent.vue';

</script>
<template>
    <HeaderComponent />
    <main>
        <FloatingLines
            :enabled-waves="['top', 'middle', 'bottom']"
            :line-count="[10, 15, 20]"
            :line-distance="[8, 6, 4]"
            :bend-radius="5.0"
            :bend-strength="-0.5"
            :interactive="true"
            :parallax="true"
            id="lines"
        />
        <RouterView />
        <div class="mobile-bg" />
    </main>
</template>

<style scoped>
main {
    padding: 2em;
}
#lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
.mobile-bg {
  display: none;
}

@media (max-width: 600px) {
    .mobile-bg {
        display: block;
        position: fixed;
        inset: 0;
        background: linear-gradient(to bottom, #8905a3, #0057da);
        z-index: -1;
        pointer-events: none;
    } 

    main {
        background: transparent;
    }
    #lines {
        display: none;
    }

}
</style>
<style>
html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}
</style>
