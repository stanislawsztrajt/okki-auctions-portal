<template>
  <div class="mt-12">
    <InfoElement 
      :value="'Opinie użytkowników'"
      :icon="'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'"
    />
    <AddComment
      v-if="user.id !== id"
      :id="id"
      @push-comment="pushComment"
    />
    <div class="-mt-12">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @delete-comment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { authorization, user } from '../../constants/const-variables'

import API_URL from '../../../API_URL'
import Comment from './Comment.vue'
import AddComment from './AddComment.vue'
import InfoElement from '../InfoElement.vue'

export default {
  components: {
    Comment,
    AddComment, 
    InfoElement
  },
  props: {
    id: String,
  },
  data(){
    return{
      comments: [],
      userRating: 3,
      user: user
    }
  },
  async created(){
    await axios.get(`${API_URL}/comments`, { headers: { user_profile_id: this.id } })
    .then(res => this.comments = res.data )
    .catch(err => console.log(err))
  },
  methods: {
    pushComment(comment){
      this.comments.push(comment);
    },
    async deleteComment(id){
      const index = this.comments.findIndex(id => this.comments.id === id);
      this.comments.splice(index,1);
      await axios.delete(`${API_URL}/comments/${id}`, authorization)
    }
  }
}
</script>

<style>

</style>