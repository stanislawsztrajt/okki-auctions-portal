<template>
  <div>
    <Menu />
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement 
        :value="'Ukryte komentarze:'" 
        :icon="'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'" 
        v-if="comments.length > 0"
      />
      <InfoElement
        :value="'Nie ma żadnych ukrytych komentarzy'" 
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

import Menu from '../components/Menu.vue'
import InfoElement from '../components/InfoElement.vue'
import Comment from '../components/comment/Comment.vue'

import API_URL from '../../API_URL'
import { authorization, jwt, user } from '../constants/const-variables'

export default {
  name: 'AdminDashboard',
  components: {
    Menu,
    InfoElement,
    Comment,
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

      await axios.get(`${API_URL}/hidden-comments`, authorization)
      .then(res => this.comments = res.data)
      .then(res => console.log(res))
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