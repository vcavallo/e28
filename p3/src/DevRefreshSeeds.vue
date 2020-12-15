<template>
<div>
  Refreshed: {{ refreshed }}
</div>
</template>

<script>
import { axios } from '@/api'
export default {
  data() {
    return {
      refreshed: false,
    }
  },
  created() {
    axios.get('/refresh').then(() => {
      this.refreshed = true
    })
  },
}
</script>
