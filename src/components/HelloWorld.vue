<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>
  <div id="pokemon">{{ message }}</div>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style>
a {
  color: #42b983;
}
button {
  user-select: none;
  background-color: rgb(27, 25, 25);
  border-radius: 5px;
  border: 0;
  color: white;
  padding: .4rem 1rem;
  cursor: pointer;
}
button:hover {
  transition: all;
  transition-duration: 300ms;
  opacity: .7;
}
button:active {
  opacity: .9;
}
</style>
