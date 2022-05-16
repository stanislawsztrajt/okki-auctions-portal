<template>
  <div class="m-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
    <Loading v-if="isLoading" :isCenter="true" />
    <div v-else>
      <InfoElement
        v-if="likeds.length <= 0"
        :value="'Nie masz polubionych ogłoszeń'"
        :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
      />
      <div v-else>      
        <InfoElement
          :value="'Twoje polubione ogłoszenia'"
          :icon="'M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'"
        />
        <div class="border-b pb-6 mt-8 border-gray-300" v-if="likeds.length > 0 || isLoading">
          <SearchInputs
            class="sm:w-3/4"
            ref="inputsComponent"
            @update-search-input-values="updateSearchInputValues"
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
                  @filter-change="updateAppliedFilters"
                  @price-filters-change="updatePriceFilters"
                  :selectDefaultOption="'Wszystko'"
                  :isRequired="false"
                />
              </DisclosurePanel>
            </Disclosure>
          </div>
          <SearchSorting
            ref="sortingComponent"
            @update-sorting-value="updateSortingValue"
          />
        </div>
        <div v-if="!isLoading && likeds.length > 0">
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
          <Pagination
            :numberOfAllAuctions="numberOfAllAuctions"
            :currentPage="this.page ? parseInt(this.page) : 1"
            :isLoading="isLoading"
            :defaultRoute="defaultRoute"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import Loading from '../components/Loading.vue'
import SearchInputs from '../components/SearchInputs'
import SearchFilters from '../components/SearchFilters'
import SearchSorting from '../components/SearchSorting'
import NoAuctionsFound from '../components/NoAuctionsFound'
import Auction from '../components/Auction.vue'
import InfoElement from '../components/InfoElement.vue'
import Pagination from '../components/Pagination'


export default {
  components: {
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    NoAuctionsFound,
    Auction,
    InfoElement,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Pagination
  },
  data(){
    return{
      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
      appliedFilters: {},
      priceFilters: {},
      // split method cuts everything after "/page" from url pathname
      defaultRoute: this.$route.path.split('/page')[0],

      auctions: [],
      likeds: [],
      likedsIds: [],

      isLoading: true,
      numberOfAllAuctions: null,
      windowWidth: window.innerWidth,
      user,
    }
  },
  props: {
    page: String
  },
  async created(){
    if(!jwt){
      this.$router.push('/login')
    }

    await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
    .then(res => {
      this.likeds = res.data;
      res.data.forEach(liked => {
        this.likedsIds.push(liked.auction_id)
      })
    })

    this.searchAuctions()
  },
  methods: {
    async searchAuctions () {
      this.isLoading = true;

      await axios.get(`${API_URL}/auctions`, { headers: {
        page: this.page ? this.page : 1,
        input_item: this.searchInputItem,
        input_location: this.searchInputLocation,
        price_filters: JSON.stringify(this.priceFilters),
        applied_filters: JSON.stringify(this.appliedFilters),
        sorting_option: this.sortingOption,
        likeds_ids: JSON.stringify(this.likedsIds),
        return_auctions_number: true
      }})
      .then(res => {
        this.auctions = res.data.auctions;
        this.numberOfAllAuctions = res.data.numberOfAllAuctions;
        this.isLoading = false;
      })
    },
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.$router.push(this.defaultRoute)
      this.searchAuctions()
    },
    updateAppliedFilters(filters) {
      this.appliedFilters = filters
      this.$router.push(this.defaultRoute)
      this.searchAuctions()
    },
    updateSortingValue(sorting_option) {
      this.sortingOption = sorting_option
      this.$router.push(this.defaultRoute)
      this.searchAuctions()
    },
    updatePriceFilters(price_filters){
      this.priceFilters = price_filters
      this.$router.push(this.defaultRoute)
      this.searchAuctions()
    }
  },
  watch: {
    page() {
      this.searchAuctions()
    }
  }
}
</script>