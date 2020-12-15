<template>
  <div v-if="show" style="color: red;">
    <ul>
      <li v-for="e in relevantErrors" :key="e">
        {{ e }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errorKey: String,
    errors: Object,
  },
  computed: {
    show() {
      return Object.keys(this.errors).length > 0
    },
    relevantErrors() {
      return this.errors[this.errorKey] ? this.errors[this.errorKey] : []
    }
  },
}
</script>
