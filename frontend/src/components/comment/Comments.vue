<template>
  <div>
    <InfoElement 
      :value="'Opinie użytkowników'"
      :icon="'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'"
    />
    <AddComment
      v-if="user.id !== id"
      :id="id"
      @push-comment="pushComment"
    />
    <div>
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @delete-comment="deleteComment"
      />
    </div>
    <div class="p-10"></div>
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
    changeDetector: Number
  },
  data(){
    return{
      comments: [],
      rate: 0,
      user: user
    }
  },
  async created(){
    await axios.get(`${API_URL}/comments-in-users-profiles/${this.id}`)
    .then(res => {
      this.comments = res.data.comments;
      this.rate = res.data.accucuracyRate
    })
    .catch(err => console.log(err))
  },
  methods: {
    changeChangeDetector(){
      this.$emit('change-change-detector')
    },
    async pushComment(comment){
      this.comments.push(comment);
      this.changeChangeDetector();
    },
    async deleteComment(id){
      const index = this.comments.findIndex(comment => comment.id === id);
      
      this.comments.splice(index,1);
      await axios.delete(`${API_URL}/comments/${id}`, authorization)
      this.changeChangeDetector()
    }
  }
}
</script>

<style>

</style>