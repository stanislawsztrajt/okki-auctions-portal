<template>
  <div id="SearchSorting" class="flex flex-row items-center">
    <label class="sortingElement font-semibold flex items-center border-r">Sortuj</label>
    <select
      name="Sortowanie"
      class="sortingElement sm:w-48 text-lg"
      v-model="this.sorting"
      @change="this.$emit('update-sorting-value', this.sorting)"
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
    }
  },
}
</script>
