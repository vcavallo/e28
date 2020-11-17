<template>
  <div>
    <h1>Recipes!</h1>

    <div>
      Some highlighted recipes:
      <ul>
        <li v-for="r in recommended" :key="r.id">
          <router-link :to="{ name: 'recipeShow', params: { recipeID: r.id } }">{{ r.name }}</router-link>
        </li>
      </ul>

      <router-link :to="{ name: 'recipeIndex' }">All Recipes</router-link>
    </div>
  </div>
</template>

<script>
import { axios } from '@/api.js'

export default {
  name: 'Home',
  props: {
  },
  data() {
    return {
      recommended: []
    }
  },
  created() {
    this.getRecommendedRecipes()
  },
  methods: {
    getRecommendedRecipes() {
      axios.get('recipe/query?recommended=1').then((res) => {
        this.recommended = res.data.results;
      })
    }
  }
}
</script>

<style scoped>
</style>
