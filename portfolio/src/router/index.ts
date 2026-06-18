import { createRouter, createWebHistory } from 'vue-router'
import DefaultHomeView from '@/views/default/HomeView.vue'
import DefaultSkillView from '@/views/default/SkillsView.vue'
import DefaultProjectsView from '@/views/default/ProjectsView.vue'
import DefaultContactView from '@/views/default/ContactView.vue'
import DefaultProjectDetails from '@/components/default/ProjectDetail.vue'
import DefaultCreditsView from '@/views/default/CreditsView.vue'
import DefaultCompetenceDetail from '@/components/default/CompetenceDetail.vue'
import DefaultMeView from '@/views/default/MeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/default/',
            name: 'home',
            component: DefaultHomeView,
        },
        {
            path: '/default/skills',
            name: 'skills',
            component: DefaultSkillView,
            children: [
                {
                    path: ':id',
                    name: 'competence-details',
                    component: DefaultCompetenceDetail,
                    props: true,
                },
            ],
        },
        {
            path: '/default/projects',
            name: 'projects',
            component: DefaultProjectsView,
            children: [
                {
                    path: ':id',
                    name: 'project-details',
                    component: DefaultProjectDetails,
                    props: true,
                },
            ],
        },
        {
            path: '/default/contact',
            name: 'contact',
            component: DefaultContactView,
        },
        {
            path: '/default/credits',
            name: 'credits',
            component: DefaultCreditsView,
        },
        {
            path: '/default/me',
            name: 'me',
            component: DefaultMeView,
        },
    ],
})

export default router
