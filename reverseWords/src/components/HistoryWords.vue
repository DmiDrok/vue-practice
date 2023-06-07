<template>
  <ul>
    <li v-for="word in words">
      <div>Оригинал: <u>{{ word.defaultWord }}</u></div>
      <div>Перевёрнутое: <u>{{ word.reversedWord }}</u></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['words']
}
</script>

<style scoped>
li {
  border-bottom: 2px solid #ccc;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>