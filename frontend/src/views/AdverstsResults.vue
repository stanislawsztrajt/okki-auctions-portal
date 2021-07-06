<template>
  <div id="AdverstsResults">
    <Menu/>
    <div class="m-10 md:mx-24 lg:mx-40 xl:mx-48">
      <div class="border-b border-gray-300">
        <InputSearchPanel
          @change-sorting-option="changeSortingOption"
          @search-adversts="searchAdversts"
          :searchInputValue="searchInputValue"
          :searchInputLocation="searchInputLocation"
        />
      </div>
      <div v-if="adversts.length === 0" class="text-gray-400 text-xl sm:text-2xl mt-10">
        <h1 class="text-8xl mb-5">:(</h1>
        <h2 class="mb-3 sm:mb-2">Nie znaleźliśmy ogłoszeń dla zapytania <span class="font-semibold">"{{ searchInputValue }}"</span>.</h2>
        <h2>Sprawdź poprawność wyszukiwanej frazy, lub użyj bardziej ogólnego zapytania.</h2>
      </div>
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-1 justify-items-center md:justify-items-start">
        <!-- advert -->
        <router-link
          :to="`/advert/${advert.id}`"
          class="flex-row w-10/12 border-gray-300 border-2 my-4 text-gray-600 bg-white"
          v-for="advert in adversts"
          :key="advert.code"
        >
          <img
            class="sm:float-left py-1 h-32 w-full border-gray-200 border-b-2 bg-cover bg-no-repeat bg-center sm:w-60 sm:h-48 sm:border-r-2 sm:border-b-0 bg-picture-img"
            :src="`${API_URL}${advert.images}`"
            alt=""
          >
          <div class="sm:float-left px-3 py-2 sm:px-5 sm:py-4">
            <h2 class="sm:text-2xl">
              {{ advert.title }}
            </h2>
            <h3 class="font-bold sm:text-3xl">
              {{ advert.price }}zł
            </h3>
            <h3 class="text-xs float-right mb-0.5 mt-2 sm:float-left sm:text-lg sm:mt-0">
              {{ advert.location }}
            </h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from '../components/Menu'
import InputSearchPanel from '../components/InputSearchPanel'


export default {
  name: 'AdverstsResults',
  components: {
    Menu,
    InputSearchPanel
  },
  data() {
    return {
      searchInputValue: '',
      searchInputLocation: '',
      sortingOption: '',
      adversts: [],
      adverstsCopy: [],
      API_URL: 'https://okki-api.herokuapp.com'
    }
  },
  methods: {
    searchAdversts (searchInputValue, searchInputLocation) {
      this.searchInputValue = searchInputValue;
      this.searchInputLocation = searchInputLocation;
      this.adversts = this.adverstsCopy;

      this.adversts = this.adversts.filter((advert) => {
        return advert.title.toLowerCase().includes(this.searchInputValue.toLowerCase())
      })

      if(this.searchInputLocation.length !== 0) {
        this.adversts = this.adversts.filter((advert) => {
          return advert.location.toLowerCase().includes(this.searchInputLocation.toLowerCase())
        })
      }

      this.changeSortingOption(this.sortingOption);
    },
    changeSortingOption (sortingOption) {
      this.sortingOption = sortingOption;
      switch(this.sortingOption) {
        case 'newest': {
          this.adversts.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;
        }
        case 'cheapest': {
          this.adversts.sort((a, b) => (a.price > b.price) ? 1 : -1);
          break;
        }
        case 'mostexpensive': {
          this.adversts.sort((a, b) => (a.price < b.price) ? 1 : -1);
          break;
        }
      }
    },
  },
  created() {
    this.searchInputValue = this.$route.params.value;
    this.searchInputLocation = this.$route.params.Location;

    fetch(`${this.API_URL}/adverts`)
      .then(response => response.json())
      .then(data => this.adversts = data)
      .then(adversts => this.adverstsCopy = adversts)
      .then(() => {
        if(this.searchInputValue !== undefined && this.searchInputLocation !== undefined) {
          this.searchAdversts(this.searchInputValue, this.searchInputLocation);
        }
      })
  },
}

</script>
