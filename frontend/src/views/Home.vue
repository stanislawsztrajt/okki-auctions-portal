<template>
  <div id="Home" class="flex flex-col justify-between text-gray-500 pb-10">
    <Menu/>
    <main class="flex flex-col mt-10 md:mt-14 lg:mt-16">
      <SearchInputs
        class="w-10/12 mx-auto mb-10 md:mb-14 lg:mb-16"
        @search-adverts="updateSearchInputValues"
        :searchInputItem="searchInputItem"
        :searchInputLocation="searchInputLocation"
      />
      <div class="bg-white py-10 shadow">
        <div class="h-80 w-full md:h-96 2xl:h-108 grid gap-4 grid-cols-4 sm:grid-cols-5 xl:grid-cols-7 items-center justify-items-center shadow-md banner-background p-8 sm:py-10 md:py-12 lg:py-16 sm:px-20 md:px-32 xl:px-44 2xl:px-60">
          <div v-for="category in categories" :key="category.name">
            <button @click="updateCategoryOption(category.value)" class="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 xl:w-28 xl:h-24 2xl:w-32 2xl:h-28 bg-white hover:bg-gray-200 text-gray-500 text-3xl md:text-4xl lg:text-5xl rounded flex justify-center items-center cursor-pointer transition duration-100">
              <i v-bind:class="'fas fa-' + category.icon"></i>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Menu from '../components/Menu';
import SearchInputs from '../components/SearchInputs';
import categoriesJSON from '../jsons files/categories.json';


export default {
  name: 'Home',
  components: {
    Menu,
    SearchInputs
  },
  data(){
    return{
      searchInputItem: '',
      searchInputLocation: '',
      categoryOption: '',
      categories: categoriesJSON,
    }
  },
  methods: {
    // Funkcja która przenosi i przekazuje zmienne do AdvertsResults.vue
    shareSearchInputValues () {
      this.$router.push({name: "AdvertsResults", params: {value: this.searchInputItem, location: this.searchInputLocation, category: this.categoryOption}})
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

