<template>
  <div>
    <Menu />
    <Loading v-if="isLoading" />
    <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement 
        :value="'Twoje polubione ogłoszenia'"
        :icon="'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'"
        v-if="likeds.length > 0"
      />
      <InfoElement 
        :value="'Nie masz polubionych ogłoszeń'"
        :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
        v-else
      />
      <div class="border-b pb-6 mt-8 border-gray-300" v-if="likeds.length > 0">
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
import InfoElement from '../components/InfoElement.vue'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  components: {
    Menu,
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    NoAuctionsFound,
    Auction,
    InfoElement
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
    if(!jwt){
      this.$router.push('/login')
    }

    this.isLoading = true

    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => this.likeds = res.data )

    await axios.get(`${API_URL}/user-liked-auctions/${user.id}`, authorization)
    .then(res => this.auctions = res.data)
    .catch(err => console.log(err))
    
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