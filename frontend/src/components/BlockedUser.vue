<template>
  <div class="w-screen h-screen flex flex-row justify-center items-center">
    <div class=" text-2xl p-8 py-16 text-center text-red-500">
      Twoje konto zostało zablokowane z powodu niestosownego ogłoszenia lub komentarza
      <br>
      <button @click="logout" class="font-bold cursor-pointer text-gray-700">Wróć na stronę główną</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout(){
      await this.$cookies.remove('jwt');
      await this.$cookies.remove('user');

      this.$router.push('/')
      .then(() => this.$router.go())
    }
  }
}
</script>

<style>

</style>