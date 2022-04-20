<template>
  <div>
    <VideoChat 
      v-if="conversation !== {}"
      :isCallingShow="isCallingShow"
      @toggle-is-calling="toggleIsCalling"
      @set-true-is-calling="setTrueIsCalling"
      ref="VideoChat"
    />
    <Loading :isCenter="true" v-if="isLoading" />
    
    <!-- <div v-show="!isCallingShow" class="w-screen h-5/6 flex flex-col items-center justify-center"> -->
    <div v-else v-show="!isCallingShow" class="w-full h-5/6 absolute flex flex-col items-center justify-center">
      <div class="w-11/12 xs:w-3/4 md:w-3/5 xl:w-1/2 h-4/5 bg-white text-gray-700 flex flex-col shadow border border-gray-300 rounded-md overflow-x-hidden">
        <div class="w-full h-20 flex flex-row justify-between items-center px-5 ">
          <router-link to="/conversations" class="text-2xl  flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </router-link>
          <router-link
            :to="`/users/${secondUser.id}`"
            class="text-2xl ml-4 w-full flex flex-row items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="ml-2 text-center">
              {{ secondUser.username }}
            </span>
          </router-link>
          <div class="flex flex-row items-center">
            <button v-if="idToCall !== ''" @click="call({video: false, audio: true})">
              <svg  xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-4 button-animation-hover cursor-pointer text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </button>
            <butto v-else>
              <svg class="h-7 w-7 mr-4 button-animation-hover cursor-not-allowed text-gray-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />  <line x1="23" y1="1" x2="1" y2="23" /></svg>
            </butto>
            <button v-if="idToCall !== ''" @click="call({video: true, audio: true})">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 button-animation-hover cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <butto v-else>
              <svg class="h-7 w-7 mr-4 button-animation-hover cursor-not-allowed text-gray-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />  <line x1="1" y1="1" x2="23" y2="23" /></svg>
            </butto>
          </div>
        </div>
        <div ref="chatWindow" class="flex flex-col pb-2 px-4 md:px-10 2xl:px-24 h-full bg-gray-100 border border-gray-200 overflow-y-scroll">
          <span class="text-gray-400 my-2 mb-4 text-center block">Początek konwersacji z {{ secondUser.username }}</span>
          <div v-for="message in messages" :key="message">
            <div
              v-if="!message.isIdMessage"
              class="dont-break-out bg-green-300 max-w px-4 py-2 mb-2 float-left rounded rounded-tl-none rounded-br-xl max-w-xs mr-3"
              :class="{userMessage: message.sender_id === this.user.id}"
            >
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
              @keyup.enter="conversationExists ? sendMessage() : createConversation()"
            >
            <button
              @click="conversationExists ? sendMessage() : createConversation()"
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

import Loading from '../components/Loading.vue'
import VideoChat from '../components/VideoChat.vue'

import API_URL from '../../API_URL'
import { socket } from '../../config/web-sockets.js';
import { uuid } from 'vue-uuid';

import { authorization, jwt, user, fetchLastSeenMessages, compareLastSeenMessageWithLatest } from '../constants/const-variables'

export default {
  data() {
    return {
      user: user,
      secondUser: {},
      conversation: {},
      messages: [],
      message: '',
      usersIds: '',
      lastSeenMessageObj: {},
      conversationExists: true,
      isLoading: true,
      isCallingShow: false,
    }
  },
  props: {
    id: {
      type: String
    },
  },
  components: {
    Loading,
    VideoChat
  },
  async created() {
    if(!jwt){
      this.$router.push('/login')
    }

    if(this.id !== this.user.id){
      await axios.get(`${API_URL}/users/${this.id}`)
      .then(res => {
        this.secondUser = res.data
        this.usersIds = [this.user.id, this.secondUser.id].sort().join('+')
        this.fetchConversation()
      })
      .catch(() => this.$router.push('/conversations'))
    } else {
      this.$router.push('/conversations')
    }

    socket.on('message', async ({message,room}) => {
      if(this.$route.path.includes('/chat') && this.conversation.code === room){
        await this.messages.push(message)
        this.scrollToBottom()

        if(message.sender_id !== user.id) {
          compareLastSeenMessageWithLatest(this.conversation, message)
        }
      }
    })
  },
  methods: {
    async sendMessage(emitNewConversation) {
      if(this.message === '') return

      const room = this.usersIds.split('+').join('')
      const message = {
        message: this.message.replace(/\s+/g, ' ').trim(),
        sender_id: this.user.id,
        createdAt: new Date(),
        id: uuid.v1()
      }

      socket.emit('sendMessage', { message,  room });

      const newMessages = this.messages.map(message => ({...message}))
      newMessages.push(message)
      this.message = ''

      await axios.put(`${API_URL}/chat-conversations/${this.conversation.id}`, { messages: newMessages }, {
        headers: {
          users_ids: this.usersIds,
          Authorization: `Bearer ${jwt}`
        }
      })
      .then((res) => {
        console.log(res)
        this.conversation = res.data
        if(emitNewConversation) {
          const seconUser_id = this.secondUser.id
          const conversation = this.conversation
          conversation.messages.push(message)
          socket.emit('newConversation', ({ seconUser_id, conversation }))
        }
      })
      .catch(err => err)
    },
    async fetchConversation() {
      await axios.get(`${API_URL}/chat-conversations`, {
        headers: {
          users_ids: this.usersIds,
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(async res => {
        if(res.data.length > 0) {
          this.conversation = res.data[0];
          this.messages = res.data[0].messages;
          await fetchLastSeenMessages(this.conversation);
        } else {
          this.conversationExists = false
        }
        this.isLoading = false;
      })
      .then(() => this.scrollToBottom())
      .catch((err) => console.log(err))
    },
    async createConversation() {
      const conversation = {
        users_ids: this.usersIds,
        messages: [],
      }

      await axios.post(`${API_URL}/chat-conversations`, conversation, authorization)
      .then(res => {
        this.conversation = res.data

        this.usersIds.split('+').forEach(async user_id => {
          const data = {
            user_id,
            conversation_id: this.conversation.id,
            lastSeenMessage_id: ""
          }
          await axios.post(`${API_URL}/last-seen-messages`, data, authorization)
          .catch(err => console.log(err))
        })
      })
      .catch(() => this.$router.push('/conversations'))

      this.conversationExists = true

      const emitNewConversation = true
      this.sendMessage(emitNewConversation)
    },
    scrollToBottom() {
      if(this.$refs.chatWindow) this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
    },
    toggleIsCalling(){
      this.isCallingShow = !this.isCallingShow;
    },
    setTrueIsCalling(){
      this.isCallingShow = true;
    },
    call(userMediaOptions){
      if(this.idToCall === '') return
      this.$refs.VideoChat.callUser(userMediaOptions)
    },
  },
}
</script>