import { defineStore } from "pinia";

export const tokenUserStore = defineStore("token", {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      window.localStorage.setItem("token", token);
      this.token = token;
    },

    removeToken() {
      window.localStorage.removeItem("token");
      this.token = null;
    },

    getToken() {
      this.token = window.localStorage.getItem("token") ?? null;
      return this.token;
    },
  },
});
