<template>
    <div>
      <Menu />
      <nav>
          <div>ogłoszenia</div>
          <div>Wiadomosci</div>
      </nav>
      <div>
        Username: {{ user.username }}
      </div>
      <div>
        <div
          v-for="advert in adverts"
          :key="advert.id"
        >
          {{ advert.img }}
          {{ advert.title }}
          {{ advert.price }}
          {{ advert.location }}
          {{ advert.description }}
          <img class="h-48" :src="`${advert.images[0]}`" alt="">
        </div>
      </div>
      <button @click="logout">logout</button>
    </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'


export default {
    name: 'Dashboard',
    components: {
        Menu
    },
    data(){
        return{
            ISjwt: this.$cookies.isKey('jwt'),
            jwt: this.$cookies.get('jwt'),
            userCookie: this.$cookies.get('user'),
            user: {},
            adverts: [],

            API_URL: 'https://okki-api.herokuapp.com'
        }
    },
    async created() {
        if(!this.ISjwt){
            this.$router.push('/login')
        }

        await axios.get(`${this.API_URL}/users/${this.userCookie.id}`)
        .then(res => {
            this.user = res.data
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        console.log(this.user.Adverts)

        await this.user.Adverts.forEach(async advert =>{
            await axios
            .get(`${this.API_URL}/adverts/${advert}`)
            .then(res =>{
                this.adverts.push(res.data)
            })
        })

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