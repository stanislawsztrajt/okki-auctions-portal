<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@import './../scssVariables/variables';

body{
  background-color: $bg-main;
  color: $color-main;
  font-family: $font-family-main;
}
</style>
