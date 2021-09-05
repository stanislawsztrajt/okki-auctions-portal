<template>
  <div id="SearchSorting" class="flex flex-row items-center">
    <label class="sortingElement font-semibold flex items-center border-r">Sortuj</label>
    <select 
      name="Sortowanie" 
      class="sortingElement sm:w-48 text-lg"
      v-model="this.sorting"
      @change="this.$emit('search-adverts')"
    >
      <option value="" selected disabled hidden>Domyślnie</option>
      <option 
        v-for="option in options" 
        :key="option.name" 
        :value="option.value"
      >
      {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sorting: '',
      options: [
        {name: 'Najnowsze', value: 'najnowsze'},
        {name: 'Najtańsze', value: 'najtansze'},
        {name: 'Najdroższe', value: 'najdrozsze'}
      ],
      adverts: [], 
    }
  },
  methods: {
    sortAdverts(advertsCopy) {
      this.adverts = advertsCopy
      switch(this.sorting) {
        case 'najnowsze': {
          this.adverts.sort((advertA,advertB) => new Date(advertB.createdAt) - new Date(advertA.createdAt) ? -1 : 1);
          break;
        }
        case 'najtansze': {
          this.adverts.sort((advertA, advertB) => (advertA.price > advertB.price) ? 1 : -1);
          break;
        }
        case 'najdrozsze': {
          this.adverts.sort((advertA, advertB) => (advertA.price < advertB.price) ? 1 : -1);
          break;
        }
      }
    },
  },
}
</script>
