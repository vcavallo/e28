import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      user: null,
    },
    shoppingListIDs: [],
    shoppingLists: {}, // each list will be an object which is keyed by its ID,
                       // such as:
                        // {
                        //   "5": {
                        //     id: 5,
                        //     name: 'list name here',
                        //     recipe_component_ids: [10, 4, 99]
                        //   },
                        // }
  },

  getters: {
  },

  mutations: {
    setUser(state, payload) {
      state.auth.user = payload
    },
  },

  actions: {
    authUser(context) {
      return new Promise((resolve, reject) => {
        console.log('going to post')
        axios.post('auth').then((response) => {
          console.log('success')
          if (response.data.authenticated) {
            const user = response.data.user
            context.commit('setUser', user)
          }
          resolve()
        }).catch(() => {
          console.log('fail')
          reject()
        })
      })
    },

    getShoppingLists(context) {
      return new Promise((resolve, reject) => {
          axios
            .get("shoppingList")
            .then((res) => {
              const lists = res.data.shoppingList
              // Fill out shoppingListIDs and shoppingList objects
              context.state.shoppingListIDs = lists.map((l) => l.id)
              lists.forEach((l) => context.state.shoppingLists[l.id] = l)
              resolve()
            }).catch((err) => {
              console.log(err)
              reject()
            })
      })
    },

  },
})

