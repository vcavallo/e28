<template>
  <div>
    <form>
      <div>
      <label for="name">
        Recipe Name:
        <input id="name" type="text" v-model="name" />
      </label>
      </div>
      <div>
      <label for="instructions">
        Instructions:
        <textarea id="instructions" v-model="instructions"></textarea>
      </label>
      </div>
      <div>
        (You'll add the ingredients on the next step)
      </div>
      <div>
        <button type="submit" @click.prevent="createNewRecipe">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { axios } from '@/api.js'

export default {
  props: {
  },
  data() {
    return {
      name: '',
      instructions: '',
    }
  },
  methods: {
    createNewRecipe() {
      axios.post('recipe', {
        name: this.name,
        instructions: this.instructions,
      }).then((res) => {
        const newRecipe = res.data.recipe
        this.$router.push({ name: 'recipeShow', params: { recipeID: newRecipe.id }})
      })
    },
  },
}
</script>

<style scoped>
</style>
