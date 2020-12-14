<template>
  <div id="app">
    <div>
      <div style="display: inline-block; margin-right: 10px">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>

      <div style="display: inline-block; margin-right: 10px">
        <router-link :to="{ name: 'recipeIndex' }">All Recipes</router-link>
      </div>

      <div style="display: inline-block; margin-right: 10px">
        <router-link :to="{ name: 'listIndex' }">Shopping Lists</router-link>
      </div>

      <div v-if="user" style="display: inline-block">
        <router-link :to="{ name: 'account' }">My Account</router-link>
      </div>
      <div v-else style="display: inline-block">
        <router-link :to="{ name: 'signup' }">Sign Up</router-link>
      </div>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  mounted() {   
    this.$store.dispatch('authUser');
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
