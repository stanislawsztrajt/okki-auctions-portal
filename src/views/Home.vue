<template>
  <div id="Home">
    <Menu/>
    <main>
      <input class="input-handler" type="text" name="inputHandler" v-model="searchInputValue" placeholder="piła motorowa / rower / ps5...">
      <button class="input-handler-btn" @click="shareData()"><font-awesome-icon icon="search" /></button>
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
    }
  },
  methods: {
    shareData () {
      this.$router.push({name: "AdverstsResults", params: {data: this.searchInputValue}})
    },
  }
}
</script>

<style lang="scss">
@import '../../scssVariables/variables';

.input-handler {
  width: 50%;
  background: transparent;
  color: $color-main;
  font-size: 2rem;
  border: 0;
  border-bottom: 2px solid $bg-second-main;
  font-weight: 300;
  padding-left: 5px;
  outline: none;
}
.input-handler-btn {
  background: transparent;
  color: $color-main;
  font-size: 1.5rem;
  border: 0;
  font-weight: 300;
  outline: none;
  cursor: pointer;
}
</style>