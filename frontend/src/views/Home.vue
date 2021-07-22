<template>
  <div id="Home" class="flex flex-col justify-between text-gray-500 pb-10">
    <Menu/>
    <main class="flex flex-col mt-20">
      <div class="h-80 w-full md:h-108 shadow-md banner-background grid gap-4 grid-cols-4 sm:grid-cols-5 xl:grid-cols-7 items-center justify-items-center p-8 sm:py-10 sm:px-20 md:py-12 md:px-32">
        <div v-for="category in categories" :key="category.name">
          <button @click="updateCategoryOption(category.value)" class="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 lg:w-28 lg:h-24 xl:w-32 xl:h-28 bg-white hover:bg-gray-200 text-gray-500 text-3xl md:text-4xl lg:text-5xl rounded-lg flex justify-center items-center cursor-pointer transition duration-100">
            <i v-bind:class="'fas fa-' + category.icon"></i>
          </button>
        </div>
      </div> 
      <div class="flex justify-between border-b border-gray-400 py-0.5 px-0.5 w-10/12 mt-16 lg:mt-36 mx-auto">
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
import categoriesJSON from '../jsons files/categories.json'

export default {
  name: 'Home',
  components: {
    Menu,
  },
  data(){
    return{
      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
      API_URL: 'https://okki-api.herokuapp.com/',
      categories: categoriesJSON
    }
  },
  methods: {
    // Funkcja która przekazuje dane do AdverstsResults.vue
    shareSearchInputValues () {
      this.$router.push({name: "AdvertsResults", params: {value: this.searchInputItem, location: this.searchInputLocation, category: this.categoryOption}})
    },
    //Funkcja sprawdzająca czy naciśnięty przycisk w inpucie jest enterem
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.shareSearchInputValues();
      }
    },
    updateCategoryOption(category) {
      this.categoryOption = category;
      this.shareSearchInputValues()
    }
  },
}
</script>

