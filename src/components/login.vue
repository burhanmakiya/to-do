<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authy.js";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const props = defineProps({
  show: Boolean,
});

const clearForm = () => {
  email.value = "";
  password.value = "";
  errorMessage.value = "";
};

const login = async () => {
  const error = await store.login(email.value, password.value);
  if (error) {
    errorMessage.value = "Incorrect login information";
  } else {
    clearForm();
    router.push("/dashboard");
  }
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <v-card class="modal-card" theme="dark">
        <v-container>
          <div class="modal-header">
            <h3>Access Life Planner</h3>
          </div>
          <v-divider></v-divider>
          <v-alert v-if="errorMessage" type="error" dense>
            {{ errorMessage }}
          </v-alert>
          <v-text-field
            v-model="email"
            color="#FFD60A"
            label="Email"
            placeholder="Enter your email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            color="#FFD60A"
            label="Password"
            type="password"
            placeholder="Enter your password"
          ></v-text-field>
          <div class="modal-actions">
            <v-btn class="modal-buttons" @click="$emit('close'), clearForm()">
              Back
            </v-btn>
            <v-btn class="modal-buttons" @click="login()"> Log in </v-btn>
          </div>
        </v-container>
      </v-card>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 8, 20, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-card {
  width: 20rem;
  background-color: #001d3d;
  border-radius: 8px;
}

.modal-header h3 {
  color: #ffc300;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.modal-buttons {
  background-color: #003566;
  color: #ffd60a;
}

.modal-buttons:hover {
  background-color: #ffc300;
  color: #001d3d;
}
</style>
