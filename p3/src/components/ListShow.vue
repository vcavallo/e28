<template>
  <div>
    <h1>{{ list.name }}</h1>
    <p>{{ list.description }}</p>

    <ul>
      <div v-for="i in items" :key="i.id">
        <div>
          <ShoppingListItem :id="i.id" />
        </div>
      </div>
    </ul>

    <p>
      {{ list.instructions }}
    </p>
  </div>
</template>

<script>
import { axios } from "@/api.js";
import ShoppingListItem from '@/components/ShoppingListItem.vue';

export default {
  props: ["listID"],
  created() {
    this.setUpList(this.listID);
  },
  data() {
    return {
      list: {},
      items: [],
    };
  },
  watch: {
    listID(val) {
      if (val) {
        this.setUpList(val);
      }
    },
    user(val) {
      if (val) {
        this.setUpList(this.listID)
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    setUpList(sID) {
      this.getList(sID);
      this.getItemsForList(sID);
    },
    getList(sID) {
      axios.get(`shoppingList/${sID}`).then((res) => {
        this.list = res.data.shoppingList;
      });
    },
    getItemsForList(sID) {
      axios.get(`shoppingListItem/query?shopping_list_id=${sID}`).then((res) => {
        this.items = res.data.results;
      });
    },
  },
  components: {
    ShoppingListItem
  }
};
</script>
