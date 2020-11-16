<template>
  <span>
    <span v-if="unit">
      {{ quantity }}
      {{ unit }}
    </span>
    <span v-else>
      {{ quantity }}
    </span> x
    {{ name }}
  </span>
</template>

<script>
export default {
  props: [
    'quantity',
    'unit',
    'name',
  ],
}
</script>
