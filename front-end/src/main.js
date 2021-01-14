import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import money from 'v-money'
import VueTheMask from 'vue-the-mask'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.use(VueTheMask)

Vue.use(money, {precision: 4})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
