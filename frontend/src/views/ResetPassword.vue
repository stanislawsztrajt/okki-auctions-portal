<template>
  <div class="w-full min-h-screen py-10 2xl:p-0 flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800">
    <router-link to="/" class="text-white text-5xl focus:outline-none mb-3 font-light">okki</router-link>
    <div class="flex flex-col items-center bg-white w-84 xs:w-108 h-auto rounded-lg">
      <h2 class="text-2xl font-normal mt-10 text-green-600">Zmień swoje hasło</h2>
      <form
        class="p-10 w-full"
        @submit.prevent="changePassword"
      >
        <div class="login-register-input-box">
          <label for="">Hasło</label>
          <div class="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            class="login-register-input"
            placeholder="Hasło"
            type="password"
            v-model="password"
            required
          >
        </div>
        <div class="login-register-input-box">
          <label for="">Powtórz hasło</label>
          <div class="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            class="login-register-input"
            placeholder="Powtórz hasło"
            type="password"
            v-model="repeatPassword"
            required
          >
        </div>
        <input
          class="w-full cursor-pointer h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="Zarejestruj"
        >
      </form>
    </div>
    <div v-if="validationError" class="validation-alert mt-16 top-0 sm:top-3/4 sm:mt-24" role="alert">
      <span class="block sm:inline">{{ validationText }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import API_URL from '../../API_URL'
import { jwt } from '../constants/const-variables'

export default {
  data(){
    return{
      password: '',
      repeatPassword: '',

      validationText: '',
      validationError: false,
      setTimeoutTime: 4000,
      setTimeout: Function,
      isUsed: false,
    }
  },
  created(){
    if(jwt) this.$router.push('/dashbord')
  },
  methods: {
    async changePassword(){
      if(this.password.length < 6){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za krótkie (co najmniej 6 znaków)'
        return this.validationError = true
      }

      if(this.password.length > 30){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za długie (maksymalnie 30 znaków)'
        return this.validationError = true
      }

      if(this.password != this.repeatPassword){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Powtórzone hasło nie zgadza sie z podanym wcześniej'
        return this.validationError = true
      }

      if(!this.isUsed){
        this.isUsed = true;
        const code = this.$route.path.replace('/reset-password?code=', '')
        
        const data = {
          code,
          password: this.password,
          passwordConfirmation: this.repeatPassword
        }
        
        await axios.post(`${API_URL}/auth/reset-password`, data)
        .then(this.$router.push('/login'))
        .catch(() =>{
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Upewnij się, że link jest prawidłowy'
          return this.validationError = true
        })
      }
    }
  }
}
</script>

<style>

</style>