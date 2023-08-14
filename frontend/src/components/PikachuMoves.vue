<script setup lang="ts">
defineProps({
  pikachu: Object
})
</script>

<template>
  <div class="moves-container">
    <h2>Here are some {{ pikachu.name }} moves</h2>

    <div v-for="move in pikachu.moves">
      {{ move.move.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.moves-container {
  margin: 50px 0;
  overflow-y: auto;
  height: 80vh;

  h2 {
    margin-bottom: 10px;
  }
}
</style>
