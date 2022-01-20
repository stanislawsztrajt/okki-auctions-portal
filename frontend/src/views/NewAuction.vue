<template>
  <div id="NewAuction">
    <Menu />
    <Loading v-if="loading"/>
    <form 
      v-else 
      @submit.prevent="createAuction"
      class="w-3/4 lg:w-3/5 py-10 m-auto"
    >
      <h1 class="text-4xl text-gray-700 font-semibold mb-7 ml-2">Dodaj ogłoszenie</h1>
      <div class="new-auction-main-box">
        <h1 class="new-auction-title">Informacje podstawowe</h1>
        <div class="new-auction-data-box">
          <label class="text-gray-100 mb-1">Tytuł ogłoszenia</label>
          <input
            type="text"
            placeholder="Np. Opel Corsa 2014 1.4 benzyna"
            required
            class="new-auction-input"
            v-model.trim="titleValue"
            maxlength="70"
            minlength="8"
          >
        </div>
        <div class="new-auction-data-box">
          <h2>Cena</h2>
          <input
            type="number"
            placeholder="Np. 8600"
            required
            class="new-auction-input"
            v-model="priceValue"
            maxlength="15"
          >
        </div>
        <div class="new-auction-data-box">
          <h2>Kategoria</h2>
          <select
            name="Kategorie"
            required
            class="new-auction-input"
            v-model="categoryValue"
          ></select>
        </div>
        <div class="new-auction-data-box">
          <h2>Twoje imię</h2>
          <input
            type="text"
            placeholder="Np. Michał"
            required
            class="new-auction-input"
            v-model="usernameValue"
            maxlength="20"
          >
        </div>
      </div>
      <div class="new-auction-main-box">
        <h1 class="new-auction-title">Zdjęcia i opis</h1>
        <div class="new-auction-data-box">
          <label>Zdjęcia</label>
          <div v-if="urls.length < 4" class="min-h-12 w-full md:w-72 text-sm sm:text-base flex items-center text-gray-700 bg-gray-100 p-2">
            <input
              type="file"
              accept="image/png, image/jpeg"
              required
              class=""
              @change="onFileChange($event)"
            >
          </div>

          <div class="grid grid-cols-1 2xl:grid-cols-2 h-auto">
            <div
              v-for="(url, index) in urls"
              :key="url"
              class="bg-cover bg-no-repeat bg-center grid-cols-1 m-2 h-72 flex flex-col"
              :style="{ backgroundImage: 'url(' + url + ')' }"
            >
              <div
                class=" text-black bg-white text-center text-sm md:text-base xl:text-xl p-2 w-full opacity-40"
                v-if="index === 0"
              >
                To zdjęcie będzie główne
              </div>
              <div class="flex justify-end items-end h-full">
              <svg xmlns="http://www.w3.org/2000/svg"
                @click="removeImage(index)"
                class="h-10 w-10 text-red-600 button-animation-hover cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              </div>
            </div>
          </div>

        </div>
        <div class="new-auction-data-box">
          <label>Opis</label>
          <textarea
            class="bg-gray-100 text-lg text-gray-700 px-4 py-2 w-full md:w-3/5 h-72"
            placeholder="Np. Opel Corsa, rocznik 2014, silnik 1.4 benzyna, 110 tyś. km. przebiegu, samochód zadbany..."
            required
            v-model.trim="descriptionValue"
            minlength="50"
            maxlength="1000"
          >
          </textarea>
        </div>

        <div class="new-adverst-main-box">
          <h1 class="new-adverst-title">Filtry</h1>
          <SearchFilteringElements
            class="text-white"
            @select-change="saveFilters"
            :selectDefaultOption="'Wybierz'"
            :isRequired="true"
          />
        </div>
      </div>

      <div class="new-auction-main-box">
        <h1 class="new-auction-title">Dane kontaktowe</h1>
        <div class="new-auction-data-box">
          <label>Lokalizacja</label>
          <input
            type="text"
            placeholder="Np. Warszawa"
            required
            class="new-auction-input"
            v-model="locationValue"
            maxlength="30"
          >
        </div>
        <div class="new-auction-data-box">
          <label>Numer Telefonu</label>
          <input
            type="number"
            placeholder="Np. 111222333"
            required
            class="new-auction-input"
            v-model="phoneNumberValue"
            minlength="9"
            maxlength="12"
          >
        </div>
      </div>

      <button
        class="new-auction-button"
        @click="createAuction"
      ></button>
    </form>
    <div v-if="validationError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 right-1/2 transform translate-x-1/2 bottom-10 rounded fixed" role="alert">
      <span class="block sm:inline">{{ validationText }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu'
import Loading from '../components/Loading'
import SearchFilteringElements from '../components/SearchFilteringElements'

import axios from 'axios'

import categoriesJSON from '../jsons files/categories.json'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  name: 'NewAdvert',
  components: {
    Menu,
    Loading,
    SearchFilteringElements
  },
  data(){
    return{
      // v-models
      titleValue: '',
      priceValue: '',
      descriptionValue: '',
      locationValue: '',
      phoneNumberValue: '',
      advertFilters: [],

      isLoading: false,

      urls: [],
      images: [],
      imageUrls: [],

      categories: categoriesJSON,
      validationText: '',
      validationError: false,
      setTimeout: Function,
      setTimeoutTime: 4000,
      used: false,
    }
  },
  async created(){
    this.categories.sort((categoryA, categoryB) => (categoryA.name > categoryB.name) ? 1 : -1);

    if(!jwt){
      this.$router.push('/login')
    }
  },
  methods: {
    saveFilters(filters) {
      this.advertFilters = Object.values(filters)
    },
    async onFileChange(e){
      const image = e.target.files[0]
      this.images.push(image)
      this.urls.push(URL.createObjectURL(image))
    },
    removeImage(index){
      this.images.splice(index,1)
      this.urls.splice(index,1)
    },
    async createAuction(){
      clearTimeout(this.setTimeout)

      if(!this.titleValue || !this.priceValue || !this.advertFilters || !this.descriptionValue || !this.locationValue || !this.phoneNumberValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pola'
        return this.validationError = true
      }

      if(this.titleValue.length < 8){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Tytuł ogłoszenia jest za krótki (co najmniej 8 znaków)'
        return this.validationError = true
      }

      if(this.descriptionValue.length < 50){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Opis ogłoszenia jest za krótki (co najmniej 50 znaków)'
        return this.validationError = true
      }
      
      if(this.descriptionValue.length > 10000){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Opis ogłoszenia jest zbyt długi (najwiecej 10000 znaków)'
        return this.validationError = true
      }

      if(this.phoneNumberValue.length < 9) {
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Podany numer telefonu jest za krótki (co najmniej 9 znaków)'
        return this.validationError = true
      }

      if(this.phoneNumberValue.length > 12) {
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Podany numer telefonu jest za długi (maksymalnie 12 znaków)'
        return this.validationError = true
      }

      if(this.priceValue.length > 15) {
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Podana kwota jest za długa (maksymalnie 15 znaków)'
        return this.validationError = true
      }

      this.used = true;
      this.isLoading = true;

      if(this.images.length === 0){
        this.images = ['https://res.cloudinary.com/dh35iucxu/image/upload/v1629822362/arst123_kebllh.jpg']
      }

      await this.images.forEach(async image =>{
        let isPostedImages = false;

        const data = new FormData()
        data.append('file', image)
        data.append("api_key", '');
        data.append("api_secret", '');
        data.append("cloud_name", 'dh35iucxu');
        data.append("upload_preset", "qpfb0fma");

        await axios.post(
          `https://api.cloudinary.com/v1_1/dh35iucxu/image/upload`,
          data
        )
        .then(async res => {
          await this.imageUrls.push(res.data.url);
          if(this.imageUrls.length === this.images.length) isPostedImages = true;
        })
        .catch(err => console.log(err))


        if(isPostedImages){
          if(this.used) {
            const data = {
              title: this.titleValue,
              price: parseFloat(this.priceValue),
              description: this.descriptionValue,
              location: this.locationValue,
              phoneNumber: this.phoneNumberValue,
              user_id: user.id,
              images: this.imageUrls,
            }

            await axios.post(`${API_URL}/auctions`, data, authorization)
            .then(() => this.$router.push('/dashboard')) 
            .catch(err=>{console.log(err)})
          }
        }
      })
    },
  }
}

</script>