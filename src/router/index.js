import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "@/views/StartScreen.vue";
import test from "@/components/test.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";

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
  {
    path: "/auth/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/auth/sign-up",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(), // Использует чистые URL без решетки #
  routes,
});

export default router;
