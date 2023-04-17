<script setup></script>

<!-- /////////////////////////////////////////////// -->
<template>
  <v-app>
    <!-- v-app-bar -->
    <v-app-bar flat color="#003566">
      <v-container class="d-flex align-center">
        <v-avatar class="me-10 ms-4" color="secondary" size="32"></v-avatar>

        <router-link to="/newsView">
          <v-btn color="#FFC300"> newsView </v-btn>
        </router-link>
        <router-link to="/profileView">
          <v-btn color="#FFC300"> profileView </v-btn>
        </router-link>

        <router-link to="/toDoView">
          <v-btn color="#FFC300"> toDoView </v-btn>
        </router-link>

        <v-btn color="#FFC300">Sign Out</v-btn>

        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>
    <!-- v-app-bar -->

    <!-- v-main -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet class="mainBoard">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main,
.mainBoard {
  background-color: #fefefe;
}
</style>
