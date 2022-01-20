<template>
  <div class="h-screen -mt-24 flex flex-col justify-center items-center">
    <div class=" w-4/5 h-4/5 flex flex-col justify-center items-center" >
      <h1 class="text-5xl font-bold">
        Jesteś pewny, że chcesz usunąć ogłoszenie ?
      </h1>
      <div class="mt-10">
        <button
          class="bg-green-400 text-white text-4xl p-4 w-40 rounded-xl button-animation-hover"
          @click="deleteAuction"
        >
          Tak
        </button>
        <button
          class="bg-gray-700 text-green-400 text-4xl p-4 w-40 ml-10 rounded-xl button-animation-hover"
          @click="toggleDeleteAuctionLayer('')"
        >
          Nie
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteAuction(){
      this.$emit('delete-advert')
    },
    toggleDeleteAuctionLayer(id){
      this.$emit('toggle-delete-advert-layer', id)
    }
  }
}
</script>

<style>

</style>