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
          @update-search-input-values="updateSearchInputValues"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
        <SearchFilters
          @update-category-option="updateCategoryOption"
          :categoryOption="categoryOption"
        />
        <SearchSorting
          @update-sorting-option="updateSortingOption"
          :sortingOption="sortingOption"
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
      sortingOption: '',
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
    searchAdversts () {
      // Resetowanie tablicy adverts
      this.adverts = this.advertsCopy;

      // Filtrowanie tablicy adverts po nazwach ogłoszeń
      this.adverts = this.adverts.filter((adverst) => {
        let advertTitle = adverst.title.toLowerCase()
        let searchInputItem = this.searchInputItem.toLowerCase().split(' ')
        return searchInputItem.every(searchingWord => advertTitle.includes(searchingWord));
      })
      // Filtrowanie tablicy adverts po lokalizacji
      this.adverts = this.adverts.filter((adverst) => {
        if(this.searchInputLocation.replace(/\s+/g, ' ').trim() !== '') {
          return adverst.location.toLowerCase().replace(/\s+/g, ' ') === this.searchInputLocation.toLowerCase().replace(/\s+/g, ' ')
        }
        else {
          return true
        }
      })


      this.sortByOption();
      this.filterByCategory();
    },
    filterByCategory() {
      this.adverts = this.adverts.filter((advert) => {
        return advert.category.includes(this.categoryOption)
      })
    },
    sortByOption () {
      switch(this.sortingOption) {
        case 'najnowsze': {
          this.adverts.sort((advertA,advertB) => new Date(advertB.createdAt) - new Date(advertA.createdAt) ? -1 : 1);
          break;
        }
        case 'najtansze': {
          this.adverts.sort((advertA, advertB) => (advertA.price > advertB.price) ? 1 : -1);
          break;
        }
        case 'najdrozsze': {
          this.adverts.sort((advertA, advertB) => (advertA.price < advertB.price) ? 1 : -1);
          break;
        }
      }
    },
    updateSortingOption(sortingOption) {
      this.sortingOption = sortingOption;
      this.searchAdversts();
    },
    updateCategoryOption(categoryOption) {
      this.categoryOption = categoryOption;
      this.searchAdversts();
    },
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.searchAdversts()
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
  created() {
    this.searchInputItem = this.$route.params.value;
    this.searchInputLocation = this.$route.params.location;
    this.categoryOption = this.$route.params.category;
    this.loading = true;

    if(this.searchInputItem === undefined) {
      this.searchInputItem = ''
      this.searchInputLocation = ''
      this.categoryOption = ''
    }

    fetch(`${API_URL}/auctions`)
      .then(response => response.json())
      .then(adverts => {
        this.adverts, this.advertsCopy = adverts;
        this.loading = false;
        this.searchAdversts();
      })

  },
}

</script>
