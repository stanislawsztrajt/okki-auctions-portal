<template>
  <div class="w-full min-h-screen py-10 2xl:p-0 flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800">
    <router-link to="/" class="text-white text-5xl mb-4 font-light">okki</router-link>
    <div class="flex flex-col items-center bg-white w-11/12 xs:w-108 h-auto rounded-lg">
      <h2 class="text-2xl font-normal mt-10 text-green-600">Zaloguj się na konto</h2>
      <form @submit.prevent="login" class="p-10 w-full">
        <div class="login-register-input-box">
          <label for="">Nazwa użytkownika lub adres email</label>
          <div class="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            class="login-register-input"
            placeholder="Nazwa użytkownika lub email"
            type="text"
            v-model="emailValue">
        </div>
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
            v-model="passwordValue">
        </div>
        <input
          class="w-full h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white cursor-pointer text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="Zaloguj się"
        >
      </form>
      <router-link
        to='/register'
        class="w-full flex justify-center items-center pb-6 p-5 bg-gray-100 text-gray-600 text-lg border-t border-gray-300 rounded-b-lg">
        Nowy na okki? <span class="text-green-600 ml-2"> Zarejestruj się</span>
      </router-link>
    </div>
    <router-link to="/forgot-password" class="text-white font-xs mt-4 underline hover:opacity-80 transition duration-150">Zapomniałeś hasła?</router-link>
    <div v-if="loginError" class="validation-alert absolute bottom-0 mb-2 sm:mb-20" role="alert">
      <span class="block sm:inline">Podany email i/lub hasło są nieprawidłowe</span>
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
    name: 'Login',
    data(){
      return{
        emailValue: '',
        passwordValue: '',

        loginError: false,

        setTimeout: Function,
        setTimeoutTime: 4000
      }
    },
    async created() {
      if(jwt) this.$router.push('/dashboard')
    },
    methods: {
      async login(){
        clearTimeout(this.setTimeout)

        await axios.post(`${API_URL}/auth/local`, {
          identifier: this.emailValue,
          password: this.passwordValue
        })
        .then(async res =>{
          await this.$cookies.set('jwt', res.data.jwt, '7d')
          await this.$cookies.set('user', res.data.user, '7d')

          this.$router.go(0)
          return this.$router.push('/dashboard')
        })
        .catch(() =>{
          this.setTimeout = setTimeout(() =>{
            this.loginError = false
          },this.setTimeoutTime)
          return this.loginError = true
        })
      },
    }
  }
</script>