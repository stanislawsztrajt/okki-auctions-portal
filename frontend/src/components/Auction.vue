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
      <Liking
        v-if="auction.user_id !== user.id"
        :likeds="likeds"
        :auction_id="auction.id"
      />
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