<template>
  <div class="mt-8 p-4 bg-white shadow w-full xl:w-10/12">
    <div class="text-lg font-medium flex flex-row items-center">
      <svg xmlns="http://www.w3.org/2000/svg" 
        :class="`comment-emote ${comment.rate ? 'bg-green-500' : 'bg-red-500'}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        :d="`${comment.rate ? 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}`" 
        />
      </svg>
      <div class="ml-2">
        {{ comment.username }}
        <div class="font-light text-sm">
          {{ comment.createdAt.substring(0,10) }}
        </div>
      </div>
    </div>
    <div v-if="commentBodyCopy.length > 0" class="w-full h-full relative mt-2">
      <div class="absolute h-full w-full"></div>
      <span role="textbox" class="w-full" contenteditable="" aria-disabled="">
        {{commentBodyCopy}}
      </span>
    </div>
    <div class="text-right " v-show="comment.user_id === user.id">
      <span @click="deleteComment(comment.id)" class="text-red-500 p-2 cursor-pointer button-animation-hover">
        Delete
      </span>
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
      user: user,
      commentBodyCopy: this.comment.body
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