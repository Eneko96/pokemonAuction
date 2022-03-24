<script>

export default {
  props: {
    stats: Array
  },
  data() {
    return {
      stats: this.stats
    }
  }
}
</script>

<template>
<ul>
  <li v-for="stat in stats">
    {{stat.base_stat}}
  </li>
</ul>
</template>