import { createStore } from "vuex";

const initialState = () => ({
  email: "",
  user: "",
});

export default createStore({
  state: initialState(),

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

    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
  },
  actions: {
    setEmail({ commit }, email) {
      commit("setEmail", email);
    },

    setUser({ commit }, user) {
      commit("setUser", user);
    },

    resetState({ commit }) {
      commit("RESET_STATE");
    },
  },
});
