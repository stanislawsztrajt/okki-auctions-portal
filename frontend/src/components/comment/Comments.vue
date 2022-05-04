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

    <div class="flex flex-col">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @change-change-detector="changeChangeDetector"
        @remove-comment="removeComment"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import { user } from '../../constants/const-variables'
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
    await axios.get(`${API_URL}/first-six-comments-in-users-profiles/${this.id}`)
    .then(res => {
      this.comments = res.data.comments;
      this.rate = res.data.accucuracyRate;

      if(res.data.comments.length > 5){
        this.comments.pop();
      }
    })
  },
  methods: {
    changeChangeDetector(){
      this.$emit('change-change-detector')
    },
    pushComment(comment){
      this.comments.unshift(comment);
      this.changeChangeDetector();
    },
    removeComment(id){
      const index = this.comments.findIndex(comment => comment.id === id);
      this.comments.splice(index,1);
    }
  }
}
</script>

<style>

</style>