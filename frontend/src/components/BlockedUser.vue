<template>
  <div class="w-screen h-screen flex flex-row justify-center items-center">
    <div class=" text-2xl p-8 py-16 text-center">
      Twoje konto zostało zablokowane z powodu niestosownego ogłoszenie lub komentarza 
      <br>
      <span class="font-bold cursor-pointer" @click="logout">Wróć na stronę główną</span>
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