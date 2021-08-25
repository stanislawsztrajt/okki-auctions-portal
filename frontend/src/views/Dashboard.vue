<template>
    <div>
      <Menu />
      <Loading v-show="this.loading" />
      <div v-if="isEditAdvertLayer"></div>
      <ApproveLayer
        v-else-if="isDeleteAdvertLayer"
        @delete-advert="deleteAdvert"
        @toggle-delete-advert-layer="toggleDeleteAdvertLayer"
      />
      <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-6 p-4 text-2xl">
            Witaj!<span class="ml-2 font-bold">{{ user.username }}</span>
          </div>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <button @click="logout" class="dashboardElements button-animation-hover mt-4 p-4 text-xl text-left">
            Wyloguj się
          </button>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <router-link to="/change-user-info" class="dashboardElements mt-6 p-4 text-2xl cursor-pointer button-animation-hover">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 -mt-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Zmień informacje o użytkowniku
          </router-link>
        </div>
        <div class="flex flex-row justify-center md:justify-start">
          <div class="dashboardElements mt-4 p-4 text-2xl">Twoje ogłoszenia</div>
        </div>
        <Advert
          @toggle-edit-advert-layer="toggleEditAdvertLayer"
          @toggle-delete-advert-layer="toggleDeleteAdvertLayer"
          v-for="advert in adverts"
          :key="advert.code"
          :advert="advert"
        />
        <div class="flex flex-row justify-center mt-10 md:justify-start">
          <div v-if="!user.comments" class="dashboardElements mt-4 p-4 text-2xl">
            Nie ma komentarzy na twoim koncie
          </div>
          <div v-else class="dashboardElements mt-4 p-4 text-2xl">
            Komentarze na twoim koncie
          </div>
        </div>
        <div
          v-for="comment in user.comments"
          :key="comment"
          class="w-10/12 h-auto lg:h-62 xl:h-40 mt-6 p-4 bg-white"
        >
          <p class="text-lg font-medium">
            {{ comment.rate }}/6
            {{ comment.user.username }}
          </p>
          {{ comment.comment }}
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

import Menu from '../components/Menu.vue'
import Advert from '../components/Advert.vue'
import ApproveLayer from '../components/ApproveLayer.vue'
import Loading from '../components/Loading.vue'

import API_URL from '../../API_URL'


export default {
  name: 'Dashboard',
  components: {
    Menu,
    Advert,
    ApproveLayer,
    Loading
  },
  data(){
    return{
      ISjwt: this.$cookies.isKey('jwt'),
      jwt: this.$cookies.get('jwt') ? this.$cookies.get('jwt') : false,
      userCookie: this.$cookies.get('user') ? this.$cookies.get('user') : false,
      user: {},
      adverts: [],
      activeIdAdvert: '',
      loading: false,

      isEditAdvertLayer: false,
      isDeleteAdvertLayer: false
    }
  },
  async created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }
    this.loading = true

    await axios.get(`${API_URL}/users/${this.userCookie.id}`)
    .then(res => {
      this.user = res.data
    })
    .catch(err => {
      console.log(err)
    })
    console.log(this.user.Adverts)

    await this.user.Adverts.forEach(async advert =>{
      await axios
      .get(`${API_URL}/auctions/${advert}`)
      .then(res =>{
        this.adverts.push(res.data)
      })
    })
    this.loading = false
  },
  methods: {
    async deleteAdvert(){
      await axios.get(`${API_URL}/users/${this.userCookie.id}`)
      .then(async res =>{
        const indexId = res.data.Adverts.findIndex(el => el === this.activeIdAdvert);
        let advertsIDs = res.data.Adverts;
        advertsIDs.splice(indexId, 1);

        await axios.put(`${API_URL}/users/${this.userCookie.id}`,
        {
          Adverts: advertsIDs
        },
        {
          headers: {
            Authorization: `Bearer ${this.jwt}`
          }
        })
        .then(res => {
          console.log(res.status)
          window.location.reload()
        })
        .catch(err => console.log(err))
      })
      .catch(err =>{
        console.log(err)
      })

      await axios.delete(`${API_URL}/auctions/${this.activeIdAdvert}`,{
        headers: {
          Authorization: `Bearer ${this.jwt}`
        }
      })
      .then(res =>{
        console.log(res.status)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    toggleEditAdvertLayer(id){
      this.activeIdAdvert = id;
      this.isEditAdvertLayer = !this.isEditAdvertLayer;
      console.log(id);
    },
    toggleDeleteAdvertLayer(id){
      this.activeIdAdvert = id;
      this.isDeleteAdvertLayer = !this.isDeleteAdvertLayer;
      console.log(id);
    },
    logout(){
      this.$cookies.remove('jwt');
      this.$cookies.remove('user');
      this.$router.push('/');
    }
  },
}
</script>