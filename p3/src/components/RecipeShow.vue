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
              <input placeholder="Olive Oil" type="text" id="componentName" v-model="newComponentName" @blur="validation['name']" >
              <ErrorList :errors="uiErrors" errorKey="name" />
              <ErrorList :errors="ApiErrors" errorKey="name" />
            </label>
          </div>
          <div>
            <label for="componentQty">
              Quantity
              <input placeholder="1.5" type="text" id="componentQty" v-model="newComponentQty" @blur="validation['quantity']">
              <ErrorList :errors="uiErrors" errorKey="quantity" />
              <ErrorList :errors="ApiErrors" errorKey="quantity" />
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
    this.validation
  },

  data() {
    return {
      recipe: {},
      components: [],
      newComponentName: '',
      newComponentQty: null,
      newComponentUnit: '',
      adding: false,
      ApiErrors: {},
      uiErrors: {},
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },

    validation() {
      return {
        name: (val) => {
          const value = val.target.value
          if (!value) {
            this.setUiErrors('name', ["Cannot be blank!"])
          } else {
            this.setUiErrors('name', [])
          }
        },
        quantity: (val) => {
          const value = val.target.value
          if (!value) {
            this.setUiErrors('quantity', ["Quantity is required."])
          } else if (isNaN(value)) {
            this.setUiErrors('quantity', ["Must be a number."])
          } else {
            this.setUiErrors('quantity', [])
          }
        },
      }
    }
  },

  watch: {
    recipeID(val) {
      if (val) {
        this.setUpRecipe(val);
      }
    },

    uiErrors(val) {
      const errors = Object.keys(val).map((k) => {
        return val[k]
      })
      if (errors.flat().length > 0) {
        this.adding = true
      } else {
        this.adding = false
      }
    },
  },

  methods: {
    setUiErrors(keyName, errorsArray) {
      // Need to overwrite the entire object in order to satisfy Vue reactivity quirks
      const errorObject = Object.assign({}, this.uiErrors)
      errorObject[keyName] = errorsArray
      this.uiErrors = errorObject
    },
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
        } else {
          this.ApiErrors = res.data.errors
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
