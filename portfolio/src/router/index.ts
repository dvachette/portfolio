import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
    interface RouteMeta {
        /** Page title, shown before the site name in the browser tab */
        title?: string
    }
}

const SITE_TITLE = 'Donatien Vachette – Développeur informatique - Lyon'

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
            component: () => import('@/views/CompetencesView.vue'),
            meta: { title: 'Compétences' },
            children: [
                {
                    path: ':id',
                    name: 'competence-details',
                    component: () => import('@/components/CompetenceDetail.vue'),
                    props: true,
                },
            ],
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('@/views/ProjectsView.vue'),
            meta: { title: 'Projets' },
            children: [
                {
                    path: ':id',
                    name: 'project-details',
                    component: () => import('@/components/ProjectDetail.vue'),
                    props: true,
                },
            ],
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/ContactView.vue'),
            meta: { title: 'Contact' },
        },
        {
            path: '/credits',
            name: 'credits',
            component: () => import('@/views/CreditsView.vue'),
            meta: { title: 'Crédits' },
        },
        {
            path: '/parcours',
            name: 'career',
            component: () => import('@/views/CareerView.vue'),
            meta: { title: 'Parcours' },
        },
        {
            path: '/interets',
            name: 'interests',
            component: () => import('@/views/InterestsView.vue'),
            meta: { title: "Centres d'intérêt" },
        },
        {
            // Legacy "about me" page
            path: '/me',
            redirect: { name: 'career' },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
            meta: { title: 'Page introuvable' },
        },
    ],
})

router.afterEach((to) => {
    // Child routes (detail modals) inherit the title of their parent page
    const title = [...to.matched].reverse().find((record) => record.meta.title)?.meta.title
    document.title = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
})

export default router
