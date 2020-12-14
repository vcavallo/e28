<template>
  <div style="display: inline-block">
    <i @click="getLists" class="fas" :class="toggledIcon" style="padding: 3px"></i>
    <div v-if="open">
      <div class="lists-container">
        <div v-if="gettingLists">...Finding shopping lists</div>
        <div v-else>
          <div v-if="shoppingListIDs.length === 0">
            You don't have any shopping lists yet!
          </div>
          <div v-else>
            <div v-for="l in unusedLists" :key="l.id">
              <span style="margin-right: 8px">
                <a href="#" @click.prevent="addToList(l.id)"
                  >Add to {{ l.name }}</a
                >
              </span>

              <a target="_blank" :href="`/shopping-lists/${l.id}`">
                <i class="fas fa-external-link-square-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/api.js";

export default {
  props: ["componentID"],
  data() {
    return {
      open: false,
      gettingLists: false,
      addingToList: false,
    };
  },

  computed: {
    unusedLists() {
      // TODO: only show lists that don't contain this item?
      //return this.lists;
      return this.shoppingListIDs.map((id) => {
        return this.shoppingLists[id]
      })

      // get all shopping_list_items
      // only return the ones that have this recipe_component_id present
      // without more robust database joins and/or Vuex, this will be too costly.
    },
    toggledIcon() {
      if (!this.open) {
        return 'fa-list'
      } else {
        return 'fa-times-circle'
      }
    },

    shoppingListIDs() {
      return this.$store.state.shoppingListIDs
    },
    shoppingLists() {
      return this.$store.state.shoppingLists
    }
  },

  methods: {
    getLists() {
      this.open = !this.open;

      if (this.shoppingListIDs.length === 0) {
        this.gettingLists = true
        this.$store.dispatch('getShoppingLists').then(() => {
          this.gettingLists = false
        })
      }
    },

    addToList(listID) {
      axios
        .post("shoppingListItem", {
          shopping_list_id: listID,
          recipe_component_id: this.componentID,
        })
        .then(() => {
          this.open = false;
        });
    },
  },
};
</script>

<style scoped>
.lists-container {
  position: fixed;
  background: white;
  z-index: 10000;
  border: 1px dotted black;
  border-radius: 3px;
  box-shadow: 2px 2px 2px black;
  padding: 8px;
}

</style>
