<template>
  <div id="SearchingInputs" class="flex items-center px-5 py-3 bg-white shadow-sm">
    <input
      class="search-input w-full sm:w-3/5"
      placeholder="wyszukaj"
      type="text" name="inputHandler"
      @keypress="makeSureKeyIsEnter($event)"
      v-model.trim="inputItem" >
    <input 
      class="search-input w-2/5 border-l pl-5 border-gray-200 hidden sm:block" 
      placeholder="lokalizacja"
      type="text"
      @keydown="makeSureKeyIsEnter($event)"
      v-model.trim="inputLocation">
    <button
      class="text-green-600 focus:outline-none"
      @click="this.$emit('update-search-input-values', inputItem, inputLocation)">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    },
    filterByInputItem(auctionsCopy) {
      // Filtrowanie tablicy auctions po nazwach ogłoszeń
      this.auctions = auctionsCopy
      this.auctions = this.auctions.filter((auction) => {
        let auctionTitle = auction.title.toLowerCase()
        let inputItem = this.inputItem.toLowerCase().split(' ')
        return inputItem.every(searchingWord => auctionTitle.includes(searchingWord));
      })
      this.$emit('update-auctions', this.auctions)
    },
    filterByInputLocation(auctionsCopy) {
      // Filtrowanie tablicy auctions po lokalizacji
      this.auctions = auctionsCopy
      this.auctions = this.auctions.filter((auction) => {
        if(this.inputLocation.replace(/\s+/g, ' ').trim() !== '') {
          return auction.location.toLowerCase().replace(/\s+/g, ' ') === this.inputLocation.toLowerCase().replace(/\s+/g, ' ')
        }
        else {
          return true
        }
      })
      this.$emit('update-auctions', this.auctions)
    }
  },
}
</script>