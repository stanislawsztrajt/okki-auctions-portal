<template>
  <div id="SearchingInputs" class="flex items-center px-5 py-2 lg:py-3 bg-white shadow">
    <input
      class="search-input w-full xs:w-3/5"
      placeholder="wyszukaj"
      type="text" name="inputHandler"
      @keyup="makeSureKeyIsEnter($event)"
      v-model.trim="inputItem" >
    <span class="hidden xs:block h-12 w-1 border-l border-gray-200 mx-2"></span>
    <input
      class="search-input w-2/5 hidden xs:block"
      placeholder="lokalizacja"
      type="text"
      @keyup="makeSureKeyIsEnter($event)"
      v-model.trim="inputLocation">
    <button
      class="text-green-600 focus:outline-none ml-1"
      @click="this.$emit('update-search-input-values', inputItem, inputLocation)">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'InputSearchPanel',
  data() {
    return {
      inputItem: '',
      inputLocation: '',
    }
  },
  props: {
    searchInputItem: {
      type: String
    },
    searchInputLocation: {
      type: String
    },
  },
  created() {
    if(this.searchInputItem) {
      this.inputItem = this.searchInputItem
    }
    if(this.searchInputLocation) {
      this.inputLocation = this.searchInputLocation
    }
  },
  methods: {
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.$emit('update-search-input-values', this.inputItem, this.inputLocation);
      }
    }
  }
}
</script>