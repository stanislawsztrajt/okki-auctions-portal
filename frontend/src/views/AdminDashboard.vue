<template>
  <Loading :isCenter="true" v-if="isLoading" />
  <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
    <InfoElement
      :value="`Witaj ${user.username}!`"
      :icon="'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'"
    />
    <ButtonElement
      :value="'Wyloguj się'"
      @action="logout"
      :icon="'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'"
    />
    <ButtonElement
      :value="`Zgłoszone ogłoszenia (${auctionReportsLength})`"
      @action="() => $router.push('/admin-dashboard/reported-auctions')"
      :icon="'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'"
    />
    <ButtonElement
      :value="`Ukryte ogłoszenia (${hiddenAuctionsLength})`"
      @action="() => $router.push('/admin-dashboard/hidden-auctions')"
      :icon="'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'"
    />
    <ButtonElement
      :value="`Zgłoszone komentarze (${commentsReportsLength})`"
      @action="() => $router.push('/admin-dashboard/reported-comments')"
      :icon="'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'"
    />
    <ButtonElement
      :value="`Ukryte komentarze (${hiddenCommentsLength})`"
      @action="() => $router.push('/admin-dashboard/hidden-comments')"
      :icon="'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'"
    />
  </div>
</template>

<script>
import axios from 'axios'

import InfoElement from '../components/InfoElement.vue'
import ButtonElement from '../components/ButtonElement.vue'
import Loading from '../components/Loading.vue'

import { authorization, jwt, user } from '../constants/const-variables'
import API_URL from '../../API_URL'

export default {
  name: 'AdminDashboard',
  components: {
    InfoElement,
    ButtonElement,
    Loading
  },
  data(){
    return{
      user: user,
      isLoading: true,

      hiddenAuctionsLength: 0,
      hiddenCommentsLength: 0,
      auctionReportsLength: 0,
      commentsReportsLength: 0,
    }
  },
  async created(){
    if(!jwt){
      this.$router.push('/login')
    }
    else if(user.role.name !== 'Admin'){
      this.$router.push('/dashboard')
    } else {
      await axios.get(`${API_URL}/reported-auctions/count`, authorization)
      .then(res => this.auctionReportsLength = res.data)

      await axios.get(`${API_URL}/hidden-auctions/count`, authorization)
      .then(res => this.hiddenAuctionsLength = res.data)

      await axios.get(`${API_URL}/reported-comments/count`, authorization)
      .then(res => this.commentsReportsLength = res.data)

      await axios.get(`${API_URL}/count-hidden-comments`, authorization)
      .then(res => this.hiddenCommentsLength = res.data)

      this.isLoading = false;
    }
  },
  methods: {
    async logout(){
      await this.$cookies.remove('jwt');
      await this.$cookies.remove('user');

      this.$router.push('/')
      .then(() => this.$router.go())
    }
  }
}
</script>

<style>

</style>