<template>
<div>

  <div v-if="user">
    <h2>Hello, {{ user.name }}</h2>
    <button @click="logout">Logout</button>
  </div>

  <div v-else>
    <h2>Login</h2>
    <div>
      <label>Email: <input type="text" v-model="email" /></label>
    </div>
    <div>
      <label
          >Password: <input type="password" v-model="password"
      /></label>
    </div>

    <button @click="login">Login</button>

    <ul v-if="errors">
      <li class="error" v-for="(error, index) in errors" :key="index">
          {{ error }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { axios } from '@/api'

export default {
  data() {
    return {
      errors: null,
      email: '',
      password: '',
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },

  methods: {
     login() {
       this.errors = null
       axios.post('login', {
         email: this.email,
         password: this.password,
       }).then((response) => {
         if (response.data.authenticated) {
           this.$store.commit('setUser', response.data.user);
         } else {
           this.errors = response.data.errors;
         }
       });
     },
     logout() {
       axios.post('logout').then((response) => {
         if (response.data.success) {
           this.$store.commit('setUser', null);
         }
       });
     },
   },
}
</script>
