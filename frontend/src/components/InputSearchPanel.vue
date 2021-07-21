<template>
  <div id="InputSearchPanel">
    <div class="flex justify-between border-b border-gray-400 pb-0.5 px-0.5 w-full md:w-3/4">
      <input
        class="search-input-item"
        placeholder="książka / rower / ..."
        type="text" name="inputHandler"
        @keypress="emitSearchAdverts($event)"
        v-model="inputItem" >
      <input 
          class="search-input-location" 
          placeholder="lokalizacja"
          type="text"  
          @keydown="emitSearchAdverts($event)"
          v-model="inputLocation">
      <button
        class="text-green-600 focus:outline-none"
        @click="$emit('search-adverts', inputItem)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
    <div class="w-full bg-white p-5 text-gray-600 mt-5 shadow-sm" ref="filteringOptions">
      <h2 class="w-full text-2xl font-semibold mb-5 pb-2 border-b border-gray-200">Filtry</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div class="flex flex-col">
          <label class="ml-1">Kategoria</label>
          <select 
            name="Kategorie" 
            class="filtering-input"
            v-model="this.category"
            @click="this.$emit('change-category-option', this.category)"
          >
            <option value="" selected>Wszystko</option>
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex mt-3">
      <div>
        <h2 @click="toggleUnfoldSorting()" class="flex text-gray-700 text-lg items-center cursor-pointer">sortowanie
          <span class="text-green-600 transform transition duration-75" ref="sortingArrow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </h2>
        <div class="flex-col items-start hidden absolute bg-white p-5 text-gray-400" ref="sortingOptions">
          <button class="my-1" @click="emitChangeSortingOption('newest')">Najnowsze</button>
          <button class="my-1" @click="emitChangeSortingOption('cheapest')">Najtańsze</button>
          <button class="my-1" @click="emitChangeSortingOption('mostexpensive')">Najdroższe</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import categoriesJSON from '../jsons files/categories.json'

export default {
  name: 'InputSearchPanel',
  data() {
    return {
      inputItem: this.searchInputItem,
      inputLocation: this.searchInputLocation,
      categories: categoriesJSON,
      category: this.categoryOption,
    }
  },
  props: {
    searchInputItem: {
      type: String
    },
    searchInputLocation: {
      type: String
    },
    categoryOption : {
      type: String
    }
  },
  methods: {
    toggleUnfoldSorting () {
      const sortingOptions = this.$refs.sortingOptions.classList
      const sortingArrow = this.$refs.sortingArrow.classList
      if(sortingOptions.contains('hidden')){
        sortingOptions.remove('hidden')
        sortingOptions.add('flex')
        sortingArrow.add('rotate-90')
      }
      else{
        sortingOptions.add('hidden')
        sortingOptions.remove('flex')
        sortingArrow.remove('rotate-90')
      }
    },
    emitChangeSortingOption (sortingOption) {
      this.$emit('change-sorting-option', sortingOption)
    },
    emitSearchAdverts (e) {
      if (e.code === "Enter") {
        this.$emit('search-adverts', this.inputItem, this.inputLocation)
      }
    }
  },
  created() {
    if(this.category == undefined) {
      this.category = ''
    }
  },
}
</script>

