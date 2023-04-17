import { createRouter, createWebHistory } from "vue-router";

import homeView from "@/views/homeView.vue";

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import newsView from "@/views/newsView.vue";
import profileView from "@/views/profileView.vue";
import toDoView from "@/views/toDoView.vue";
import wetterAPI from "../components/wetterAPI.vue";

import image from "@/views/imageView.vue";

const routes = [
  { path: "/", component: homeView },

  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "/newsView", component: newsView },
      { path: "/profileView", component: profileView },
      { path: "/toDoView", component: toDoView },
    ],
  },
  { path: "/wetterAPI", component: wetterAPI },
  { path: "/image", component: image },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
