<template>
    <div>
        <label for="">e-mail</label>
        <input type="mail" v-model="mailValue">
        <label for="">password</label>
        <input type="password" v-model="passwordValue">
        <button @click="checkLogin">Login</button>
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

            endPoint: 'https://okki-api.herokuapp.com/'
        }
    },
    methods: {
        checkLogin(){
            axios.post(this.endPoint + 'login', {
                mail: this.mailValue,
                password: this.passwordValue
            })
        }
    }
}
</script>