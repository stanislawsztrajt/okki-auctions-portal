<template>
  <router-link
    :to="`/auction/${auction.id}`"
    class="flex flex-col grid-cols-1 h-96 p-2 border-gray-300 my-4 text-gray-600 bg-white shadow"
  >
    <div
      class="h-48 w-full bg-gray-300 bg-cover bg-no-repeat bg-center border-gray-200 border-b-2 sm:border-r-2 sm:border-b-0"
      :style="{ backgroundImage: 'url(' + auction.images[0] + ')' }"
    ></div>
    <div class="px-3 py-2 sm:px-5 sm:py-4 w-full">
      <div class="flex flex-col justify-between h-40">
        <h2
          class="sm:text-xl pointer-events-none"
          spellcheck="false"
          contenteditable=""
          disabled
        >
          {{ auction.title.length > 65 ? `${auction.title.substring(0,65)}...` : auction.title}}
        </h2>
        <div class="flex flex-row items-end justify-between">
          <div class="flex flex-col">
            <h3 class="text-xs sm:text-base">
              {{ auction.location }}
            </h3>
            <h3 class="font-bold sm:text-3xl">
              {{ auction.price }}zł
            </h3>
          </div>

          <Liking
            v-if="auction.user_id !== user.id"
            :likeds="likeds"
            :auction_id="auction.id"
          />
        </div>
      </div>
    </div>

  </router-link>
</template>

<script>
import { jwt, user } from '../constants/const-variables';
import Liking from './Liking.vue';

export default {
  name: 'TheHomeAuction',
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
      jwt: jwt,
    }
  },
}
</script>