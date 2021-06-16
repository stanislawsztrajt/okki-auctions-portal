<template>
  <nav class="flex items-center justify-between bg-gray-200 relative">
    <div class="text-5xl inline-block mb-4 ml-4 text-gray-600">OLXPL</div>
    <div class="h-20 ">
      <div class="inline-block">
        <div class="text-gray-600 inline-block text-2xl cursor-pointer ml-5 mr-10 hover:text-gray-800 duration-100">logowanie</div>
      </div>
      <svg
        @click="unfoldMenu"
        class="w-20 cursor-pointer inline-block mr-16 text-green-600 group"
        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <div class="hidden group" ref="hamburgerElements">
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