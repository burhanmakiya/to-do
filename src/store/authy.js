import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://codersbay.a-scho-wurscht.at/api/auth";

function handleLoginOrRegistration(response) {
  this.token = response.data.accessToken;
  this.user = response.data.user;
  window.localStorage.setItem("token", this.token);

  console.log(JSON.stringify(this.user));
}

function handleError(error) {
  return `An error occurred: ${error}`;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: window.localStorage.getItem("token") ?? null,
  }),
  actions: {
    ///////////////////////////////////////// LOG IN/
    async login(email, password) {
      window.localStorage.clear();
      const data = { email, password };
      try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        handleLoginOrRegistration.call(this, response);
        return null;
      } catch (error) {
        return handleError(error);
      }
    },
    ///////////////////////////////////////// Sing UP/
    async register(
      email,
      firstname,
      lastname,
      username,
      password,
      termsOfUseAccepted
    ) {
      const data = {
        email: email,
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password,
        termsOfUseAccepted: termsOfUseAccepted,
      };
      try {
        const response = await axios.post(`${BASE_URL}/register`, data);
        handleLoginOrRegistration.call(this, response);
        return null;
      } catch (error) {
        return handleError(error);
      }
    },
  },
});
