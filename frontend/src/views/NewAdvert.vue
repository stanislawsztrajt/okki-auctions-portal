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
      <input
        type="file"
        accept="image/png, image/jpeg"
        @change="onFileChange($event)"
      >
      <img
        :src="`${API_URL}${imageURL}`"
        class="h-48"
        alt=""
      >

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
  name: 'NewAdvert',
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
      image: '',
      imageURL: '',
      userInfo: this.$cookies.get('user'),
      jwt: this.$cookies.get('jwt'),
      advertsIDs: [],

      API_URL: 'https://okki-api.herokuapp.com'
    }
  },
  async created(){
    if(!this.jwt){
      this.$router.push('/login')
    }

    await axios.get(`${this.API_URL}/users/${this.userInfo.id}`)
    .then(res=>{
      console.log(res)
      this.advertsIDs = res.data.Adverts
    })
    .catch(err =>{
      console.log(err)
    })
    console.log(this.advertsIDs)
  },
  methods: {
    async onFileChange(e){
      this.image = e.target.files[0]

      const data = new FormData()
      data.append('files', this.image)

      await axios({
        method: 'POST',
        url: `${this.API_URL}/upload`,
        data
      })
      .then(res => this.imageURL = res.data[0].url)
      .catch(err => console.log(err))
    },
    async addAdverst(){


      await axios.post(`${this.API_URL}/adverts`, {
        title: this.titleValue,
        price: parseFloat(this.priceValue),
        category: this.categoryValue,
        description: this.descriptionValue,
        location: this.locationValue,
        phoneNumber: this.phoneNumberValue,
        userID: this.userInfo.id,
        images: [this.imageURL]
      })
      .then(async res =>{
        this.advertsIDs.push(res.data._id)

        await axios.put(`${this.API_URL}/users/${this.userInfo.id}`, {
          Adverts: this.advertsIDs
        })
        .then((res)=>{
          console.log(res)
          this.$router.push('/dashboard')
        })
        .catch(err=>console.log(err))
      }) .catch(err=>{console.log(err)})
    },
  }
}
</script>