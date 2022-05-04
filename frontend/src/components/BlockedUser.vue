<template>
  <div class="w-screen h-screen flex flex-row justify-center items-center">
    <div class="p-8 py-16 text-center flex flex-col justify-center items-center">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <p class="text-2xl font-bold">Twoje konto zostało zablokowane z powodu naruszenia regulaminu serwisu.</p>
      </div>
      <div class="flex flex-col mt-4 mb-6">
        <span class="text-gray-600 text-base">
          Jeżeli uważasz że nastąpiła pomyłka, <button class="text-green-600 font-semibold" @click="{ goToContact = true; logout(); }">skontaktuj się</button> z nami.
        </span>
      </div>
      <button @click="logout" class="text-xl font-bold cursor-pointer bg-gray-800 text-white w-full xs:w-84 p-2 shadow-sm rounded-md">Wróć na stronę główną</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goToContact: false
    }
  },
  methods: {
    async logout(){
      await this.$cookies.remove('jwt');
      await this.$cookies.remove('user');

      this.$router.push(this.goToContact ? '/contact' : '/')
      .then(() => this.$router.go())
    },
  }
}
</script>

<style>

</style>