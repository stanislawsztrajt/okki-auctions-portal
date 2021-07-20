<template>
  <div id="NewAdverst">
    <Menu />
    <div class="w-3/4 lg:w-3/5 py-10 m-auto">
      <h1 class="text-4xl text-gray-700 font-semibold mb-7 ml-2">Dodaj ogłoszenie</h1>
      <div class="new-adverst-main-box">
        <h1 class="new-adverst-title">Informacje podstawowe</h1>
        <div class="new-adverst-data-box">
          <label class="text-gray-100 mb-1">Tytuł ogłoszenia</label>
          <input
            type="text"
            placeholder="Np. Opel Corsa 2014 1.4 benzyna"
            required
            class="new-adverst-input"
            v-model="titleValue"
          >
        </div>
        <div class="new-adverst-data-box">
          <h2>Cena</h2>
          <input
            type="text"
            placeholder="Np. 8600"
            required
            class="new-adverst-input"
            v-model="priceValue"
          >
        </div>
        <div class="new-adverst-data-box">
          <h2>Kategoria</h2>
          <input
            list="categories"
            placeholder="Wyszukaj kategorię"
            required
            class="new-adverst-input"
            v-model="categoryValue"
          >
            <datalist id="categories">
              <option value="" disabled selected hidden>Wybierz kategorię</option>
              <option
                v-for="category in categories"
                :key="category.value"
                :value="category.name">
              </option>
            </datalist>
        </div>
        <div class="new-adverst-data-box">
          <h2>Twoje imię</h2>
          <input
            type="text"
            placeholder="Np. Michał"
            required
            class="new-adverst-input"
            v-model="usernameValue"
          >
        </div>
      </div>
      <div class="new-adverst-main-box">
        <h1 class="new-adverst-title">Zdjęcia i opis</h1>
        <div class="new-adverst-data-box">
          <label>Zdjęcia</label>
          <div class="min-h-12 w-full md:w-72 text-sm sm:text-base flex items-center text-gray-700 bg-gray-100 p-2">
            <input
              type="file"
              accept="image/png, image/jpeg"
              required
              class=""
              @change="onFileChange($event)"
            >
          </div>
          <img
            :src="imageRes.url"
            class="max-w-sm bg-gray-100 mt-2"
            alt=""
          >
        </div>
        <div class="new-adverst-data-box">
          <label>Opis</label>
          <textarea
            class="bg-gray-100 text-lg text-gray-700 px-4 py-2 w-full md:w-3/5 h-72"
            placeholder="Np. Opel Corsa, rocznik 2014, silnik 1.4 benzyna, 110 tyś. km. przebiegu, samochód zadbany..."
            required
            v-model="descriptionValue">
          </textarea>
        </div>
      </div>

      <div class="new-adverst-main-box">
        <h1 class="new-adverst-title">Dane kontaktowe</h1>
        <div class="new-adverst-data-box">
          <label>Lokalizacja</label>
          <input
            type="text"
            placeholder="Np. Warszawa"
            required
            class="new-adverst-input"
            v-model="locationValue"
          >
        </div>
        <div class="new-adverst-data-box">
          <label>Numer Telefonu</label>
          <input
            type="tel"
            placeholder="Np. 111222333"
            class="new-adverst-input"
            v-model="phoneNumberValue"
          >
        </div>
      </div>

      <button
        class="w-52 md:w-64 h-16 bg-green-600 text-white text-xl font-semibold flex justify-center items-center rounded-xl hover:bg-green-700 transition duration-150"
        @click.once="addAdvert"
      >
        Dodaj ogłoszenie
      </button>
    </div>

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
      priceValue: '',
      categoryValue: '',
      descriptionValue: '',
      locationValue: '',
      phoneNumberValue: '',
      image: '',
      imageRes: '',
      userInfo: this.$cookies.get('user'),
      jwt: this.$cookies.get('jwt'),
      advertsIDs: [],
      categories: [
        {name: "Motoryzacja", value: "motoryzacja"},
        {name: "Dom i ogród", value: "dom-i-ogrod"},
        {name: "Elektronika", value: "elektronika"},
        {name: "Odzież", value: "odziez"},
        {name: "Rolnictwo", value: "rolnictwo"},
        {name: "Zwierzęta", value: "zwierzeta"},
        {name: "Dziecięce", value: "dzieciece"},
        {name: "Sport i hobby", value: "sport-i-hobby"},
        {name: "Edukacja i muzyka", value: "edukacja-i-muzyka"},
        {name: "Budownictwo", value: "budownictwo"},
        {name: "Noclegi", value: "noclegi"},
        {name: "Praca", value: "praca"},
        {name: "Korepetycje", value: "korepetycje"},
      ],
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
  },
  methods: {
    async onFileChange(e){
      this.image = e.target.files[0]

      const data = new FormData()
      data.append('file', this.image)
      data.append("api_key", '');
      data.append("api_secret", '');
      data.append("cloud_name", 'dh35iucxu');
      data.append("upload_preset", "qpfb0fma");


      await axios.post(
        `https://api.cloudinary.com/v1_1/dh35iucxu/image/upload`,
        data
      )
      .then(res => {
        console.log(res.data.secure_url)
        this.imageRes = res.data
      })
      .catch(err => console.log(err))
    },
    async addAdvert(){
      await axios.post(
        `${this.API_URL}/adverts`, {
        title: this.titleValue,
        price: parseFloat(this.priceValue),
        category: this.categoryValue,
        description: this.descriptionValue,
        location: this.locationValue,
        phoneNumber: this.phoneNumberValue,
        userID: this.userInfo.id,
        images: [this.imageRes.url]
      })
      .then(async res =>{
        console.log(this.advertsIDs)
        console.log(typeof this.advertsIDs)
        try{
          this.advertsIDs.push(res.data.id)
        } catch(err){
          this.advertsIDs = []
          this.advertsIDs.push(res.data.id)
        }

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