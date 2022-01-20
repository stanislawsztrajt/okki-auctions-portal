import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './styles.css'

import VueCookies from 'vue3-cookies'

import firebase from 'firebase/app';
// Required for side effects
require('firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyC0-lRXRBvO8rrmA6bcwZDG4avYErqy3Bw",
  authDomain: "adverts-portal-58c8f.firebaseapp.com",
  projectId: "adverts-portal-58c8f",
  storageBucket: "adverts-portal-58c8f.appspot.com",
  messagingSenderId: "442345472370",
  appId: "1:442345472370:web:4679a4c1b1a608929b9deb"
};
firebase.initializeApp(firebaseConfig)

export var db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

createApp(App)
  .use(VueCookies)
  .use(router)
  .mount('#app')