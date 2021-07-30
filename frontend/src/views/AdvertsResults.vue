<template>
  <div id="AdverstsResults">
    <Menu/>
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
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
        <Adverts :adverts="adverts" />
        <NoAdvertsFound
          v-if="adverts.length === 0"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Menu from '../components/Menu'
import Loading from '../components/Loading'
import SearchInputs from '../components/SearchInputs'
import SearchFilters from '../components/SearchFilters'
import SearchSorting from '../components/SearchSorting'
import NoAdvertsFound from '../components/NoAdvertsFound'
import Adverts from '../components/Adverts'

import API_URL from '../../API_URL'

export default {
  name: 'AdverstsResults',
  components: {
    Menu,
    Loading,
    SearchInputs,
    SearchFilters,
    SearchSorting,
    NoAdvertsFound,
    Adverts
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
    }
  },
  methods: {
    searchAdversts () {
      // Resetowanie tablicy adverts
      this.adverts = this.advertsCopy;

      // Filtrowanie tablicy adverts po nazwach ogłoszeń
      this.adverts = this.adverts.filter((adverst) => {
        return adverst.title.toLowerCase().includes(this.searchInputItem.toLowerCase())
      })
      // Filtrowanie tablicy adverts po lokalizacji
      this.adverts = this.adverts.filter((adverst) => {
        return adverst.location.toLowerCase().includes(this.searchInputLocation.toLowerCase())
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
    }
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
