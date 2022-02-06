<template>
  <router-link
    :to="`/auction/${auction.id}`"
    class="flex flex-col sm:flex-row w-full xl:w-10/12 border-gray-300 my-4 text-gray-600 bg-white shadow"
  >
    <div
      style="min-width: 18rem"
      class="h-32 sm:h-48 w-full sm:w-72 bg-gray-300 bg-cover bg-no-repeat bg-center border-gray-200 border-b-2 sm:border-r-2 sm:border-b-0"
      :style="{ backgroundImage: 'url(' + auction.images[0] + ')' }"
    ></div>
    <div class="px-3 py-2 sm:px-5 sm:py-4 w-full">
      <h2 class="sm:text-2xl">
        {{ auction.title }}
      </h2>
      <h3 class="font-bold sm:text-3xl">
        {{ auction.price }}zł
      </h3>
      <h3 class="text-xs sm:text-lg">
        {{ auction.location }}
      </h3>
      <router-link to="" class="w-full flex flex-col" v-if="user.id === auction.user_id">
        <svg
          class="mr-12 sm:mr-0 -mt-6 h-6 w-6 xl:h-10 xl:w-10 text-blue-500 self-end button-animation-hover"
          @click="toggleEditAuctionLayer(auction.id)"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg
          class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-red-500 self-end button-animation-hover "
          @click="toggleDeleteAuctionLayer(auction.id)"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </router-link>

      <Liking
        v-if="auction.user_id !== user.id"
        :likeds="likeds"
        :auction_id="auction.id"
      />
      <!-- <div v-else>to nic takiego</div> -->
    </div>
  </router-link>
</template>

<script>
import { jwt, user } from '../constants/const-variables';
import Liking from './Liking.vue';

export default {
  components: {
    Liking
  },
  props: {
    auction: Object,
    likeds: Array,
  },
  data(){
    return{
      user: user,
      jwt: jwt
    }
  },
  methods: {
    toggleEditAuctionLayer(id){
      this.$emit('toggle-edit-auction-layer', id)
    },
    toggleDeleteAuctionLayer(id){
      this.$emit('toggle-delete-auction-layer', id)
    }
  }
}
</script>