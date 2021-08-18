<template>
  <div class="w-screen h-screen">
    <Menu />
    <div class="w-screen h-5/6 flex flex-col items-center justify-center">
      <div class="w-3/4 lg:w-1/2 h-4/5 bg-white text-gray-700 flex flex-col shadow border border-gray-300 rounded-md overflow-x-hidden">
        <div class="flex flex-row justify-center items-center px-20 h-20 bg-white">
          <span class="text-2xl flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="ml-2">
              {{ this.user.username }}
            </span>
          </span>
        </div>
        <div class="grid grid-cols-1 px-10 2xl:px-40 h-full bg-gray-100 border border-gray-200 overflow-y-scroll">
          <span class="text-gray-400 my-2 text-center block">Początek konwersacji z {{ this.user.username }}</span>
          <div v-for="msg in messages" :key="msg">
            <div style="max-width: 15rem" class="bg-green-300 px-4 py-2 mb-2 float-left rounded rounded-tl-none rounded-br-xl" :class="{userMessage: msg.id === this.$cookies.get('user').id}">
              <p>{{ msg.msg }}</p>
            </div>
          </div>
          <div class="bg-intherit h-3"></div>
        </div>
        <div class="flex flex-row justify-center items-center md:px-20 h-20">
          <div class="bg-gray-100 flex flex-row justify-between items-center h-10 w-3/4 2xl:w-2/3 border border-gray-200">
            <input 
              type="text" 
              placeholder="Wyślij wiadomość"
              class="px-4 w-full h-full bg-gray-100 focus:outline-none focus:shadow-inner"
            >
            <button class="px-3 h-full focus:outline-none hover:bg-gray-200 transition duration-75 border-l border-gray-200">
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
import API_URL from '../../API_URL'

export default {
  data() {
    return {
      user: {},
      messages: []
    }
  },
  props: {
    id: {
      type: String
    },
  },
  components: { 
    Menu 
  },
  async created() {
    
    if(this.id === this.$cookies.get('user').id){
      this.$router.push('/messages')
    }

    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res =>{
      this.user = res.data
    })
    .catch(() =>{
      this.user = undefined
    })
    
    this.messages.push({msg: 'siema', id:this.user.id})
    this.messages.push({msg: 'elo', id:this.$cookies.get('user').id})
    this.messages.push({msg: 'chcialbym kupic ten motor', id:this.user.id})
    this.messages.push({msg: 'spoko, mozesz przyjechac go obejrzec ale to od srody bo na wakacjach jestem', id:this.$cookies.get('user').id})
    this.messages.push({msg: 'spoko, najprawdopodobniej w czwartek przyjade', id:this.user.id})
    this.messages.push({msg: 'dobra, a o ktorej godzinie tak mniej wiecej', id:this.$cookies.get('user').id})
    this.messages.push({msg: '?', id:this.$cookies.get('user').id})
    this.messages.push({msg: 'cos okolo 13 ci pasuje?', id:this.user.id})
    this.messages.push({msg: 'tak', id:this.$cookies.get('user').id})
  },
  methods: {
    
  },
}
</script>