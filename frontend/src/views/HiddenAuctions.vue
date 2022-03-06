<template>
  <div>
    <Menu />
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement 
        :value="'Ukryte ogłoszenia:'" 
        :icon="'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'" 
        v-if="auctions.length > 0"
      />
      <InfoElement
        :value="'Nie ma żadnych ukrytych ogłoszeń'" 
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

import Menu from '../components/Menu.vue'
import InfoElement from '../components/InfoElement.vue'
import Auction from '../components/Auction.vue'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  name: 'AdminDashboard',
  components: {
    Menu,
    InfoElement,
    Auction,
  },
  data(){
    return{
      user: user,
      auctions: [],
      reports: []
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

      await axios.get(`${API_URL}/hidden-auctions`, authorization)
      .then(res => this.auctions = res.data)
      .then(res => console.log(res))
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