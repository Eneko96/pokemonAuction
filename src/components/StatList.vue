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
  <li v-for="stat in stats" style="display: flex;">
    <p style="font-weight: bold;">{{stat.stat.name}}:</p><p>{{stat.base_stat}}</p>
  </li>
</ul>
</template>

<style>
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>