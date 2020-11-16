<template>
  <div class="hello">
    <ul>
      <li v-for="r in recipes" :key="r.id">
        <router-link :to="{ name: 'recipeShow', params: { recipeID: r.id } }">{{ r.name }}</router-link>
      </li>
    </ul>
    <router-link :to="{ name: 'recipeNew' }">Add Recipe</router-link>
  </div>
</template>

<script>
import { axios } from '@/api.js'

export default {
  props: {
  },
  data() {
    return {
      recipes: []
    }
  },
  created() {
    this.getAllRecipes()
  },
  methods: {
    getAllRecipes() {
      axios.get('recipe').then((res) => {
        this.recipes = res.data.recipe;
      })
    },
  },
}
</script>

<style scoped>
</style>
