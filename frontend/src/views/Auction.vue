<template>
  <div class="">
    <Menu />
    <Loading v-if="isLoading" />
    <main
      v-else
      v-show="!isReportLayerShow"
      class="flex flex-col items-center gap-8"
    >
      <div class="w-3/4 mt-8 xl:mt-14 border-gray-300 text-gray-600 bg-white shadow p-4 ">
        <p class="text-xl lg:text-2xl">{{auction.title}}</p>
        <p class="text-3xl lg:text-4xl text-green-600 font-bold">{{ auction.price }}zł</p>
      </div>
      
      <div class="w-3/4 flex flex-col xl:flex-row gap-x-8 xl:h-128">
        <div class="w-full xl:w-3/4 bg-white p-4 shadow">
          <div
            v-if="auction.images"
            class="flex flex-row flex-wrap justify-center items-center h-full"
          >
            <div v-if="auction.images.length > 1" class="flex justify-between w-3/4 xl:w-9/16 absolute">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 xl:h-12 xl:w-12 ml-10 p-2 opacity-50 text-white bg-black cursor-pointer"
                @click="decrement"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h110" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 xl:h-12 xl:w-12 mr-10 p-2 opacity-50 text-white bg-black cursor-pointer"
                @click="increment"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            <img 
              class="max-h-96 xl:max-h-full"
              :src="auction.images[imageIndex]" 
              alt=""
            >
          </div>
        </div>
        <div class="w-full xl:w-1/4 flex flex-col p-4 bg-white shadow ">
          <h2 class="text-xl self-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <router-link :to="`/users/${user.id}`" class="inline ml-2">{{ user.username }}</router-link>
            <br>
          </h2>
          
          <Liking
            v-if="auction.user_id !== userCookie.id && jwt"
            :likeds="likeds"
            :auction_id="auction.id"
            :route="'auctions'"
          />
          <router-link
            :to="`/chat/${user.id}`"
            class=" mt-3 text-center text-md 2xl:text-lg bg-gray-200 rounded-md p-2 text-green-600 hover:opacity-80 duration-100"
            v-if="auction.user_id !== userCookie.id && jwt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Wyślij wiadomość
          </router-link>
          <div class=" mt-3 text-center text-md 2xl:text-lg bg-green-600 rounded-md p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ auction.phoneNumber }}
          </div>
          <div
            class=" mt-3 text-center text-md 2xl:text-lg bg-gray-200 rounded-md p-2 text-white duration-100"
          >
            <span v-if="rate > 55" class="text-green-500">
              <svg class="h-6 w-6 inline mb-1 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
              {{ rate }}% <span class="text-gray-600">Opinia użytkowników</span>
            </span>
            <span v-else-if="rate<45" class="text-red-500">
              <svg class="h-6 w-6 inline mb-1 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" /></svg>
              {{ rate }}% <span class="text-gray-600">Opinia użytkowników</span>
            </span>
            <span v-else>
              <svg class="h-6 w-6 inline mb-1"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <line x1="9" y1="15" x2="15" y2="15" /></svg>
              {{ rate }}
            </span>
          </div>
          <button 
            @click="toggleShowReportLayer" 
            class=" mt-3 text-center text-md 2xl:text-lg bg-red-600 rounded-md p-2 text-white hover:opacity-80 duration-100"
            v-if="auction.user_id !== userCookie.id && jwt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Zgłoś
          </button>
          <div class=" mt-4 text-lg font-light">
            <h3>{{ auction.published_at }}</h3>
            <a 
              target="blank" 
              :href="`https://www.google.pl/maps/place/${auction.location}`"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mb-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg> 
            {{ auction.location }}
            </a>
          </div>
        </div>
      </div>
      <div class="w-3/4 flex flex-col xl:flex-row gap-8">
        <div class="w-full xl:w-3/4 bg-white h-full p-4 shadow">
          <h2 class="text-3xl lg:text-4xl bold">Opis ogłoszenia</h2>
          <div 
            class="w-full min-h-56 text-lg lg:text-xl mt-4 bg-transparent auction-textarea resize-none pointer-events-none" 
            spellcheck="false" 
            contenteditable="" 
            disabled
          >
            {{auction.description}}
          </div>
        </div> 
        <div class="w-full xl:w-1/4 p-4 text-xl xl:text-lg bg-white shadow text-center">
          <a 
            target="blank" 
            :href="`https://www.google.pl/maps/place/${auction.location}`"
          >
            Sprawdź lokalizacje 
            <span class="font-bold">{{ auction.location }}</span>  
            na google maps
            <img class="mt-4" src="../images/google-maps.jpg" alt="">
          </a>
        </div>
      </div>
      <div class="mt-4"></div>
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
    Liking,
  },
  props: {
    id: String
  },
  data(){
    return{
      userCookie: user,
      jwt: jwt,
      user: {},
      auction: {},
      likeds: [],
      rate: 0,

      isReportLayerShow: false,
      isLoading: false,

      imageIndex: 0
    }
  },
  async created(){
    this.isLoading = true

    if(jwt){
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => this.likeds = res.data)
    }

    await axios.get(`${API_URL}/auctions/${this.id}`)
    .then(async res =>{
      this.auction = res.data

      await axios.get(`${API_URL}/users/${res.data.user_id}`)
      .then(async res => {
        this.user = res.data

        await axios.get(`${API_URL}/comments-in-users-profiles/${res.data.id}`)
        .then(res => this.rate = res.data.accucuracyRate)
        .catch(err => console.log(err))
      })
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