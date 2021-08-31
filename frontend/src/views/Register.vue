<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-600 to-green-800">
    <router-link to="/" class="text-white text-5xl focus:outline-none mb-3 font-light">okki</router-link>
    <div class="flex flex-col items-center bg-white w-84 md:w-108 h-auto rounded-lg">
      <h2 class="text-2xl font-normal mt-10 text-green-600">Utwórz swoje konto</h2>
      <form @submit.prevent="register" class="p-10 w-full">
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
            v-model="usernameValue">
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
            v-model="repeatPasswordValue">
        </div>
        <input
          class="w-full h-11 text-center bg-gradient-to-r cursor-pointer from-green-700 to-green-600 text-white text-lg font-medium py-2.5 px-4 rounded-md focus:outline-none hover:opacity-95"
          @submit="register"
          type="submit"
          value="Zarejestruj"
        />
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
import API_URL from '../../API_URL'

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

        ISjwt: this.$cookies.isKey('jwt'),

        setTimeout: Function,
        setTimeoutTime: 4000,
      }
    },
    created() {
      if(this.ISjwt){
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
          Adverts: [],
          comments: [],
          likedAdverts: []
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