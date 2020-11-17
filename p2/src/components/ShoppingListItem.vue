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
      itemName: "",
      acquired: "",
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
        gotIt: this.acquired,
      };
    },
  },
  methods: {
    getListItemDetails() {
      axios.get(`shoppingListItem/${this.id}`).then((res) => {
        const item = res.data.shoppingListItem;
        this.acquired = res.data.shoppingListItem.acquired;
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
        .put(`shoppingListItem/${this.id}`, { acquired: !this.acquired })
        .then(() => {
          this.acquired = !this.acquired;
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
