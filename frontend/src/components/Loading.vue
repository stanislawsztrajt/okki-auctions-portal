<template>
  <div :class="`${isCenter ? 'h-192' : 'h-auto'} flex items-center justify-center mt-10`">
    <div class="w-80 h-80 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
  </div>
</template>
<script>
export default {
  props: {
    isCenter: Boolean
  }
}
</script>