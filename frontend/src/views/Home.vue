<template>
  <div id="Home" class="flex flex-col justify-between text-gray-500 pb-10">
    <main class="flex flex-col mt-10 md:mt-14 lg:mt-16">
      <SearchInputs
        class="w-11/12 xl:w-10/12 mx-auto mb-10 md:mb-14 lg:mb-16"
        @update-search-input-values="updateSearchInputValues"
        :searchInputItem="searchInputItem"
        :searchInputLocation="searchInputLocation"
      />
      <section class="bg-white py-10 shadow flex items-center">
        <div class="h-96 w-full md:h-108 2xl:h-128 grid gap-8 grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 xl:grid-cols-6 items-center justify-items-center shadow-md banner-background p-8 sm:py-10 md:py-12 sm:px-20 md:px-24 lg:px-32 xl:px-44 2xl:px-80">
          <div v-for="category in categories" :key="category.name">
            <button @click="updateCategoryOption(category.value)" class="flex flex-col box-content p-1 justify-center items-center w-16 xxs:w-20 h-12 xs:w-20 xs:h-16 md:w-24 md:h-20 xl:w-28 xl:h-24 2xl:w-32 2xl:h-28 bg-white hover:bg-gray-200 text-gray-500 text-3xl md:text-4xl lg:text-5xl rounded cursor-pointer transition duration-100">
              <i v-bind:class="'fas fa-' + category.icon"></i>
            </button>
          </div>
        </div>
      </section>
      <InfoElement
        v-if="auctions.length > 0"
        class=" mx-auto w-11/12 xl:w-10/12 mt-4"
        :value="'Popularne ogłoszenia:'"
        :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
      />
      <Loading :isCenter="false" v-if="isLoading"/>
      <section v-else class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto mt-4 gap-3 md:gap-8 w-11/12 xl:w-10/12">
        <TheHomeAuction
          v-for="auction in auctions"
          :key="auction.code"
          :auction="auction"
          :likeds="likeds"
        />
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

import categories from '../jsons files/categories.json';
import { jwt, user } from '../constants/const-variables';
import API_URL from '../../API_URL';

import InfoElement from '../components/InfoElement.vue';
import TheHomeAuction from '../components/TheHomeAuction.vue';
import SearchInputs from '../components/SearchInputs';
import Loading from '../components/Loading.vue';

export default {
  name: 'Home',
  components: {
    SearchInputs,
    InfoElement,
    TheHomeAuction,
    Loading
  },
  data(){
    return{
      categories,

      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',

      auctions: [],
      likeds: [],
      isLoading: true,
    }
  },
  async created(){
    if(!this.$cookies.get('isFirstTimeOnPage')){
      this.$cookies.set('isFirstTimeOnPage', true, '10y')
      this.$router.push('/visit')
    }

    await axios.get(`${API_URL}/last-week-most-popular-auctions`)
    .then(res => this.auctions = res.data)

    if(jwt){
      await axios.get(`${API_URL}/likeds`, { headers: { user_id: user.id, Authorization: `Bearer ${jwt}` } })
      .then(res => this.likeds = res.data)
    }

    this.isLoading = false;
  },
  methods: {
    // Funkcja która przenosi i przekazuje zmienne do AuctionsResults.vue
    shareSearchInputValues () {
      this.$router.push({name: "AuctionsResults", params: {item: this.searchInputItem, location: this.searchInputLocation, category: this.categoryOption}})
    },
    // Funkcja aktualizująca wartość zmiennej categoryOption i wywołująca funkcję shareSearchInputValues
    updateCategoryOption(categoryOption) {
      this.categoryOption = categoryOption;
      this.shareSearchInputValues();
    },
    // Funkcja aktualizująca wartości zmiennych searchInputItem i searchInputLocation i wywołująca funkcję shareSearchInputValues
    updateSearchInputValues(searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.shareSearchInputValues();
    }
  },
}
</script>

