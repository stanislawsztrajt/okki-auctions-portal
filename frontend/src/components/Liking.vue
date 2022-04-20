<template>
  <div v-if="jwt">
    <div v-if="route === 'auctions'" class="w-full flex flex-col">
      <router-link
        to=""
        v-if="!isLiked"
        @click="like"
        class="mt-8 text-center text-md 2xl:text-lg bg-green-600 rounded-md p-2 text-white hover:opacity-80 duration-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Polub
      </router-link>
      <router-link
        to=""
        v-else
        @click="disLike"
        class="mt-8 text-center text-md 2xl:text-lg bg-green-600 rounded-md p-2 text-white hover:opacity-80 duration-100">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 inline mb-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        Usuń polubienie
      </router-link>
    </div>

    <div v-else class="w-full flex flex-col items-end">
      <router-link to="">
        <svg xmlns="http://www.w3.org/2000/svg"
          v-if="isLiked"
          @click="disLike"
          class="h-10 w-10 text-red-500 self-end button-animation-hover hover:text-gray-600 like-button-scale -mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg"
          v-else
          @click="like"
          class="h-10 w-10 text-gray-500 self-end button-animation-hover hover:text-red-600 like-button-scale -mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import { authorization, user, jwt } from '../constants/const-variables'

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
      user: user,
      jwt: jwt
    }
  },
  created(){
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