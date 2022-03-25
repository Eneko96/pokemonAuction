<script>

export default {
  props: {
    stats: Array
  },
}
</script>

<template>
<ul>
  <li v-for="stat in stats">
    <p class="header">{{stat.stat.name}}:</p><p>{{stat.base_stat}}</p>
  </li>
</ul>
</template>

<style>
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
  text-align: start;
  padding-left: 0;
  align-self: flex-start;
}

li {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 1rem;
}
.header {
  font-weight: bold;
  margin: 0 1rem;
}

@media screen and (max-width: 400px) {
  
}

</style>