import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './styles.css'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import VueCookies from 'vue3-cookies'

library.add(faBars);

createApp(App)
  .use(VueCookies)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app')