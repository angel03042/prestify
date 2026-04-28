import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import registro from '@/views/registro.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/registrarse',
    name: 'registrase',
    component: registro
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router