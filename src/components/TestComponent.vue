<script>
import {ref, onMounted } from "@vue/runtime-dom";
import StatList from "./StatList.vue";
  const randomNumber = () => {
    return Math.round(Math.random() * (155 -0) + 0)
  }

  export default {
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    },
    setup() {
        const data = ref(null);
        const error = ref(null);
        const data2 = ref(null);
        const error2 = ref(null);
        const lastVoted = ref(null);
        const loading = ref(false);
        function fetchData() {
            loading.value = true;
            fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}`)
                .then(res => res.json())
                .then(res => {
                data.value = res;
            })
                .catch(err => error.value = err);
            fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}`)
                .then(res => res.json())
                .then(res => {
                console.log(res)
                data2.value = res;
            })
                .catch(err => error2.value = err);
            loading.value = false;
        }
        function refetch(last) {
            lastVoted.value = last;
            fetchData();
        }
        function nullLast() {
            lastVoted.value = null;
        }
        onMounted(() => {
            fetchData();
        });
        return {
            fetchData,
            refetch,
            nullLast,
            data,
            data2,
            error,
            error2,
            lastVoted,
            loading
        };
    },
    mounted() {
        console.log(`The initial state of count is ${this.count}`);
    },
    components: { StatList }
}
</script>


<template>
  <div class="boxContainer">
      <h1 v-if="!lastVoted">Select one of them</h1>
      <div v-if="!lastVoted" class="auctionContainer">
        <div v-if="!loading" class="pokemonContainer" v-on:click="() => refetch(data)">
          <img :src="data?.sprites.front_default" />
          <p>{{data?.name}}</p>
        </div>
        <div v-else class="pokemonContainer">
          <p>Loading...</p>
        </div>
        <div v-if="!loading" class="pokemonContainer" v-on:click="() => refetch(data)">
          <img :src="data2?.sprites.front_default" />
          <p>{{data2?.name}}</p>
        </div>
        <div v-else class="pokemonContainer">
          <p>Loading...</p>
        </div>
      </div>
      <div v-if="lastVoted" style="display: flex; gap: 5rem">
        <div style="display: flex; flex-direction: column; background-color: aliceblue; height: 100%; width: 100%; padding: 1rem; border-radius: 1rem; box-shadow: 0 0 0 .04em #cccaca;">
          You've voted:
          <img :src="lastVoted.sprites.front_default" />
        </div>
        <div style="display: flex; flex-direction: column; height: 100%; width: 100%; background-color: aliceblue; padding: 1rem; border-radius: 1rem; box-shadow: 0 0 0 .04em #cccaca;">
          Stats:
          <StatList :stats="lastVoted.stats" />
        </div>
      </div>
      <button v-if="lastVoted" v-on:click="nullLast" type="button">Continue</button>
      <!-- <section><h2 v-if="lastVoted">You've voted:</h2><h2 class="voted">{{ lastVoted }}</h2></section> -->
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

button {
  padding: 2rem 9rem;
  margin-top: 2rem;
  font-size: 1rem;
}
</style>