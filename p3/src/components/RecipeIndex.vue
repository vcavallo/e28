<template>
  <div>
    <ul>
      <li v-for="r in recipes" :key="r.id">
        <router-link :to="{ name: 'recipeShow', params: { recipeID: r.id } }">{{ r.name }}</router-link>
        <span v-if="r.recommended" style="margin-left: 4px;"><i class="fas fa-star"></i></span>
      </li>
    </ul>
    <router-link v-if="user" :to="{ name: 'recipeNew' }">Add Recipe</router-link>
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
  computed: {
    user() {
      return this.$store.state.auth.user
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
