<template>
  <Loading :isCenter="true" v-if="isLoading" />
  <div v-else>
    <div class="m-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement
        :value="`Witaj ${user.username}!`"
        :icon="'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'"
      />
      <ButtonElement
        :value="'Wyloguj się'"
        @action="logout"
        :icon="'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'"
      />
      <ButtonElement
        :value="'Zmień informacje o użytkowniku'"
        @action="() => $router.push('/dashboard/change-user-info')"
        :icon="'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'"
      />

      <div class="mt-4"></div>
      <ButtonElement
        :value="'Zobacz swoje wszystkie ogłoszenia'"
        :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
        @action="() => $router.push(`/user-auctions/${user.id}`)"
        v-if="auctionsLength > 5"
      />
      <InfoElement
        :value="`Twoje ${auctionsLength > 5 ? 'ostatnie ' : ' '}ogłoszenia`"
        :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
        v-if="auctionsLength > 0"
      />
      <InfoElement
        :value="'Nie masz ogłoszeń'"
        :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
        v-else
      />

      <Auction
        @toggle-delete-auction-layer="toggleDeleteAuctionLayer"
        @remove-auction="removeAuction"
        v-for="auction in auctions"
        :key="auction.id"
        :auction="auction"
        :likeds="[]"
      />

      <div class="mt-4"></div>
      <ButtonElement
        :value="'Zobacz wszystkie opinie na swój temat'"
        :icon="'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'"
        @action="() => $router.push(`/user-comments/${user.id}`)"
        v-if="commentsLength > 5"
      />
      <RateElement :rate="rate"/>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import API_URL from '../../API_URL'
import { jwt, user } from '../constants/const-variables'

import Auction from '../components/Auction.vue'
import Loading from '../components/Loading.vue'
import InfoElement from '../components/InfoElement.vue'
import ButtonElement from '../components/ButtonElement.vue'
import RateElement from '../components/RateElement.vue'
import Comment from '../components/comment/Comment.vue'

export default {
  name: 'Dashboard',
  components: {
    Auction,
    Loading,
    InfoElement,
    ButtonElement,
    RateElement,
    Comment
  },
  data(){
    return {
      user: user,

      auctions: [],
      auctionsLength: 0,

      comments: [],
      commentsLength: 0,
      rate: '',

      isLoading: true,
      isDeleteAuctionLayer: false,
			isMobile: document.body.clientWidth < 900,
    }
  },
  async created() {
    if(!jwt) {
      this.$router.push('/login');
    } 
    else if(user.role.name === 'Admin'){
      this.$router.push('/admin-dashboard')
    }
    else{
      if(!this.$cookies.get('isFirstTimeAfterAllowedPermission') && this.isMobile){
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: true})
        this.$cookies.set('isFirstTimeAfterAllowedPermission', 'after allowed', '10y')
      }

      await axios.get(`${API_URL}/first-six-user-auctions/${user.id}`)
      .then(res => {
        this.auctionsLength = res.data.length;
        this.auctions = res.data;

        if(this.auctionsLength > 5){
          this.auctions.pop();
        }
      })

      await axios.get(`${API_URL}/first-six-comments-in-users-profiles/${user.id}`)
      .then(res => {
        this.commentsLength = res.data.comments.length;
        this.comments = res.data.comments;
        this.rate = res.data.accucuracyRate;

        if(this.commentsLength > 5){
          this.comments.pop();
        }
      })
    }

    this.isLoading = false
  },
  methods: {
    async removeAuction(id){
      const index = this.auctions.findIndex(auction => auction.id === id);
      this.auctions.splice(index, 1);
    },
    toggleDeleteAuctionLayer(id){
      this.activeAuction_id = id;
      this.isDeleteAuctionLayer = !this.isDeleteAuctionLayer;
    },
    async logout(){
      await this.$cookies.remove('jwt');
      await this.$cookies.remove('user');

      this.$router.push('/')
      .then(() => this.$router.go())
    }
  },
}
</script>