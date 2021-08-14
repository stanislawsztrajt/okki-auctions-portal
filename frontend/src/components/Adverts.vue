<template>
<div id="Adverts" class="mt-6 grid grid-cols-1 justify-items-center md:justify-items-start">
  <div class=""></div>
  <router-link
    :to="`/advert/${advert.id}`"
    class="flex flex-col sm:flex-row w-10/12 border-gray-300 my-4 text-gray-600 bg-white shadow"
    v-for="advert in adverts"
    :key="advert.code"
  >
    <div class="h-32 sm:h-48 w-full sm:w-84 bg-gray-300 bg-cover bg-no-repeat bg-center border-gray-200 border-b-2 sm:border-r-2 sm:border-b-0" :style="{ backgroundImage: 'url(' + advert.images + ')' }"></div>
    <div class="px-3 py-2 sm:px-5 sm:py-4 w-full">
      <h2 class="sm:text-2xl">
        {{ advert.title }}
      </h2>
      <h3 class="font-bold sm:text-3xl">
        {{ advert.price }}zł
      </h3>
      <h3 class="text-xs sm:text-lg">
        {{ advert.location }}
      </h3>
      <router-link to="" class="w-full flex flex-col" v-if="userCookie.id === advert.userID">
        <svg
          class="mr-12 sm:mr-0 -mt-6 h-6 w-6 xl:h-10 xl:w-10 text-blue-500 self-end button-animation-hover"
          @click="toggleEditAdvertLayer(advert.id)"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-red-500 self-end button-animation-hover "
          @click="toggleDeleteAdvertLayer(advert.id)"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </router-link>

      <router-link to="" class="w-full flex flex-col" v-else>
        <svg xmlns="http://www.w3.org/2000/svg"
          v-if="advert.id === user.likedAdverts[0].id && user.likedAdverts[0].liked"
          @click="unLike"
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-red-500 self-end button-animation-hover" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
        <svg
          v-else
          @click="like"
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-green-500 self-end button-animation-hover" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </router-link>
    </div>
  </router-link>
</div>
</template>
<script>
import axios from 'axios';

import API_URL from '../../API_URL'

export default {
  props: {
    adverts: Array,
  },
  data(){
    return{
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      user: {}
    }
  },
  async created(){
    await axios.get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res =>{
      this.user = res.data;
      this.likedAdverts = res.data.likedAdverts;
      const indexLikedAdvert = this.user.likedAdverts.findIndex(el => el === this.advert.id);
      if(indexLikedAdvert === - 1) this.isLiked = false;
      else this.isLiked = true;
    })
    .catch(err => console.log(err.status))
  },
  methods: {
    async like(){
      this.isLiked = true;
      this.likedAdverts.push(this.advert.id)

      await axios.put(`${API_URL}/users/${this.userCookie.id}`,
      {
        likedAdverts: this.likedAdverts
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err.status))
    },
    async unLike(){
      this.isLiked = false;
      const index = await this.likedAdverts.findIndex(el => el === this.advert.id)
      await this.likedAdverts.splice(index,1)

      await axios.put(`${API_URL}/users/${this.userCookie.id}`,
      {
        likedAdverts: this.likedAdverts
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err.status))
    },
    toggleEditAdvertLayer(id){
      this.$emit('toggle-edit-advert-layer', id)
    },
    toggleDeleteAdvertLayer(id){
      this.$emit('toggle-delete-advert-layer', id)
    }
  }
}
</script>