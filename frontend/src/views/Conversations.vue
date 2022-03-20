<template>
  <div>
    <Menu />
    <Loading :isCenter="true" v-if="isLoading" />
    <div v-else class="m-6 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <InfoElement
        :value="'Twoje konwersacje'"
        :icon="'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'"
      />
      <div class="mt-8">
        <Conversation
          v-for="conversation in conversations"
          :key="conversation.id"
          :conversation="conversation"
          :conversationUserID="conversation.conversationCode.replace(this.user.id, '')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { authorization, user } from '../constants/const-variables'
import axios from 'axios'
import API_URL from '../../API_URL'
import Menu from "../components/Menu.vue"
import InfoElement from '../components/InfoElement.vue'
import Conversation from '../components/Conversation.vue'
import Loading from '../components/Loading.vue'

export default {
  data() {
    return {
      user: user,
      conversations: [],
      ISjwt: this.$cookies.isKey('jwt'),
      isLoading: true,
    }
  },
  components: {
    Menu,
    InfoElement,
    Conversation,
    Loading
  },
  created() {
    if(!this.ISjwt){
      this.$router.push('/login')
    }
    this.fetchUserConversations()
  },
  methods: {
    async fetchUserConversations() {
      axios.get(`${API_URL}/user-conversations`, authorization)
      .then((res) => {
        this.conversations = res.data
        this.isLoading = false
      })
    }
  },
}
</script>