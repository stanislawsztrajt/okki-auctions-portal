<template>
  <div v-if="maxPage > 1 && !isLoading && numberOfAllAuctions !== null" className="flex items-center justify-center md:justify-between my-10 text-gray-700 bg-white shadow-sm px-4 md:px-6 py-4">
    <div class="flex justify-center items-center text-lg md:text-xl">
      <router-link :to="currentPage > 1  ? `${defaultRoute}/page/${currentPage-1}` : $route.path" className="pagination-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>

      <div v-if="!pagesLinks.includes(1)">
        <router-link :to="defaultRoute" class="mx-3">1</router-link>
        <span v-if="!pagesLinks.includes(2)" class="mx-2">...</span>
      </div>

      <router-link
        v-for="link in pagesLinks"
        :key="link"
        :to="`${defaultRoute}/page/${link}`"
        class="mx-3"
        :class="link === currentPage ? 'font-semibold border-b-2 border-gray-700' : ''"
      >
        {{ link }}
      </router-link>

      <div v-if="!pagesLinks.includes(maxPage)">
        <span v-if="!pagesLinks.includes(maxPage-1)" class="mx-2">...</span>
        <router-link :to="`${defaultRoute}/page/${maxPage}`" class="mx-3">{{maxPage}}</router-link>
      </div>

      <router-link :to="currentPage < maxPage  ? `${defaultRoute}/page/${currentPage+1}` : $route.path" className="pagination-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
    <p class="text-gray-400 hidden md:block">Wszystkich ogłoszeń: {{ numberOfAllAuctions }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auctionsAtPage: 5,
      maxPage: null,
      pagesLinks: []
    }
  },
  props: {
    numberOfAllAuctions: Number,
    currentPage: Number,
    isLoading: Boolean,
    defaultRoute: String
  },
  created() {
    if(this.numberOfAllAuctions !== null) {
      this.maxPage = Math.ceil(this.numberOfAllAuctions/this.auctionsAtPage)

      if(this.currentPage <= 1 || isNaN(this.currentPage)) {
        this.$router.push(this.defaultRoute)
      }
      else if(this.currentPage > this.maxPage) {
        this.$router.push(`${this.defaultRoute}/page/${this.maxPage}`)
      }
      this.fillPagesLinksArr()
    }
  },
  methods: {
    fillPagesLinksArr() {
      let page = this.currentPage-1
      do {
        if(page > 0 && page <= this.maxPage) {
          this.pagesLinks.push(page)
        }
        else if(page > this.maxPage) {
          this.pagesLinks.unshift(page-3)
        }
        page++;
      } while(this.pagesLinks.length < (this.maxPage > 2 ? 3 : 2))

    }
  },
}
</script>