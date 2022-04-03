<template>
  <div class="h-screen">
    <Loading :isCenter="true" v-if="isLoading" />
    <div v-else>
      <div v-if="user !== null" class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
        <InfoElement
          :value="`Witaj na koncie u ${user.username}`"
          :icon="'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'"
        />
        <RateElement :rate="rate"/>

        <div v-if="auctions.length > 0">
          <InfoElement
            :value="'Ogłoszenia użytkownika'"
            :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
          />
          <Auction
            v-for="auction in auctions"
            :key="auction.code"
            :auction="auction"
            :likeds="likeds"
          />
        </div>

        <InfoElement
          :value="'Nie znaleziono ogłoszeń użytkownika'"
          :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' "
          v-else
        />

        <Comments
          :id="id"
          :changeDetector="changeDetector"
          @change-change-detector="changeChangeDetector"
          @toggle-report-layer="toggleReportLayer"
        />
      </div>
      <div v-else class="text-4xl text-center mt-20">
        Nie znaleziono użytkownika <span class="font-bold cursor-pointer" @click="() => $router.go(-1)">Wróc do poprzedniej strony</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Auction from '../components/Auction.vue'
import Comments from '../components/comment/Comments.vue'
import Loading from '../components/Loading.vue'
import InfoElement from '../components/InfoElement.vue'
import RateElement from '../components/RateElement.vue'


import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'

export default {
  components: {
    Auction,
    Comments,
    Loading,
    InfoElement,
    RateElement
  },
  props: {
    id: String,
  },
  data(){
    return{
      user: {},
      auctions: [],
      likeds: [],
      isLoading: true,
      isReportLayer: false,
      rate: 50,
      changeDetector: 0,
    }
  },
  async created(){
    this.isLoading = true;

    if(jwt){
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => this.likeds = res.data)
      .catch(() => this.likeds = null)
    }

    await axios.get(`${API_URL}/comments-in-users-profiles/${this.id}`)
    .then(res => this.rate = res.data.accucuracyRate)
    .catch(err => console.log(err))

    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res => this.user = res.data )
    .catch(() => this.user = null)

    await axios.get(`${API_URL}/user-auctions/${this.id}`)
    .then(res => this.auctions = res.data )
    .catch(() => this.auctions = null)

    this.isLoading = false
  },
  methods: {
    changeChangeDetector(){
      this.changeDetector++;
    },
    toggleReportLayer(){

    }
  },
  watch: {
    changeDetector: async function(){
      await axios.get(`${API_URL}/comments-in-users-profiles/${this.id}`)
      .then(res => this.rate = res.data.accucuracyRate)
    }
  }
}
</script>