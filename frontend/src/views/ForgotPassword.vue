<template>
  <div>
    <label for="">Email</label>
    <input type="text" placeholder="Twój email">
    <button @click="send">reset password</button>
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../API_URL'

export default {
  created(){

  },
  methods: {
    async send(){
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: 'rollorzdogzczdopiec@gmail.com'
      })
      .then(res => console.log('your user received an email', res))
      .catch(err => console.log('an error ooooo', err.response))
    }
  }
}
</script>

<style>

</style>