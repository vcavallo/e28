<template>
  <div id="app">
    <div>
      <div style="display: inline-block; margin-right: 10px">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>

      <div style="display: inline-block; margin-right: 10px">
        <router-link :to="{ name: 'recipeIndex' }">All Recipes</router-link>
      </div>

      <div style="display: inline-block">
        <router-link :to="{ name: 'listIndex' }">Shopping Lists</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
