<template>
  <div>
    <div class="mt-20"></div>
    <div
      class="flex-col w-10/12 h-auto lg:h-62 xl:h-40 mt-6 p-4 bg-white"
    >

    </div>
    <div>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @delete-comment="deleteComment"
      />
    </div>

    <AddComment
      v-if="user.id !== id"
      :id="id"
      @push-comment="pushComment"
    />
  </div>
</template>

<script>
import axios from 'axios'

import { authorization, user } from '../../constants/const-variables'

import API_URL from '../../../API_URL'
import Comment from './Comment.vue'
import AddComment from './AddComment.vue'

export default {
  components: {
    Comment,
    AddComment
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