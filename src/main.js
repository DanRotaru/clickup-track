import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/styles/main.scss'

import VueDatePicker from '@vuepic/vue-datepicker';


const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: el => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

createApp(App)
  .directive("click-outside", clickOutside)
  .use(createPinia())
  .component('VueDatePicker', VueDatePicker)
  .mount('#app')
