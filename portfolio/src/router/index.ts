import { createRouter, createWebHistory } from 'vue-router'
import DefaultHomeView from '@/views/default/HomeView.vue'
import DefaultSkillView from '@/views/default/SkillsView.vue'
import DefaultProjectsView from '@/views/default/ProjectsView.vue'
import DefaultContactView from '@/views/default/ContactView.vue'
import DefaultProjectDetails from '@/components/default/ProjectDetail.vue'
import DefaultCreditsView from '@/views/default/CreditsView.vue'
import DefaultCompetenceDetail from '@/components/default/CompetenceDetail.vue'
import DefaultMeView from '@/views/default/MeView.vue'
import DefaultLayout from '@/views/default/DefaultLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "root",
            redirect: "/default/"
        },
        {
            path: '/default',
            component: DefaultLayout,
            children: [
                {
                    path: '',
                    name: 'default-home',
                    component: DefaultHomeView,
                },
                {
                    path: 'skills',
                    name: 'default-skills',
                    component: DefaultSkillView,
                    children: [
                        {
                            path: ':id',
                            name: 'default-competence-details',
                            component: DefaultCompetenceDetail,
                            props: true,
                        },
                    ],
                },
                {
                    path: 'projects',
                    name: 'default-projects',
                    component: DefaultProjectsView,
                    children: [
                        {
                            path: ':id',
                            name: 'default-project-details',
                            component: DefaultProjectDetails,
                            props: true,
                        },
                    ],
                },
                {
                    path: 'contact',
                    name: 'default-contact',
                    component: DefaultContactView,
                },
                {
                    path: 'credits',
                    name: 'default-credits',
                    component: DefaultCreditsView,
                },
                {
                    path: 'me',
                    name: 'default-me',
                    component: DefaultMeView,
                },
            ],
        },
    ],
})

export default router
