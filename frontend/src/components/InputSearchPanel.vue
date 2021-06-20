<template>
  <div id="InputSearchPanel">
    <div class="flex justify-between border-b-2 border-gray-300 pb-0.5 px-0.5 w-full md:w-3/4">
      <input
        class="bg-transparent outline-none text-2xl w-11/12 text-gray-700 md:text-3xl"
        placeholder="książka / rower / ..."
        type="text" name="inputHandler"
        @keypress="emitSearchAdversts($event)"
        v-model="inputValue"
      >
      <button
        class="text-green-600 focus:outline-none"
        @click="$emit('search-adversts', inputValue)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
    <div class="flex my-6">
      <div class="mr-5">
        <h2 class="flex text-gray-700 text-lg items-center cursor-pointer">filtrowanie 
          <span class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </h2>
      </div>
      <div>
        <h2 class="flex text-gray-700 text-lg items-center cursor-pointer">sortowanie
          <span class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </h2>
        <!-- <select @click="changeSortingOption()" ref="sortingOption" name="sorting">
          <option value="newest">Najnowsze</option>
          <option value="cheapest">Najtańsze</option>
          <option value="mostexpensive">Najdroższe</option>
        </select> -->
      </div>
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
    emitSearchAdversts (e) {
      if (e.key === "Enter") {
        this.$emit('search-adversts', this.inputValue)
      }
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

