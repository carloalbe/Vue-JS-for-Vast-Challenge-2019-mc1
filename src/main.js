import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from "highcharts-vue";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false


Vue.use(HighchartsVue);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-tableau';
import router from './router'


new Vue({
  el: "#app",
  router,
  render: h => h(App),
}).$mount('#app')
