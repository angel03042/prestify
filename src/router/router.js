import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import registro from '@/views/registro.vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/DashboardHomeView.vue'

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
    component: DashboardLayout,
    redirect: 'dashboard/home',
    children: [
      {
        path: 'home',
        name: 'dashboard-home',
        component: DashboardHome
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router