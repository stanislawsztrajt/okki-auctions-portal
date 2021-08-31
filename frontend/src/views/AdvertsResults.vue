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
          @search-adverts="searchAdverts"
          @update-adverts="updateAdverts"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
        <SearchFilters
          ref="filteringComponent"
          @search-adverts="searchAdverts"
          @update-adverts="updateAdverts"
          :categoryOption="categoryOption"
        />
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
import SearchFilters from '../components/SearchFilters'
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
    SearchFilters,
    SearchSorting,
    NoAdvertsFound,
    Advert
  },
  data() {
    return {
      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
      loading: false,
      adverts: [],
      advertsCopy: [],
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : null,
      activeIdAdvert: '',

      isEditAdvertLayer: false,
      isDeleteAdvertLayer: false
    }
  },
  methods: {
    searchAdverts () {
      // Resetowanie tablicy adverts
      this.adverts = this.advertsCopy;

      // Filtrowanie tablicy adverts po wyszukiwanym przedmiocie
      this.$refs.inputsComponent.filterByInputItem(this.adverts);

      // Filtrowanie tablicy adverts po wyszukiwanej lokalizacji
      this.$refs.inputsComponent.filterByInputLocation(this.adverts);

      // Sortowanie tablicy adverts
      this.$refs.sortingComponent.sortByOption(this.adverts);

      // Filtrowanie tablicy adverts po kategoriach
      this.$refs.filteringComponent.filterByCategory(this.adverts);
    },
    updateAdverts(adverts) {
      this.adverts = adverts;
    },
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
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
      await axios.get(`${API_URL}/users/${this.userCookie.id}`)
      .then(async res =>{
        const indexId = res.data.Adverts.findIndex(el => el === this.activeIdAdvert);
        let advertsIDs = res.data.Adverts;
        advertsIDs.splice(indexId, 1);

        await axios.put(`${API_URL}/users/${this.userCookie.id}`,
        { Adverts: advertsIDs },
        {
          headers: {
            Authorization: `Bearer ${this.jwt}`
          }
        })
        .then((res) => console.log(res))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

      await axios.delete(`${API_URL}/auctions/${this.activeIdAdvert}`,{
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => console.log(err))
    },
  },
  async created() {
    this.searchInputItem = this.$route.params.value
    this.searchInputLocation = this.$route.params.location
    this.categoryOption = this.$route.params.category
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
