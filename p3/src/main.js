import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

Vue.use(VueRouter)

import router from '@/router/router'

Vue.config.productionTip = false

import ErrorList from '@/components/global/ErrorList.vue'
Vue.component('ErrorList', ErrorList);

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
