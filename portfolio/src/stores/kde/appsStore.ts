// stores/kde/appsStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { KdeApp } from '@/types/kde/app';

const initialWindows: KdeApp[] = [
    {
        position: { x: 100, y: 100 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/home/HomeLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 1,
        metaData: { id: 'kde-home', name: 'Accueil', icon: 'https://unpkg.com/lucide-static@latest/icons/home.svg' },
    },
    {
        position: { x: 150, y: 120 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/me/MeLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 2,
        metaData: { id: 'kde-me', name: 'À propos de moi', icon: 'https://unpkg.com/lucide-static@latest/icons/user-round.svg' },
    },
    {
        position: { x: 200, y: 140 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/skills/SkillsLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 3,
        metaData: { id: 'kde-skills', name: 'Compétences', icon: 'https://unpkg.com/lucide-static@latest/icons/code-2.svg' },
    },
    {
        position: { x: 250, y: 160 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/projects/ProjectLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 4,
        metaData: { id: 'kde-projects', name: 'Projets', icon: 'https://unpkg.com/lucide-static@latest/icons/folder-open.svg' },
    },
    {
        position: { x: 300, y: 180 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/contact/ContactLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 5,
        metaData: { id: 'kde-contact', name: 'Contact', icon: 'https://unpkg.com/lucide-static@latest/icons/mail.svg' },
    },
    {
        position: { x: 350, y: 200 },
        size: { width: 800, height: 500 },
        component: () => import('@/components/kde/credits/CreditsLayout.vue'),
        minimized: true,
        maximized: false,
        zIndex: 6,
        metaData: { id: 'kde-credits', name: 'Crédits', icon: 'https://unpkg.com/lucide-static@latest/icons/book-open-text.svg' },
    },
];

export const useKdeWindowsStore = defineStore('kdeWindows', () => {
    const windows = ref<KdeApp[]>(initialWindows);

    function open(app: KdeApp): void {
        const existing = windows.value.find(w => w.metaData.id === app.metaData.id);
        if (existing) {
            focus(app.metaData.id);
            return;
        }
        const maxZ = windows.value.reduce((acc, w) => Math.max(acc, w.zIndex), 0);
        windows.value.push({ ...app, zIndex: maxZ + 1 });
    }

    function close(id: string): void {
        windows.value = windows.value.filter(w => w.metaData.id !== id);
    }

    function focus(id: string): void {
        const maxZ = windows.value.reduce((acc, w) => Math.max(acc, w.zIndex), 0);
        const win = windows.value.find(w => w.metaData.id === id);
        if (win) {
            win.zIndex = maxZ + 1;
        }
    }

    function minimize(id: string): void {
        const win = windows.value.find(w => w.metaData.id === id);
        if (win) {
            win.minimized = true;
        }
    }

    function maximize(id: string): void {
        const win = windows.value.find(w => w.metaData.id === id);
        if (!win) return;

        if (!win.maximized) {
            win.savedPosition = { ...win.position };
            win.savedSize = { ...win.size };
            win.maximized = true;
            focus(id);  // Mettre au premier plan après avoir maximisé
        } else {
            win.maximized = false;
            if (win.savedPosition) win.position = { ...win.savedPosition };
            if (win.savedSize) win.size = { ...win.savedSize };
        }
    }

    function unminimize(id: string): void {
        const win = windows.value.find(w => w.metaData.id === id);
        if (!win) return;
        focus(id);        // zIndex d'abord
        win.minimized = false;  // puis affichage
    }

    return { windows, open, close, focus, minimize, unminimize, maximize };

});