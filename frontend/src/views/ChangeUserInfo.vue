<template>
  <div class=" h-screen">
    <Menu />
    <form
      class="h-2/3 flex flex-col items-center xl:items-start justify-center xl:ml-96 xl:mt-14"
      @submit.prevent="checkPassword"
      v-if="!isGivenPassword"
    >
      <div class="flex flex-col w-2/3 bg-green-600 rounded-xl shadow p-7 mb-6 text-white">
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
        class="new-advert-button cursor-pointer"
        @submit="checkPassword"
      >
    </form>
    <div v-else class="flex flex-col items-center mt-12 text-white">
      <form @submit.prevent="saveEditedUsername" class="new-adverst-main-box w-2/3 lg:w-1/2">
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
          class="change-user-info-button"
          @submit.prevent="saveEditedUsername"
        />
      </form>

      <form @submit.prevent="saveEditedEmail" class="new-adverst-main-box w-2/3 lg:w-1/2">
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
          class="change-user-info-button"
          value="Zapisz zmiany"
          maxlength="30"
          @submit.prevent="saveEditedEmail"
        />
      </form>

      <form @submit.prevent="saveEditedPassword" class="new-adverst-main-box w-2/3 lg:w-1/2">
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
          class="change-user-info-button"
          @submit.prevent="saveEditedPassword"
        />
      </form>
    </div>
    <div
      v-if="validationError"
      class=" bg-red-100 text-red-900 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md block w-2/3 md:w-1/3 m-auto"
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
      class=" bg-green-100 text-green-900 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md block w-1/3 m-auto"
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
</template>

<script>
import axios from 'axios'
import API_URL from '../../API_URL'
import Menu from '../components/Menu'

export default {
  components: {
    Menu
  },
  data(){
    return{
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      ISjwt: this.$cookies.isKey('jwt'),
      jwt: this.$cookies.get('jwt'),

      user: {},

      usernameValue: this.$cookies.get('user').username,
      emailValue: this.$cookies.get('user').email,
      passwordValue: '',
      repeatPasswordValue: '',

      checkPasswordValue: '',
      isGivenPassword: false,

      validationError: false,
      validationText: '',

      responseAlert: false,
      responseText: '',

      setTimeout: Function,
      setTimeoutTime: 4000
    }
  },
  async created(){
    if(!this.ISjwt){
      this.$router.push('/login')
    }

    await axios.get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res => this.user = res.data)
    .catch(err => console.log(err))
  },
  methods: {
    async checkPassword(){
      clearTimeout(this.setTimeout)

      await axios.post(`${API_URL}/auth/local`, {
        identifier: this.userCookie.email,
        password: this.checkPasswordValue
      })
      .then(res => {
        console.log(res)
        this.isGivenPassword = true;
        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = 'Sprawdzanie powoiodło sie !'
        this.validationError = false
        return this.responseAlert = true
      })
      .catch((err) =>{
        console.log(err)
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Podałeś nieprawidłowe hasło'
        return this.validationError = true
      })
    },
    async saveEditedUsername(){
      clearTimeout(this.setTimeout)
      if(this.usernameValue === this.userCookie.username) return

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

      await axios.put(`${API_URL}/users/${this.userCookie.id}`, {
        username: this.usernameValue
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(async res => {
        this.user = res.data;
        const username = this.userCookie.username;

        await this.$cookies.remove('user');
        await this.$cookies.set('user',this.user, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono nazwe użytkownika z ${username} na ${res.data.username}`
        return this.responseAlert = true
      })
      .catch(err =>{
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika zajęta'
        console.log(err)
        return this.validationError = true
      })
    },
    async saveEditedEmail(){
      clearTimeout(this.setTimeout)
      if(this.emailValue === this.userCookie.email) return

      if(!this.emailValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pole'
        return this.validationError = true
      }

      await axios.put(`${API_URL}/users/${this.userCookie.id}`, {
        email: this.emailValue
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(async res => {
        this.user = res.data;
        const email = this.userCookie.email;

        await this.$cookies.remove('user');
        await this.$cookies.set('user',this.user, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono email z ${email} na ${res.data.email}`
        return this.responseAlert = true
      })
      .catch(err => {
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

      await axios.put(`${API_URL}/users/${this.userCookie.id}`, {
        password: this.passwordValue
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(async res => {
        this.user = res.data;
        const password = this.userCookie.password;

        await this.$cookies.remove('user');
        await this.$cookies.set('user',this.user, '7d')

        this.setTimeout = setTimeout(()=>{
          this.responseAlert = false
        },this.setTimeoutTime)
        this.responseText = `Pomyślnie zmieniono hasło z ${password} na ${res.data.password}`
        return this.responseAlert = true
      })
      .catch(err => console.log(err))
    }
  }
}
</script>