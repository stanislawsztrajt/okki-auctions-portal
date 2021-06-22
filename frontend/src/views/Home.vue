<template>
  <div id="Home">
    <Menu/>
    <main>
      <input 
        class="outline-none" 
        type="text" 
        name="inputHandler" 
        v-model="searchInputValue" 
        @keydown="makeSureKeyIsEnter($event)"
        placeholder="książka / rower / ...">
      <button class="input-handler-btn" @click="shareData()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </main>
    <footer>
      <div>Wpisz dowolną frazę aby znaleźć ogłoszenie odpowiadające jej wynikom wyszukiwania, lub dodaj własne ogłoszenie sprzedaży</div>
      <router-link to='/new-adverst'>Dodaj ogłoszenie</router-link>
    </footer>
  </div>
</template>

<script>
import Menu from '../components/Menu'

export default {
  name: 'Home',
  components: {
    Menu,
  },
  data(){
    return{
      searchInputValue: '',
      endPoint: 'https://okki-api.herokuapp.com/'
    }
  },
  methods: {
    shareData () {
      this.$router.push({name: "AdverstsResults", params: {data: this.searchInputValue}})
    },
    makeSureKeyIsEnter (e) {
      if (e.key === "Enter") {
        this.shareData();
      }
    }
  }
}
</script>

