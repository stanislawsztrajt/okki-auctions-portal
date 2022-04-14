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
      />
    </div>
    <h1 v-else class="mt-8 text-xl text-gray-700">
      Nie prowadzisz konwersacji z żadnym użytkownikiem
    </h1>
  </div>
</template>
<script>
import { authorization, user } from '../constants/const-variables'
import { socket } from '../../config/web-sockets.js';
import axios from 'axios'
import API_URL from '../../API_URL'
import InfoElement from '../components/InfoElement.vue'
import Conversation from '../components/Conversation.vue'
import Loading from '../components/Loading.vue'

export default {
  data() {
    return {
      user: user,
      conversations: [],
      ISjwt: this.$cookies.isKey('jwt'),
      isLoading: true,
    }
  },
  components: {
    InfoElement,
    Conversation,
    Loading
  },
  created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }
    this.fetchUserConversations()

    socket.on('newConversaion', async ({ conversation }) => {
      this.conversations.unshift(conversation)
    })
  },
  methods: {
    async fetchUserConversations() {
      axios.get(`${API_URL}/user-conversations`, authorization)
      .then((res) => {
        this.conversations = res.data
        this.isLoading = false
      })
    }
  },
}
</script>