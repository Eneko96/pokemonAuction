<script>
import { createApp, ref, onMounted } from "@vue/runtime-dom";
  const randomNumber = () => {
    return Math.round(Math.random() * (155 -0) + 0)
  }

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count++
      },
      decrement() {
        this.count--
      }
    },
    setup() {
      const data = ref(null)
      const error = ref(null)
      const data2 = ref(null)
      const error2 = ref(null)

      function fetchData() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}`)
          .then(res => res.json())
          .then(res => {
            console.log(res)
            data.value = res
          })
          .catch(err => error.value = err)
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}`)
          .then(res => res.json())
          .then(res => {
            console.log(res)
            data2.value = res
          })
          .catch(err => error2.value = err)
      }
      onMounted(() => {
        fetchData()
      })

      return {
        data,
        data2,
        error,
        error2
      }
    },
    mounted() {
      console.log(`The initial state of count is ${this.count}`)
    }
  }
</script>


<template>
  <div class="boxContainer">
      <h1>Select one of them</h1>
      <div class="auctionContainer">
        <div class="pokemonContainer">
          <img :src="data?.sprites.front_default" />
          <p>{{data?.name}}</p>
        </div>
        <div class="pokemonContainer">
          <img :src="data2?.sprites.front_default" />
          <p>{{data2?.name}}</p>
        </div>
      </div>
  </div>
</template>

<style scoped>

.boxContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.pokemonContainer {
  border-radius: 8px;
  margin-top: 50px;
  width: 200px;
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: dimgray;
  transition: all;
  transition-duration: 300ms;
}

.pokemonContainer:hover {

  background-color: rgb(20, 20, 20);
}

p {
  color: white;
  font-weight: bold;
}

.auctionContainer {
  gap: 100px;
}
</style>