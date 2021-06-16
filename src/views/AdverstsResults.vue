<template>
  <div id="AdverstsResults">
    <Menu/>
    <div class="input-area">
      <InputSearchPanel
        @sorting-by-price="sortingByPrice"
        @update-search-input-value="updateSearchInputValue"
        @search-adversts="searchAdversts"
        :searchInputValue="searchInputValue"
      />
    </div>
    <div class="results-area">
      <div class="adverst" v-for="adverst in adversts" :key="adverst.code">
        <img class="adverst-data adverst-img" src="#">
        <h2 class="adverst-data adverst-title">{{ adverst.title }}</h2>
        <h3 class="adverst-data adverst-price">{{ adverst.price }}zł</h3>
        <h3 class="adverst-data adverst-location">{{ adverst.location }}</h3>
        <h3 class="adverst-data adverst-category">{{ adverst.category }}</h3>
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
      adversts: [
        {title: 'Motocykl X', username: 'Adam', price: 3200, category: 'motoryzacja', description: '...', location: 'Kraków', phoneNumber: '123123123', img: 'img'},
        {title: 'Motocykl Y', username: 'Adam', price: 2100, category: 'motoryzacja', description: '...', location: 'Kraków', phoneNumber: '123123123', img: 'img'},
        {title: 'Koszulka X', username: 'Anna', price: 50, category: 'odzież', description: '...', location: 'Poznań', phoneNumber: '444555666', img: 'img'},
        {title: 'Koszulka Y', username: 'Anna', price: 75, category: 'odzież', description: '...', location: 'Poznań', phoneNumber: '444555666', img: 'img'},
        {title: 'Szafa X', username: 'Andrzej', price: 300, category: 'dom', description: '...', location: 'Gliwice', phoneNumber: '999111444', img: 'img'},
        {title: 'Szafa Y', username: 'Andrzej', price: 420, category: 'dom', description: '...', location: 'Gliwice', phoneNumber: '999111444', img: 'img'},
      ],
      adverstsCopy: [],
    }
  },
  methods: {
    searchAdversts () {
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
    updateSearchInputValue (searchInputValue, e) {
      this.searchInputValue = searchInputValue;
      if (e.key === "Enter") {
        this.searchAdversts();
      }
    },
  },
  created() {
    this.adverstsCopy = this.adversts;
    this.searchInputValue = this.$route.params.data;
  },
}

/*
<style lang="scss" scoped>
@import '../../scssVariables/variables';

#AdverstsResults {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: $bg-main;
  .input-area {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 50px 100px;
    .input-elements {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
    }
    .input-element {
      margin: 0 40px;
    }
  }
  .results-area {
    display: flex;
    flex-direction: column;
    padding-left: 100px;
    .adverst {
      width: 70%;
      height: 150px;
      border: 1px solid $bg-second-main;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
      cursor: pointer;
      transition: all .2s ease;
      .adverst-data {
        margin: 0 30px;
        font-weight: 400;
      }
      .adverst-img {
        width: 150px;
        height: 100%;
        margin-left: 0;
      }
      .adverst-title {
        font-size: 2rem;
      }
    }
  }
}
</style>
*/
</script>
