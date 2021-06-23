<template>
  <nav class="flex items-center justify-between bg-gray-100 relative border border-gray-300 shadow">
    <div class="text-5xl md:text-6xl ml-4 md:ml-8 font-light text-gray-600">
      <router-link to="/">okki</router-link>
    </div>
    <div class="h-20 flex items-center">
<<<<<<< HEAD
      <router-link to="/" class="menu-element">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>Polubione</span>
      </router-link>
      <router-link to="/" class="menu-element">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span>Wiadomości</span>
      </router-link>
      <router-link to="/dashboard" class="menu-element">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Moje konto</span>
      </router-link>
      <router-link to='/new-adverst' class="flex justify-center items-center px-7 h-full text-2xl text-green-600 border-r border-l border-gray-300 hover:bg-gray-200 transition duration-100">
        Utwórz ogłoszenie
      </router-link>
      <router-link to="/" class="menu-element">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Pomoc</span>
      </router-link>
=======
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
>>>>>>> 31594de... added: assign id adverts to the user
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