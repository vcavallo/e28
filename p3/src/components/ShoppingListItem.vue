<template>
  <div>
    <div v-if="markPending">
      ...
    </div>
    <div
      v-else
      style="margin: 1em 0; cursor: pointer"
      :class="acquiredStyle"
      @click="toggleAcquired"
    >
      <div style="display: inline-block">
        <span v-if="acquired"> [X] </span>
        <span v-else class="checkbox"> [_] </span>
      </div>

      <RecipeComponent
        :name="itemName"
        :quantity="itemQuantity"
        :unit="itemUnit"
      />
    </div>
  </div>
</template>

<script>
import { axios } from "@/api.js";
import RecipeComponent from "@/components/RecipeComponent.vue";

export default {
  props: ["id"],
  data() {
    return {
      item: { acquired: false },
      itemName: "",
      itemQuantity: "",
      itemUnit: "",
      markPending: false,
    };
  },
  created() {
    this.getListItemDetails();
  },
  computed: {
    acquiredStyle() {
      return {
        gotIt: this.item.acquired,
      };
    },
    acquired() {
      if (this.item) {
        return this.item.acquired
      }
      return false
    },
  },
  methods: {
    getListItemDetails() {
      axios.get(`shoppingListItem/${this.id}`).then((res) => {
        const item = res.data.shoppingListItem;
        this.item = item
        axios.get(`recipeComponent/${item.recipe_component_id}`).then((res) => {
          this.itemName = res.data.recipeComponent.name;
          this.itemQuantity = res.data.recipeComponent.quantity;
          this.itemUnit = res.data.recipeComponent.unit;
        });
      });
    },
    toggleAcquired() {
      this.markPending = true;
      axios
        .put(`shoppingListItem/${this.id}`, {
          shopping_list_id: this.item.shopping_list_id,
          recipe_component_id: this.item.recipe_component_id,
          acquired: !this.item.acquired
          })
        .then((res) => {
          this.item = res.data.shoppingListItem;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.markPending = false;
        });
    },
  },
  components: {
    RecipeComponent,
  },
};
</script>

<style scoped>
.gotIt {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>
