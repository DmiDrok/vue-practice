<template>
  <input @keydown="listenKey" @input="listenInput" type="text" v-model="defaultWord">
  <div class="btn">
    <button @click="startReverse" :disabled="disabled">Перевернуть!</button>
  </div>

  <hr>
  <p>Итог: <u>{{ reversedWord }}</u></p>
</template>

<script>
export default {
  props: ['words'],

  data() {
    return {
      defaultWord: '',
      reversedWord: '',
      disabled: true
    }
  },

  methods: {
    startReverse() {
      this.reversedWord = this.defaultWord.split('').reverse().join('');
      this.words.push(
        { defaultWord: this.defaultWord, reversedWord: this.reversedWord },
      );

      this.defaultWord = '';
    },

    listenKey(event) {
      if (event.keyCode === 13) {
        this.startReverse();
      }
    },

    listenInput() {
      if (this.defaultWord.length > 0) {
        this.disabled = false;
      } else {      
        this.disabled = true;
      }
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px 20px;
  font-size: 20px;
  font-family: Arial, sans-serif;
}

.btn {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: none;
  border: 2px solid blue;
  border-radius: 4px;
}

button:not([disabled]) {
  cursor: pointer;
}

button:not([disabled]):hover {
  background-color: blue;
  color: white;
}

button:not([disabled]):active {
  opacity: .5;
}
</style>