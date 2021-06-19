<template>
    <div>
        <label for="">Wyswietlana nazwa</label>
        <input type="text" v-model="usernameValue">
        <label for="" >e-mail</label>
        <input type="mail" v-model="emailValue">
        <label for="">password</label>
        <input type="password" v-model="passwordValue">
        <label for="">repeat password</label>
        <input type="password" v-model="passwordValueRepeat">
        <button @click="register">Register</button>
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