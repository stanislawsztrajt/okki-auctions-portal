<template>
  <div class="m-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
    <div class="border-b pb-6 border-gray-300">
      <SearchInputs
        class="sm:w-3/4"
        ref="inputsComponent"
        @update-search-input-values="updateSearchInputValues"
        @update-auctions="updateAuctions"
        :searchInputItem="searchInputItem"
        :searchInputLocation="searchInputLocation"
      />
      <div class="w-full bg-white text-gray-600 my-5 p-5 shadow-sm">
        <Disclosure v-slot="{ open }" :defaultOpen="true">
          <DisclosureButton class="lg:cursor-default w-full flex flex-row justify-between items-center text-left pb-2 border-b border-gray-200 focus:outline-none lg:mb-5" :class="open ? 'mb-5' : ''">
            <span class="text-2xl font-semibold">Filtry</span>
            <svg xmlns="http://www.w3.org/2000/svg" :class="open ? 'transform rotate-180' : ''" class="lg:hidden transition duration-100 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 15l7-7 7 7" />
            </svg>
          </DisclosureButton>
          <DisclosurePanel :static="windowWidth > 1024 ? true : false">
            <SearchFilters
              ref="filteringComponent"
              @select-change="updateAppliedFilters"
              @update-auctions="updateAuctions"
              :appliedFiltersCookies="appliedFilters"
              :selectDefaultOption="'Wszystko'"
              :isRequired="false"
            />
          </DisclosurePanel>
        </Disclosure>
      </div>
      <SearchSorting
        ref="sortingComponent"
        @search-auctions="searchAuctions"
      />
    </div>
    <InfoElement
      :value="'Wyniki wyszukiwań:'"
      :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
    />
    <Loading v-if="isLoading" />
    <div v-else>
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
</template>
<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import Loading from '../components/Loading'
import SearchInputs from '../components/SearchInputs'
import SearchFilters from '../components/SearchFilters'
import SearchSorting from '../components/SearchSorting'
import NoAuctionsFound from '../components/NoAuctionsFound'
import InfoElement from '../components/InfoElement'
import Auction from '../components/Auction'


export default {
  name: 'AuctionsResults',
  components: {
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    InfoElement,
    NoAuctionsFound,
    Auction,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  data() {
    return {
      searchInputItem: '',
      searchInputLocation: '',
      activeAuctionId: '',
      appliedFilters: {},
      searchData: {},
      windowWidth: window.innerWidth,

      auctions: [],
      auctionsCopy: [],
      likeds: [],

      isLoading: false,
    }
  },
  async created() {
    if(this.$cookies.isKey('searchData')) {
      this.searchInputItem = this.$cookies.get('searchData').item
      this.searchInputLocation = this.$cookies.get('searchData').location
      this.appliedFilters = this.$cookies.get('searchData').filters
    }

    if(this.$route.params.item || this.$route.params.item === '') {
      this.searchInputItem = this.$route.params.item
      this.searchInputLocation = this.$route.params.location
      Object.keys(this.appliedFilters).forEach(key => this.appliedFilters[key] = '')
      this.appliedFilters['category'] = this.$route.params.category
      this.appliedFilters['subcategory'] = ''
    }

    this.isLoading = true

    if(jwt){
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => this.likeds = res.data)
    }

    await axios.get(`${API_URL}/auctions`)
    .then(res => {
      this.auctions = res.data;
      this.auctionsCopy = res.data;
      this.isLoading = false;
      this.searchAuctions();
    })
  },
  methods: {
    searchAuctions () {
      this.searchData['item'] = this.searchInputItem
      this.searchData['location'] = this.searchInputLocation
      this.searchData['filters'] = this.appliedFilters
      this.$cookies.set('searchData', this.searchData, '5MIN')

      // Reseting the adverts array
      this.auctions = this.auctionsCopy;
      // Filter the adverts array by the searched item
      this.$refs.inputsComponent.filterByInputItem(this.auctions);
      // Filter the adverts table by the searched location
      this.$refs.inputsComponent.filterByInputLocation(this.auctions);
      // Sorting the adverts array
      this.$refs.sortingComponent.sortAuctions(this.auctions);
      // Filter the adverts array by categories
      if(this.appliedFilters.category !== '') {
        this.$refs.filteringComponent.filterAuctions(this.auctions, this.appliedFilters);
      }
    },
    updateAuctions(auctions) {
      this.auctions = auctions;
    },
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.searchAuctions()
    },
    updateAppliedFilters(filters) {
      this.appliedFilters = filters
      this.searchAuctions()
    },
  },
}

</script>
