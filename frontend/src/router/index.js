import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import NewAdvert from '../views/NewAdvert.vue'
import AdvertsResults from '../views/AdvertsResults.vue'
import Advert from '../views/Advert.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-advert',
    name: 'NewAdvert',
    component: NewAdvert
  },
  {
    path: '/adverts-results',
    name: 'AdvertsResults',
    component: AdvertsResults,
  },
  {
    path: '/advert/:id',
    name: 'Advert',
    props: true,
    component: Advert
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
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router