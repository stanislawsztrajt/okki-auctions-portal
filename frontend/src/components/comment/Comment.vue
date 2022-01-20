<template>
  <div>
    <div class="text-lg font-medium">
      <svg class="text-yellow-400 h-8 w-8 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {{ comment.rate }}/6
      {{ comment.username }}
    </div>
    <div class="text-right -mt-6">{{ comment.createdAt.substring(0,10) }}</div>
    {{ comment.body }}
    <div v-show="comment.user_id === user.id">
      <svg @click="deleteComment(comment.id)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  </div>
</template>

<script>
import { user } from '../../constants/const-variables'

export default {
  props: {
    comment: Object,
  },
  data(){
    return{
      user: user
    }
  },
  methods: {
    deleteComment(id){
      this.$emit('delete-comment', id)
    },
  }
}
</script>

<style>

</style>