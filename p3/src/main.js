import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

Vue.use(VueRouter)

import router from '@/router/router'

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
