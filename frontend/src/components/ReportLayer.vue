<template>
  <div class="mt-4">
    <Loading v-if="isLoading"/>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">
                  {{  isAuctionRoute ? 'Dlaczego zgłaszasz to ogloszenie ?': 'Dlaczego zgłaszasz ten komentarz ?'  }}
                </h3>
                <div class="mt-2">
                  <textarea placeholder="Tutaj wpisz swoją wiadomość" v-model="message" maxlength="500" class="text-gray-600 p-2 w-full h-36 focus:outline-none border rounded-md resize-none bg-gray-100 ">
                  </textarea>
                </div>
                <div v-show="isValidation" class=" text-red-700 " role="alert">
                  <span  class="block sm:inline">{{ validationText }}</span>
                </div>
                <div v-show="isSent" class=" text-green-700 " role="alert">
                  <span  class="block sm:inline">Twoje zgłoszenie zostało wysłane!</span>
                </div>
                <div v-show="!isValidation && !isSent" role="alert">
                  <span class="block sm:inline">&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="report" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Zgłoś</button>
            <button @click="toggleReportLayer" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Anuluj</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import Loading from './Loading.vue'
import API_URL from '../../API_URL'
import { authorization, user } from '../constants/const-variables'

export default {
  components: {
    Loading
  },
  data(){
    return{
      message: '',
      validationText: '',
      isValidation: false,
      isSent: false,
      isLoading: false,

      isAuctionRoute: window.location.href.includes('auction')
    }
  },
  created(){
      fetch('https://api.ipify.org?format=json')
      .then(res=>console.log(res))
  },
  props: {
    id: String
  },
  methods: {
    toggleReportLayer(){
      clearTimeout(this.setTimeoutFunction)
      this.$emit('toggle-report-layer')
    },
    async report(){
      clearTimeout(this.setTimeoutFunction)

      if(this.message.length < 20) {
        this.isValidation = true
        this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
        return this.validationText = "Minimalna długość zgłoszenia to 20 znaków";
      }
      
      if(this.message.length > 500) {
        this.isValidation = true
        this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
        return this.validationText = "Maksymalna długość zgłoszenia to 500 znaków";
      }

      this.isLoading = true;

      await fetch('http://api.ipify.org/?format=json')
      .then(x => x.json())
      .then(async ({ ip }) => {
        let data = {};

        // if(this.isAuctionRoute){
        //   data = {
        //     auction_id: this.id,
        //     user_ip: ip,
        //     user_id: user.id,
        //     message: this.message
        //   }
        // } else{
        //   data = {
        //     comment_id: this.id,
        //     user_ip: ip,
        //     user_id: user.id,
        //     message: this.message
        //   }
        // }

        data = {
          ...(this.isAuctionRoute ? { auction_id: this.id } : { comment_id: this.id }),
          user_ip: ip,
          user_id: user.id,
          message: this.message
        }

        console.log(data)
        console.log('hej')

        await axios.post(`${API_URL}/${this.isAuctionRoute ? 'auction': 'comment'}-reports`, data, authorization)
        .then(() => {
          this.isSent = true;
          this.setTimeoutFunction = setTimeout(() => {
            this.isSent = false
            this.toggleReportLayer()
          }, 1000)
          this.message = '';
        })
        .catch(() => {
          this.isValidation = true
          this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
          return this.validationText = this.isAuctionRoute ? "Już zgłosiłeś to ogłoszenie" : "Już zgłosiłeś ten komentarz";
        })
      })
      .catch(() =>{
        this.isValidation = true
        this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
        return this.validationText = "Aby wysłać zgłoszenie musisz wyłączyć ADBLOCK";
      })

      this.isLoading = false;
    },
  }
}
</script>

<style>

</style>