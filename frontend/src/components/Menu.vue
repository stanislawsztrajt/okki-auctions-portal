<template>
  <nav class="flex items-center justify-between bg-gray-200 relative">
    <div class="text-4xl md:text-5xl inline-block mb-4 ml-4 text-gray-600">
      <router-link to="/">OKKI</router-link>
    </div>
    <div class="h-20 flex items-center">
      <div class="inline-block ">
        <router-link to="/login" class="text-lg md:text-2xl mr-3 md:mr-6 text-gray-600 inline-block cursor-pointer ml-5 hover:text-gray-800 duration-100">
          {{ this.userInfo ? this.userInfo.username : 'logowanie' }}
        </router-link>
      </div>
      <ul>
        <li class="group dropdown px-1 w-10 text-green-600 hover:text-green-700 cursor-pointer mr-4 md:mr-8 focus:bg-transparent">
          <span @click="unfoldMenu()" class="text-4xl exsm:mr-4 md:mr-8"><font-awesome-icon icon="bars"/></span>
          <div ref="hamburgerElements" class="md:group-hover:block dropdown-menu absolute right-0 hidden h-auto">
            <ul class="w-48 top-0 right-5 md:right-9 absolute bg-white shadow-lg border-t-4 border-green-700 p-6">
              <li class="py-1">
                <a href="#" class="block text-gray-400 font-bold text-base uppercase hover:text-gray-500 hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  faq
                </a>
              </li>
              <li class="py-1">
                <a href="#" class="block text-gray-400 font-bold text-base uppercase hover:text-gray-500 hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  polityka
                </a>
              </li>
              <li class="py-1">
                <a href="#" class="block text-gray-400 font-bold text-base uppercase hover:text-gray-500 hover:bg-gray-100 px-2 py-1 cursor-pointer">
                  pliki cookies
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
export default {
  data(){
    return{
      userInfo: this.$cookies.get('user'),
    }
  },
  methods: {
    unfoldMenu(){
      if(this.$refs.hamburgerElements.classList.contains('hidden')){
        this.$refs.hamburgerElements.classList.remove('hidden')
        this.$refs.hamburgerElements.classList.add('block')
      }
      else{
        this.$refs.hamburgerElements.classList.add('hidden')
        this.$refs.hamburgerElements.classList.remove('block')
      }
    }
  }
}
</script>