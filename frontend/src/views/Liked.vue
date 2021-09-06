<template>
  <div>
    <Menu />
    <Loading v-show="this.loading" />
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48" v-if="user.likedAdverts">
      <div class="flex flex-row justify-start mb-6">
        <div class="dashboardElements mt-6 p-4 text-2xl" v-if="user.likedAdverts.length > 0">
          Twoje polubione ogłoszenia
        </div>
        <div class="dashboardElements mt-6 p-4 text-2xl" v-else>
          Nie masz polubionych ogłoszeń
        </div>
      </div>
      <div class="border-b pb-6 border-gray-300" v-if="user.likedAdverts.length > 0">
        <SearchInputs
          class="sm:w-3/4"
          ref="inputsComponent"
          @search-adverts="searchAdverts"
          @update-adverts="updateAdverts"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
        <div id="SearchFilteringElements" class="w-full bg-white text-gray-600 my-5 p-5 shadow-sm">
          <h2 class="w-full text-2xl font-semibold mb-5 pb-2 border-b border-gray-200">Filtry</h2>
          <SearchFilteringElements
            ref="filteringComponent"
            @select-change="searchAdverts"
            @update-adverts="updateAdverts"
            :selectDefaultOption="'Wszystko'"
            :isRequired="false"
          />
        </div>
        <SearchSorting
          ref="sortingComponent"
          @search-adverts="searchAdverts"
        />
      </div>
      <Loading v-show="loading" />
      <div v-show="!loading" v-if="user.likedAdverts.length > 0">
        <Advert
          v-for="advert in adverts"
          :key="advert.code"
          :advert="advert"
        />
        <NoAdvertsFound
          v-show="adverts.length === 0"
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
import SearchFilteringElements from '../components/SearchFilteringElements'
import SearchSorting from '../components/SearchSorting'
import NoAdvertsFound from '../components/NoAdvertsFound'
import Advert from '../components/Advert.vue'

import API_URL from '../../API_URL'

export default {
  components: {
    Menu,
    Loading,
    SearchInputs,
    SearchFilteringElements,
    SearchSorting,
    NoAdvertsFound,
    Advert,
  },
  data(){
    return{
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      ISjwt: this.$cookies.isKey('jwt'),
      user: {},
      adverts: [],
      advertsCopy: [],
      searchInputItem: '',
      searchInputLocation: '',
      loading: false,
    }
  },
  async created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    this.loading = true

    await axios
    .get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res => this.user = res.data)
    .catch(err => console.log(err.status))

    if(this.user.likedAdverts.length === 0){
      return this.loading = false
    }

    await this.user.likedAdverts.forEach(async advert =>{
      await axios
      .get(`${API_URL}/auctions/${advert}`)
      .then(res =>{
        this.adverts.push(res.data)
        this.advertsCopy.push(res.data)
        this.loading = false
      })
    })

    this.searchAdverts()
  },
  methods: {
    searchAdverts () {
      // Reseting the adverts array
      this.adverts = this.advertsCopy;

      // Filter the adverts array by the searched item
      this.$refs.inputsComponent.filterByInputItem(this.adverts);

      // Filter the adverts table by the searched location
      this.$refs.inputsComponent.filterByInputLocation(this.adverts);

      // Sorting the adverts array
      this.$refs.sortingComponent.sortAdverts(this.adverts);

      // Filter the adverts array by categories
      this.$refs.filteringComponent.filterAdverts(this.adverts);
    },
    updateAdverts(adverts) {
      this.adverts = adverts;
    },
  },
}
</script>