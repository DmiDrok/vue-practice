import { createStore } from 'vuex';


const store = createStore({
  state() {
    return {
      showPopup: false,
      userIntro: true, // Пользователь по умолчанию в процессе обучения
      minValueLength: 5,
    }
  },

  mutations: {
    setPopupActive(state) {
      state.showPopup = true;
    },

    setPopupHide(state) {
      state.showPopup = false;
    },

    // Пользователь выходит из обучени
    setUserOutIntro(state) {
      state.userIntro = false;
    }
  }
});

export default store;
