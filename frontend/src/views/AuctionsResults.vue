<template>
  <div id="AuctionsResults">
    <Menu/>
    <div v-if="isEditAuctionLayer"></div>
    <ApproveLayer
      v-else-if="isDeleteAuctionLayer"
      @delete-auction="deleteAuction"
      @toggle-delete-auction-layer="toggleDeleteAuctionLayer"
    />
    <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <div class="border-b pb-6 border-gray-300">
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
      <div v-show="!isLoading">
        <Auction
          @toggle-edit-auction-layer="() => {}"
          @toggle-delete-auction-layer="() => {}"
          v-for="auction in auctions"
          :key="auction.code"
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
import ApproveLayer from '../components/ApproveLayer'
import Loading from '../components/Loading'
import SearchInputs from '../components/SearchInputs'
import SearchFilters from '../components/SearchFilters'
import SearchSorting from '../components/SearchSorting'
import NoAuctionsFound from '../components/NoAuctionsFound'
import Auction from '../components/Auction'

import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'

export default {
  name: 'AuctionsResults',
  components: {
    Menu,
    ApproveLayer,
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    NoAuctionsFound,
    Auction
  },
  data() {
    return {
      user: user,

      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
      activeAuction_id: '',

      auctions: [],
      auctionsCopy: [], 
      likeds: [],


      isEditAuctionLayer: false,
      isDeleteAuctionLayer: false,
      isLoading: false,
    }
  },
  async created() {
    this.searchInputItem = this.$route.params.value
    this.searchInputLocation = this.$route.params.location
    this.categoryOption = this.$route.params.category
    this.isLoading = true

    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => this.likeds = res.data)

    await axios.get(`${API_URL}/auctions`)
    .then(res => {
      this.auctions = res.data
      this.auctionsCopy = res.data
      this.isLoading = false;
      this.searchAuctions()
    })
    .catch(err => {
      console.log(err)
    })
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
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.searchAuctions()
    },
  },
}

</script>
