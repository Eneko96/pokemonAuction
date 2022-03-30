<script>
import { ref, onMounted } from "@vue/runtime-dom";
import StatList from "./StatList.vue";
  const randomNumber = () => {
    return Math.round(Math.random() * (155 -0) + 0)
  }

  export default {
    data() {
        return {
            count: 0,
            dialog: false
        };
    },
    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        toggleDialog() {
          this.dialog = !this.dialog
        }
    },
    setup() {
        const data = ref(null);
        const arrayVoted = ref([]);
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
                data2.value = res;
            })
                .catch(err => error2.value = err);
            loading.value = false;
        }
        function refetch(last) {
          console.log(arrayVoted.value)
            lastVoted.value = last;
            arrayVoted.value.push(last)
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
            loading,
            arrayVoted
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

        <div v-if="!loading" class="pokemonContainer" v-on:click="() => refetch(data)">
          <img :src="data2?.sprites.front_default" />
          <p>{{data2?.name}}</p>
        </div>
      </div>
      <div v-if="lastVoted" class="resultContainer">
        <div class="innerResultContainer">
          <img :src="lastVoted.sprites.front_default" style="width: 15rem;"/>
          <p style="text-transform: uppercase; color: black; font-weight: bold; font-size: 2rem; margin-bottom: 0;">{{lastVoted.name}}</p>
        </div>

        <div class="statsContainer">
          <p style="text-transform: uppercase; color: black; font-weight: bold; font-size: 2rem; margin: 0">STATS</p>
          <Transition name="slide-fade">
            <StatList :stats="lastVoted.stats" />
          </Transition>
        </div>
      </div>

      <div v-if="arrayVoted && !lastVoted" style="margin-top: 10rem; flex-wrap: wrap; overflow-x: auto;">
        <div v-for="pok in arrayVoted" style="display: flex; flex-direction: column;">
          <img :src="pok.sprites.front_default" v-on:click="toggleDialog"/>
          <p style="color: black; margin: 0;">{{pok.name}}</p> 
        </div>
      </div>
      <button v-if="lastVoted" v-on:click="nullLast" type="button">Continue</button>
  </div>
</template>

<style scoped>

.boxContainer {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
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

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.voted {
  color:rgb(20, 20, 20)
}

section {
  display: flex;
  gap: 1rem;
  text-transform: uppercase;
}

.resultContainer {
  padding: 1rem;
  display: flex;
  gap: 5rem;
}

.innerResultContainer {
  display: flex;
  flex-direction: column;
  background-color: aliceblue; 
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 0 .04em #cccaca;
  width: 20rem
}

button {
  padding: 2rem 9rem;
  margin-top: 2rem;
  font-size: 1rem;
}

@media screen and (max-width: 400px) {
  .auctionContainer {
    flex-direction: column;
  }
  .resultContainer {
    flex-direction: column;
  }
}

.statsContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: aliceblue;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 0 .04em #cccaca;
  width: 20rem;
}

</style>