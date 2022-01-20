<template>
  <div class="h-screen">
    <Menu />
    <Loading v-if="isLoading" />
    <div v-else-if="!isLoading" class="h-screen">
      <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-6 p-4 text-2xl">
            Witaj na koncie u<span class="ml-2 font-bold">{{ user.username }}</span> !
          </div>
        </div>
        <div v-if="!auctions" class="dashboardElements mt-6 p-4 text-2xl flex flex-row justify-center md:justify-start">
          Nie znaleziono ogłoszeń użytkownika
        </div>
        <div v-else>
          <div class="flex flex-row justify-center md:justify-start">
            <div class="dashboardElements mt-4 p-4 text-2xl">Ogłoszenia użytkownika</div>
          </div>
          <Auction
            v-for="auction in auctions"
            :key="auction.code"
            :auction="auction"
            :likeds="[]"
          />
        </div>
        <Comments :id="id"/>
      </div>
    </div>
    <div v-else class="h-5/6 text-4xl flex justify-center items-center">
      Nie znaleziono użytkownika
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'
import Auction from '../components/Auction.vue'
import Comments from '../components/comment/Comments.vue'
import Loading from '../components/Loading.vue'

import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'

export default {
  components: {
    Menu,
    Auction,
    Comments,
    Loading
  },
  props: {
    id: String,
  },
  data(){
    return{
      user: {},
      auctions: [],
      likeds: [],
      isLoading: false
    }
  },
  async created(){
    this.isLoading = true

    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res => this.user = res.data )
    .catch(() => this.user = null)

    await axios.get(`${API_URL}/user-auctions/${this.id}`)
    .then(res => this.auctions = res.data )
    .catch(() => this.auctions = null)

    if(jwt){
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => this.likeds = res.data)
      .catch(() => this.likeds = [])
    }

    this.isLoading = false
  }
}
</script>