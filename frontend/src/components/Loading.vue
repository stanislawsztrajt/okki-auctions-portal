<template>
  <div :class="`${isCenter ? 'h-128 -mt-20' : 'h-auto mt-10'} flex items-center justify-center`">
    <div class="w-44 h-44 border-t-4 border-b-4 border-green-500 rounded-full animate-spin"></div>
  </div>
</template>
<script>
export default {
  props: {
    isCenter: Boolean
  }
}
</script>