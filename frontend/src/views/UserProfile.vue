<template>
  <div class="h-screen">
    <Menu />
    <div v-if="user" class="h-screen">
      <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-6 p-4 text-2xl">
            Witaj na koncie u<span class="ml-2 font-bold">{{ user.username }}</span> !
          </div>
        </div>
        <div v-if="!adverts" class="dashboardElements mt-6 p-4 text-2xl flex flex-row justify-center md:justify-start">
          Nie znaleziono ogłoszeń użytkownika
        </div>
        <div v-else>
          <div class="flex flex-row justify-center md:justify-start">
            <div class="dashboardElements mt-4 p-4 text-2xl">Ogłoszenia użytkownika</div>
          </div>
          <Adverts :adverts="adverts"/>
        </div>
        <Comments :id="id"/>
      </div>
    </div>
    <div v-else class="h-5/6 text-4xl flex justify-center items-center">
      Nie znaleziono użytkownika o id: {{ id }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'
import Adverts from '../components/Adverts.vue'
import Comments from '../components/Comments.vue'

import API_URL from '../../API_URL'

export default {
  components: {
    Menu,
    Adverts,
    Comments
  },
  props: {
    id: String,
  },
  data(){
    return{
      adverts: [],
      user: {}
    }
  },
  async created(){
    if(this.id === this.$cookies.get('user').id){
      this.$router.push('/dashboard')
    }

    await axios.get(`${API_URL}/users/${this.id}`)
    .then(res =>{
      this.user = res.data
      console.log(res)
    })
    .catch(() =>{
      this.user = undefined
    })
    try{
      await this.user.Adverts.forEach(async advert =>{
        await axios.get(`${API_URL}/auctions/${advert}`)
        .then(res =>{
          console.log(res)
          this.adverts.push(res.data)
        })
        .catch((err) =>{
          console.log(err)
        })
      })
    } catch(err){
      this.adverts = undefined
    }
  }
}
</script>

<style>

</style>