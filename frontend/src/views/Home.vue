<template>
  <div id="Home" class="flex flex-col justify-between text-gray-500">
    <Menu/>
    <main class="flex flex-col mt-20">
      <div class="h-80 w-full md:h-108 flex justify-center items-center shadow-md banner-background">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 lg:h-28 lg:w-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="text-white font-light text-6xl lg:text-8xl ml-6 md:mb-1">okki</span>
      </div> 
      <div class="flex justify-between border-b-2 border-gray-300 py-0.5 px-0.5 w-10/12 mt-16 lg:mt-36 mx-auto">
        <input 
          type="text" 
          placeholder="książka / rower / ..."
          class="search-input-item" 
          v-model="searchInputItem" 
          @keydown="makeSureKeyIsEnter($event)" 
        >
        <input 
          type="text"  
          placeholder="lokalizacja"
          class="search-input-location" 
          v-model="searchInputLocation" 
          @keydown="makeSureKeyIsEnter($event)"
        >
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
      searchInputItem: '',
      searchInputLocation: '',
      API_URL: 'https://okki-api.herokuapp.com/'
    }
  },
  methods: {
    // Funkcja która przekazuje dane do AdverstsResults.vue
    shareSearchInputValues () {
      this.$router.push({name: "AdverstsResults", params: {value: this.searchInputItem, location: this.searchInputLocation}})
    },
    //Funkcja sprawdzająca czy naciśnięty przycisk w inpucie jest enterem
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.shareSearchInputValues();
      }
    }
  }
}
</script>

