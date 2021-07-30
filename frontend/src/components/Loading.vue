<template>
  <div id="Loading" class="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center">
    <div class="flex flex-col justify-center items-center z-50 bg-white shadow-lg w-screen md:w-auto md:shadow-none md:bg-transparent pb-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-28 w-28 animate-spin text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span class="text-gray-600 text-3xl font-light">
        Ładowanie...
      </span>
    </div>
    <div class="absolute bg-gray-500 opacity-30 z-10 w-screen h-screen top-0 left-0"></div>
  </div>
</template>
<script>
export default {

}
</script>