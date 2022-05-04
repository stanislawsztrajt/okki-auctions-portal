<template>
  <div>
    <ApproveLayer
      v-if="isDeleteAccountLayer"
      @action="deleteAccount"
      @toggle-layer="toggleDeleteAccountLayer"
      :question="'Czy na pewno chcesz usunąć konto?'"
    />
    <Loading :isCenter="true" v-if="isLoading"/>
    <div v-else class="w-full h-screen">
      <div class="h-full">
        <form
            class="w-full h-5/6 flex flex-col items-center justify-center px-4"
            @submit.prevent="checkPassword"
            v-if="!isGivenPassword"
          >
            <div class="flex flex-col w-full lg:w-1/2 xl:w-1/3 bg-green-600 rounded-xl shadow p-7 text-white">
              <label for="" class="text-xl exsm:text-2xl lg:text-4xl">
                Podaj obecne hasło
              </label>
              <div class="text-green-900 relative top-10 left-3 w-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                name="password"
                type="password"
                class="text-black mt-6 login-register-input "
                v-model="checkPasswordValue"
              >
            </div>
            <input
              type="submit"
              value="Sprawdź"
              class="new-auction-button mt-8 cursor-pointer"
              @submit="checkPassword"
            >
        </form>
        <div v-else class="flex flex-col items-center px-4 mt-6 xl:mt-12 text-white">
          <form @submit.prevent="saveEditedUsername" class="new-auction-main-box w-full lg:w-3/4 xl:w-1/2">
            <label for="" class="text-lg exsm:text-xl lg:text-2xl">
              Podaj nową nazwa użtkownika
            </label>
            <div class="text-green-600 relative top-10 left-3 w-5 -mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              class="login-register-input"
              maxlength="30"
              v-model="usernameValue"
            >
            <input
              value="Zapisz zmiany"
              type="submit"
              class="change-user-info-button button-animation-hover"
              @submit.prevent="saveEditedUsername"
            />
          </form>

          <form @submit.prevent="saveEditedEmail" class="new-auction-main-box  w-full lg:w-3/4 xl:w-1/2">
            <label for="" class="text-lg exsm:text-xl lg:text-2xl">
              Podaj nowy email
            </label>
            <div class="text-green-600 relative top-10 left-3 w-5 -mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              class="login-register-input"
              type="email"
              v-model="emailValue"
            >
            <input
              type="submit"
              class="change-user-info-button button-animation-hover"
              value="Zapisz zmiany"
              maxlength="30"
              @submit.prevent="saveEditedEmail"
            />
          </form>

          <form @submit.prevent="saveEditedPassword" class="new-auction-main-box w-full lg:w-3/4 xl:w-1/2">
            <label for="" class="text-lg exsm:text-xl lg:text-2xl">
              Podaj nowe hasło
            </label>
            <div class="text-green-600 relative top-10 left-3 w-5 -mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              class="login-register-input"
              type="password"
              maxlength="30"
              v-model="passwordValue"
            >
            <label for="" class="text-lg exsm:text-xl lg:text-2xl">
              Powtórz nowe hasło
            </label>
            <div class="text-green-600 relative top-10 left-3 w-5 -mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              class="login-register-input"
              type="password"
              maxlength="30"
              v-model="repeatPasswordValue"
            >
            <input
              value="Zapisz zmiany"
              type="submit"
              class="change-user-info-button button-animation-hover"
              @submit.prevent="saveEditedPassword"
            />
          </form>
          <button 
            @click="toggleDeleteAccountLayer" 
            style="box-shadow: 0 0 2em rgb(127, 29, 29);"
            class="fixed z-50 bottom-0 right-0 mb-2 mr-2 sm:mb-4 sm:mr-4 md:mb-10 md:mr-10 bg-red-900 text-white text-lg px-8 py-3 font-semibold flex justify-center items-center rounded-lg hover:bg-red-800 transition duration-150"
          >
            Usuń konto
            <svg class="h-5 w-5 ml-3"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M17 9l4 4m0 -4l-4 4" /></svg>
          </button>
        </div>
        <div class="absolute w-full bottom-0 mb-4">
          <div
            v-if="validationError"
            class=" bg-red-100 text-red-900 rounded-b text-teal-900 px-4 py-3 shadow-md block w-3/4 md:w-1/3 m-auto"
            role="alert"
          >
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-bold">
                  {{ validationText }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="responseAlert"
            class=" bg-green-100 mt-4 text-green-900 rounded-b text-teal-900 px-4 py-3 shadow-md block w-3/4 md:w-1/3 m-auto"
            role="alert"
          >
            <div class="flex">
              <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-bold">
                  {{ responseText }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie';

import { authorization, jwt, user } from '../constants/const-variables'
import API_URL from '../../API_URL'

import ApproveLayer from '../components/ApproveLayer'
import Loading from '../components/Loading'

export default {
  components: {
    ApproveLayer,
    Loading
  },

  data(){
    return{
      usernameValue: user.username,
      emailValue: user.email,
      passwordValue: '',
      repeatPasswordValue: '',

      checkPasswordValue: '',
      isGivenPassword: false,

      validationError: false,
      validationText: '',

      responseAlert: false,
      responseText: '',

      setTimeout: Function,
      setTimeoutTime: 4000,

      isLoading: false,
      isDeleteAccountLayer: false
    }
  },
  async created(){
    if(!jwt) this.$router.push('/login')
  },
  methods: {
    async checkPassword(){
      clearTimeout(this.setTimeout)

      await axios.post(`${API_URL}/auth/local`, {
        identifier: user.email,
        password: this.checkPasswordValue
      })
      .then(() => {
        this.isGivenPassword = true;
        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = 'Sprawdzanie powoiodło sie !'
        this.validationError = false
        return this.responseAlert = true
      })
      .catch(() =>{
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Podałeś nieprawidłowe hasło'
        return this.validationError = true
      })
    },
    async saveEditedUsername(){
      clearTimeout(this.setTimeout)
      if(this.usernameValue === Cookies.get('user').username) return

      if(!this.usernameValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pole'
        return this.validationError = true
      }

      if(this.usernameValue.length < 4){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika jest za krótka (co najmniej 4 znaki)'
        return this.validationError = true
      }

      if(this.usernameValue.length > 30){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika jest zbyt długa (maksymalnie 30 znaki)'
        return this.validationError = true
      }

      this.isLoading = true;

      await axios.put(`${API_URL}/users/me`, { username: this.usernameValue }, authorization)
      .then(async res => {
        this.isLoading = false
        const jwtCopy = jwt;

        await this.$cookies.remove('user');
        await this.$cookies.remove('jwt');
        await this.$cookies.set('user', res.data, '7d')
        await this.$cookies.set('jwt', jwtCopy, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono nazwe użytkownika.`
        return this.responseAlert = true
      })
      .catch(() =>{
        this.isLoading = false
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika jest zajęta.'
        return this.validationError = true
      })
    },
    async saveEditedEmail(){
      clearTimeout(this.setTimeout)
      if(this.emailValue === Cookies.get('user').email) return

      if(!this.emailValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pole.'
        return this.validationError = true
      }

      this.isLoading = true;

      await axios.put(`${API_URL}/users/me`, { email: this.emailValue }, authorization)
      .then(async res => {
        this.isLoading = false;
        const jwtCopy = jwt;

        await this.$cookies.remove('user');
        await this.$cookies.remove('jwt');
        await this.$cookies.set('user', res.data, '7d')
        await this.$cookies.set('jwt', jwtCopy, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono email.`
        return this.responseAlert = true
      })
      .catch(err => {
        this.isLoading = false
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Email jest zajęty'
        console.log(err)
        return this.validationError = true
      })
    },
    async saveEditedPassword(){
      clearTimeout(this.setTimeout)

      if(!this.passwordValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pole'
        return this.validationError = true
      }

      if(this.passwordValue.length < 6){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za krótkie (co najmniej 6 znaków)'
        return this.validationError = true
      }

      if(this.passwordValue.length > 30){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za długie (maksymalnie 30 znaków)'
        return this.validationError = true
      }

      if(this.passwordValue != this.repeatPasswordValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Powtórzone hasło nie zgadza sie z podanym wcześniej'
        return this.validationError = true
      }

      this.isLoading = true;

      await axios.put(`${API_URL}/users/me`, {
        password: this.passwordValue
      },authorization)
      .then(async res => {
        this.isLoading = false;
        const jwtCopy = jwt;

        await this.$cookies.remove('user');
        await this.$cookies.remove('jwt');
        await this.$cookies.set('user', res.data, '7d')
        await this.$cookies.set('jwt', jwtCopy, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono hasło`
        return this.responseAlert = true
      })
    },
    toggleDeleteAccountLayer(){
      this.isDeleteAccountLayer = !this.isDeleteAccountLayer;
    },
    deleteAccount(){
      axios.delete(`${API_URL}/account/${user.id}`, authorization)
      .then(() =>{
        this.$swal({ icon: "success", title: 'Konto zostało usunięte!'});
        this.$cookies.remove('jwt');
        this.$cookies.remove('user');
        
        setTimeout(() => {
          this.$router.push('/');
          this.$router.go();
        }, 2000)
      })
    } 
  }
}
</script>

<style scoped>
  .change-user-info-button{
    @apply mt-2 px-3 py-2 xl:p-2 border border-white bg-white text-green-600 rounded xl:w-64 font-medium text-sm md:text-base xl:text-lg text-center cursor-pointer
  }
</style>