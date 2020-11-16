<template>
  <div>
    <h1>{{ recipe.name }}</h1>

    <ul>
      <div v-for="c in components" :key="c.id">
        <RecipeComponent
          :name="c.name"
          :quantity="c.quantity"
          :unit="c.unit"
        />
      </div>
    </ul>

    <p>
      {{ recipe.instructions }}
    </p>
  </div>
</template>

<script>
import { axios } from "@/api.js";
import RecipeComponent from "@/components/RecipeComponent.vue"

export default {
  props: ["recipeID"],
  created() {
    this.setUpRecipe(this.recipeID);
  },
  data() {
    return {
      recipe: {},
      components: [],
    };
  },
  watch: {
    recipeID(val) {
      if (val) {
        this.setUpRecipe(val);
      }
    },
  },
  methods: {
    setUpRecipe(rID) {
      this.getRecipe(rID);
      this.getComponentsForRecipe(rID);
    },
    getRecipe(rID) {
      axios.get(`recipe/${rID}`).then((res) => {
        this.recipe = res.data.recipe;
      });
    },
    getComponentsForRecipe(rID) {
      axios.get(`recipeComponent/query?recipe_id=${rID}`).then((res) => {
        this.components = res.data.results;
      });
    },
  },
  components: {
    RecipeComponent
  },
};
</script>
