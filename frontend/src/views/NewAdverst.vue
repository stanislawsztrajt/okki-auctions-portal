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
      <input type="file"  accept="image/png, image/jpeg" >

      <h2>Opis</h2>
      <textarea name="" id="" cols="30" rows="10" v-model="descriptionValue"></textarea>

      <h2>
        Dane kontaktowe

        Lokalizacja
        <input type="text" v-model="locationValue">

        Numer telefonu
        <input type="text" v-model="phoneNumberValue">
      </h2>

      <button @click.once="addAdverst">Dodaj ogłoszenie</button>
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
      imageValue: '',
      userInfo: this.$cookies.get('user'),
      jwt: this.$cookies.get('jwt'),
      addAdverstUsed: false,

      advertsID: [],

      endPoint: 'https://okki-api.herokuapp.com'
    }
  },
  async created(){
    if(!this.jwt){
      this.$router.push('/login')
    }

    await axios.get(`${this.endPoint}/users/${this.userInfo._id}`)
    .then(res=>{
      this.advertsID = res.data.Adverts.adverts
    })
  },
  methods: {
    async addAdverst(){
      await axios.post(`${this.endPoint}/adverts`, {
        title: this.titleValue,
        price: parseFloat(this.priceValue),
        category: this.categoryValue,
        description: this.descriptionValue,
        location: this.locationValue,
        phoneNumber: this.phoneNumberValue,
        img: '',
      })
      .then(async res =>{
        console.log(res)
        this.advertsID.push(res.data._id)


        await axios.put(`${this.endPoint}/users/${this.userInfo._id}`, {
          Adverts: {
            adverts: this.advertsID
          }
        })
        .then(()=>{
          this.$router.push('/dashboard')
        })
        .catch(err=>console.log(err))
      }) .catch(err=>{console.log(err)})
    },
  }
}
</script>