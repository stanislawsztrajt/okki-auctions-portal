<template>
  <div id="AdverstsResults">
    <Menu/>
    <div class="m-10 md:mx-24 lg:mx-40 xl:mx-48">
      <div class="border-b border-gray-300">
        <InputSearchPanel
          @change-sorting-option="changeSortingOption"
          @search-adverts="searchAdversts"
          :searchInputItem="searchInputItem"
          :searchInputLocation="searchInputLocation" />
      </div>
      <div v-show="loading" class="flex flex-col items-center mt-24 md:mt-48">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-28 w-28 animate-spin text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="text-gray-500 text-3xl font-light">
          Ładowanie...
        </span>
      </div>
      <div v-show="loading === false">
        <div v-if="adversts.length === 0" class="text-gray-400 text-xl sm:text-2xl mt-10">
          <h1 class="text-8xl mb-5">:(</h1>
          <h2 class="mb-3 sm:mb-2">
            Nie znaleźliśmy ogłoszeń dla zapytania <span class="font-semibold">"{{ searchInputItem }}"</span>
            <span v-if="searchInputLocation !== ''">
              dla lokalizacji <span class="font-semibold">"{{ searchInputLocation }}"</span>
            </span>.
          </h2>
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
              class="sm:float-left h-32 w-full border-gray-200 border-b-2 bg-cover bg-no-repeat bg-center sm:w-60 sm:h-48 sm:border-r-2 sm:border-b-0 bg-picture-img"
              :src="advert.images"
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
      searchInputItem: '',
      searchInputLocation: '',
      sortingOption: '',
      loading: false,
      adversts: [],
      adverstsCopy: [],
      API_URL: 'https://okki-api.herokuapp.com'
    }
  },
  methods: {
    // Funkcja odpowiadajca za wyszukiwanie ogłoszeń
    searchAdversts (searchInputItem, searchInputLocation) {
      this.searchInputItem = searchInputItem;
      this.searchInputLocation = searchInputLocation;
      this.adversts = this.adverstsCopy;


      if(this.searchInputItem !== undefined) {
        // Filtrowanie tablicy adversts po nazwach ogłoszeń
        this.adversts = this.adversts.filter((adverst) => {
          return adverst.title.toLowerCase().includes(this.searchInputItem.toLowerCase())
        })
      }

      if(this.searchInputLocation !== undefined) {
        // Filtrowanie tablicy adversts po lokalizacji
        this.adversts = this.adversts.filter((adverst) => {
          return adverst.location.toLowerCase().includes(this.searchInputLocation.toLowerCase())
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
    this.searchInputItem = this.$route.params.value;
    this.searchInputLocation = this.$route.params.location;
    this.loading = true;

    fetch(`${this.API_URL}/adverts`)
      .then(response => response.json())
      .then(adversts => {
        this.adversts, this.adverstsCopy = adversts;

        if(this.searchInputItem !== undefined && this.searchInputLocation !== undefined) {
          this.searchAdversts(this.searchInputItem, this.searchInputLocation);
        }
        else {
          this.searchAdversts('', '');
        }

        this.loading = false;
      })
  },
}

</script>
