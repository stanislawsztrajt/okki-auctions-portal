<template>
  <div class=" h-screen">
    <Menu />
    <main class=" h-5/6 flex justify-center items-center">
      <div class=" w-10/12 bg-white p-6 shadow-2xl grid grid-cols-4">
        <img :src="advert.images" class=" col-span-1" alt="">
        <div class="col-span-2 mx-12">
          <h2 class="sm:text-3xl">{{ advert.title }}</h2>
          <h1 class="font-bold sm:text-4xl text-green-600 mt-2">{{ advert.price }}zł</h1>
          <div class=" mt-10">
            <h2 class="text-3xl bold">Opis</h2>
            <p class="text-lg">{{ advert.description }}</p>
          </div>
        </div>
        <div class="col-span-1 border-l-2 mx-10 flex flex-col  ">
          <h2 class="text-xl self-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="inline ml-2">{{ userInfo.username }}</p>
            <br>
          </h2>
          <button class=" ml-10 mt-8 text-center text-xl bg-green-600 rounded-xl p-2 text-white hover:opacity-80 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Polub ogłoszenie
          </button>
          <button class="ml-10 mt-3 text-center text-xl bg-gray-200 rounded-xl p-2 text-green-600 hover:opacity-80 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Wyślij wiadomość
          </button>
          <div class="ml-10 mt-3 text-center text-xl bg-green-600 rounded-xl p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ advert.phoneNumber }}
          </div>
          <button class="ml-10 mt-3 text-center text-xl bg-red-600 rounded-xl p-2 text-white hover:opacity-80 duration-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Zgłoś
          </button>
          <div class="ml-10 mt-10 text-lg font-light">
            <h3>{{ advert.published_at }}</h3>
            <h3>{{ advert.location }}</h3>
          </div>
        </div>
        </div>
    </main>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import axios from 'axios'

export default {
  components: {
    Menu
  },
  data(){
    return{
      API_URL: 'https://okki-api.herokuapp.com',
      userInfo: {},
      advert: {}
    }
  },
  props: {
    id: String
  },
  async created(){
    await axios.get(`${this.API_URL}/adverts/${this.id}`)
    .then(async res => {
      console.log(res)
      this.advert = res.data;
      await axios.get(`${this.API_URL}/users/${res.data.userID}`)
      .then(res =>{
        this.userInfo = res.data
      })
      .catch(err =>{
        console.log(err)
      })
    })
    .catch(err => console.log(err, ' nie znaleziono ogloszenia'))
  }
}
</script>

<style>

</style>