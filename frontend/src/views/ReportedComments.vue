<template>
  <div>
    <ApproveLayer
      v-if="isDeleteReportLayer"
      @action="deleteReport"
      @toggle-layer="toggleDeleteReportLayer"
      :question="'Czy na pewno chcesz usunąć to zgłoszenie'"
    />
    <ApproveLayer
      v-else-if="isDeleteAuctionLayer"
      @action="deleteAuction"
      @toggle-layer="toggleDeleteAuctionLayer"
      :question="'Czy na pewno chcesz usunąć ten komentarz'"
    />
    <ApproveLayer
      v-else-if="isBlockUserLayer"
      @action="blockUser"
      @toggle-layer="toggleBlockUserLayer"
      :question="'Czy na pewno chcesz zablokować użytkownika?'"
    />
    <div v-else class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement
        :value="'Zgłoszone komentarze'"
        :icon="'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'"
        v-if="comments.length > 0"
      />
      <InfoElement
        :value="'Nie ma żadnych zgłoszonych komentarzy'"
        :icon="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
        v-else
      />
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :reports="reports"
        @remove-comment="removeComment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import InfoElement from '../components/InfoElement.vue'
import Comment from '../components/comment/Comment.vue'
import ApproveLayer from '../components/ApproveLayer.vue'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  name: 'AdminDashboard',
  components: {
    InfoElement,
    Comment,
    ApproveLayer
  },
  data(){
    return{
      user: user,
      comments: [],
      reports: [],
    }
  },
  async created(){
    if(!jwt){
      this.$router.push('/login')
    }
    else if(user.role.name !== 'Admin'){
      this.$router.push('/dashboard')
    } else {
      await axios.get(`${API_URL}/comment-reports`, authorization)
      .then(res => this.reports = res.data)
      .then(res=>console.log(res))

      await axios.get(`${API_URL}/reported-comments`, authorization)
      .then(res => this.comments = res.data)
      .then(res=>console.log(res))
    }
  },
  methods: {
    removeComment(id){
      const index = this.comments.findIndex(comment => comment.id === id);
      this.comments.splice(index, 1);
    }
  }
}
</script>

<style>

</style>