import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CompetencesView from '@/views/CompetencesView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectDetails from '@/components/ProjectDetail.vue'
import CreditsView from '@/views/CreditsView.vue'
import CompetenceDetail from '@/components/CompetenceDetail.vue'
import MeView from '@/views/MeView.vue'

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
            children: [
                {
                    path: ':id',
                    name: 'competence-details',
                    component: CompetenceDetail,
                    props: true,
                },
            ],
        },
        {
            path: '/projects',
            name: 'projects',
            component: ProjectsView,
            children: [
                {
                    path: ':id',
                    name: 'project-details',
                    component: ProjectDetails,
                    props: true,
                },
            ],
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
        },
        {
            path: '/credits',
            name: 'credits',
            component: CreditsView,
        },
        {
            path: '/me',
            name: 'me',
            component: MeView,
        },
    ],
})

export default router
