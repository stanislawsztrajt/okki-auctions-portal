<template>
  <nav class="flex items-center justify-between bg-gray-200 relative">
    <div class="text-4xl md:text-5xl inline-block mb-4 ml-4 text-gray-600">
      <router-link to="/">OKKI</router-link>
    </div>
    <div class="h-20 flex items-center">
      <div class="inline-block ">
        <router-link to="/login" class="text-lg md:text-2xl mr-3 md:mr-6 text-gray-600 inline-block cursor-pointer ml-5 hover:text-gray-800 duration-100">
          logowanie
        </router-link>
      </div>
      <svg
        @click="unfoldMenu"
        class="
          w-10 mr-2
          exsm:w-14 exsm:mr-6
          md:w-20 md:mr-16
          cursor-pointer inline-block  text-green-600"
        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <!-- <font-awesome-icon
        class="
          text-5xl
          w-10 mr-2
          exsm:mr-4 exsm:w-14
          md:mr-8 md:20
          cursor-pointer inline-block text-green-600"
        icon="bars"
        @click="unfoldMenu"
        /> -->
      <div class="hidden" ref="hamburgerElements">
        <div class="menu-hamburger-element">faq</div>
        <div class="menu-hamburger-element">polityka</div>
        <div class="menu-hamburger-element">pliki cookies</div>
      </div>
    </div>

  </nav>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods: {
    unfoldMenu(){
      if(this.$refs.hamburgerElements.classList == ""){
        this.$refs.hamburgerElements.classList = "hidden"
      }
      else{
        this.$refs.hamburgerElements.classList = ""
      }
    }
  }
}
</script>