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
      <form class="ml-8">
        <input
          class="login-register-input"
          placeholder="Nazwa użytkownika"
          type="text"
          v-model="usernameValue">

        <input
          class="login-register-input"
          placeholder="Adres email"
          type="email"
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
          class="w-10/12 h-10 bg-green-600 text-white mt-5 rounded-lg font-medium  hover:bg-green-700 transition duration-150"
          @click="register">
          Zarejestruj
        </button>
      </form>
      <div v-if="validationError" class="validation-alert" role="alert">
        <span class="block sm:inline">{{ validationText }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
      </div>

    </div>
  </div>
</template>

<script>

export default {
    name: 'Register',
    data(){
      return{
        usernameValue: '',
        emailValue: '',
        passwordValue: '',
        passwordValueRepeat: '',

        validationText: '',
        validationError: false,

        ISjwt: this.$cookies.isKey('jwt'),

        endPoint: 'https://okki-api.herokuapp.com',

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
        if(!this.usernameValue || !this.emailValue || !this.passwordValue || !this.passwordValueRepeat){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Uzupełnij puste pola'
          return this.validationError = true
        }

        if(this.usernameValue.length < 4){
          this.usernameLengthErrorText = ''
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Nazwa użytkownika jest za krótka (co najmniej 4 znaki)'
          return this.validationError = true
        }

        if(this.usernameValue.length > 20){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Nazwa użytkownika jest zbyt długa (maksymalnie 20 znaki)'
          return this.validationError = true
        }

        if(this.passwordValue.length < 6){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Hasło jest za krótkie (co najmniej 6 znaków)'
          return this.validationError = true
        }

        if(this.passwordValue.length > 20){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Hasło jest za długie (maksymalnie 20 znaków)'
          return this.validationError = true
        }

        if(this.passwordValue != this.passwordValueRepeat){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Powtórzone hasło nie zgadza sie z podanym wcześniej'
          return this.validationError = true
        }


        const user = {
            username: this.usernameValue,
            email: this.emailValue,
            password: this.passwordValue
        }

        const registerResponse = await fetch(`${this.endPoint}/auth/local/register`, {
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

          if(registerResponseJSON.message[0].messages[0].message == 'Email is already taken.'){
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