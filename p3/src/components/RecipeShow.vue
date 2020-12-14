<template>
  <div>
    <h1>
      {{ recipe.name }}
      <span v-if="recipe.recommended" style="margin-left: 4px;"><i class="fas fa-star"></i></span>
    </h1>

    <ul>
      <div v-for="c in components" :key="c.id">
        <AddToListWidget v-if="user" :componentID="c.id" />
        <RecipeComponent
          :name="c.name"
          :quantity="c.quantity"
          :unit="c.unit"
        />
      </div>
      <div style="border: 1px solid black; padding: 10px; margin: 5px 0; display: inline-block">
        <form>
          <div>
            <label for="componentName">
              New ingredient name
              <input placeholder="Olive Oil" type="text" id="componentName" v-model="newComponentName">
            </label>
          </div>
          <div>
            <label for="componentQty">
              Quantity
              <input placeholder="1.5" type="text" id="componentQty" v-model="newComponentQty">
            </label>
          </div>
          <div>
            <label for="componentUnit">
              Unit
              <input placeholder="Tbs" type="text" id="componentUnit" v-model="newComponentUnit">
            </label>
          </div>
          <button :disabled="adding" type="submit" @click.prevent="addComponent">Add</button>
        </form>
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
import AddToListWidget from "@/components/AddToListWidget.vue"

export default {
  props: ["recipeID"],
  created() {
    this.setUpRecipe(this.recipeID);
  },
  data() {
    return {
      recipe: {},
      components: [],
      newComponentName: '',
      newComponentQty: null,
      newComponentUnit: '',
      adding: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
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
    addComponent() {
      this.adding = true
      axios.post('recipeComponent', {
        name: this.newComponentName,
        recipe_id: this.recipeID,
        quantity: this.newComponentQty,
        unit: this.newComponentUnit,
      })
      .then((res) => {
        if (res.data.success) {
          const newComponent = res.data.recipeComponent
          this.components.push(newComponent)
        }
      })
      .finally(() => {
        this.newComponentName = ''
        this.newComponentQty = null
        this.newComponentUnit = ''
        this.adding = false
      })
    }
  },
  components: {
    RecipeComponent,
    AddToListWidget
  },
};
</script>
