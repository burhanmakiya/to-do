<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authy.js";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

const firstname = ref("");
const lastname = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const termsOfUseAccepted = ref(false);
const errorMessage = ref("");
const showPassword = ref(false);

const props = defineProps({
  showSignupModal: Boolean,
});

const clearForm = () => {
  email.value = "";
  firstname.value = "";
  lastname.value = "";
  username.value = "";
  password.value = "";
  termsOfUseAccepted.value = false;
  errorMessage.value = "";
};

const signUp = async () => {
  const error = await store.register(
    email.value,
    firstname.value,
    lastname.value,
    username.value,
    password.value,
    termsOfUseAccepted.value
  );
  if (error) {
    errorMessage.value = "Invalid data or duplicate email.";
  } else {
    clearForm();
    router.push("/dashboard");
  }
};
</script>
<!-- //////////////////////////////////////////////////////////////// -->
<template>
  <Transition name="modal">
    <div v-if="showSignupModal" class="modal-mask">
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
            v-model="firstname"
            color="#FFD60A"
            label="First Name"
            placeholder="Enter your first name"
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            color="#FFD60A"
            label="Last Name"
            placeholder="Enter your Last name"
          ></v-text-field>
          <v-text-field
            v-model="username"
            color="#FFD60A"
            label="Username"
            placeholder="Enter your username"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            color="#FFD60A"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-checkbox
            v-model="termsOfUseAccepted"
            color="#FFD60A"
            label="I accept the terms and conditions."
          ></v-checkbox>
          <div class="modal-actions">
            <v-btn class="modal-buttons" @click="$emit('close'), clearForm()">
              Back
            </v-btn>
            <v-btn class="modal-buttons" @click="signUp()"> Sign up </v-btn>
          </div>
        </v-container>
      </v-card>
    </div>
  </Transition>
</template>
<!-- //////////////////////////////////////////////////////////////// -->
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
