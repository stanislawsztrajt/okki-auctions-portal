<template>
  <div v-if="jwt" class="flex flex-col justify-center">
    <h1 class="text-2xl mt-12 -mb-10 lg:-mb-16">Wybierz ocenę:</h1>
    <div class="mt-10 flex flex-wrap flex-row items-center">
      <div class="flex flex-row items-center">
        1/6
        <svg @click="selectRate(1)" class="rateStars h-10 w-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div class="flex flex-row items-center">
        2/6
        <svg @click="selectRate(2)" class="rateStars h-14 w-14 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div class="flex flex-row items-center">
        3/6
        <svg @click="selectRate(3)" class="rateStars h-20 w-20 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div class="flex flex-row items-center">
        4/6
        <svg @click="selectRate(4)" class="rateStars h-28 w-28 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div class="flex flex-row items-center">
        5/6
        <svg @click="selectRate(5)" class="rateStars h-32 w-32 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      <div class="flex flex-row items-center">
        6/6
        <svg @click="selectRate(6)" class="rateStars  h-36 w-36 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
    <textarea placeholder="tutaj możesz wpisać komentarz" maxlength="450" name="" id="" v-model="body" class=" w-10/12 h-28 focus:outline-none">
      Twoj komentarz
    </textarea>
    <button @click="addComment" class="button-animation-hover w-1/2 lg:w-1/3 h-20 bg-green-400 text-white text-2xl rounded-xl mt-4">
      dodaj komentarz
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
      userRating: 3,

      user: user,
      jwt: jwt
    }
  },
  methods: {
    pushComment(comment){
      this.$emit('push-comment', comment)
    },
    selectRate(rate){
      this.userRating = rate
    },
    async addComment(){
      const comment = {
        body: this.body,
        user_id: user.id,
        user_profile_id: this.id,
        username: user.username,
        rate: this.userRating,
      }

      await axios.post(`${API_URL}/comments`, comment, authorization)
      .then(res =>{
        this.pushComment(res.data)
        this.body = '';
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>