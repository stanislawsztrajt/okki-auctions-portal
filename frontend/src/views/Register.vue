<template>
  <div class="w-full min-h-screen py-10 2xl:p-0 flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800">
    <router-link to="/" class="text-white text-5xl focus:outline-none mb-3 font-light">okki</router-link>
    <div class="flex flex-col items-center bg-white w-11/12 xs:w-108 h-auto rounded-lg">
      <h2 class="text-2xl font-normal mt-10 text-green-600">Utwórz swoje konto</h2>
      <form
        class="p-10 w-full"
        @submit.prevent="register"
      >
        <div class="login-register-input-box">
          <label for="">Nazwa użytkownika</label>
          <div class="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            class="login-register-input"
            placeholder="Nazwa użytkownika"
            type="text"
            required
            v-model="usernameValue"
          >
        </div>
        <div class="login-register-input-box">
          <label for="">Adres email</label>
          <div class="login-register-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            class="login-register-input"
            placeholder="Adres email"
            type="email"
            required
            v-model="emailValue"
          >
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
            required
            v-model="passwordValue"
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
            required
            v-model="repeatPasswordValue"
          >
        </div>
        <div class="text-xs pb-4">
          Klikając przycisk rejestracji, potwierdzasz przeczytanie i przyjmujesz do wiadomości wytyczne przedstawione w
          <router-link class="rodo-link button-animation-hover" to="/terms-of-use">warunkach korzystania z usług</router-link> oraz w
          <router-link class="rodo-link button-animation-hover" to="/privacy-policy">informacji o polityce prywatności.</router-link>
        </div>
        <input
          class="w-full cursor-pointer h-11 flex justify-center items-center bg-gradient-to-r from-green-700 to-green-600 text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          type="submit"
          value="Zarejestruj"
        >
      </form>
    </div>
    <div v-if="validationError" class="validation-alert absolute bottom-0 mb-2 sm:mb-20" role="alert">
      <span class="block sm:inline">{{ validationText }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      </span>
    </div>
  </div>
</template>

<script>
import API_URL from '../../API_URL'
import { jwt } from '../constants/const-variables'

export default {
    name: 'Register',
    data(){
      return{
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        repeatPasswordValue: '',

        validationText: '',
        validationError: false,

        setTimeout: Function,
        setTimeoutTime: 4000,
      }
    },
    created() {
      if(jwt){
        this.$router.push('/dashboard')
      }
    },
    methods: {
      async register(){
        clearTimeout(this.setTimeout)

        if(!this.usernameValue || !this.emailValue || !this.passwordValue || !this.repeatPasswordValue){
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Uzupełnij puste pola'
          return this.validationError = true
        }

        if(this.usernameValue.length < 3){
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Nazwa użytkownika jest za krótka (co najmniej 3 znaki)'
          return this.validationError = true
        }

        if(this.usernameValue.length > 22){
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Nazwa użytkownika jest zbyt długa (maksymalnie 20 znaki)'
          return this.validationError = true
        }

        if(this.emailValue.length < 6){
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Email jest zbyt krótka (co najmniej 6 znaki)'
          return this.validationError = true
        }

        if(this.emailValue.length > 30){
          this.setTimeout = setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Email jest zbyt długa (maksymalnie 30 znaki)'
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

        const user = {
          username: this.usernameValue,
          email: this.emailValue,
          password: this.passwordValue,
        }

        const registerResponse = await fetch(`${API_URL}/auth/local/register`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        const registerResponseJSON = await registerResponse.json();

        try{
          if(registerResponseJSON.message[0].messages[0].message == 'Email already taken'){
            setTimeout(()=>{
              this.validationError = false
            },this.setTimeoutTime)
            this.validationText = 'Nazwa użytkownika jest zajęta'
            return this.validationError = true;
          }

          else{
            setTimeout(()=>{
              this.validationError = false
            },this.setTimeoutTime)
            this.validationText = 'Email jest zajęty'
            return this.validationError = true;
          }
        } catch(err){
          this.$router.push('/login')
        }
      }
    }


}
</script>