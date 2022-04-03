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
      :question="'Czy na pewno chcesz na nowo opublikować komentarz?'"
    />
    <ApproveLayer
      v-if="isDeleteCommentLayer"
      :question="'Czy na pewno chcesz usunąć ten komentarz'"
      @action="deleteComment"
      @toggle-layer="toggleDeleteCommentLayer"
    />
    <ApproveLayer
      v-else-if="isBlockUserLayer"
      @action="blockUser"
      @toggle-layer="toggleBlockUserLayer"
      :question="'Czy na pewno chcesz zablokować użytkownika?'"
    />
    <ReportLayer
      v-if="isReportLayer"
      :id="comment.id"
      @toggle-report-layer="toggleReportLayer"
    />
    <div class="mt-4 p-4 bg-white shadow w-full xl:w-10/12">
      <div class="text-lg font-medium flex flex-row items-center">
        <svg xmlns="http://www.w3.org/2000/svg"
          :class="`comment-emote ${comment.rate ? 'bg-green-500' : 'bg-red-500'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          :d="`${comment.rate ? 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}`"
          />
        </svg>
        <div class="ml-2">
          <router-link target="_blank" :to="`/users/${comment.user_id}`">
            {{ comment.username }}
          </router-link>
          <div class="font-light text-sm">
            {{ comment.createdAt.substring(0,10) }}
          </div>
        </div>
      </div>
      <div v-if="commentBodyCopy.length > 0" class="w-full h-full relative mt-2">
        <div class="absolute h-full w-full"></div>
        <span spellcheck="false"  role="textbox" class="w-full" contenteditable="" aria-disabled="">
          {{commentBodyCopy}}
        </span>
      </div>
      <div class="flex flex-row flex-wrap justify-end items-center" v-if="user.role.name === 'Admin' && !isReportUserProfile">
        <button
          v-if="isReportRoute"
          @click="toggleDeleteReportLayer"
          class=" bg-green-500 auction-comment-admin-button"
        >
          Usuń zgłoszenie
        </button>
        <button
          v-else
          @click="togglePublishLayer"
          class=" bg-green-500 auction-comment-admin-button"
        >
          Opublikuj komentarz
        </button>
        <button
          @click="toggleDeleteCommentLayer"
          class=" bg-red-500 auction-comment-admin-button"
        >
          Usuń komentarz
        </button>
        <button
          @click="toggleBlockUserLayer"
          class=" bg-red-500 auction-comment-admin-button"
        >
          Zablokuj konto
        </button>
      </div>
      <div v-else>
        <div class="text-right " v-if="comment.user_id === user.id">
          <span @click="toggleDeleteCommentLayer" class="text-red-500 p-2 cursor-pointer button-animation-hover">
            Usuń
          </span>
        </div>
        <div class="text-right" v-else>
          <span @click="toggleReportLayer" class="text-red-500 p-2 cursor-pointer button-animation-hover">
            Zgłoś
          </span>
        </div>
      </div>
    </div>

    <div v-if="reports" class=" cursor-auto bg-white shadow mt-1 p-4 w-full xl:w-10/12">
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
import axios from 'axios'
import { authorization, user } from '../../constants/const-variables'
import ApproveLayer from '../ApproveLayer.vue'

import ReportLayer from '../ReportLayer.vue'
import API_URL from '../../../API_URL'

export default {
  name: 'Comment',
  components: {
    ReportLayer,
    ApproveLayer
  },
  props: {
    comment: Object,
    reports: Array
  },
  data(){
    return{
      user: user,
      commentBodyCopy: this.comment.body,
      isReportLayer: false,
      isDeleteCommentLayer: false,
      isDeleteReportLayer: false,
      isPublishLayer: false,
      isBlockUserLayer: false,

      isReportUserProfile: window.location.href.includes('users'),
      isReportRoute: window.location.href.includes('report'),
    }
  },
  methods: {
    changeChangeDetector(){
      this.$emit('change-change-detector')
    },
    removeComment(id){
      this.$emit('remove-comment', id)
    },
    toggleReportLayer(){
      this.isReportLayer = !this.isReportLayer;
    },
    toggleDeleteReportLayer(){
      this.isDeleteReportLayer = !this.isDeleteReportLayer;
    },
    async deleteReport(){
      this.isDeleteReportLayer = !this.isDeleteReportLayer;

      await axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      this.removeComment(this.comment.id)
    },
    toggleDeleteCommentLayer(){
      this.isDeleteCommentLayer = !this.isDeleteCommentLayer
    },
    async deleteComment(){
      await axios.delete(`${API_URL}/comments/${this.comment.id}`, authorization)

      if(this.isReportUserProfile){
        this.changeChangeDetector()
      }

      this.removeComment(this.comment.id)
    },
    toggleBlockUserLayer(){
      this.isBlockUserLayer = !this.isBlockUserLayer;
    },
    async blockUser(){
      this.isBlockUserLayer = !this.isBlockUserLayer;

      await axios.put(`${API_URL}/users/${this.comment.user_id}`, { blocked: true }, authorization)
      await axios.get(`${API_URL}/block-user/${this.comment.user_id}`, authorization)
      this.removeComment(this.comment.id)
    },
    togglePublishLayer(){
      this.isPublishLayer = !this.isPublishLayer;
    },
    async publish(){
      this.isPublishLayer = !this.isPublishLayer;

      await axios.get(`${API_URL}/publish-comment/${this.comment.id}`, authorization)
      await axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      // get because put respone 403 forbidden, i don't why
      this.removeComment(this.comment.id)
    },
  }
}
</script>

<style>

</style>