<template>
  <div>
    <div v-if="user" class="flex flex-col justify-center">
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
      <textarea placeholder="tutaj możesz wpisać komentarz" maxlength="450" name="" id="" v-model="commentValue" class=" w-10/12 h-28 focus:outline-none">
        Twoj komentarz
      </textarea>
      <button @click="addComment" class="button-animation-hover w-1/2 lg:w-1/3 h-20 bg-green-400 text-white text-2xl rounded-xl mt-4">
        dodaj komentarz
      </button>
    </div>
    <div v-else class="text-2xl">
      Nie jestes zalogowany, nie mozesz dodac komentarza
      <router-link to="/login" class="font-extrabold">
        Zaloguj się
      </router-link>
      aby dodać komentarz
      </div>
    <div class="mt-20"></div>
    <div
      v-for="comment in comments" :key="comment.user.id"
      class="flex-col w-10/12 h-auto lg:h-62 xl:h-40 mt-6 p-4 bg-white"
    >
      <div class="text-lg font-medium">
        <svg class="text-yellow-400 h-8 w-8 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {{ comment.rate }}/6
        {{ comment.user.username }}
      </div>
      <div class="text-right -mt-6">{{ comment.date }}</div>
      {{ comment.comment }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import API_URL from '../../API_URL'


export default {
  props: {
    id: String,
  },
  data(){
    return{
      commentValue: '',

      userRating: 3,
      userComments: '',
      activeSelect: '',

      comments: [],

      user: this.$cookies.get('user'),
    }
  },
  async created(){
    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res => this.comments = res.data.comments)
    .catch(err => console.log(err))
  },
  methods: {
    selectRate(rate){
      this.userRating = rate
    },
    async addComment(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      today = dd + '/' +  mm + '/' + yyyy;

      await axios.get(`${API_URL}/users/${this.id}`)
      .then(res =>{
        const comment = {
          comment: this.commentValue,
          rate: this.userRating,
          user: this.$cookies.get('user'),
          date: today
        }
        this.userComments = res.data.comments;

        try{
          this.userComments.push(comment);
        } catch(err){
          this.userComments = [];
          this.userComments.push(comment)
        }
      })
      .catch(err =>{
        console.log(err)
      })

      await axios.put(`${API_URL}/users/${this.id}`,{
        comments: this.userComments
      })
      .then(res => {
        this.comments = res.data.comments;
        this.commentValue = ''
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>