<template>
  <form @submit.prevent="uploadImage">
    <input type="file" @change="onFileChange" />
    <button type="submit">Upload</button>
  </form>
</template>

<script setup>
import axios from "axios";
import { tokenUserStore } from "@/store/token";
const tokenStore = tokenUserStore();
const token = tokenStore.getToken();

let file = null;
const BASE_URL = "https://codersbay.a-scho-wurscht.at/api/user";

function onFileChange(event) {
  file = event.target.files[0];
}

function uploadImage() {
  let formData = new FormData();
  formData.append("image", file);

  axios
    .post(`${BASE_URL}/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
