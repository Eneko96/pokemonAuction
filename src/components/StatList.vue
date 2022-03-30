<script>

export default {
  props: {
    stats: Array
  },
}
</script>

<template>
<ul>
  <div class="typeContainer">
    <p v-for="stat in stats" class="typewriter">{{stat.stat.name}}</p>
  </div>
</ul>
</template>

<style>

.typeContainer {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: left;
  /* align-items: center; */
}

ul {
  line-height: .1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0;
  text-align: start;
  padding-left: 0;
  align-self: flex-start;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: black }
}

li {
  display: flex;
  align-items: center;
  justify-content: start;
  border-right: .15em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 1s steps(40, end), blink-caret .75s step-end infinite;
}
.header {
  font-weight: bold;
  margin: 0 1rem;
}

@media screen and (max-width: 400px) {
  
}

.typewriter {
  align-self: flex-start;
  color: black;
  padding: .5rem;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3s steps(30, end),
    blink-caret .5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}

</style>