import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from "highcharts-vue";

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)



Vue.use(HighchartsVue);




import 'vue-tableau';
import router from './router'


new Vue({
  el: "#app",
  router,
  render: h => h(App),
}).$mount('#app')
