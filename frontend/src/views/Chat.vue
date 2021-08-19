<template>
  <div class="w-screen h-screen">
    <Menu />
    <Loading v-show="loading" />
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
        <div ref="chatHistory" class="flex flex-col pb-2 px-10 2xl:px-40 h-full bg-gray-100 border border-gray-200 overflow-y-scroll">
          <span class="text-gray-400 my-2 text-center block">Początek konwersacji z {{ secondUser.username }}</span>
          <div v-for="message in messages" :key="message">
            <div style="max-width: 18rem" class="bg-green-300 px-4 py-2 mb-2 float-left rounded rounded-tl-none rounded-br-xl" :class="{userMessage: message.id === this.$cookies.get('user').id}">
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
              @keyup.enter="saveMessage"
            >
            <button 
              @click="saveMessage"
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

import { db } from '@/main'

export default {
  data() {
    return {
      ISjwt: this.$cookies.isKey('jwt'),
      secondUser: {},
      message: '',
      messages: [],
      loading: false,
      dbCollectionCode: [],
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
    this.loading = true

    if(!this.ISjwt){
      this.$router.push('/login')
    }

    if(this.id === this.$cookies.get('user').id){
      this.$router.push('/messages')
    }

    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res =>{
      this.secondUser = res.data
    })
    .catch(() =>{
      this.secondUser = undefined
    })

    this.dbCollectionCode = [this.$cookies.get('user').id, this.secondUser.id].sort().join('')

    this.fetchMessages()
  },
  methods: {
    saveMessage() {
      // tutaj mozna to dac

      if(this.message === '') {
        return
      }

      db.collection(this.dbCollectionCode).add({
        message: this.message,
        username: this.$cookies.get('user').username,
        id: this.$cookies.get('user').id,
        createdAt: new Date()
      }).then(() => {
        this.scrollToBottom()
      })

      this.message = ''
    },
    fetchMessages() {
      db.collection(this.dbCollectionCode).orderBy('createdAt').onSnapshot((querySpanshot) => {
        let allMessages = []
        querySpanshot.forEach(doc => {
          allMessages.push(doc.data())
        });
        
        this.messages = allMessages
        
        setTimeout(() => {
          this.scrollToBottom()
          this.loading = false
        }, 700);
      })
    },
    scrollToBottom() {
      this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight
    },
  },
}
</script>