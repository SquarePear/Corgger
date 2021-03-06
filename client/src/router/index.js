import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const history = createWebHistory()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: () => import('../views/Auth.vue')
  },
  {
    path: '/auth/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/user/:username/:tag',
    name: 'User',
    component: () => import('../views/Profile.vue'),
    props: true
  }
]

export default createRouter({ history, routes })
