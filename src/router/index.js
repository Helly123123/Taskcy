import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "@/views/StartScreen.vue";

const routes = [
  {
    path: "/start-screen",
    name: "startScreen",
    component: StartScreen,
  },
];

const router = createRouter({
  history: createWebHistory(), // Использует чистые URL без решетки #
  routes,
});

export default router;
