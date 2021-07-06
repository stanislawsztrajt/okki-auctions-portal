<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      API_URL: 'https://okki-api.herokuapp.com',
      advert: ''
    }
  },
  props: {
    id: String
  },
  async created(){
    await axios.get(`${this.API_URL}/adverts/${this.id}`)
    .then(res => {
      console.log(res)
      this.advert = res.data
    })
    .catch(err => console.log(err, ' nie znaleziono ogloszenia'))
  }
}
</script>

<style>

</style>