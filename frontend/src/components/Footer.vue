<template>
  <footer class="h-auto bg-white flex justify-center mt-40 border-t border-gray-200 pb-10 text-gray-700">
    <div class="w-5/6 lg:w-2/3 h-full flex flex-col mt-5">
      <div class="flex flex-row items-center justify-between">
        <router-link to="/" class="mr-2 text-4xl md:text-5xl">okki</router-link>
        <img class="h-14 sm:h-16" src="../images/WideLogoKalisz.jpg" alt="Logo of the Kalisz city">
      </div>
      <hr class="mb-8 mt-6">
      <div class="flex flex-col md:flex-row flex-wrap justify-between">
        <div
          v-for="el in footerLinks"
          :key="el.label"
        >
          <div class="mr-20 mb-10" >
            <router-link :to="`/${el.labelLink}`" class="text-lg font-semibold hover-blue">{{ el.label }}</router-link>
            <ol class="ml-4 list-none">
              <li
                v-for="link in el.links"
                :key="link.text"
              >
                <router-link
                  v-if="link.displayWhenLogged !== undefined ? (jwt ? link.displayWhenLogged : !link.displayWhenLogged) : true"
                  :to="`/${link.route}`"
                  class="hover-blue"
                >
                  - {{ link.text }}
                </router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row justify-between mt-10">
        <p class="mb-4">Wszelkie prawa zastrzeżone.</p>
        <p>Korzystanie z serwisu oznacza akceptację <router-link class="text-green-600 font-semibold" to="terms-of-use">regulaminu</router-link>.</p>
      </div>
    </div>
  </footer>
</template>
<script>
import footerLinks from '../jsons files/footerLinks.json'
import { jwt } from '../constants/const-variables';

export default {
  data() {
    return {
      footerLinks,
      jwt
    }
  },
}
</script>