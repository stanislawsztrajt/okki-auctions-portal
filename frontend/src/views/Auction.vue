<template>
  <div class=" h-screen">
    <Menu />
    <Loading v-if="isLoading" />
    <main
      v-else
      v-show="!isReportLayerShow"
      class=" h-5/6  xl:flex xl:justify-center xl:items-center"
    >
      <div v-if="!user">Nie znaleziono takiego ogloszenia <router-link to="/" class="font-bold">wroc na strone glowna</router-link></div>
      <div v-else class=" w-11/12 bg-white p-6 shadow-2xl block m-auto mt-10 xl:mt-auto xl:grid xl:grid-cols-9">
        <div
          v-if="auction.images"
          class=" h-64 md:h-80 lg:h-96 xl:h-auto col-span-4 bg-cover bg-no-repeat bg-center flex flex-row justify-between items-center"
          :style="{ backgroundImage: 'url(' + auction.images[imageIndex] + ')' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-white ml-10 bg-black p-2 opacity-50 cursor-pointer"
            @click="decrement"
            v-if="auction.images.length > 1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-white mr-10 bg-black p-2 opacity-50 cursor-pointer"
            @click="increment"
            v-if="auction.images.length > 1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <div class="col-span-3 ml-4 mt-12 xl:mt-0">
          <h2 class="sm:text-3xl">{{ auction.title }}</h2>
          <h1 class="font-bold sm:text-4xl text-green-600 mt-2">{{ auction.price }}zł</h1>
          <!-- <div class=" mt-10">
            <h2 class="text-3xl bold">Opis</h2>
            <p class="text-lg">{{ auction.description }}</p>
          </div> -->
          <h2 class="text-3xl bold">Opis</h2>
          <textarea class="w-full bg-transparent auction-textarea" v-model="auction.description" disabled>
          </textarea>
        </div>
        <div class="col-span-2 ml-10 flex flex-col mt-12 xl:mt-0 xl:border-l-2">
          <h2 class="-ml-10 xl:ml-0 text-xl self-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <router-link :to="`/users/${user.id}`" class="inline ml-2">{{ user.username }}</router-link>
            <br>
          </h2>

          <Liking
            v-if="auction.user_id !== userCookie.id"
            :likeds="likeds"
            :auction_id="auction.id"
            :route="'auctions'"
          />

          <router-link
            :to="`/chat/${user.id}`"
            class="-ml-10 xl:ml-6 mt-3 text-center text-xl bg-gray-200 rounded-xl p-2 text-green-600 hover:opacity-80 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Wyślij wiadomość
          </router-link>
          <div class="-ml-10 xl:ml-6 mt-3 text-center text-xl bg-green-600 rounded-xl p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ auction.phoneNumber }}
          </div>
          <button @click="toggleShowReportLayer" class="-ml-10 xl:ml-6 mt-3 text-center text-xl bg-red-600 rounded-xl p-2 text-white hover:opacity-80 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Zgłoś
          </button>
          <div class="-ml-10 xl:ml-6 mt-10 text-lg font-light">
            <h3>{{ auction.published_at }}</h3>
            <h3>{{ auction.location }}</h3>
          </div>
        </div>
      </div>
    </main>
    <ReportLayer
      :id="id"
      @toggle-show-report-layer="toggleShowReportLayer"
      v-show="isReportLayerShow"
    />
  </div>
</template>

<script>
import axios from 'axios'

import API_URL from '../../API_URL'
import { user, jwt} from '../constants/const-variables'

import Menu from '../components/Menu.vue'
import ReportLayer from '../components/ReportLayer.vue'
import Loading from '../components/Loading.vue'
import Liking from '../components/Liking.vue'

export default {
  components: {
    Menu,
    ReportLayer,
    Loading,
    Liking
  },
  props: {
    id: String
  },
  data(){
    return{
      userCookie: user,
      user: {},
      auction: {},
      likeds: [],

      isReportLayerShow: false,
      isLoading: false,

      imageIndex: 0
    }
  },
  async created(){
    this.isLoading = true

    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => this.likeds = res.data)

    await axios.get(`${API_URL}/auctions/${this.id}`)
    .then(async res =>{
      this.auction = res.data
      await axios.get(`${API_URL}/users/${res.data.user_id}`)
      .then(res => this.user = res.data)
    })
    .catch(() => this.user = false)

    this.isLoading = false
  },
  methods: {
    toggleShowReportLayer(){
      this.isReportLayerShow = !this.isReportLayerShow
    },
    async like(){
    },
    async unLike(){
    },
    increment(){
      if(this.imageIndex === this.auction.images.length - 1){
        return this.imageIndex = 0;
      }
      this.imageIndex++;
    },
    decrement(){
      if(this.imageIndex === 0){
        return this.imageIndex = this.auction.images.length - 1;
      }
      this.imageIndex--;
    }
  }
}
</script>