<template>
  <div class="flex flex-row justify-start">
    <div class="w-full xl:w-10/12 border-gray-300 text-gray-600 bg-white shadow mt-4 p-4 text-xl">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 -mt-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
      </svg>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    icon: String
  }
}
</script>