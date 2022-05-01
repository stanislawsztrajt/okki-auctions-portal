<template>
  <div class="flex flex-row justify-start w-full xl:w-11/12">
    <button @click="action" class="flex flex-row items-center w-full xl:w-10/12 font-semibold text-gray-600 bg-white shadow button-animation-hover mt-4 p-4 text-xl text-left">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
      </svg>
      {{ value }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    icon: String
  },
  methods: {
    action(){
      this.$emit('action')
    }
  }
}
</script>