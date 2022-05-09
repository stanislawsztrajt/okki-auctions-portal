<template>
  <router-link
    :to="`/chat/${conversationUserID}`"
    v-if="conversationUser.id"
    class="w-11/12 sm:w-4/5 md:3/4 xl:w-1/2 h-18 mt-4 bg-white shadow flex flex-col items-start justify-center p-5 relative"
  >
    <p class="text-green-600 font-bold text-2xl dont-break-out pr-5">
      {{ conversationUser.username }}
      <span v-if="secondaryUserActive" title="Użytkownik jest teraz aktywny" class="w-2.5 h-2.5 bg-green-600 rounded-full cursor-default inline-block ml-1 mb-1"></span>
    </p>
    <div class="text-xl text-gray-700 dont-break-out">
      <span>{{ lastMessage.sender_id === conversationUserID ? '' : 'Ty: ' }}</span>
      <span :class="showNotification ? 'font-semibold dont-break-out' : ''">{{ lastMessage.message.length > 80 ? lastMessage.message.substring(0, 80) + '...' :  lastMessage.message}}</span>
    </div>
    <div v-if="showNotification" title="Nowa wiadomość" class="absolute top-1/2 right-5 w-3 h-3 rounded-full bg-red-500 transform -translate-y-1/2 cursor-default"></div>
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
    conversationUserID: String,
    secondaryUserActive: Boolean
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
    this.lastMessage = this.conversation.messages[this.conversation.messages.length-1]
  },
  methods: {
    async fetchConversationUser() {
      await axios.get(`${API_URL}/users/${this.conversationUserID}`)
      .then(res => {
        if(res.data !== '') {
          this.conversationUser = res.data
        } else {
          this.conversationUser = {
            id: this.conversationUserID,
            username: `UsunieteKonto ${this.conversationUserID}`,
          }
        }
      })
    }
  },
}
</script>