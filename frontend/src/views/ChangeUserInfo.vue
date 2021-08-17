<template>
  <div>
    <label for="">Zmień nazwe</label>
    <input type="email" v-model="nameValue">
    <label for="">Zmień e-mail</label>
    <input type="email" v-model="emailValue">
    <label for="">Zmień hasło</label>
    <input type="password" v-model="passwordValue">
    <label for="">Powtórz hasło</label>
    <input type="password" v-model="repeatPasswordValue">
    <button>Zapisz zmiany</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nameValue: '',
      emailValue: '',
      passwordValue: '',
      repeatPasswordValue: ''
    }
  },
  created(){

  },
  methods: {

  }
}
</script>

<style>

</style>