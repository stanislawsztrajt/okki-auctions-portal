<template>
<div id="Adverts" class="mt-6 grid grid-cols-2 sm:grid-cols-1 justify-items-center md:justify-items-start">
  <router-link
    :to="`/advert/${advert.id}`"
    class="flex-row w-10/12 border-gray-300 my-4 text-gray-600 bg-white shadow"
    v-for="advert in adverts"
    :key="advert.code"
  >
    <img
      class="sm:float-left h-32 w-full border-gray-200 border-b-2 bg-cover bg-no-repeat bg-center sm:w-60 sm:h-48 sm:border-r-2 sm:border-b-0"
      :src="advert.images"
      alt=""
    >
    <div class="sm:float-left px-3 py-2 sm:px-5 sm:py-4">
      <h2 class="sm:text-2xl">
        {{ advert.title }}
      </h2>
      <h3 class="font-bold sm:text-3xl">
        {{ advert.price }}zł
      </h3>
      <h3 class="text-xs float-right mb-0.5 mt-2 sm:float-left sm:text-lg sm:mt-0">
        {{ advert.location }}
      </h3>
    </div>
  </router-link>
</div>
</template>
<script>
export default {
  props: {
    adverts: Array
  }
}
</script>