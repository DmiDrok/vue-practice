<template>
  <div class="invite vh-100 d-flex justify-content-center align-items-center text-center">
    <div class="container invite__container">
      <div class="invite__row">
        <h3 class="invite__title">Добро пожаловать!</h3>
        <p class="invite__description">Вы новичок в "Форматере"? Смело кликайте на кнопку - мы покажем Вам, как тут всё работает!</p>
        <button @click="goToCreating" type="button" class="invite__button btn btn-success">Приступить!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invite',

  methods: {
    goToCreating() {
      localStorage.setItem('oldUser', true);
      this.$router.push({ name: 'creation' });
    }
  },

  mounted() {
    // Если пользователь уже был на сайте - сразу перенаправляем его на создание формы
    if (localStorage.getItem('oldUser')) {
      this.goToCreating();
    }
  }
}
</script>

<style scoped>
/* Invite */
.invite__container {
  max-width: 550px;
}

</style>