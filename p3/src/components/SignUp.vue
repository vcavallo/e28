<template>
<div>

  <div v-if="user">
    <h2>Hello, {{ user.name }}</h2>
    <router-link :to="{ name: 'account' }">My Account</router-link>
  </div>

  <div v-else>
    <h2>Sign Up</h2>
    <div>
      <label>Name: <input data-cy="name" type="text" v-model="name" /></label>
    </div>
    <div>
      <label>Email: <input data-cy="email" type="text" v-model="email" /></label>
    </div>
    <div>
      <label>Password: <input data-cy="password" type="password" v-model="password"
      /></label>
    </div>
    <div>
      <label >Password Again: <input data-cy="passwordConfirmation" type="password" v-model="passwordConfirmation"
      /></label>
    </div>

    <button data-cy="signupButton" @click="signup">Sign Up!</button>

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
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },

  methods: {
     signup() {
       this.errors = null
       if (this.password != this.passwordConfirmation) {
         this.errors = ["Passwords don't match!"]
         return
       }

       axios.post('register', {
         name: this.name,
         email: this.email,
         password: this.password,
       }).then((response) => {
         if (response.data.success) {
           this.$store.commit('setUser', response.data.user);
         } else {
           this.errors = response.data.errors;
         }
       });
     },
   },
}
</script>
