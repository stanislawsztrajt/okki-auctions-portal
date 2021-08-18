<template>
  <div>
    <Menu />
    <div class="m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 2xl:mx-48">
      <div class="flex flex-col justify-center md:justify-start mb-6">
        <div class="dashboardElements mt-6 p-4 text-2xl">
          Twoje prywatne konwersjacje
        </div>
        <div class="mt-10 border-t border-gray-300">
        <router-link
          v-for="user in users"
          :key="user.username"
          :to="`/chat/${user.id}`"
          class="flex flex-col sm:flex-row w-1/2 border-gray-300 my-4 text-gray-600 bg-white rounded-md"
        >
          <div class="px-3 py-2 sm:px-5 sm:py-4 w-full">
            <h2 class="sm:text-2xl">
              {{ user.username }}
            </h2>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "../components/Menu.vue"

export default {
  data() {
    return {
      users: []
    }
  },
  components: {
    Menu,
  }
}
</script>