import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import RecipeIndex from '@/components/RecipeIndex.vue';
import RecipeShow from '@/components/RecipeShow.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/', component: Home, name: 'home',
    },
    {
      path: '/recipes', component: RecipeIndex, name: 'recipeIndex',
    },
    {
      path: '/recipes/:recipeID', component: RecipeShow, props: true, name: 'recipeShow'
    },
  ],
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
