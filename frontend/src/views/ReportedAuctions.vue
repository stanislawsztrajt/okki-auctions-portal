<template>
  <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
    <Loading :isCenter="true" v-if="isLoading"/>
    <div v-else>
      <InfoElement
        :value="'Zgłoszone ogłoszenia'"
        :icon="'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'"
        v-if="auctions.length > 0"
      />
      <InfoElement
        :value="'Nie ma żadnych zgłoszonych ogłoszeń'"
        :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
        v-else
      />
      <Auction
        @remove-auction="removeAuction"
        v-for="auction in auctions"
        :key="auction.id"
        :auction="auction"
        :reports="reports"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import InfoElement from '../components/InfoElement.vue'
import Auction from '../components/Auction.vue'
import Loading from '../components/Loading.vue'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  name: 'AdminDashboard',
  components: {
    InfoElement,
    Auction,
    Loading
  },
  data(){
    return{
      user: user,
      auctions: [],
      reports: [],
      isDeleteAuctionLayer: false,
      isDeleteReportLayer: false,
      isBlockUserLayer: false,
      isPublishLayer: false,
      isLoading: true
    }
  },
  async created(){
    if(!jwt){
      this.$router.push('/login')
    }
    else if(user.role.name !== 'Admin'){
      this.$router.push('/dashboard')
    } else {
      await axios.get(`${API_URL}/auction-reports`, authorization)
      .then(res => this.reports = res.data)

      await axios.get(`${API_URL}/reported-auctions`, authorization)
      .then(res => this.auctions = res.data)
    
      this.isLoading = false;
    }
  },
  methods: {
    removeAuction(id){
      const index = this.auctions.findIndex(auction => auction.id === id);
      this.auctions.splice(index, 1);
    }
  }
}
</script>

<style>

</style>