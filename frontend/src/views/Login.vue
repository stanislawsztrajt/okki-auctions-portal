<template>
    <div>
        <label for="">e-mail</label>
        <br>
        <input type="mail" v-model="mailValue">
        <br>
        <label for="">password</label>
        <br>
        <input type="password" v-model="passwordValue">
        <br>
        <button @click="checkLogin">Login</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data(){
        return{
            mailValue: 'newuser@newuser.com',
            passwordValue: 'newuser',
            infoUser: '',
            jwt: this.$cookies.isKey('jwt'),

            endPoint: 'https://okki-api.herokuapp.com'
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

                // this.$router.push('/dashboard')
            })
            .catch(() =>{
                console.log('nie znaleziono takiego uzytkownika w bazie danych')
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