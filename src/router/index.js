import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import NewAdverst from '../views/NewAdverst.vue'
import AdverstsResults from '../views/AdverstsResults.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router