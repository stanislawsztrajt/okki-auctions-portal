<template>
    <div>
      <Menu />
      <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-6 p-4 text-2xl">
            Witaj!<span class="ml-2 font-bold">{{ user.username }}</span>
          </div>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <button @click="logout" class="dashboardElements buttonAnimationHover mt-4 p-4 text-2xl text-left">
            Wyloguj się
          </button>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-4 p-4 text-2xl">Twoje ogłoszenia</div>
        </div>
        <Adverts :adverts="adverts"/>
        <div class="flex flex-row justify-center mt-10 md:justify-start">
          <div class="dashboardElements mt-4 p-4 text-2xl">
            Komentarze na twoim koncie
          </div>
        </div>
        <div
          v-for="comment in user.comments"
          :key="comment"
          class="w-10/12 h-auto lg:h-62 xl:h-40 mt-6 p-4 bg-white"
        >
          <p class="text-lg font-medium">
            {{ comment.rate }}/6
            {{ comment.user.username }}
          </p>
          {{ comment.comment }}
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'
import Adverts from '../components/Adverts.vue'

import API_URL from '../../API_URL'

export default {
  name: 'Dashboard',
  components: {
    Menu,
    Adverts
  },
  data(){
      return{
        ISjwt: this.$cookies.isKey('jwt'),
        jwt: this.$cookies.get('jwt'),
        userCookie: this.$cookies.get('user'),
        user: {},
        adverts: [],
      }
  },
  async created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    await axios.get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res => {
      this.user = res.data
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    console.log(this.user.Adverts)

    await this.user.Adverts.forEach(async advert =>{
      await axios
      .get(`${API_URL}/auctions/${advert}`)
      .then(res =>{
        this.adverts.push(res.data)
      })
    })
  },
  methods: {
    logout(){
      this.$cookies.remove('jwt')
      this.$cookies.remove('user')
      this.$router.push('/login')
    }
  },
}
</script>