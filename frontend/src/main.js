import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './styles.css'
import VueCookies from 'vue3-cookies'
import * as io from 'socket.io-client'
window.io = io

// import { plugin, defaultConfig } from '@formkit/vue'
// import { pl } from '@formkit/i18n'

createApp(App)
  .use(VueCookies)
  .use(router)
  // .use(plugin, defaultConfig({
  //     locales: { pl },
  //     locale: 'pl',
  //   })
  // )
  .mount('#app')