<template>
  <div id="InputSearchPanel">
    <input
      class="input-handler"
      placeholder="piła motorowa / rower / ps5..."
      type="text" name="inputHandler"
      @keypress="updateSearchInputValue($event)"
      v-model="inputValue"
    >
    <button class="input-handler-btn" @click="$emit('search-adversts')" ><font-awesome-icon icon="search" /></button>
    <div class="filtering">
      <h2>filtrowanie</h2>
    </div>
    <div class="sorting">
      <h2>sortowanie</h2>
      <select @click="changeSortingOption()" ref="sortingOption" name="sorting">
        <option value="newest">Najnowsze</option>
        <option value="cheapest">Najtańsze</option>
        <option value="mostexpensive">Najdroższe</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputSearchPanel',
  data() {
    return {
      inputValue: this.searchInputValue,
      choosenCategory: '',
      categoriesAndFilters: [
        {
          name: 'motoryzacja',
          filters: [{
            name: 'marka',
            options: ['Audi', 'BMW', 'Volvo', 'Opel', 'Mercedes']
          }]
        },
        {
          name: 'odzież',
          filters: [{
            name: 'rozmiar',
            options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
          }]
        }
      ],
    }
  },
  props: {
    searchInputValue: {
      type: String
    }
  },
  methods: {
    changeSortingOption () {
      this.$emit('sorting-by-price', this.$refs.sortingOption.value)
    },
    updateSearchInputValue (e) {
      this.$emit('update-search-input-value', this.inputValue, e)
    }
  },
}
/*<style lang="scss" scoped>
@import '../../scssVariables/variables';

#InputSearchPanel {
  background: #7070703d;
  .input-elements {
    display: flex;
    flex-direction: row;
    .input-element {
      cursor: pointer;
      margin: 10px 30px;
    }
  }
  .categories-options {
    border-top: 1px solid $bg-second-main;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background: $bg-main;
    width: 30%;
    padding: 0;
    .categories-option {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      transition: all .1s ease;
      &:hover {
        background: $bg-second-main;
        cursor: pointer;
      }
    }
  }
}

</style>*/
</script>

