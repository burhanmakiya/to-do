<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="profile-manager">
          <h2>Profile Manager</h2>
          <br />
          <!-- /////////////////////////////////////////////////////////Update Info/ -->
          <h3>Update User Information</h3>
          <v-form @submit.prevent="updateUser">
            <v-text-field label="New Email" v-model="email" type="text" />
            <v-text-field label="New Username" v-model="username" type="text" />
            <v-text-field
              label="New First Name"
              v-model="firstName"
              type="text"
            />
            <v-text-field
              label="New Last Name"
              v-model="lastName"
              type="text"
            />
            <v-btn type="submit" color="primary">Update</v-btn>
          </v-form>

          <br />
          <v-divider></v-divider>
          <br />
          <!-- /////////////////////////////////////////////////////////Update Password/ -->
          <h3>Update Password</h3>
          <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
          <v-alert v-else-if="successResponse" type="success">{{
            successResponse
          }}</v-alert>

          <v-form @submit.prevent="updateUserPassword">
            <v-text-field
              label="New Password"
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
            />
            <v-text-field
              label="Re-type Password"
              v-model="retypePassword"
              :type="showPassword ? 'text' : 'password'"
            />
            <v-checkbox
              label="Show Password"
              v-model="showPassword"
              color="primary"
            />

            <v-btn type="submit" color="primary">Update Password</v-btn>
          </v-form>

          <!-- /////////////////////////////////////////////////////////Remove User/ -->
          <h3>Delete account</h3>
          <v-divider></v-divider>
          <br />
          <p>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <div class="remove-user">
            <!-- Delete User Button -->
            <v-btn color="error" @click="removeDialog = true"
              >Delete User</v-btn
            >
            <!-- Confirmation Dialog -->
            <v-dialog v-model="removeDialog" max-width="290">
              <v-card>
                <v-card-title class="headline">Are you sure?</v-card-title>
                <v-card-text>
                  Do you really want to delete this user? This action cannot be
                  undone.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="removeDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteUserConfirmed()"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

<script setup>
import { useUserStore } from "@/store/user";
import { tokenUserStore } from "@/store/token";
import { useRouter } from "vue-router";
import { ref } from "vue";

const clearForm = () => {
  email.value = "";
  username.value = "";
  firstName.value = "";
  lastName.value = "";
  newPassword.value = "";
  retypePassword.value = "";
};

const router = useRouter();
const userStore = useUserStore();
const tokenStore = tokenUserStore();
const token = tokenStore.getToken();
// const id = window.localStorage.getItem("userId");

//////////////////////////////////////// remove the USER/
const removeDialog = ref(false);

const deleteUserConfirmed = () => {
  dialog.value = false;
  userStore.removeUser(token).then(() => {
    window.localStorage.clear();
    router.push("/");
  });
};
/////////////////////////////////////// Update the Pass/
const newPassword = ref("");
const retypePassword = ref("");
const showPassword = ref(false);
const successResponse = ref("");
const errorMessage = ref("");

const updateUserPassword = () => {
  errorMessage.value = null;
  if (newPassword.value && newPassword.value === retypePassword.value) {
    userStore.updatePassword(token, newPassword.value).then(() => {
      clearForm();
      successResponse.value = "Password updated successfully";
    });
  } else {
    errorMessage.value = "Passwords do not match or are empty";
  }
};
////////////////////////////////////// Update the INFO/
const email = ref("");
const username = ref("");
const firstName = ref("");
const lastName = ref("");

const updateUser = () => {
  errorMessage.value = null;
  successResponse.value = null;

  const data = {
    email: email.value,
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
  };

  if (data.email && data.username && data.firstName && data.lastName) {
    userStore
      .updateUser(token, data)
      .then(() => {
        clearForm();
        successResponse.value = "User info updated successfully";
      })
      .catch((error) => {
        errorMessage.value = "Params do not match specification";
      });
  } else {
    errorMessage.value = "please fill all fields";
  }
};
</script>
