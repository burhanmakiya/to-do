import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://codersbay.a-scho-wurscht.at/api";

export const useTasksStore = defineStore("tasks", {
  state: () => ({}),
  actions: {
    //////////////////////////////////// ADD NEW TASK/
    async newTask(token, data) {
      const url = `${BASE_URL}/task`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.post(url, data, config);
        return res;
      } catch (err) {
        throw err;
      }
    },
    //////////////////////////////////// SEE ALL TASKS/
    async allTasks(token) {
      const url = `${BASE_URL}/user/tasks`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get(url, config);
        return res;
      } catch (err) {
        throw err;
      }
    },
    //////////////////////////////////// DELETE TASK/
    async deleteTask(token, id) {
      const url = `${BASE_URL}/task/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.delete(url, config);
        return res;
      } catch (err) {
        throw err;
      }
    },
    //////////////////////////////////// UPDATE TASK/
    async updateTask(token, id, data) {
      const url = `${BASE_URL}/task/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.put(url, data, config);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
});
