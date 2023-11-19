import { createStore } from "vuex";

export default createStore({
  state: {
    email: "",
  },
  getters: {
    getEmail(state) {
      return state.email;
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    setEmail({ commit }, email) {
      commit("setEmail", email);
    },
  },
});
