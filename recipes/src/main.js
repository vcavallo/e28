import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import RecipeIndex from '@/components/RecipeIndex.vue';
import RecipeShow from '@/components/RecipeShow.vue';
import RecipeNew from '@/components/RecipeNew.vue';
import ListIndex from '@/components/ListIndex.vue';
import ListShow from '@/components/ListShow.vue';

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
      path: '/shopping-lists', component: ListIndex, props: true, name: 'listIndex'
    },
    {
      path: '/shopping-lists/:listID', component: ListShow, props: true, name: 'listShow'
    },
    {
      path: '/recipes/:recipeID', component: RecipeShow, props: true, name: 'recipeShow'
    },
    {
      path: '/recipes/new', component: RecipeNew, name: 'recipeNew'
    },
  ],
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
