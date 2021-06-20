<template>
  <nav class="flex items-center justify-between bg-gray-200 relative">
    <div class="text-4xl md:text-5xl ml-4 md:ml-8 text-gray-600">
      <router-link to="/">OKKI</router-link>
    </div>
    <div class="h-20 flex items-center">
      <div class="inline-block ">
        <router-link to="/login" class="text-lg md:text-2xl mr-3 md:mr-6 text-gray-600 inline-block cursor-pointer ml-5 hover:text-gray-800 duration-100">
          logowanie
        </router-link>
      </div>
      <font-awesome-icon 
        class="text-4xl
          exsm:mr-4 md:mr-8
          cursor-pointer inline-block text-green-600"
        icon="bars" 
        @click="unfoldMenu()"
        />
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