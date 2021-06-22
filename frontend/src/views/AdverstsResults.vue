<template>
  <div id="AdverstsResults">
    <Menu/>
    <div class="m-10 md:mx-24 lg:mx-40 xl:mx-48">
      <div class="border-b border-gray-300">
        <InputSearchPanel
          @sorting-by-price="sortingByPrice"
          @search-adversts="searchAdversts"
          :searchInputValue="searchInputValue"
        />
      </div>
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-1 justify-items-center md:justify-items-start">
        <div class="flex-row w-10/12 border-gray-300 border-2 my-4 text-gray-600 bg-white" v-for="adverst in adversts" :key="adverst.code">
          <div class="sm:float-left py-1 h-32 w-full border-gray-200 border-b-2 bg-cover bg-no-repeat bg-center sm:w-60 sm:h-48 sm:border-r-2 sm:border-b-0 bg-picture-img" :style="{ backgroundImage: 'url('+ adverst.img +')' }"></div>
          <div class="sm:float-left px-3 py-2 sm:px-5 sm:py-4">
            <h2 class="sm:text-2xl">{{ adverst.title }}</h2>
            <h3 class="font-bold sm:text-3xl">{{ adverst.price }}zł</h3>
            <h3 class="text-xs float-right mb-0.5 mt-2 sm:float-left sm:text-lg sm:mt-0">{{ adverst.location }}</h3>
            <!-- <h3 class="adverst-data adverst-category">{{ adverst.category }}</h3> -->
          </div>
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
      image: require('../assets/motocykl1.jpg'),
      searchInputValue: '',
      adversts: [
        {title: 'Motocykl X', username: 'Adam', price: 3200, category: 'motoryzacja', description: '...', location: 'Kraków', phoneNumber: '123123123', img: require('../assets/motocykl1.jpg')},
        {title: 'Motocykl Y', username: 'Adam', price: 2100, category: 'motoryzacja', description: '...', location: 'Kraków', phoneNumber: '123123123', img: require('../assets/motocykl2.jpg')},
        {title: 'Koszulka X', username: 'Anna', price: 50, category: 'odzież', description: '...', location: 'Poznań', phoneNumber: '444555666', img: require('../assets/koszulka1.jpg')},
        {title: 'Koszulka Y', username: 'Anna', price: 75, category: 'odzież', description: '...', location: 'Poznań', phoneNumber: '444555666', img: require('../assets/koszulka2.jpg')},
        {title: 'Szafa X', username: 'Andrzej', price: 300, category: 'dom', description: '...', location: 'Gliwice', phoneNumber: '999111444', img: require('../assets/szafa1.jpg')},
        {title: 'Szafa Y', username: 'Andrzej', price: 420, category: 'dom', description: '...', location: 'Gliwice', phoneNumber: '999111444', img: require('../assets/szafa2.jpg')},
      ],
      adverstsCopy: [],

      endPoint: 'https://okki-api.herokuapp.com/'
    }
  },
  methods: {
    searchAdversts (searchInputValue) {
      this.searchInputValue = searchInputValue;
      this.adversts = this.adverstsCopy;
      this.adversts = this.adversts.filter((adverst) => {
        return adverst.title.toLowerCase().includes(this.searchInputValue.toLowerCase())
      })
    },
    sortingByPrice (sortingOption) {
      switch(sortingOption) {
        case 'newest': {
          this.adversts.sort();
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
    this.adverstsCopy = this.adversts;
    this.searchInputValue = this.$route.params.data;
    if(this.searchInputValue !== undefined) {
      this.searchAdversts(this.searchInputValue);
    }
  },
}

</script>
