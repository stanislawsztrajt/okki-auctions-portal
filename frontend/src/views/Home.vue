<template>
  <div id="Home" class="h-screen w-screen flex flex-col justify-between text-gray-500">
    <Menu/>
    <div class="h-108 -mt-20 w-full bg-gradient-to-b from-green-600 to-green-700 bg-cover bg-center shadow-md" :style="{ backgroundImage: 'url('+ require('../assets/bannerImg.png') +')' }"></div> 
    <main class="px-10 md:px-20">
      <div class="flex justify-between border-b-2 border-gray-300 py-0.5 px-0.5 w-11/12 mx-auto">
        <input 
          class="bg-transparent outline-none text-2xl w-3/5 font-light text-gray-700 md:text-4xl" 
          type="text" 
          name="inputHandler" 
          v-model="searchInputValue" 
          @keydown="makeSureKeyIsEnter($event)" 
          placeholder="książka / rower / ...">
        <input 
          class="bg-transparent outline-none text-2xl w-2/5 font-light text-gray-700 md:text-4xl pl-3 border-l border-gray-300" 
          type="text"  
          v-model="searchInputLocation" 
          @keydown="makeSureKeyIsEnter($event)"
          placeholder="lokalizacja">
        <button class="text-green-600 focus:outline-none" @click="shareSearchInputValues()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import Menu from '../components/Menu'

export default {
  name: 'Home',
  components: {
    Menu,
  },
  data(){
    return{
      searchInputValue: '',
      searchInputLocation: '',
      endPoint: 'https://okki-api.herokuapp.com/'
    }
  },
  methods: {
    shareSearchInputValues () {
      this.$router.push({name: "AdverstsResults", params: {value: this.searchInputValue, Location: this.searchInputLocation}})
    },
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.shareSearchInputValues();
      }
    }
  }
}
</script>

