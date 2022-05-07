<template>
  <Loading :isCenter="true" v-if="isLoading" />
  <div v-else class="m-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
    <InfoElement
      :value="'Twoje konwersacje'"
      :icon="'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'"
    />
    <div v-if="conversations.length > 0" class="mt-8">
      <Conversation
        v-for="conversation in conversations"
        :key="conversation.id"
        :conversation="conversation"
        :conversationUserID="conversation.code.replace(this.user.id, '')"
        :secondaryUserActive="activeUsers.includes(conversation.code.replace(user.id, ''))"
        @move-converastion-to-top="moveConverastionToTop"
      />
    </div>
    <h1 v-else class="mt-8 text-xl text-gray-700">
      Nie prowadzisz konwersacji z żadnym użytkownikiem
    </h1>
  </div>
</template>
<script>
import { authorization, user, jwt } from '../constants/const-variables'
import { socket } from '../../config/web-sockets.js';
import axios from 'axios'
import API_URL from '../../API_URL'
import InfoElement from '../components/InfoElement.vue'
import Conversation from '../components/Conversation.vue'
import Loading from '../components/Loading.vue'

export default {
  data() {
    return {
      conversations: [],
      activeUsers: [],
      isLoading: true,
      user,
    }
  },
  components: {
    InfoElement,
    Conversation,
    Loading
  },
  created() {
    if(!jwt) this.$router.push('/login')

    this.fetchUserConversations()

    socket.on('newConversation', ({ conversation }) => {
      this.conversations.unshift(conversation)
      this.activeUsers.push(conversation.code.replace(user.id, ''))
    })
    socket.on('newActiveUser', ({ user_id }) => {
      this.activeUsers.push(user_id)
    })
    socket.on('deleteActiveUser', ({ user_id }) => {
      const index = this.activeUsers.findIndex(user => user === user_id)
      if(index > -1)this.activeUsers.splice(index, 1);
    })
  },
  methods: {
    async fetchUserConversations() {
      axios.get(`${API_URL}/user-conversations`, authorization)
      .then((res) => {
        let conversationsUsers = []
        this.conversations = res.data.sort((conA, conB) => Date.parse(conB.updatedAt) - Date.parse(conA.updatedAt))
        this.conversations.forEach(conversation => {
          conversationsUsers.push(conversation.code.replace(this.user.id, ''))
        })

        socket.emit('checkUsersActivity', { usersIds: conversationsUsers })
        socket.on('usersActivity', data => this.activeUsers = data)

        this.isLoading = false
      })
    },
    moveConverastionToTop(converastion_id) {
      this.conversations.sort(con => con.id === converastion_id ? -1 : 1)
    }
  },
}
</script>