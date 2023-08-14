<script setup lang="ts">
defineProps({
  pikachu: Object
})
</script>

<template>
  <div class="greetings">
    <h1 class="yellow">You are seeing {{ pikachu.name }} data</h1>
    <h3>Here you can see some information about the most famous pokemon in the world</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
