<template>
  <router-link
    :to="`/chat/${conversationUserID}`"
    v-if="conversationUser.id"
    class="w-11/12 sm:w-4/5 md:3/4 xl:w-1/2 h-18 mt-4 bg-white border-gray-300 shadow flex flex-col items-start justify-center p-5"
  >
    <span class="text-green-600 mr-5 font-bold text-2xl">{{ conversationUser.username }}</span>
    <div class="text-xl text-gray-700">
      <span>{{ lastMessage.sender_id === conversationUserID ? '' : 'Ty: ' }}</span>
      <span :class="showNotification ? 'font-semibold' : ''">{{ lastMessage.message.length > 80 ? lastMessage.message.substring(0, 80) + '...' :  lastMessage.message}}</span>
    </div>
  </router-link>
</template>
<script>
import { user, notReadConversations } from '../constants/const-variables'
import axios from 'axios'
import API_URL from '../../API_URL'
import { socket } from '../../config/web-sockets.js';

export default {
  data() {
    return {
      user: user,
      conversationUser: Object,
      lastMessage: Object,
      showNotification: false,
    }
  },
  props: {
    conversation: Object,
    conversationUserID: String
  },
  created() {
    if(notReadConversations.includes(this.conversation.code)) {
      this.showNotification = true;
    }
    socket.on('message', ({ message, room }) => {
      if(message.sender_id !== user.id && !this.$route.path.includes(message.sender_id) && this.conversation.code === room) {
        this.showNotification = true;
        this.$emit('move-converastion-to-top', this.conversation.id)
        this.lastMessage = message
      }
    });
    socket.on('displayNotifications', () => {
      if(notReadConversations.includes(this.conversation.code)) {
        this.showNotification = true;
        this.$emit('move-converastion-to-top', this.conversation.id)
      }
    })
    socket.on('hideNotifications', () => {
      if(!notReadConversations.includes(this.conversation.code)) this.showNotification = false;
    })

    this.fetchConversationUser()
    const filteredMessages = this.conversation.messages.filter(message => !message.isIdMessage);
    this.lastMessage = filteredMessages[filteredMessages.length-1]
  },
  methods: {
    async fetchConversationUser() {
      await axios.get(`${API_URL}/users/${this.conversationUserID}`)
      .then(res => this.conversationUser = res.data)
    }
  },
}
</script>