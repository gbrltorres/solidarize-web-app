import { createStore } from "vuex";

export default createStore({
  state: {
    email: "",
    user: "",
  },
  getters: {
    getEmail(state) {
      return state.email;
    },

    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },

    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setEmail({ commit }, email) {
      commit("setEmail", email);
    },

    setUser({ commit }, user) {
      commit("setUser", user);
    },
  },
});
