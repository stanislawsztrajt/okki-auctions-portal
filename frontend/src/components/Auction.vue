<template>
  <div>
    <ApproveLayer
      v-if="isDeleteReportLayer"
      @action="deleteReport"
      @toggle-layer="toggleDeleteReportLayer"
      :question="'Czy na pewno chcesz usunąć to zgłoszenie'"
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
      :question="'Czy na pewno chcesz usunąć to ogłoszenie'"
    />
    <ApproveLayer
      v-if="isBlockUserLayer"
      @action="blockUser"
      @toggle-layer="toggleBlockUserLayer"
      :question="'Czy na pewno chcesz zablokować użytkownika?'"
    />
    <router-link
      :to="`/auction/${auction.id}`"
      :target=" isDashboardRoute ? '_blank' : '_self'"
      class="flex flex-col sm:flex-row w-full xl:w-10/12 border-gray-300 my-4 text-gray-600 bg-white shadow"
    >
      <div
        style="min-width: 18rem"
        class="h-32 sm:h-48 w-full sm:w-72 bg-gray-300 bg-cover bg-no-repeat bg-center border-gray-200 border-b-2 sm:border-r-2 sm:border-b-0"
        :style="{ backgroundImage: 'url(' + auction.images[0] + ')' }"
      ></div>
      <div class="px-3 py-2 sm:px-5 sm:py-4 w-full">
        <h2 class="sm:text-2xl">
          {{ auction.title }}
        </h2>
        <h3 class="font-bold sm:text-3xl">
          {{ auction.price }}zł
        </h3>
        <h3 class="text-xs sm:text-lg">
          {{ auction.location }}
        </h3>
        <router-link to="" class="w-full flex flex-row mt-3 justify-end items-center" v-if="isDashboardRoute">
          <div v-if="user && user.role.name === 'Admin'" class="flex flex-row flex-wrap justify-end items-center">
            <button
              @click="toggleDeleteReportLayer(auction.id)"
              class="bg-green-500 auction-comment-admin-button"
              v-if="isReportRoute"
            >
              Usuń zgłoszenie
            </button>
            <button
              v-else
              @click="togglePublishLayer(auction.id)"
              class="bg-green-500 auction-comment-admin-button"
            >
              Opublikuj ogłoszenie
            </button>

            <button
              @click="toggleDeleteAuctionLayer(auction.id)"
              class=" bg-red-500 auction-comment-admin-button ml-4"
            >
              Usuń ogłoszenie
            </button>
            <button
              @click="toggleBlockUserLayer(auction.id)"
              class=" bg-red-500 auction-comment-admin-button ml-4"
            >
              Zablokuj konto
            </button>
          </div>

          <div v-else>
            <svg
              class="mr-12 sm:mr-0 -mt-6 h-6 w-6 xl:h-10 xl:w-10 text-blue-500 self-end button-animation-hover"
              @click="toggleEditAuctionLayer(auction.id)"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <svg
              class="mr-12 sm:mr-0 h-6 w-6 xl:h-10 xl:w-10 text-red-500 self-end button-animation-hover "
              @click="toggleDeleteAuctionLayer(auction.id)"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </router-link>

        <Liking
          v-if="auction.user_id !== user.id && user && user.role.name !== 'Admin'"
          :likeds="likeds"
          :auction_id="auction.id"
        />
      </div>
    </router-link>
    <div v-if="reports" class=" cursor-auto bg-white mt-2 p-4 w-full xl:w-10/12">
      <h2 class="text-xl">Wiadomości:</h2>
      <div
        v-for="(report, index) in auctionReports"
        :key="report.id"
        class="text-lg ml-2"
      >
        {{ index + 1 }} - {{ report.message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API_URL from '../../API_URL';
import { authorization, jwt, user } from '../constants/const-variables';

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
      user: user,
      jwt: jwt,
      isDashboardRoute: window.location.href.includes('dashboard'),
      isReportRoute: window.location.href.includes('report'),
      isDeleteAuctionLayer: false,
      isDeleteReportLayer: false,
      isBlockUserLayer: false,
      isPublishLayer: false,
      auctionReports: []
    }
  },
  created(){
    if(this.reports) this.auctionReports = this.reports.filter(report => report.auction_id.includes(this.auction.id));
    if(this.auction.user_id === user.id) this.getAuctionLikesNumber();
    this.getAuctionViewsNumber();
  },
  methods: {
    removeAuction(id){
      this.$emit('remove-auction', id)
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
      await axios.get(`${API_URL}/likeds/count`, { headers: { auction_id: this.auction.id, user_id: user.id, Authorization: `Bearer ${jwt}` }})
      .then(res => {
        console.log(this.auction.title, "- liczba polubien:", res.data)
      })
      .catch(err => err)
    },
    async getAuctionViewsNumber () {
      await axios.get(`${API_URL}/views-of-auctions/count`, { headers: { auction_id: this.auction.id }})
      .then(res => {
        console.log(this.auction.title, "- liczba wyswietlen:", res.data)
      })
      .catch(err => err)
    },
  },
}
</script>