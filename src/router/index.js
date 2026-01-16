import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "@/views/StartScreen.vue";
import test from "@/components/test.vue";

const routes = [
  {
    path: "/start-screen",
    name: "startScreen",
    component: StartScreen,
  },
  {
    path: "/",
    name: "test",
    component: test,
  },
];

const router = createRouter({
  history: createWebHistory(), // Использует чистые URL без решетки #
  routes,
});

export default router;
