<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <router-link
      to='/'
      class="absolute top-2 right-2 mr-1 cursor-pointer text-green-600 transform hover:rotate-90 transition duration-150">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </router-link>
    <div class="flex flex-col items-center justify-center bg-gray-300 py-6 px-4 w-96 h-96 border-l-8 border-green-600 box-border">
      <h1 class="text-4xl font-semibold mb-4 text-green-600">Logowanie</h1>

      <input
        class="login-register-input"
        placeholder="Adres email"
        type="mail"
        v-model="mailValue">
      <input
        class="login-register-input"
        placeholder="Hasło"
        type="password"
        v-model="passwordValue">

      <div v-if="loginError" class="validation-alert" role="alert">
        <span class="block sm:inline">Podany login i/lub hasło są nieprawidłowe</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
      </div>

      <button class="text-gray-500 font-xs hover:text-gray-400 focus:outline-none transition duration-150">Zapomniałeś hasła?</button>

      <button
        class="w-10/12 h-10 bg-green-600 text-white mt-2 rounded-lg font-medium focus:outline-none hover:bg-green-700 transition duration-150"
        @click="checkLogin">
        Zaloguj
      </button>

      <router-link
        to='/register'
        class="flex justify-center items-center w-10/12 h-10 bg-transparent text-gray-500 border-2 border-gray-400 mt-3 rounded-lg font-medium focus:outline-none hover:bg-gray-400 hover:text-gray-300 transition duration-150">
        Rejestracja
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data(){
      return{
        mailValue: '',
        passwordValue: '',
        infoUser: '',
        jwt: this.$cookies.isKey('jwt'),

        loginError: false,

        endPoint: 'https://okki-api.herokuapp.com',

        setTimeoutTime: 4000
      }
    },
    created() {
      if(this.jwt){
          this.$router.push('/dashboard')
      }
    },
    methods: {
      async checkLogin(){

        await axios.post(`${this.endPoint}/auth/local`, {
          identifier: this.mailValue,
          password: this.passwordValue
        })

        .then(async res=>{
          this.infoUser = res.data
          console.log(res.data.user)

          await this.$cookies.set('jwt',this.infoUser.jwt, '7d')
          await this.$cookies.set('user',this.infoUser.user, '7d')

          this.$router.push('/dashboard')
        })
        .catch(() =>{
          setTimeout(() =>{
            this.loginError = false
          },this.setTimeoutTime)
          return this.loginError = true
        })

        // Ta czesc kodu odpowiada za uzyskiwanie informacji z bazy danych z uwzglednieniem tego ze trzeba byc zalogowanym aby moc uzyskac dostep
        // await axios.get(`${this.endPoint}/adverts`,{
        //     headers: {
        //         Authorization: `Bearer ${this.infoUser.jwt}`
        //     }
        // })
        // .then(res=>{
        //     console.log(res)
        // })
        // .catch(()=>{
        //     console.log('you are not login')
        // })
        },
    }
  }
</script>