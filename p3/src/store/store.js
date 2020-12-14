import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      user: null,
    },
    thingCount: 0,
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
      axios.post('auth').then((response) => {
        if (response.data.authenticated) {
          context.commit('setUser', response.data.user)
        }
      })
    }
  },
})

