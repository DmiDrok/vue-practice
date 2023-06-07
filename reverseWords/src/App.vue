<template>
  <h1>Введи слово - получи перевёрнутое</h1>
  
  <ReverseInput :words="words" @reverse="reversedListener" />
  <HistoryWords :words="words" />
</template>

<script>
import ReverseInput from './components/ReverseInput.vue';
import HistoryWords from './components/HistoryWords.vue';

export default {
  components: {
    ReverseInput, HistoryWords,
  },

  data() {
    return {
      words: []
    }
  },
}
</script>

<style>

</style>
