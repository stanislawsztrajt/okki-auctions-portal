<template>
  <div id="NewAuction">
    <Loading :isCenter="true" v-if="isLoading"/>
    <div v-else class="w-5/6 sm:w-3/4 xl:w-3/5 pt-10 pb-16 m-auto">
      <FormKit
        type="form"
        id="create-auction-form"
        @submit="createAuction"
        :actions="false"
        :config="{
          classes: {
            message: 'text-gray-800 font-semibold mt-1',
            messages: 'list-none ml-0',
            help: 'text-gray-800 -mb-2'
          },
        }"
        validation-visibility="blur"
      >
        <h1 class="text-4xl text-gray-700 font-semibold mb-7 ml-2">Edytowanie ogłoszenia</h1>
        <div class="new-auction-main-box">
          <h1 class="new-auction-title">Informacje podstawowe</h1>
          <div class="new-auction-data-box">
            <FormKit
              type="text"
              v-model.trim="titleValue"
              placeholder="Np. Opel Corsa 2014 1.4 benzyna"
              label="Tytuł ogłoszenia"
              validation="required|length:8,70"
              :classes="{ input: 'new-auction-input' }"
            />
          </div>
          <div class="new-auction-data-box">
            <FormKit
              type="number"
              label="Cena"
              placeholder="Np. 8600"
              v-model="priceValue"
              validation="required|length:0,15"
              :classes="{ input: 'new-auction-input' }"
              :validation-messages="{
                required: 'Cena jest wymagana.',
              }"
              help="*Cena wyrażana jest w złotówkach (PLN)"
            />
          </div>
          <div class="new-auction-data-box">
            <FormKit
              type="select"
              label="Rodzaj ceny"
              placeholder="Wybierz"
              v-model="priceTypeValue"
              :options="{
                jednorazowa: 'Jednorazowa',
                'na-godzine': 'Na godzinę',
                'na-miesiac': 'Na miesiąc'
              }"
              validation="required"
              validation-visibility="blur"
              :classes="{ input: 'h-12 min-h-12 w-full md:w-72 sm:text-lg flex items-center text-gray-700 bg-gray-100 p-2' }"
            />
          </div>
        </div>
        <div class="new-auction-main-box">
          <h1 class="new-auction-title">Zdjęcia i opis</h1>
          <div class="new-auction-data-box">
            <label>Zdjęcia</label>
            <input
              type="file"
              class="min-h-12 w-full md:w-72 text-sm sm:text-base flex items-center text-gray-700 bg-gray-100 p-2 mb-2"
              accept="image/png, image/jpeg"
              @change="onFileChange($event)"
              multiple
              :disabled="urls.length >= 4"
            >
            <div class="grid grid-cols-1 xl:grid-cols-2 h-auto">
              <div
                v-for="(url, index) in urls"
                :key="url"
                class="bg-cover bg-no-repeat bg-center grid-cols-1 h-72 flex flex-col mr-2 mb-2 border-2 border-gray-600"
                :style="{ backgroundImage: 'url(' + url + ')' }"
              >
                <span v-if="index === 0" class="text-black bg-gray-300 text-center text-sm md:text-base xl:text-xl p-2 w-full opacity-70">
                  To zdjęcie będzie główne
                </span>
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
            <FormKit
              type="textarea"
              label="Opis"
              placeholder="Np. Opel Corsa, rocznik 2014, silnik 1.4 benzyna, 110 tyś. km. przebiegu, samochód zadbany..."
              v-model.trim="descriptionValue"
              validation="required|length:50,1000"
              :validation-messages="{
                length: `Opis musi mieć 50-1000 znaków (obecnie: ${descriptionValue.length}).`,
              }"
              :classes="{ input: 'bg-gray-100 text-lg text-gray-700 px-4 py-2 w-full lg:w-3/5 h-72 -mb-1' }"
            />
          </div>
        </div>

        <div class="new-auction-main-box">
          <h1 class="new-auction-title">Filtry</h1>
          <SearchFilters
            class="text-white"
            ref="filteringComponent"
            @select-change="updateFilters"
            @display-filters-validation-error="displayFiltersValidationError"
            @hide-filters-validation-error="hideFiltersValidationError"
            :appliedFiltersEditing="filtersValue"
            :selectDefaultOption="'Wybierz'"
            :isRequired="true"
          />
          <p v-if="filtersValidationErr" class="text-gray-800 font-semibold mt-1">Filtry są wymagane.</p>
        </div>

        <div class="new-auction-main-box">
          <h1 class="new-auction-title">Kontakt i lokalizacja</h1>
          <div class="new-auction-data-box">
            <FormKit
              v-model="hidePhoneNumber"
              type="checkbox"
              label="Ukryj numer telefonu"
              :classes="{ wrapper: `flex flex-row items-center h-14 -mt-2 ${hidePhoneNumber ? '-mb-2' : ''}`, input: 'h-8 w-8', inner: 'h-8 w-8', label: 'text-xl ml-2' }"
              @change="() => phoneNumberValue = ''"
            />
            <FormKit
              v-if="!hidePhoneNumber"
              type="number"
              label="Numer telefonu"
              placeholder="Np. 111222333"
              v-model.trim="phoneNumberValue"
              validation="required|length:9,12"
              :classes="{ input: 'new-auction-input' }"
            />
          </div>
          <div class="new-auction-data-box">
            <FormKit
              type="text"
              list="streets"
              label="Lokalizacja (ulica)"
              placeholder="Np. Złota"
              v-model.trim="locationValue"
              validation="required|formKitStreetRule"
              :validation-rules="{ formKitStreetRule }"
              :validation-messages="{
                required: 'Lokalizacja jest wymagana.',
                formKitStreetRule: 'Podana ulica nie istnieje w Kaliszu.',
              }"
              help="*Podaj pełną nazwę ulicy"
              :classes="{ input: 'new-auction-input' }"
            />
            <datalist id="streets">
              <option v-for="street in streetsCapitalize" :key="street" :value="street"></option>
            </datalist>
          </div>
        </div>

        <p v-if="validationErr" class="text-xl mb-3 font-semibold text-red-500">{{ validationMsg }}</p>
        <input
          type="submit"
          value="Zapisz zmiany"
          class="new-auction-button cursor-pointer"
          @click="checkFiltersValidation"
        >
      </FormKit>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import convert from 'image-file-resize';
