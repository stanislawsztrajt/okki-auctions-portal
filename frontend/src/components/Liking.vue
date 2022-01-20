<template>
  <div>
    <div v-if="route === 'auctions'" class="w-full flex flex-col">
      <router-link
        to=""  
        v-if="!isLiked"
        @click="like"
        class="-ml-10 xl:ml-6 mt-8 text-center text-xl bg-green-600 rounded-xl p-2 text-white hover:opacity-80 duration-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Polub
      </router-link>
      <router-link 
        to=""
        v-else
        @click="disLike"
        class="-ml-10 xl:ml-6 mt-8 text-center text-xl bg-green-600 rounded-xl p-2 text-white hover:opacity-80 duration-100">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        Usuń polubienie
      </router-link>
    </div>
    
    <div v-else class="w-full flex flex-col items-end">
      <router-link to="">
        <svg
          v-if="!isLiked"
          @click="like"
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-green-500 self-end button-animation-hover" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
          v-else
          @click="disLike"
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-red-500 self-end button-animation-hover " viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import { authorization, user } from '../constants/const-variables'

export default {
  name: 'Liking',
  props: {
    auction_id: String,
    likeds: Array,
    route: {
      type: String,
      required: false
    }
  },
  data(){
    return{
      liked_id: '',
      isLiked: false,
      user: user
    }
  },
  created(){
    console.log(this.likeds)
    const isExist = this.likeds.findIndex(liked => liked.auction_id === this.auction_id)

    if(isExist >= 0){
      this.liked_id = this.likeds[isExist].id;
      this.isLiked = true;
    } else{
      this.liked_id = '';
      this.isLiked = false;
    }
  },
  methods: {
    async like(){
      const data = {
        user_id: user.id,
        auction_id: this.auction_id
      }
      
      this.isLiked = true
      await axios.post(`${API_URL}/likeds`, data, authorization)
      .then(res =>{
        this.liked_id = res.data.id
      })
    },
    async disLike(){
      this.isLiked = false
      await axios.delete(`${API_URL}/likeds/${this.liked_id}`, authorization)
      .then(() => this.liked_id = '')
    }
  }
}
</script>