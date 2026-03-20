import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompetencesView from '../views/CompetencesView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/competences',
            name: 'competences',
            component: CompetencesView,
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsView,
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
        },
    ],
})

export default router
