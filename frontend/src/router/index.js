import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import NewAdverst from '../views/NewAdverst.vue'
import AdverstsResults from '../views/AdverstsResults.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-adverst',
    name: 'NewAdverst',
    component: NewAdverst
  },
  {
  path: '/adversts-results',
  name: 'AdverstsResults',
  component: AdverstsResults,
  },
  {
  path: '/login',
  name: 'Login',
  component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router