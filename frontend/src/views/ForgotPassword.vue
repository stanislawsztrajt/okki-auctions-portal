<template>
  <div class="w-full min-h-screen py-10 2xl:p-0 flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800">
    <router-link to="/" class="text-white text-5xl mb-4 font-light">okki</router-link>
    
    <div class="flex flex-col items-center bg-white w-11/12 xs:w-108 h-auto rounded-lg">
      <div class="h-64 text-xl flex flex-col items-center justify-center" v-if="isSent">
        <span class="text-center">
          Mail z linkiem został wysłany do {{ email }} <br>
          kliknij w link i zresetuj swoje hasło
        </span>
        <br>
        <router-link to="/" class="font-bold">Wróć na stronę główną</router-link>
      </div>
      <div v-else class="flex flex-col items-center w-full">
        <h2 class="text-2xl font-normal mt-10 text-green-600">Tutaj zresetujesz hasło</h2>
        <form @submit.prevent="sendMailWithPassword" class="p-10 w-full">
          <div class="login-register-input-box">
            <label for="">Email</label>
            <div class="login-register-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              class="login-register-input"
              placeholder="Nazwa użytkownika lub email"
              type="email"
              v-model="email">
          </div>
          <input
            class="w-full h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white cursor-pointer text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
            type="submit"
            value="Wyślij mail"
          >
        </form>
      </div>
    </div>
    <div v-if="isError" class="validation-alert absolute bottom-0 mb-2 sm:mb-20" role="alert">
      <span class="block sm:inline">Konto z podanym emailem nie istnieje</span>
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
      email: '',

      isSent: false,
      isError: false,
      isUsed: false
    }
  },
  created(){
    if(jwt) this.$router.push('/dashbord')
  },
  methods: {
    async sendMailWithPassword(){
      if(!this.isUsed){
        this.isUsed = true;
        await axios.post(`${API_URL}/auth/forgot-password`, { email: this.email })
        .then(() => {
          this.isError = false;
          this.isSent = true;
        })
        .catch(() => {
          this.isError = true;
          setTimeout(() =>{
            this.isError = false;
          },4000)
        })
      }
    }
  }
}
</script>

<style>

</style>