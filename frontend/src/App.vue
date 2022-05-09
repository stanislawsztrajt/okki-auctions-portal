<template >
  <div id="app">
    <Navbar
      v-if="showNavbarAndFooter && !isBlocked"
      :conversations="conversations"
    />
    <button
      v-if="$route.path !== '/'"
      style="box-shadow: 0 0 2em rgb(30, 58, 138);"
      class="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-10 md:right-10 bg-blue-900 text-white text-lg px-8 py-3 font-semibold flex justify-center items-center rounded-lg hover:bg-blue-800 transition duration-150 z-50"
      @click="() => $router.go(-1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
    <BlockedUser v-if="isBlocked"/>
    <router-view v-else class="min-h-screen" />
    <div v-if="cookieModalShow" class="w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center">
      <div class="fixed z-50 bottom-0 w-screen bg-white text-green-600 py-6 px-10 md:px-20 lg:px-40 flex flex-col justify-around">
        <h1 class="font-bold text-xl">Informacja o plikach cookies</h1>
        <p class="text-gray-600 mt-2 mb-4 md:text-lg">Pliki cookies które wykorzystujemy na naszej stronie są wykorzystywane tylko i wyłącznie do prawidłowego działania strony, nie gromadzimy żadnych danych dotyczących użytkowników. Dowiedz się więcej w <router-link to="privacy-policy" class="rodo-link">Polityce prywatności</router-link>.</p>
        <button @click="acceptUserCookie" class="h-10 w-40 bg-green-600 text-white font-bold flex items-center justify-center">Akceptuję</button>
      </div>
      <div class="absolute bg-gray-500 opacity-30 z-10 w-screen h-screen top-0 left-0"></div>
    </div>
    <Footer v-if="showNavbarAndFooter && !isBlocked" />
  </div>
</template>

<script>
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, user, jwt, userAcceptedCookie, fetchLastSeenMessages } from './constants/const-variables';
import { socket } from '../config/web-sockets.js';

import BlockedUser from './components/BlockedUser.vue'
import Navbar from "./components/Navbar.vue"
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    BlockedUser,
    Navbar,
    Footer
  },
  data(){
    return{
      isBlocked: false,
      cookieModalShow: false,
      showNavbarAndFooter: true,
      conversations: []
    }
  },
  async created(){
    if(!userAcceptedCookie) {
      this.cookieModalShow = true;
    }

    if(jwt){
      await axios.get(`${API_URL}/users/me`, authorization)
      .catch((error) => {
        if(error.response.data.message === 'Your account has been blocked by the administrator.'){
          this.isBlocked = true;
        }
      })

      this.fetchUserConversations()

      socket.on('newConversation', async ({ conversation }) => {
        fetchLastSeenMessages(conversation)

        const room = conversation.code
        socket.emit('joinToNewRoom', { room })
      })
      socket.on('createdNewConversation', async ({ conversation }) => {
        const room = conversation.code
        socket.emit('joinToNewRoom', { room })
      })
    }
  },
  methods: {
    async acceptUserCookie() {
      await this.$cookies.set('user-accepted-cookies', true, '10y')
      this.cookieModalShow = false
    },
    async fetchUserConversations() {
      axios.get(`${API_URL}/user-conversations`, authorization)
      .then((res) => {
        this.conversations = res.data
        const userRooms = []
        const conversationsSecondaryUserIds = []

        this.conversations.forEach(conversation => {
          userRooms.push(conversation.code)
          conversationsSecondaryUserIds.push(conversation.code.replace(user.id, ''))
        })
        this.joinUserToSocketRooms(userRooms, conversationsSecondaryUserIds)
      })
    },
    async joinUserToSocketRooms(roomsToJoin, conversationsSecondaryUserIds) {
      socket.emit('join', ({ rooms: roomsToJoin, user_id: user.id, conversationsSecondaryUserIds }));
    }
  },
  watch: {
    $route(route) {
      window.scrollTo(0, 0)
      this.showNavbarAndFooter = route.path !== '/login' && route.path !== '/register' && route.path !== '/forgot-password' && route.path !== '/reset-password'
    }
  },
}

</script>
<style>
* {
  -webkit-tap-highlight-color: rgba(128, 128, 128, 0.212);
}
body {
  background: #EEE;
}
</style>

