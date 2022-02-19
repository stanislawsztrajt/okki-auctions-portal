<template>
  <div id="SearchFilteringElements" class="grid gap-y-4 gap-x-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div class="flex flex-col">
      <label class="ml-1">Kategoria</label>
      <select
        name="Kategorie"
        class="filtering-input"
        v-model="this.categoryFilterVariables['category']"
        @change="clearSubcategory"
        :required="isRequired ? true : false"
      >
        <option :value="this.categoryFilterVariables['category'] ? '' : this.categoryFilterVariables['category']" selected>{{ this.selectDefaultOption }}</option>
        <option
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div v-show="this.categoryFilterVariables['category']" class="flex flex-col">
      <label class="ml-1">Podkategoria</label>
      <select
        name="Podkategorie"
        class="filtering-input"
        v-model="this.categoryFilterVariables['subcategory']"
        @change="updateAppliedFilters"
        :required="isRequired ? true : false"
      >
        <option value="" selected>{{ this.selectDefaultOption }}</option>
        <option
          v-for="subcategory in subcategories[this.categoryFilterVariables['category']]"
          :key="subcategory.value"
          :value="subcategory.value"
        >
          {{ subcategory.name }}
        </option>
      </select>
    </div>
    <div
      v-show="this.categoryFilterVariables['subcategory'] !== ''"
      v-for="filter in this.subcategoriesFilters[this.categoryFilterVariables['subcategory']]"
      :key="filter"
      class="flex flex-col"
    >
      <label class="ml-1"> {{ filter.label }} </label>
      <select
        name="Filtry podkategorii"
        class="filtering-input"
        v-model="this.categoryFilterVariables[filter.vmodel]"
        @change="updateAppliedFilters"
        :required="isRequired ? true : false"
      >
        <option :value="this.categoryFilterVariables[filter.vmodel] ? '' : this.categoryFilterVariables[filter.vmodel]" selected>{{ this.selectDefaultOption }}</option>
        <option
          v-for="option in filter.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import categoriesJSON from '../jsons files/categories.json'
import subcategoriesJSON from '../jsons files/subcategories.json'
import subcategoriesFiltersJSON from '../jsons files/subcategoriesFilters.json'

export default {
  name: 'InputSearchPanel',
  data() {
    return {
      categories: categoriesJSON,
      subcategories: subcategoriesJSON,
      subcategoriesFilters: subcategoriesFiltersJSON,
      auctions: [],
      categoryFilterVariables: {
        category: '',
        subcategory: '',
      },
      appliedFilters: [],
      test: ''
    }
  },
  props: {
    appliedFiltersCookies: Object,
    selectDefaultOption: String,
    isRequired: Boolean,
  },
  created() {
    if(this.appliedFiltersCookies) {
      this.categoryFilterVariables = this.appliedFiltersCookies
    }
  },
  methods: {
    filterAdverts(auctionsCopy, appliedFilters) {
      this.auctions = auctionsCopy
      if(appliedFilters) {
        this.categoryFilterVariables = appliedFilters
      }

      this.appliedFilters = Object.values(this.categoryFilterVariables)
      this.appliedFilters = this.appliedFilters.filter((a) => a)

      this.auctions = this.auctions.filter((auction) => {
        if(!auction.filters) return
        return this.appliedFilters.every(filter => auction.filters.includes(filter));
      })

      this.$emit('update-auctions', this.auctions)
    },
    clearSubcategory() {
      this.categoryFilterVariables['subcategory'] = ''
      this.updateAppliedFilters()
    },
    updateAppliedFilters() {
      this.appliedFilters = Object.values(this.categoryFilterVariables)
      this.appliedFilters = this.appliedFilters.filter((a) => a)
      this.$emit('select-change', this.categoryFilterVariables)
    }
  }
}
</script>