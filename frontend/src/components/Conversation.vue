<template>
  <router-link
    :to="`/chat/${conversationUserID}`"
    v-if="conversationUser.id"
    class="w-11/12 sm:w-4/5 md:3/4 xl:w-1/2 h-18 mt-4 bg-white border-gray-300 shadow flex flex-col items-start justify-center p-5"
  >
    <span class="text-green-600 mr-5 font-bold text-2xl">{{ conversationUser.username }}</span>
    <div class="text-xl text-gray-700">
      <span>{{ lastMessage.sender_id === conversationUserID ? '' : 'Ty: ' }}</span>
      <span>{{ lastMessage.message.length > 80 ? lastMessage.message.substring(0, 80) + '...' :  lastMessage.message}}</span>
    </div>
  </router-link>
</template>
<script>
import { authorization, user } from '../constants/const-variables'
import axios from 'axios'
import API_URL from '../../API_URL'
import { socket } from '../../config/web-sockets';

export default {
  data() {
    return {
      user: user,
      conversationUser: Object,
      lastMessage: Object
    }
  },
  props: {
    conversation: Object,
    conversationUserID: String
  },
  created() {
    this.fetchConversationUser()
    this.lastMessage = this.conversation.conversationMessages[this.conversation.conversationMessages.length-1]

    socket.on('message', (data) => {
      if(this.conversation.conversationCode === data.room) {
        this.lastMessage = data.message
      }
    });
  },
  methods: {
    async fetchConversationUser() {
      await axios.get(`${API_URL}/users/${this.conversationUserID}`, authorization)
      .then(res => this.conversationUser = res.data)
    }
  },
}
</script>