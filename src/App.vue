<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import TestComponent from './components/TestComponent.vue';
</script>

<template>
  <TestComponent />
</template>

<style>
#app {
  display: flex;
  align-items: center;
  height: 98vh;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (max-width: 400px) {
  body {
    overflow: auto;
  }
}

</style>
