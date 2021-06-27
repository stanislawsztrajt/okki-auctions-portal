<template>
  <div id="InputSearchPanel">
    <div class="flex justify-between border-b-2 border-gray-300 pb-0.5 px-0.5 w-full md:w-3/4">
      <input
        class="bg-transparent outline-none text-2xl w-3/5 font-light text-gray-700 md:text-4xl"
        placeholder="książka / rower / ..."
        type="text" name="inputHandler"
        @keypress="emitSearchAdversts($event)"
        v-model="inputValue" >
      <input 
          class="bg-transparent outline-none text-2xl w-2/5 font-light text-gray-700 md:text-4xl pl-3 border-l border-gray-300" 
          placeholder="lokalizacja"
          type="text"  
          @keydown="emitSearchAdversts($event)"
          v-model="inputLocation">
      <button
        class="text-green-600 focus:outline-none"
        @click="$emit('search-adversts', inputValue)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
    <div class="flex my-6">
      <div class="mr-5">
        <h2 class="flex text-gray-700 text-lg items-center cursor-pointer">filtrowanie 
          <span class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </h2>
      </div>
      <div>
        <h2 @click="toggleUnfoldSorting()" class="flex text-gray-700 text-lg items-center cursor-pointer">sortowanie
          <span class="text-green-600 transform transition duration-75" ref="sortingArrow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </h2>
        <div class="flex-col items-start hidden absolute bg-white p-5 text-gray-400" ref="sortingOptions">
          <button class="my-1" @click="changeSortingOption('newest')">Najnowsze</button>
          <button class="my-1" @click="changeSortingOption('cheapest')">Najtańsze</button>
          <button class="my-1" @click="changeSortingOption('mostexpensive')">Najdroższe</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputSearchPanel',
  data() {
    return {
      inputValue: this.searchInputValue,
      inputLocation: this.searchInputLocation,
      choosenCategory: '',
      categoriesAndFilters: [
        {
          name: 'motoryzacja',
          filters: [{
            name: 'marka',
            options: ['Audi', 'BMW', 'Volvo', 'Opel', 'Mercedes']
          }]
        },
        {
          name: 'odzież',
          filters: [{
            name: 'rozmiar',
            options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
          }]
        }
      ],
    }
  },
  props: {
    searchInputValue: {
      type: String
    },
    searchInputLocation: {
      type: String
    },
  },
  methods: {
    changeSortingOption (sortingOption) {
      this.$emit('change-sorting-option', sortingOption)
    },
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
    emitSearchAdversts (e) {
      if (e.key === "Enter") {
        this.$emit('search-adversts', this.inputValue, this.inputLocation)
      }
    }
  },
}
</script>

