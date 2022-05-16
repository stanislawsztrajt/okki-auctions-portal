<template>
  <div v-if="jwt" class="flex flex-col justify-center my-4 border-b border-gray-300 pb-7 mb-7">
    <div class="mb-4">
      <p class="text-gray-800 text-xl font-semibold">Jak oceniasz użytkownika?</p>

      <svg @click="selectRate(true)" xmlns="http://www.w3.org/2000/svg" :class="`comment-emote cursor-pointer transition-all duration-100 ${rate && rate !== null ? 'bg-green-500' : 'bg-gray-400 hover:bg-green-500'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg @click="selectRate(false)" xmlns="http://www.w3.org/2000/svg" :class="`comment-emote cursor-pointer transition-all duration-100 ml-4 ${!rate && rate !== null ? 'bg-red-500' : 'bg-gray-400 hover:bg-red-500'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <textarea
      role="textbox"
      placeholder="Tutaj możesz wpisać komentarz"
      maxlength="450"
      v-model="body"
      class="w-full xl:w-1/2 h-48 bg-white shadow p-4 resize-none focus:outline-none mb-2">
    </textarea>
    <span v-if="isValidate" class="text-red-500">{{ validateText }}</span>
    <button @click="addComment" class="w-full xl:w-1/6 p-4 mt-2 rounded focus:outline-none bg-green-600 text-white button-animation-hover">
      Dodaj komentarz
    </button>
  </div>
  <div v-else class="text-xl mt-5">
    <router-link to="/login" class="font-bold text-green-600">
      Zaloguj się
    </router-link>
    aby dodać komentarz
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../../API_URL'

import { user, jwt, authorization, findVulgarWord } from '../../constants/const-variables'

export default {
  props: {
    id: String,
  },
  data(){
    return{
      body: '',
      rate: null,
      isValidate: false,
      validateText: '',

      user,
      jwt
    }
  },
  methods: {
    pushComment(comment){
      this.$emit('push-comment', comment)
    },
    selectRate(rate){
      this.rate = rate
    },
    async addComment(){
      if(this.rate === null){
        setTimeout(() =>{
          this.isValidate = false
        }, 4000)
        this.validateText = 'Wybierz ocenę.'
        return this.isValidate = true;
      }

      if(this.body.length <= 8){
        setTimeout(() =>{
          this.isValidate = false
        }, 4000)
        this.validateText = 'Komentarz musi być dłuższy niż 8 znaków.'
        return this.isValidate = true;
      }

      if(findVulgarWord(this.body.split(' ')) === true){
        setTimeout(() =>{
          this.isValidate = false
        }, 4000)
        this.validateText = 'Komentarz nie może zawierać wulgarnych słów.'
        return this.isValidate = true;
      }

      const comment = {
        body: this.body,
        user_id: user.id,
        user_profile_id: this.id,
        username: user.username,
        rate: this.rate,
      }

      await axios.post(`${API_URL}/comments`, comment, authorization)
      .then(async res =>{
        this.pushComment(res.data);
        this.body = '';
        this.rate = null;
      })
      .catch(() => {
        setTimeout(() =>{
          this.isValidate = false
        }, 4000)
        this.validateText = 'Już posiadasz komentarz na tym koncie.'
        this.isValidate = true;
      })
    }
  }
}
</script>

<style>

</style>