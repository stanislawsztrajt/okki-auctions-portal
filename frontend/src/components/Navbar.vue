<template>
  <nav class="flex items-center justify-between bg-white relative shadow text-gray-600 h-20 z-50">
    <div class="text-4xl md:text-6xl ml-4 md:ml-8 font-light text-gray-600">
      <router-link to="/" class="flex flex-row font-semibold text-green-600">
        okki
      </router-link>
    </div>
    <div ref="menuElements" class="flex flex-row items-center bg-transparent mr-2 md:m-0 anima">
      <div
        v-for="link in links"
        :key="link.route"
        class="relative"
      >
        <router-link
          v-if="jwt ? link.route !== 'login' : link.route !== 'dashboard'"
          :to="`/${link.route}`"
          :class="`navbar-element ${link.btnWide ? 'navbar-element-new-auction' : ''} ${link.route === 'conversations' && showNotificationIcon ? 'new-message-icon' : ''}`"
          :ref="link.route === 'conversations' ? 'conversationsLink' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="`h-7 w-7 ${link.btnWide ? 'block lg:hidden' : ''}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.iconCode" />
          </svg>
          <span class="hidden lg:block">{{ link.description }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { jwt, user, fetchLastSeenMessages, notReadConversations } from '../constants/const-variables'
import { socket } from '../../config/web-sockets.js'
import links from '../jsons files/links'

export default {
  data(){
    return{
      jwt: jwt,
      links: links,
      showNotificationIcon: false
    }
  },
  props: {
    conversations: {
      type: Object
    },
  },
  created() {
    socket.on('message', (data) => {
      if(data.message.sender_id !== user.id && !this.$route.path.includes(data.message.sender_id)) {
        this.showNotificationIcon = true;

        const conversationCode = data.room
        if(!notReadConversations.includes(conversationCode)) notReadConversations.push(conversationCode)
      }
    });
    socket.on('displayNotifications', () => {
      this.showNotificationIcon = true;
    })
    socket.on('hideNotifications', () => {
      this.showNotificationIcon = false;
    })
  },
  watch: {
    conversations(conversations) {
      if(conversations.length > 0) {
        conversations.forEach(async conversation => {
          let seconUser_id = conversation.code.replace(user.id, "");
          if(!this.$route.path.includes('/chat/' + seconUser_id)) {
            await fetchLastSeenMessages(conversation)
          }
        })
      }
    }
  },
}
</script>