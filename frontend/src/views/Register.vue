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
      <h1 class="text-4xl font-semibold mb-4 text-green-600">Rejestracja</h1>
      <input 
        class="login-register-input"
        placeholder="Nazwa użytkownika"
        type="text" 
        v-model="usernameValue">
      <input 
        class="login-register-input"
        placeholder="Adres email" 
        type="mail" 
        v-model="emailValue">
      <input 
        class="login-register-input"
        placeholder="Hasło" 
        type="password" 
        v-model="passwordValue">
      <input 
        class="login-register-input"
        placeholder="Powtórz hasło" 
        type="password" 
        v-model="passwordValueRepeat">
      <button 
        class="w-10/12 h-10 bg-green-600 text-white mt-5 rounded-lg font-medium focus:outline-none hover:bg-green-700 transition duration-150"
        @click="register">
        Zarejestruj
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data(){
        return{
            usernameValue: '',
            emailValue: '',
            passwordValue: '',
            passwordValueRepeat: '',

            ISjwt: this.$cookies.isKey('jwt'),

            endPoint: 'https://okki-api.herokuapp.com'
        }
    },
    created() {
        if(this.ISjwt){
            this.$router.push('/dashboard')
        }
    },
    methods: {
        async register(){
            await axios.post(`${this.endPoint}/auth/local/register`, {
                username: this.usernameValue,
                email: this.emailValue,
                password: this.passwordValue
            })
            .then(res =>{
                console.log(res)
                this.$router.push('/login')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }


}
</script>