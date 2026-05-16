import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetailsPage from '../pages/ProjectDetailsPage.vue'
import TransparencyPage from '../pages/TransparencyPage.vue'
import ActivitiesPage from '../pages/ActivitiesPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/projects', component: ProjectsPage },
    { path: '/projects/:id', component: ProjectDetailsPage },
    { path: '/transparency', component: TransparencyPage },
    { path: '/activities', component: ActivitiesPage },
    { path: '/contact-us', component: ContactPage },
    { path: '/privacy', component: PrivacyPolicyPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
