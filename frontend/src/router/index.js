import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'

import NewAuction from '../views/NewAuction.vue'
import EditAuction from '../views/EditAuction.vue'
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

import Conversations from '../views/Conversations.vue'
import Chat from '../views/Chat.vue'
import Rodo from '../views/Rodo.vue'
import Info from '../views/Info.vue'
import FAQ from '../views/FAQ.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import TermsOfUse from '../views/TermsOfUse.vue'
import Contact from '../views/Contact.vue'
import ViewNotFound from '../views/ViewNotFound.vue'

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
    path: '/edit-auction/:id',
    name: 'EditAuction',
    component: EditAuction,
    props: true,
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
    path: '/info',
    name: 'Info',
    component: Info,
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
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
    path: '/conversations',
    name: 'Conversations',
    component: Conversations,
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
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: TermsOfUse
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/:catchAll(.*)',
    name: 'ViewNotFound',
    component: ViewNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

export default router