import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import NewAdvert from '../views/NewAdvert.vue'
import AdvertsResults from '../views/AdvertsResults.vue'
import Advert from '../views/Advert.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Liked from '../views/Liked.vue'
import UserProfile from '../views/UserProfile.vue'
import Help from '../views/Help.vue'
import ChangeUserInfo from '../views/ChangeUserInfo.vue'
import Messages from '../views/Messages.vue'
import Chat from '../views/Chat.vue'

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
    component: Advert,
    props: true,
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
  },
  {
    path: '/liked',
    name: 'Liked',
    component: Liked,
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true,
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
  },
  {
    path: '/change-user-info',
    name: 'ChangeUserInfo',
    component: ChangeUserInfo,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat,
    props: true,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router