import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Header from '../components/container/helper/Header.vue'
import About from '../views/About.vue'
import Register from '../views/Auth/Register.vue'
import Login from '../views/Auth/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
  path: '/registrer/craftman/informations',
  name: 'ArtisanInfo',
  component: () => import('@/views/Auth/Craftsman.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router