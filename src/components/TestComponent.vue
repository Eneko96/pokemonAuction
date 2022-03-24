<script>
import {ref, onMounted } from "@vue/runtime-dom";
  const randomNumber = () => {
    return Math.round(Math.random() * (155 -0) + 0)
  }

  export default {
    data() {
      return {
        count: 0,
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
      const lastVoted = ref(null)
      const loading = ref(false)

      function fetchData() {
        loading.value = true
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
        loading.value = false
      }

      function refetch(last) {
        lastVoted.value = last
        fetchData()
      }

      onMounted(() => {
        fetchData()
      })

      return {
        fetchData,
        refetch,
        data,
        data2,
        error,
        error2,
        lastVoted,
        loading
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
        <div v-if="!loading" class="pokemonContainer">
          <img :src="data?.sprites.front_default" v-on:click="() => refetch(data?.name)" />
          <p>{{data?.name}}</p>
        </div>
        <div v-else class="pokemonContainer">
          <p>Loading...</p>
        </div>
        <div v-if="!loading" class="pokemonContainer" v-on:click="() => refetch(data?.name)">
          <img :src="data2?.sprites.front_default" />
          <p>{{data2?.name}}</p>
        </div>
        <div v-else class="pokemonContainer">
          <p>Loading...</p>
        </div>
      </div>
      <section><h2 v-if="lastVoted">You've voted:</h2><h2 class="voted">{{ lastVoted }}</h2></section>
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
  border-radius: .5rem;
  margin-top: 2rem;
  width: 14rem;
  height: 14rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: dimgray;
  transition: all;
  transition-duration: 300ms;
}

.pokemonContainer:hover {
  box-shadow: 0 0 0 1em #cccaca;
  background-color: rgb(20, 20, 20);
}

p {
  color: white;
  font-weight: bold;
}

.auctionContainer {
  gap: 100px;
}

.voted {
  color:rgb(20, 20, 20)
}

section {
  display: flex;
  gap: 1rem;
  text-transform: uppercase;
}
</style>