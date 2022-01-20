<template>
  <div id="AdverstsResults">
    <Menu/>
    <div v-if="isEditAdvertLayer"></div>
    <ApproveLayer
      v-else-if="isDeleteAdvertLayer"
      @delete-advert="deleteAdvert"
      @toggle-delete-advert-layer="toggleDeleteAdvertLayer"
    />
    <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <div class="border-b pb-6 border-gray-300">
        <SearchInputs
          class="sm:w-3/4"
          ref="inputsComponent"
          @update-search-input-values="updateSearchInputValues"
          @update-adverts="updateAdverts"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
        <div class="w-full bg-white text-gray-600 my-5 p-5 shadow-sm">
          <h2 class="w-full text-2xl font-semibold mb-5 pb-2 border-b border-gray-200">Filtry</h2>
          <SearchFilteringElements
            ref="filteringComponent"
            @select-change="updateAppliedFilters"
            @update-adverts="updateAdverts"
            :appliedFiltersCookies="appliedFilters"
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
      <div v-show="!loading">
        <Advert
          @toggle-edit-advert-layer="toggleEditAdvertLayer"
          @toggle-delete-advert-layer="toggleDeleteAdvertLayer"
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
import ApproveLayer from '../components/ApproveLayer'
import Loading from '../components/Loading'
import SearchInputs from '../components/SearchInputs'
import SearchFilteringElements from '../components/SearchFilteringElements'
import SearchSorting from '../components/SearchSorting'
import NoAdvertsFound from '../components/NoAdvertsFound'
import Advert from '../components/Advert'

import API_URL from '../../API_URL'

export default {
  name: 'AdverstsResults',
  components: {
    Menu,
    ApproveLayer,
    Loading,
    SearchInputs,
    SearchFilteringElements,
    SearchSorting,
    NoAdvertsFound,
    Advert
  },
  data() {
    return {
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : null,
      activeIdAdvert: '',
      adverts: [],
      advertsCopy: [],
      searchInputItem: '',
      searchInputLocation: '',
      appliedFilters: {},
      searchData: {},
      loading: false,
      
      isEditAdvertLayer: false,
      isDeleteAdvertLayer: false
    }
  },
  methods: {
    searchAdverts () {
      this.searchData['item'] = this.searchInputItem
      this.searchData['location'] = this.searchInputLocation
      this.searchData['filters'] = this.appliedFilters
      this.$cookies.set('searchData', this.searchData, '5MIN')

      // Reseting the adverts array
      this.adverts = this.advertsCopy;

      // Filter the adverts array by the searched item
      this.$refs.inputsComponent.filterByInputItem(this.adverts);

      // Filter the adverts table by the searched location
      this.$refs.inputsComponent.filterByInputLocation(this.adverts);

      // Sorting the adverts array
      this.$refs.sortingComponent.sortAdverts(this.adverts);

      // Filter the adverts array by categories
      this.$refs.filteringComponent.filterAdverts(this.adverts, this.appliedFilters);
    },
    updateAdverts(adverts) {
      this.adverts = adverts;
    },
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.searchAdverts()
    },
    updateAppliedFilters(filters) {
      this.appliedFilters = filters
      this.searchAdverts()
    },
    toggleEditAdvertLayer(id){
      this.activeIdAdvert = id;
      this.isEditAdvertLayer = !this.isEditAdvertLayer;
    },
    toggleDeleteAdvertLayer(id){
      this.activeIdAdvert = id;
      this.isDeleteAdvertLayer = !this.isDeleteAdvertLayer;
    },
    async deleteAdvert(){
      try{
        await axios.get(`${API_URL}/users/${this.userCookie.id}`)
        .then(async res =>{
          const indexId = res.data.Adverts.findIndex(el => el === this.activeIdAdvert);
          let advertsIDs = res.data.Adverts;
          advertsIDs.splice(indexId, 1);

          await axios.put(`${API_URL}/users/${this.userCookie.id}`,
          {
            Adverts: advertsIDs
          },
          {
            headers: {
              Authorization: `Bearer ${this.jwt}`
            }
          })
          .then(res => {
            console.log(res.status)
            window.location.reload()
          })
          .catch(err => console.log(err))
        })
        .catch(err =>{
          console.log(err)
        })

        await axios.delete(`${API_URL}/auctions/${this.activeIdAdvert}`,{
          headers: {
            Authorization: `Bearer ${this.jwt}`
          }
        })
        .then(res =>{
          console.log(res.status)
        })
        .catch(err =>{
          console.log(err)
        })
      } catch(err) {
        console.log(err)
      }
    },
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

    this.loading = true

    await axios.get(`${API_URL}/auctions`)
    .then(res => {
      this.adverts = res.data
      this.advertsCopy = res.data
      this.loading = false;
      this.searchAdverts()
    })
    .catch(err => {
      console.log(err)
    })
  },
}

</script>
