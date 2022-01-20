<template>
  <div>
    <Menu />
    <Loading v-if="isLoading" />
    <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <div class="flex flex-row justify-center md:justify-start mb-6">
        <div class="dashboardElements mt-6 p-4 text-2xl" v-if="likeds.length > 0">
          Twoje polubione ogłoszenia
        </div>
        <div class="dashboardElements mt-6 p-4 text-2xl" v-else>
          Nie masz polubionych ogłoszeń
        </div>
      </div>
      <div class="border-b pb-6 border-gray-300" v-if="likeds.length > 0">
        <SearchInputs
          class="sm:w-3/4"
          ref="inputsComponent"
          @search-auctions="searchAuctions"
          @update-auctions="updateAuctions"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
        <SearchFilters
          ref="filteringComponent"
          @search-auctions="searchAuctions"
          @update-auctions="updateAuctions"
          :categoryOption="categoryOption"
        />
        <SearchSorting
          ref="sortingComponent"
          @search-auctions="searchAuctions"
        />
      </div>
      <Loading v-show="isLoading" />
      <div v-show="!isLoading" v-if="likeds.length > 0">
        <Auction
          @toggle-edit-auction-layer="() => {}"
          @toggle-delete-auction-layer="() => {}"
          v-for="auction in auctions"
          :key="auction.id"
          :auction="auction"
          :likeds="likeds"
        />
        <NoAuctionsFound
          v-show="auctions.length === 0"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import Menu from '../components/Menu'
import Loading from '../components/Loading.vue'
import SearchInputs from '../components/SearchInputs'
import SearchFilters from '../components/SearchFilters'
import SearchSorting from '../components/SearchSorting'
import NoAuctionsFound from '../components/NoAuctionsFound'
import Auction from '../components/Auction.vue'

import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'

export default {
  components: {
    Menu,
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    NoAuctionsFound,
    Auction,
  },
  data(){
    return{
      user: user,
      auctions: [],
      auctionsCopy: [],
      likeds: [],
      isLoading: false,

      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
    }
  },
  async created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    this.isLoading = true

    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res =>{
      this.likeds = res.data
      this.likeds.forEach(async liked =>{
        await axios.get(`${API_URL}/auctions/${liked.auction_id}`)
        .then(res => this.auctions.push(res.data))
      })
    })
    
    if(this.auctions.length === this.likeds){
      this.searchAuctions()
    }
    this.isLoading = false
  },
  methods: {
    searchAuctions () {
      // Resetowanie tablicy auctions
      this.auctions = this.auctionsCopy;

      // Filtrowanie tablicy auctions po wyszukiwanym przedmiocie
      this.$refs.inputsComponent.filterByInputItem(this.auctions);

      // Filtrowanie tablicy auctions po wyszukiwanej lokalizacji
      this.$refs.inputsComponent.filterByInputLocation(this.auctions);

      // Sortowanie tablicy auctions
      this.$refs.sortingComponent.sortByOption(this.auctions);

      // Filtrowanie tablicy auctions po kategoriach
      this.$refs.filteringComponent.filterByCategory(this.auctions);
    },
    updateAuctions(auctions) {
      this.auctions = auctions;
    },
  },
}
</script>