import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      name: "",
      messages: [],
      users: [],
      network: true
    };
  },
  mutations: {
    reset(state) {
      state.name = "";
      state.messages = [];
      state.users = [];
    },
    storeUsers(state, payload) {
      const newUser = state.users.slice();
      newUser[payload.newIndex] = payload;
      state.users = newUser;
    },
    storeMessage(state, payload) {
      // avoiding side-effects
      const newMessage = state.messages.slice();
      newMessage[payload.newIndex] = payload;
      state.messages = newMessage;
    },
    login(state, payload) {
      state.name = payload;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
