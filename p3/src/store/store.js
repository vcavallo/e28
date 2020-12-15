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
      return new Promise((resolve) => {
        axios.post('auth').then((response) => {
          if (response.data.authenticated) {
            context.commit('setUser', response.data.user);
          } else {
            context.commit('setUser', false);
          }
          resolve(response);
        });
      });
    },

    getShoppingLists(context) {
      return new Promise((resolve, reject) => {
          axios
            .get("shoppingList")
            .then((res) => {
              const lists = res.data.shoppingList
              // Fill out shoppingListIDs and shoppingList objects
              lists.forEach((list) => {
                list.recipeComponents = []
                context.state.shoppingListIDs.push(list.id)
                context.state.shoppingLists[list.id] = list
              })

              // And then get all the recipe components in this list
              context.state.shoppingListIDs.forEach((id) => {
                axios
                  .get(`shoppingListItem/query?shopping_list_id=${ id }`)
                  .then((r) => {
                    r.data.results.forEach((item) => {
                      context.state.shoppingLists[id].recipeComponents.push(item)
                    })
                    resolve()
                  }).catch((e) => {
                    console.log(e)
                    reject()
                  })
              })
            }).catch((e) => {
              console.log(e)
              reject()
            })
      })
    },

  },
})

