<template>
  <div id="NewAdverst">
    <Menu />
      <h2>Tytuł</h2>
      <input type="text" v-model="titleValue">

      <h2>Twoje imie</h2>
      <input type="text" v-model="usernameValue">

      <h2>Cena</h2>
      <input type="text" v-model="priceValue">

      <h2>Kategoria</h2>
      <!-- pozniej sie zmieni na lsite do wybrania -->
      <input type="text" v-model="categoryValue">

      <h2>Zdjęcia</h2>
      <input type="image">

      <h2>Opis</h2>
      <textarea name="" id="" cols="30" rows="10" v-model="descriptionValue"></textarea>

      <h2>
        Dane kontaktowe

        Lokalizacja
        <input type="text" v-model="locationValue">

        Numer telefonu
        <input type="text" v-model="phoneNumberValue">
      </h2>

      <button @click="addAdverst">Dodaj ogłoszenie</button>
    <router-link to="/">Wróc na strone główną</router-link>

  </div>
</template>

<script>
import Menu from '../components/Menu'
import axios from 'axios'

export default {
  name: 'NewAdverst',
  components: {
    Menu
  },
  data(){
    return{
      // v-models
      titleValue: '',
      usernameValue: '',
      priceValue: 0,
      categoryValue: '',
      descriptionValue: '',
      locationValue: '',
      phoneNumberValue: '',
      adversts: [],

      endPoint: 'https://okki-api.herokuapp.com/'
    }
  },
  methods: {
    addAdverst(){
      axios.post(this.endPoint + 'adverts', {
        title: this.titleValue,
        price: parseFloat(this.priceValue),
        category: this.categoryValue,
        description: this.descriptionValue,
        location: this.locationValue,
        phoneNumber: this.phoneNumberValue,
        img: 'img'
      })
      console.log(this.endPoint + 'adverts')

      // this.adversts.push({
      //   title: this.titleValue,
      //   price: parseFloat(this.priceValue),
      //   category: this.categoryValue,
      //   description: this.descriptionValue,
      //   location: this.locationValue,
      //   phoneNumber: this.phoneNumberValue,
      //   img: 'img'
      // })
      // console.log(this.adversts)
    },
  }
}
</script>