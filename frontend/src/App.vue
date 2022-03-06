<template >
  <div id="app">
    <BlockedUser v-if="isBlocked"/>
    <router-view v-else />
  </div>
</template>

<script>
import axios from 'axios';

import API_URL from '../API_URL';
import { authorization, jwt } from './constants/const-variables';

import BlockedUser from './components/BlockedUser.vue'

export default {
  name: 'App',
  components: {
    BlockedUser
  },
  data(){
    return{
      isBlocked: false
    }
  },
  async created(){
    if(jwt){
      await axios.get(`${API_URL}/users/me`, authorization)
      .catch(() => this.isBlocked = true)
    }
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

