<template>
  <div class="hello">
    Index
    <router-link :to="{ name: 'recipeShow', params: { recipeID: 5 } }" >Recipe 5</router-link>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style scoped>
</style>
