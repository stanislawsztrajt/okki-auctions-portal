import {createRouter, createWebHistory} from 'vue-router'


import Home from '../views/Home.vue'

import NewAuction from '../views/NewAuction.vue'
import AuctionsResults from '../views/AuctionsResults.vue'
import Auction from '../views/Auction.vue'
import Likeds from '../views/Likeds.vue'

import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Register from '../views/Register.vue'
import ChangeUserInfo from '../views/ChangeUserInfo.vue'
import UserProfile from '../views/UserProfile.vue'
import Dashboard from '../views/Dashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ReportedAuctions from '../views/ReportedAuctions.vue'
import HiddenAuctions from '../views/HiddenAuctions.vue'
import ReportedComments from '../views/ReportedComments.vue'
import HiddenComments from '../views/HiddenComments.vue'

import Messages from '../views/Messages.vue'
import Chat from '../views/Chat.vue'
import Rodo from '../views/Rodo.vue'
import Help from '../views/Help.vue'

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
    path: '/dashboard/change-user-info',
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
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin-dashboard/reported-auctions',
    name: 'ReportedAuctions',
    component: ReportedAuctions,
  },
  {
    path: '/admin-dashboard/hidden-auctions',
    name: 'HiddenAuctions',
    component: HiddenAuctions,
  },
  {
    path: '/admin-dashboard/reported-comments',
    name: 'ReportedComments',
    component: ReportedComments,
  },
  {
    path: '/admin-dashboard/hidden-comments',
    name: 'HiddenComments',
    component: HiddenComments,
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
  {
    path: '/rodo',
    name: 'Rodo',
    component: Rodo
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router