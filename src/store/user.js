import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://codersbay.a-scho-wurscht.at/api";

export const useUserStore = defineStore("userEdit", {
  state: () => ({}),
  actions: {
    //////////////////////////////////// DELETE API/USER/
    async removeUser(token) {
      try {
        const url = `${BASE_URL}/user`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.delete(url, config);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    ///////////////////////////////// POST API/USER/PASSWORD/
    async updatePassword(token, newPassword) {
      try {
        const url = `${BASE_URL}/user/password`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.post(url, newPassword, config);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    ////////////////////////////////////////// PUT API/USER/
    async updateUser(token, userData) {
      try {
        const url = `${BASE_URL}/user`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.put(url, userData, config);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    ///////////////////////////////////////////////End Actions/
  },
});
