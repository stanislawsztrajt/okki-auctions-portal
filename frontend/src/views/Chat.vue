<template>
  <div class="w-screen h-screen">
    <Menu />
    <Loading :isCenter="true" v-if="isLoading" />
    <div class="w-screen h-5/6 flex flex-col items-center justify-center">
      <div class="w-3/4 lg:w-1/2 h-4/5 bg-white text-gray-700 flex flex-col shadow border border-gray-300 rounded-md overflow-x-hidden">
        <div class="flex flex-row justify-center items-center px-20 h-20 bg-white">
          <router-link
            :to="`/users/${secondUser.id}`"
            class="text-2xl flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="ml-2">
              {{ secondUser.username }}
            </span>
          </router-link>
        </div>
        <div ref="chatWindow" class="flex flex-col pb-2 px-4 md:px-10 2xl:px-40 h-full bg-gray-100 border border-gray-200 overflow-y-scroll">
          <span class="text-gray-400 my-2 mb-4 text-center block">Początek konwersacji z {{ secondUser.username }}</span>
          <div v-for="message in messages" :key="message">
            <div style="max-width: 18rem" class="bg-green-300 px-4 py-2 mb-2 float-left rounded rounded-tl-none rounded-br-xl" :class="{userMessage: message.sender_id === this.user.id}">
              {{ message.message }}
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-center items-center md:px-20 h-20">
          <div class="bg-gray-100 flex flex-row justify-between items-center h-10 w-3/4 2xl:w-2/3 border border-gray-200">
            <input
              type="text"
              placeholder="Wyślij wiadomość"
              class="px-4 w-full h-full bg-gray-100 focus:outline-none focus:shadow-inner"
              v-model.trim="message"
              @keyup.enter="sendMessage"
            >
            <button
              @click="sendMessage"
              class="px-3 h-full focus:outline-none hover:bg-gray-200 transition duration-75 border-l border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'
import Loading from '../components/Loading.vue'
import API_URL from '../../API_URL'
import { socket } from '../../config/web-sockets';

import { authorization, jwt, user } from '../constants/const-variables'

export default {
  data() {
    return {
      user: user,
      secondUser: {},
      conversation: {},
      messages: [],
      message: '',
      usersIds: '',
      isLoading: false
    }
  },
  props: {
    id: {
      type: String
    },
  },
  components: {
    Menu,
    Loading
  },
  async created() {
    this.isLoading = true

    if(!jwt){
      this.$router.push('/login')
    }

    if(this.id !== this.user.id){
      await axios.get(`${API_URL}/users/${this.id}`)
      .then(res => {
        this.secondUser = res.data
        this.usersIds = [this.user.id, this.secondUser.id].sort().join('+')
        this.fetchMessages()
      })
      .catch(() => this.$router.push('/conversations'))
    } else {
      this.$router.push('/conversations')
    }
  },
  methods: {
    async fetchMessages() {
      socket.on('message', async (data) => {
        await this.messages.push(data.message)
        this.scrollToBottom()
      });

      await axios.get(`${API_URL}/chat-conversations`, {
        headers: {
          users_ids: this.usersIds,
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => {
        if(res.data.length > 0) {
          this.conversation = res.data[0];
          this.messages = res.data[0].conversationMessages;
        } else {
          this.createConversation()
        }
        this.isLoading = false;
      })
      .then(() => this.scrollToBottom())
      .catch(() => this.$router.push('/conversations'))
    },
    async sendMessage() {
      if(this.message === '') return

      let message = {
        message: this.message.replace(/\s+/g, ' ').trim(),
        sender_id: this.user.id,
        createdAt: new Date()
      }
      let room = this.usersIds.split('+').join('')

      socket.emit('sendMessage', { message,  room });

      const newMessages = this.messages.map(message => ({...message}))
      newMessages.push(message)
      this.message = ''

      await axios.put(`${API_URL}/chat-conversations/${this.conversation.id}`, { conversationMessages: newMessages }, {
        headers: {
          users_ids: this.usersIds,
          Authorization: `Bearer ${jwt}`
        }
      })
      .catch(err => err)
    },
    async createConversation() {
      let data = {
        users_ids: this.usersIds,
        conversationMessages: []
      }

      await axios.post(`${API_URL}/chat-conversations`, data, authorization)
      .catch(() => this.$router.push('/conversations'))
    },
    scrollToBottom() {
      this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
    },
  },
}
</script>