<template>
    <div>
        Username: {{ user.username }}
        <button @click="logout">logout</button>
    </div>
</template>

<script>
// import axios from 'axios'


export default {
    name: 'Dashboard',
    data(){
        return{
            ISjwt: this.$cookies.isKey('jwt'),
            jwt: this.$cookies.get('jwt'),
            user: this.$cookies.get('user'),

            endPoint: 'https://okki-api.herokuapp.com/'
        }
    },
    async created() {
        console.log(this.jwt)
        console.log(this.user)


        if(!this.ISjwt){
            this.$router.push('/login')
        }
    },
    methods: {
        logout(){
            this.$cookies.remove('jwt')
            this.$cookies.remove('user')
            this.$router.push('/login')
        }
    },

}
</script>