<template>
  <div id="SearchFilteringElements" class="grid gap-y-3 md:gap-y-4 gap-x-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div class="flex flex-col">
      <label class="ml-1">Kategoria</label>
      <select
        name="Kategorie"
        class="filtering-input"
        v-model="filtersVariables['category']"
        @blur="checkIfAllFiltersChoosen()"
        @change="[clearSubcategory(), checkIfAllFiltersChoosen()]"
      >
        <option :value="filtersVariables['category'] ? '' : filtersVariables['category']" selected>{{ selectDefaultOption }}</option>
        <option
          v-for="category in categories"
          :key="category.value"
          :value="category.value"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div v-show="filtersVariables['category']" class="flex flex-col">
      <label class="ml-1">Podkategoria</label>
      <select
        name="Podkategorie"
        class="filtering-input"
        v-model="filtersVariables['subcategory']"
        @blur="checkIfAllFiltersChoosen()"
        @change="[clearSubcategoryFilters(), checkIfAllFiltersChoosen()]"
      >
        <option :value="filtersVariables['subcategory'] ? '' : filtersVariables['subcategory']" selected>{{ selectDefaultOption }}</option>
        <option
          v-for="subcategory in subcategories[filtersVariables['category']]"
          :key="subcategory.value"
          :value="subcategory.value"
        >
          {{ subcategory.name }}
        </option>
      </select>
    </div>
    <div
      v-show="filtersVariables['subcategory'] !== ''"
      v-for="filter in subcategoriesFilters[filtersVariables['subcategory']]"
      :key="filter"
      class="flex flex-col"
    >
      <label class="ml-1"> {{ filter.label }} </label>
      <select
        name="Filtry podkategorii"
        class="filtering-input"
        v-model="filtersVariables[filter.vmodel]"
        @blur="checkIfAllFiltersChoosen()"
        @change="[updateAppliedFilters(), checkIfAllFiltersChoosen()]"
      >
        <option :value="filtersVariables[filter.vmodel] ? '' : filtersVariables[filter.vmodel]" selected>{{ selectDefaultOption }}</option>
        <option
          v-for="option in filter.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <div v-if="!this.isRequired">
      <label class="ml-1"> Cena </label>
      <div class="flex flex-row w-full md:w-4/5">
        <input
          type="number"
          v-model="priceFilters.from"
          @input="updatePriceFilters"
          placeholder="Od"
          min="0"
          class="filtering-input-price mr-3"
        >
        <input
          type="number"
          v-model="priceFilters.to"
          @input="updatePriceFilters"
          placeholder="Do"
          min="0"
          class="filtering-input-price"
        >
      </div>
    </div>
  </div>
</template>

<script>
import categories from '../jsons files/categories.json'
import subcategories from '../jsons files/subcategories.json'
import subcategoriesFiltersJSON from '../jsons files/subcategoriesFilters.json'
import debounce from 'lodash.debounce'

export default {
  name: 'InputSearchPanel',
  data() {
    return {
      categories,
      subcategories,
      subcategoriesFilters: subcategoriesFiltersJSON,
      auctions: [],
      filtersVariables: {
        category: '',
        subcategory: ''
      },
      appliedFilters: [],
      priceFilters: {},
    }
  },
  props: {
    appliedFiltersCookies: Object,
    appliedFiltersEditing: Object,
    selectDefaultOption: String,
    isRequired: Boolean,
  },
  created() {
    if(this.appliedFiltersCookies) {
      this.filtersVariables = this.appliedFiltersCookies
    } else if(this.appliedFiltersEditing) {
      this.filtersVariables = this.appliedFiltersEditing
    }
  },
  watch: {
    appliedFiltersEditing(newFiltersEditing) {
      this.filtersVariables = newFiltersEditing
    }
  },
  methods: {
    clearSubcategory() {
      Object.keys(this.filtersVariables).forEach(key => {
        if(key !== 'category') {
          this.filtersVariables[key] = ''
        }
      })
      this.updateAppliedFilters()
    },
    clearSubcategoryFilters() {
      Object.keys(this.filtersVariables).forEach(key => {
        if(key !== 'category' && key !== 'subcategory') {
          this.filtersVariables[key] = ''
        }
      })
      this.updateAppliedFilters()
    },
    updateAppliedFilters() {
      if(!this.$route.path.includes('edit-auction') && !this.$route.path.includes('new-auction')) {
        Object.keys(this.filtersVariables).forEach(key => {
          if(this.filtersVariables[key].toString().trim() === '') {
            delete this.filtersVariables[key]
          }
        })
      }
      this.$emit('filter-change', this.filtersVariables)
    },
    updatePriceFilters: debounce(function() {
      if(parseFloat(this.priceFilters.from) > parseFloat(this.priceFilters.to)) {
        let tempPriceTo = this.priceFilters.to
        this.priceFilters.to = this.priceFilters.from
        this.priceFilters.from = tempPriceTo
      }
      this.$emit('price-filters-change', this.priceFilters)
    }, 500),
    checkIfAllFiltersChoosen() {
      if(this.isRequired) {
        if(this.filtersVariables['category'].trim() === '' || this.filtersVariables['subcategory'].trim() === '') {
          this.$emit('display-filters-validation-error')
        } else if(this.subcategoriesFilters[this.filtersVariables['subcategory']]) {
          let displayErr = false

          for(let i = 0; i < this.subcategoriesFilters[this.filtersVariables['subcategory']].length; i++) {
            let filter = this.subcategoriesFilters[this.filtersVariables['subcategory']][i]
            if(!this.filtersVariables[filter.vmodel] || this.filtersVariables[filter.vmodel].trim() === '') {
              displayErr = true
              break
            }
          }
          this.$emit(`${displayErr ? 'display' : 'hide'}-filters-validation-error`)
        } else {
          this.$emit('hide-filters-validation-error');
        }
      }
    }
  }
}
</script>