<template>
  <form class="flex flex-col h-5/6 justify-center items-center" @submit.prevent="sendEmail">
    <label class="text-5xl">Dlaczego zgłaszasz to ogloszenie ?</label>
    <textarea
      class="w-1/3 h-64 text-xl focus:outline-none mt-12"
      v-model="message"
      name="message"
    ></textarea>
    <div class="mt-12">
      <input
        class="bg-green-400 text-white p-5  rounded-lg cursor-pointer mx-10 button-animation-hover
        text-lg w-40
        sm:text-xl sm:w-44
        md:text-2xl md:w-60
        xl:text-3xl xl:w-84
        "
        type="submit"
        value="Wyślij zgłoszenie"
      >
      <h1 v-if="isValidation" class="text-red-600">{{ validationText }}</h1>
      <button
        @click="toggleShowReportLayer"
        class="bg-gray-700 text-green-400 p-5 rounded-lg cursor-pointer mx-10 button-animation-hover
        text-lg w-40
        sm:text-xl sm:w-44
        md:text-2xl md:w-60
        xl:text-3xl xl:w-84
        "
      >
        Schowaj
      </button>
    </div>
  </form>
</template>

<script>
import emailjs from 'emailjs-com'


export default {
  data(){
    return{
      message: '',
      validationText: '',
      isValidation: false,
      isLoading: false,
    }
  },
  props: {
    id: String
  },
  methods: {
    toggleShowReportLayer(){
      this.$emit('toggle-show-report-layer')
    },
    async sendEmail(e){
      clearTimeout(this.setTimeoutFunction)

      if(this.message.length < 50) {
        this.isValidation = true
        this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
        return this.validationText = "Minimalna długość zgłoszenia to 50 znaków";
      }
      if(this.message.length > 2000) {
        this.isValidation = true
        this.setTimeoutFunction = setTimeout(() => this.isValidation = false, 4000)
        return this.validationText = "Maksymalna długość zgłoszenia to 3000 znaków";
      }

      this.isLoading = true;

      e.target.querySelector('textarea').value = `
        ${e.target.querySelector('textarea').value}   ##################### ID ogłoszenia: ${this.id} #####################
      `

      await emailjs.sendForm('service_s05p4ig', 'template_ezjj7ii', e.target, 'user_LVEyaV5ufNlXrhsXxGVCF')
      .then((result) => {
        console.log('SUCCESS!', result.status, result.text);
      }, (error) => {
        console.log('FAILED...', error);
      });

      e.target.querySelector('textarea').value = '';
      this.message = '';
      this.toggleShowReportLayer();
    },
  }
}
</script>

<style>

</style>