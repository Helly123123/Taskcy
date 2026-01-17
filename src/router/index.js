import { createRouter, createWebHistory } from "vue-router";
import StartScreen from "@/views/StartScreen.vue";
import test from "@/components/test.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";
import Home from "@/views/Home.vue";
import Projects from "@/views/projects/Projects.vue";
import AddProject from "@/views/adding/AddProject.vue";
import AddTasks from "@/views/adding/AddTasks.vue";
import ProjectInfo from "@/components/projects/ProjectInfo.vue";
import Tasks from "@/views/projects/Tasks.vue";

const routes = [
  {
    path: "/start-screen",
    name: "startScreen",
    component: StartScreen,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/project",
    name: "Project",
    component: Projects,
  },
  {
    path: "/project/info",
    name: "ProjectInfo",
    component: ProjectInfo,
  },
  {
    path: "/project/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    path: "/add/project",
    name: "AddProject",
    component: AddProject,
  },
  {
    path: "/add/tasks",
    name: "AddTasks",
    component: AddTasks,
  },
];

const router = createRouter({
  history: createWebHistory(), // Использует чистые URL без решетки #
  routes,
});

export default router;
