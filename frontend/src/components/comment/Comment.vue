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
          <div class="font-light text-sm -mt-1">
            {{ comment.createdAt.substring(0,10).split('-').reverse().join('.') }}
          </div>
        </div>
      </div>
      <div v-if="commentBodyCopy.length > 0" class="w-full h-full relative mt-2">
        <div class="absolute h-full w-full"></div>
        <span spellcheck="false"  role="textbox" class="w-full" contenteditable="" aria-disabled="">
          {{commentBodyCopy}}
        </span>
      </div>
      <div v-if="jwt && user.role.name !== 'Admin'">
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
    <div v-if="jwt">
      <div v-if="user.role.name === 'Admin' && !isReportUserProfile" class="w-full xl:w-10/12 flex flex-col lg:flex-row justify-between bg-white border border-dashed border-gray-300 pt-0 p-2 exsm:pt-2 exsm:p-4 text-gray-700 cursor-auto">
        <div v-if="reports">
          <h2 class="lg:text-lg font-semibold">Wiadomości:</h2>
          <div
            v-for="(report, index) in commentReports"
            :key="report.id"
            class="text-base md:text-lg dont-break-out"
          >
            {{ index + 1 }}. {{ report.message }}
          </div>
        </div>
        <div class="flex flex-col mt-5 lg:mt-0 lg:ml-10">
          <button
            v-if="isReportRoute"
            @click="toggleDeleteReportLayer"
            class="bg-green-600 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Anuluj zgłoszenie
          </button>
          <button
            v-else
            @click="togglePublishLayer"
            class="bg-green-600 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Opublikuj komentarz
          </button>
          <button
            @click="toggleDeleteCommentLayer"
            class="bg-red-500 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Usuń komentarz
          </button>
          <button
            @click="toggleBlockUserLayer"
            class=" bg-gray-800 auction-comment-admin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Zablokuj konto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { authorization, jwt, user } from '../../constants/const-variables'
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
      jwt,
      user,
      commentBodyCopy: this.comment.body,
      isReportLayer: false,
      isDeleteCommentLayer: false,
      isDeleteReportLayer: false,
      isPublishLayer: false,
      isBlockUserLayer: false,
      commentReports: [],

      isReportUserProfile: window.location.href.includes('users') || window.location.href.includes('user-comments'),
      isReportRoute: window.location.href.includes('report'),
    }
  },
  created() {
    if(this.reports) this.commentReports = this.reports.filter(report => report.comment_id === this.comment.id);
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
    deleteReport(){
      this.isDeleteReportLayer = !this.isDeleteReportLayer;

      axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      this.removeComment(this.comment.id)
    },
    toggleDeleteCommentLayer(){
      this.isDeleteCommentLayer = !this.isDeleteCommentLayer
    },
    async deleteComment(){
      await axios.delete(`${API_URL}/comments/${this.comment.id}`, authorization)
      axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      this.changeChangeDetector();

      this.removeComment(this.comment.id)
    },
    toggleBlockUserLayer(){
      this.isBlockUserLayer = !this.isBlockUserLayer;
    },
    blockUser(){
      this.isBlockUserLayer = !this.isBlockUserLayer;

      axios.put(`${API_URL}/users/${this.comment.user_id}`, { blocked: true }, authorization)
      axios.get(`${API_URL}/block-user/${this.comment.user_id}`, authorization)
      axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      this.removeComment(this.comment.id)
    },
    togglePublishLayer(){
      this.isPublishLayer = !this.isPublishLayer;
    },
    publish(){
      this.isPublishLayer = !this.isPublishLayer;

      axios.get(`${API_URL}/publish-comment/${this.comment.id}`, authorization)
      axios.delete(`${API_URL}/reported-comments/${this.comment.id}`, authorization)
      // get because put respone 403 forbidden, i don't why
      this.removeComment(this.comment.id)
    },
  }
}
</script>