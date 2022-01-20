import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import NewAuction from '../views/NewAuction.vue'
import AuctionsResults from '../views/AuctionsResults.vue'
import Auction from '../views/Auction.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Likeds from '../views/Likeds.vue'
import UserProfile from '../views/UserProfile.vue'
import Help from '../views/Help.vue'
import ChangeUserInfo from '../views/ChangeUserInfo.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Messages from '../views/Messages.vue'
import Chat from '../views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-auction',
    name: 'NewAuction',
    component: NewAuction
  },
  {
    path: '/auctions-results',
    name: 'AuctionsResults',
    component: AuctionsResults,
  },
  {
    path: '/auction/:id',
    name: 'Auction',
    component: Auction,
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
    path: '/likeds',
    name: 'Likeds',
    component: Likeds,
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
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