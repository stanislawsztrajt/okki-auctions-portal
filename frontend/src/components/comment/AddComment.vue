<template>
  <div v-if="jwt" class="flex flex-col justify-center mt-4">
    <textarea 
      role="textbox" 
      placeholder="Tutaj możesz wpisać komentarz" 
      maxlength="450" 
      v-model="body" 
      class="w-full xl:w-1/2 h-48 bg-white shadow p-4 resize-none focus:outline-none">
    </textarea>
    <div class="mt-4">
      <div>
        Jak oceniasz użytkownika?
        <span v-if="isValidate" class="text-red-500">
          Musisz wybrać ocene!
        </span>
      </div>
      
      <svg @click="selectRate(true)" xmlns="http://www.w3.org/2000/svg" :class="`comment-emote button-animation-hover cursor-pointer ${rate && rate !== null ? 'bg-green-500' : 'bg-green-700'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg @click="selectRate(false)" xmlns="http://www.w3.org/2000/svg" :class="`comment-emote button-animation-hover cursor-pointer ml-4 ${!rate && rate !== null ? 'bg-red-500' : 'bg-red-700'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <button @click="addComment" class="w-full xl:w-1/6 p-4 mt-4 rounded focus:outline-none bg-green-600 text-white button-animation-hover">
      Dodaj komentarz
    </button>
  </div>
  <div v-else class="text-2xl mt-10">
    Nie jestes zalogowany, nie mozesz dodac komentarza
    <router-link to="/login" class="font-extrabold">
      Zaloguj się
    </router-link>
    aby dodać komentarz
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../../API_URL'

import { user, jwt, authorization } from '../../constants/const-variables'

export default {
  props: {
    id: String,
  },
  data(){
    return{
      body: '',
      rate: null,
      isValidate: false,

      user: user,
      jwt: jwt
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
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>