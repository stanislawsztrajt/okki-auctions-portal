<template>
  <div>
    <ApproveLayer
      v-if="isDeleteReportLayer"
      @action="deleteReport"
      @toggle-layer="toggleDeleteReportLayer"
      :question="'Czy na pewno chcesz anulować to zgłoszenie?'"
    />
    <ApproveLayer
      v-if="isPublishLayer"
      @action="publish"
      @toggle-layer="togglePublishLayer"
      :question="'Czy na pewno chcesz na nowo opublikować ogłoszenie?'"
    />
    <ApproveLayer
      v-if="isDeleteAuctionLayer"
      @action="deleteAuction"
      @toggle-layer="toggleDeleteAuctionLayer"
      :question="'Czy na pewno chcesz usunąć to ogłoszenie?'"
    />
    <ApproveLayer
      v-if="isBlockUserLayer"
      @action="blockUser"
      @toggle-layer="toggleBlockUserLayer"
      :question="'Czy na pewno chcesz zablokować użytkownika?'"
    />
    <!-- :target=" isDashboardRoute ? '_blank' : '_self'" -->
    <router-link
      :to="`/auction/${auction.id}`"
      class="flex flex-col lg:flex-row w-full xl:w-10/12 border-gray-300 mt-4 text-gray-600 bg-white border"
    >
      <div
        class="h-48 sm:h-48 w-full lg:w-72 xl:w-96 bg-gray-300 bg-cover bg-no-repeat bg-center border-gray-200 border-b-2 sm:border-r-2 sm:border-b-0"
        :style="{ backgroundImage: 'url(' + auction.images[0] + ')' }"
      ></div>
      <div class="px-3 py-2 sm:px-5 sm:py-4 w-full flex flex-col justify-between">
        <div class="flex flex-row justify-between">
          <div>
            <h2 class="xs:text-xl">{{ auction.title }}</h2>
            <h3 class=" font-bold xs:text-3xl">{{ auction.price }}zł</h3>
          </div>
          <Liking
            v-if="auction.user_id !== user.id && user && user.role.name !== 'Admin'"
            :likeds="likeds"
            :auction_id="auction.id"
          />
        </div>
        <router-link to="" class="flex items-end justify-between">
          <h3 class="text-xs sm:text-sm font-normal flex flex-col mt-2">
            <span class="xs:text-lg">{{ auction.location }}</span>
            <span>{{ auction.createdAt.substring(0,10).split('-').reverse().join('.') }}</span>
          </h3>
          <div class="flex flex-col justify-center items-end">
            <div class="flex flex-col justify-end items-end text-xs xs:text-base font-light">
              <span v-if="auction.user_id === user.id" >Polubienia: {{ amountOfLikes }}</span>
              <span>Wyświetlenia: {{ amountOfViews }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </router-link>
    <div v-if="isDashboardRoute" class="w-full xl:w-10/12 bg-white border border-t-0 border-dashed border-gray-300 p-2 exsm:p-4 text-gray-700 cursor-auto">
      <div v-if="user && user.role.name === 'Admin'" class="flex flex-col lg:flex-row justify-between -mt-2">
        <div v-if="reports">
          <h2 class="lg:text-lg font-semibold">Wiadomości:</h2>
          <div
            v-for="(report, index) in auctionReports"
            :key="report.id"
            class="text-base md:text-lg"
          >
            {{ index + 1 }}. {{ report.message }}
          </div>
        </div>
        <div class="flex flex-col mt-5 lg:mt-0 lg:ml-10">
          <button
            v-if="isReportRoute"
            @click="toggleDeleteReportLayer(auction.id)"
            class="bg-green-600 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Anuluj zgłoszenie
          </button>
          <button
            v-else
            @click="togglePublishLayer(auction.id)"
            class="bg-green-500 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Opublikuj ogłoszenie
          </button>

          <button
            @click="toggleDeleteAuctionLayer(auction.id)"
            class="bg-red-500 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Usuń ogłoszenie
          </button>
          <button
            @click="toggleBlockUserLayer(auction.id)"
            class=" bg-gray-800 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Zablokuj konto
          </button>
        </div>
      </div>
      <div v-else class="flex flex-row justify-between text-gray-600">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-center text-sm xs:text-base min-h-full">
          <span :class="`mr-3 ${displayRenewButton ? 'mb-2 md:mb-0' : ''}`">
            Wygasa:
            {{ new Date(Date.parse(published_at) + additionalTimeToDelete).toISOString().substring(0,10).split('-').reverse().join('.') }}
          </span>
          <button
            v-if="displayRenewButton"
            @click="renewAuction"
            class="font-semibold border border-gray-300 py-1 md:py-2 px-2 md:px-3 rounded-full flex items-center justify-center button-animation-hover"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Przedłuż do {{ date.substring(0,10).split('-').reverse().join('.') }}
          </button>
        </div>
        <div :class="`flex justify-center items-center ${displayRenewButton ? 'flex-col sm:flex-row min-h-full' : 'flex-row'}`">
          <button @click="toggleEditAuctionLayer(auction.id)" :class="`${displayRenewButton ? 'mb-1 sm:mb-0' : ''} mr-1 h-7 w-7 xs:h-10 xs:w-10 button-animation-hover text-blue-400 hover:text-blue-600`">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button @click="toggleDeleteAuctionLayer(auction.id)" class="h-7 w-7 xs:h-10 xs:w-10 button-animation-hover text-red-400 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API_URL from '../../API_URL';
import { additionalTimeToDelete, authorization, jwt, user } from '../constants/const-variables';

import Liking from './Liking.vue';
import ApproveLayer from './ApproveLayer.vue';

export default {
  components: {
    Liking,
    ApproveLayer
  },
  props: {
    auction: Object,
    likeds: Array,
    reports: Array
  },
  data(){
    return{
      user,
      jwt,
      additionalTimeToDelete,
      date: new Date(Date.parse(new Date()) + additionalTimeToDelete).toISOString(),
      isDashboardRoute: window.location.href.includes('dashboard'),
      isReportRoute: window.location.href.includes('report'),
      isDeleteAuctionLayer: false,
      isDeleteReportLayer: false,
      isBlockUserLayer: false,
      isPublishLayer: false,
      auctionReports: [],
      amountOfLikes: 0,
      amountOfViews: 0,
      published_at: this.auction.published_at,
      displayRenew: false,
    }
  },
  created(){
    if(this.reports) this.auctionReports = this.reports.filter(report => report.auction_id.includes(this.auction.id));
    if(this.auction.user_id === user.id) this.getAuctionLikesNumber();
    this.getAuctionViewsNumber();

    this.displayRenewButton = Date.parse(this.published_at) <= (Date.parse(this.published_at) + (Date.parse(new Date()) - Date.parse(this.published_at))) - 864000000
  },
  methods: {
    removeAuction(id){
      this.$emit('remove-auction', id)
    },
    async renewAuction(){
      this.published_at += this.additionalTimeToDelete
      await axios.get(`${API_URL}/renew-auctions/${this.auction.id}`, authorization)
    },
    toggleDeleteAuctionLayer(){
      this.isDeleteAuctionLayer = !this.isDeleteAuctionLayer;
    },
    async deleteAuction(){
      this.isDeleteAuctionLayer = !this.isDeleteAuctionLayer;

      await axios.delete(`${API_URL}/auctions/${this.auction.id}`, authorization)
      this.removeAuction(this.auction.id)
    },
    toggleDeleteReportLayer(){
      this.isDeleteReportLayer = !this.isDeleteReportLayer;
    },
    async deleteReport(){
      this.isDeleteReportLayer = !this.isDeleteReportLayer;

      await axios.delete(`${API_URL}/reported-auctions/${this.auction.id}`, authorization)
      this.removeAuction(this.auction.id)
    },
    toggleBlockUserLayer(){
      this.isBlockUserLayer = !this.isBlockUserLayer;
    },
    async blockUser(){
      this.isBlockUserLayer = !this.isBlockUserLayer;

      await axios.put(`${API_URL}/users/${this.auction.user_id}`, { blocked: true }, authorization)
      await axios.get(`${API_URL}/block-user/${this.comment.user_id}`, authorization)
      this.removeAuction(this.auction.id)
    },
    togglePublishLayer(){
      this.isPublishLayer = !this.isPublishLayer;
    },
    async publish(){
      this.isPublishLayer = !this.isPublishLayer;

      await axios.get(`${API_URL}/publish-auction/${this.auction.id}`, authorization)
      // get because put respone 403 forbidden, i don't why
      this.removeAuction(this.auction.id)
    },
    async getAuctionLikesNumber () {
      await axios.get(`${API_URL}/likeds/count`, { headers: { auction_id: this.auction.id, Authorization: `Bearer ${jwt}` }})
      .then(res => this.amountOfLikes = res.data)
      .catch(err => err)
    },
    async getAuctionViewsNumber () {
      await axios.get(`${API_URL}/views-of-auctions/count`, { headers: { auction_id: this.auction.id }})
      .then(res => this.amountOfViews = res.data)
      .catch(err => err)
    },
  },
}
</script>