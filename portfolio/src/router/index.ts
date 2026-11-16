import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CompetencesView from '@/views/CompetencesView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectDetails from '@/components/ProjectDetail.vue'
import CreditsView from '@/views/CreditsView.vue'
import CompetenceDetail from '@/components/CompetenceDetail.vue'
import CareerView from '@/views/CareerView.vue'
import InterestsView from '@/views/InterestsView.vue'

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
            path: '/parcours',
            name: 'career',
            component: CareerView,
        },
        {
            path: '/interets',
            name: 'interests',
            component: InterestsView,
        },
        {
            // Legacy "about me" page
            path: '/me',
            redirect: { name: 'career' },
        },
    ],
})

export default router
