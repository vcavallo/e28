import VueRouter from 'vue-router'

import store from '@/store/store'

import Home from '@/components/Home.vue';
import Account from '@/components/Login.vue';
import Unauthorized from '@/components/Unauthorized.vue';
import SignUp from '@/components/SignUp.vue';

import RecipeIndex from '@/components/RecipeIndex.vue';
import RecipeShow from '@/components/RecipeShow.vue';
import RecipeNew from '@/components/RecipeNew.vue';
import ListIndex from '@/components/ListIndex.vue';
import ListShow from '@/components/ListShow.vue';

import DevRefreshSeeds from '@/DevRefreshSeeds.vue'

const routes = [
  {
    path: '/', component: Home, name: 'home',
  },
  {
    path: '/account', component: Account, name: 'account',
  },
  {
    path: '/signup', component: SignUp, name: 'signup',
  },

  {
    path: '/recipes', component: RecipeIndex, name: 'recipeIndex',
  },
  {
    path: '/shopping-lists', component: ListIndex, props: true, name: 'listIndex',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/shopping-lists/:listID', component: ListShow, props: true, name: 'listShow',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/recipes/:recipeID', component: RecipeShow, props: true, name: 'recipeShow'
  },
  {
    path: '/recipes/new',
    component: RecipeNew,
    name: 'recipeNew',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/unauthorized', component: Unauthorized, name: 'unauthorized'
  },
  {
    path: '/dev/refresh-seeds', component: DevRefreshSeeds
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!store.state.auth.user) { // On every route, get a user IF we don't have one.
    store.dispatch('authUser').then(() => {
      if (requiresAuth && !store.state.auth.user) {
        next('/unauthorized');
      } else {
        next();
      }
    })
    next()
  }
  next()

});

export default router