import streetsCapitalize from '../jsons files/streetsCapitalize.json'
import { formKitStreetRule } from '../constants/formKitCustomRules'
import { authorization, jwt, user } from '../constants/const-variables'
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET
} from '../../secret.js'

import Loading from '../components/Loading'
import SearchFilters from '../components/SearchFilters'

export default {
  name: 'NewAdvert',
  components: {
    Loading,
    SearchFilters
  },
  data(){
    return{
      // v-models
      titleValue: '',
      priceValue: '',
      priceTypeValue: '',
      descriptionValue: '',
      locationValue: '',
      phoneNumberValue: '',
      filtersValue: {},

      urls: [],
      images: [],
      imageUrls: [],
      imagesPublicId: [],
      imagesToDelete: [],

      userOtherAuctions: [],

      isLoading: false,
      filtersValidationErr: false,
      validationErr: false,
      validationMsg: '',
      used: false,
      hidePhoneNumber: false,

      formKitStreetRule,
      streetsCapitalize
    }
  },
  props: {
    id: String
  },
  async created(){
    await axios.get(`${API_URL}/auctions/${this.id}`)
    .then(res => {
      const auction = res.data
      if(auction.user_id !== user.id) this.$router.push(`/`)

      this.titleValue = auction.title
      this.priceValue = auction.price.toString()
      this.priceTypeValue =  auction.priceType
      this.descriptionValue = auction.description
      this.locationValue = auction.location
      if(auction.phoneNumber.trim() === '') this.hidePhoneNumber = true
      else this.phoneNumberValue = auction.phoneNumber
      this.filtersValue = auction.filters
      this.imagesPublicId = auction.imagesPublic_id
      if(auction.images[0] !== 'https://res.cloudinary.com/dh35iucxu/image/upload/v1629822362/arst123_kebllh.jpg') {
        auction.images.forEach(image => {
          this.urls.push(image)
          this.images.push(image)
        })
      }
    })
    .catch(() => this.$router.push(`/`))

    await axios.get(`${API_URL}/user-auctions/${user.id}`)
    .then(res => {
      this.userOtherAuctions = res.data.filter(auction => auction.id !== this.id)
    })

    if(!jwt) this.$router.push('/login')
  },
  methods: {
    updateFilters(filters) {
      this.filtersValue = filters
    },
    async onFileChange(e){
      const images = Object.values(e.target.files)
      images.forEach(image => {
        const imageIsDuplicate = this.images.some(arrImage => image.name === arrImage.name)

        if(this.urls.length < 4 && !imageIsDuplicate) {
          this.images.push(image)
          this.urls.push(URL.createObjectURL(image))
        }
      })
    },
    removeImage(index){
      if(typeof(this.images[index]) === 'string'){
        this.imagesToDelete.push(this.imagesPublicId[index]);
        this.imagesPublicId.splice(index,1);
      }
      
      this.images.splice(index,1);
      this.urls.splice(index,1);
    },
    async createAuction(){
      this.$refs.filteringComponent.checkIfAllFiltersChoosen()

      if(!this.filtersValidationErr && this.checkIfAuctionIsDuplicate() === false) {
        this.used = true;
        this.isLoading = true;
        window.scrollTo(0,0);

        if(this.images.length === 0){
          const data = {
            title: this.titleValue,
            price: parseFloat(this.priceValue),
            priceType: this.priceTypeValue,
            description: this.descriptionValue,
            location: this.locationValue,
            phoneNumber: this.phoneNumberValue,
            user_id: user.id,
            images: ['https://res.cloudinary.com/dh35iucxu/image/upload/v1629822362/arst123_kebllh.jpg'],
            imagesPublic_id: [],
            filters: this.filtersValue
          }

          await axios.put(`${API_URL}/auctions/${this.id}`, data, authorization)
          .then(() => this.$router.push(`/auction/${this.id}`))
          .catch(err=>{console.log(err)})
        } else {
          console.log(this.imagesToDelete)
          this.imagesToDelete.forEach(async public_id =>{
            await axios.delete(`${API_URL}/auction-image/${this.id}/${public_id}`, authorization)
          })

          this.images.forEach(async (image, index) =>{
            if(typeof(image) === 'string') {
              this.imageUrls.push(image)
            } else {
              const img = new Image();
              const typeImg = image.type.slice(6)
              img.src = this.urls[index];

              const proportionImg = (img.width > img.height ? img.width : img.height) / 608;
              const width = img.width / proportionImg;
              const height = img.height / proportionImg;

              await convert({
                file: image,
                width,
                height,
                type: typeImg
              })
              .then(async file => {
                const data = new FormData()
                data.append('file', file)
                data.append("api_key", CLOUDINARY_API_KEY);
                data.append("api_secret", CLOUDINARY_API_SECRET);
                data.append("cloud_name", CLOUDINARY_CLOUD_NAME);
                data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                await axios.post(`https://api.cloudinary.com/v1_1/dh35iucxu/image/upload`, data)
                .then(res => {
                  this.imageUrls.push(res.data.url);
                })
              })
            }

            if(this.imageUrls.length === this.images.length && this.used){
              const data = {
                title: this.titleValue,
                price: parseFloat(this.priceValue),
                priceType: this.priceTypeValue,
                description: this.descriptionValue,
                location: this.locationValue,
                phoneNumber: this.phoneNumberValue,
                user_id: user.id,
                images: this.imageUrls,
                imagesPublic_id: this.imagesPublic_id,
                filters: this.filtersValue
              }

              await axios.put(`${API_URL}/auctions/${this.id}`, data, authorization)
              .then(() => this.$router.push(`/auction/${this.id}`))
              .catch(err=> console.log(err))
            }
          })
        }
      }
    },
    checkFiltersValidation() {
      this.$refs.filteringComponent.checkIfAllFiltersChoosen()
    },
    displayFiltersValidationError() {
      this.filtersValidationErr = true
    },
    hideFiltersValidationError() {
      this.filtersValidationErr = false
    },
    checkIfAuctionIsDuplicate() {
      this.validationErr = false

      this.userOtherAuctions.forEach(auction => {
        const otherAuctionTexts = `${auction.title} ${auction.description}`
        const thisAuctionTexts = `${this.titleValue} ${this.descriptionValue}`

        const similarityInPercentage = this.similarity(otherAuctionTexts, thisAuctionTexts) * 100

        if(similarityInPercentage >= 70) {
          this.validationErr = true
          this.validationMsg = 'To ogłoszenie jest zbyt podobne do innego z Twoich ogłoszeń.'

          setTimeout(() => {
            this.validationErr = false
          }, 5000);
        }
      })

      return this.validationErr
    },
    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
  }
}

</script>