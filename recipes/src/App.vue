<template>
  <div id="app">
    <div>
      <router-link :to="{ name: 'home' }" >Home</router-link>
      <router-link :to="{ name: 'recipeIndex' }" >Index</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
