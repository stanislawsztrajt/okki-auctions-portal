<template >
  <div id="app">
    <Navbar
      v-if="showNavbar && !isBlocked"
      :conversations="conversations"
    />
    <BlockedUser v-if="isBlocked"/>
    <router-view v-else />
    <div v-if="cookieModalShow" class="w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center">
      <div class="fixed z-50 bottom-0 w-screen bg-white text-green-600 py-6 px-10 md:px-20 lg:px-40 flex flex-col justify-around">
        <h1 class="font-bold text-xl">Informacja Cookies</h1>
        <p class="text-gray-600 mt-2 mb-4 md:text-lg">Pliki cookies które wykorzystujemy na naszej stronie są wykorzystywane tylko i wyłącznie do prawidłowego działania strony, nie gromadzimy żadnych danych dotyczących użytkowników. Dowiedz się więcej w <router-link to="privacy-policy" class="rodo-link">Polityce prywatności</router-link>.</p>
        <button @click="acceptUserCookie" class="h-10 w-40 bg-green-600 text-white font-bold flex items-center justify-center">Akceptuję</button>
      </div>
      <div class="absolute bg-gray-500 opacity-30 z-10 w-screen h-screen top-0 left-0"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, user, jwt, userAcceptedCookie, fetchLastSeenMessages } from './constants/const-variables';
import { socket } from '../config/web-sockets.js';

import BlockedUser from './components/BlockedUser.vue'
import Navbar from "./components/Navbar.vue"

export default {
  name: 'App',
  components: {
    BlockedUser,
    Navbar
  },
  data(){
    return{
      isBlocked: false,
      cookieModalShow: false,
      showNavbar: true,
      conversations: []
    }
  },
  async created(){
    let pies = 'hau'
    socket.emit('witom', { pies })

    if(!userAcceptedCookie) {
      this.cookieModalShow = true;
    }

    if(jwt){
      await axios.get(`${API_URL}/users/me`, authorization)
      .catch(() => this.isBlocked = true)

      this.fetchUserConversations()

      socket.on('newConversaion', async ({ conversation }) => {
        fetchLastSeenMessages(conversation)

        const room = conversation.code
        socket.emit('joinToNewRoom', { room })
      })
      socket.on('createdNewConversaion', async ({ conversation }) => {
        const room = conversation.code
        socket.emit('joinToNewRoom', { room })
      })
    }
  },
  methods: {
    async acceptUserCookie() {
      await this.$cookies.set('user-accepted-cookies', true, '7d')
      this.cookieModalShow = false
    },
    async fetchUserConversations() {
      axios.get(`${API_URL}/user-conversations`, authorization)
      .then((res) => {
        this.conversations = res.data
        const userRooms = []

        this.conversations.forEach(conversation => {
          userRooms.push(conversation.code)
        })
        this.joinUserToSocketRooms(userRooms)
      })
    },
    async joinUserToSocketRooms(roomsToJoin) {
      let rooms = roomsToJoin
      let user_id = user.id
      socket.emit('join', { rooms, user_id });
    }
  },
  watch: {
    $route(route) {
      this.showNavbar = route.path !== '/login' && route.path !== '/register' && route.path !== '/forgot-password' && route.path !== '/reset-password'
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

