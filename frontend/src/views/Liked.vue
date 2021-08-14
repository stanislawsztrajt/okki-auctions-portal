<template>
  <div>
    <Menu />
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <Advert
        v-for="advert in adverts"
        :key="advert.code"
        :advert="advert"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu'
import Advert from '../components/Advert.vue'

import API_URL from '../../API_URL'

export default {
  components: {
    Menu,
    Advert
  },
  data(){
    return{
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      ISjwt: this.$cookies.isKey('jwt'),
      user: {},
      adverts: []
    }
  },
  async created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    await axios
    .get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res => this.user = res.data)
    .catch(err => console.log(err.status))

    await this.user.likedAdverts.forEach(async advert =>{
      await axios
      .get(`${API_URL}/auctions/${advert}`)
      .then(res =>{
        this.adverts.push(res.data)
      })
    })
  }
}
</script>