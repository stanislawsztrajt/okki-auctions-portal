<template >
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../API_URL'

export default {
  name: 'App',
  async created(){
    await axios.get(`${API_URL}/auctions`)
    .then(res => console.log(res.status))
    .catch(err => console.log(err))
  }
}

</script>
<style>
* {
  -webkit-tap-highlight-color: rgba(128, 128, 128, 0.212);
}
body {
  background: #EEE;
}
</style>

