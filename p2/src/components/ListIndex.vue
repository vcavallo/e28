<template>
  <div>
    <ul>
      <li v-for="l in lists" :key="l.id">
        <router-link :to="{ name: 'listShow', params: { listID: l.id } }">{{ l.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { axios } from '@/api.js'

export default {
  props: {
  },
  data() {
    return {
      lists: []
    }
  },
  created() {
    this.getAllLists()
  },
  methods: {
    getAllLists() {
      axios.get('shoppingList').then((res) => {
        this.lists = res.data.shoppingList;
      })
    },
  },
}
</script>

<style scoped>
</style>
