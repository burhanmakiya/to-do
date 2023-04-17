<script setup>
import LoginModal from "@/components/login.vue";
import registerModal from "@/components/register.vue";
import { ref } from "vue";
const loginModel = ref(false);
const signupModel = ref(false);
</script>

Copy code
<template>
  <v-app>
    <v-main class="main">
      <v-container>
        <div class="welcome-container">
          <h1>Welcome to Our Personal Organizer!</h1>
          <p>
            With our app, you can effectively manage your daily tasks,
            appointments, and notes, and stay organized. Our user-friendly
            interface and robust features will help you achieve your goals and
            stay on top of your tasks. Start organizing your life today and
            experience the benefits of a well-organized daily routine.
          </p>

          <div class="buttons-container">
            <Teleport to="body">
              <LoginModal :show="loginModel" @close="loginModel = false">
              </LoginModal>
            </Teleport>

            <v-btn large class="custom-btn" @click="loginModel = true">
              Log In
            </v-btn>

            <Teleport to="body">
              <registerModal
                :showSignupModal="signupModel"
                @close="signupModel = false"
              ></registerModal>
            </Teleport>

            <v-btn large class="custom-btn" @click="signupModel = true">
              Sign Up
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.main {
  background-image: url("../assets/Bilder/bg-home.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

h1 {
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 4rem;
  text-align: center;
  color: #ffc300;
}

p {
  margin-bottom: 2rem;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #00141d;
  text-align: center;
}

.welcome-container {
  padding: 2rem;
  background-color: #e0f5fe;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin: 8rem 4rem;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.custom-btn {
  font-size: 1.6rem;
  border-radius: 7px;
  background-color: #003566;
  color: #ffd60a;
}

.custom-btn:hover {
  background-color: #ffd60a;
  color: #003566;
}
</style>
