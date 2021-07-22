<template>
  <div id="SearchFilters" class="w-full bg-white text-gray-600 my-5 p-5 shadow-sm">
    <h2 class="w-full text-2xl font-semibold mb-5 pb-2 border-b border-gray-200">Filtry</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div class="flex flex-col">
        <label class="ml-1">Kategoria</label>
        <select 
          name="Kategorie" 
          class="filtering-input"
          v-model="this.category"
          @change="this.$emit('update-category-option', this.category)"
        >
          <option value="" selected>Wszystko</option>
          <option
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import categoriesJSON from '../jsons files/categories.json'

export default {
  name: 'InputSearchPanel',
  data() {
    return {
      categories: categoriesJSON,
      category: this.categoryOption,
    }
  },
  props: {
    categoryOption : {
      type: String
    }
  },
}
</script>