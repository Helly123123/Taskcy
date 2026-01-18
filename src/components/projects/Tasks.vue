<template>
  <div class="project-app">
    <div class="fixed-top">
      <PageHeader :subtitle="route.query.type" />

      <div class="search-box">
        <svg
          class="search-icon"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="9.73856"
            cy="9.73856"
            r="8.98856"
            stroke="#848A94"
            stroke-width="1.5"
          />
          <path
            d="M15.9903 16.4571L19.5143 19.972"
            stroke="#848A94"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <input type="text" placeholder="Search" class="search-input" />
      </div>
    </div>

    <TasksLoading v-if="loading" />

    <TasksList v-else :tasks="tasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProjectsStore } from "@/stores/projectsStore";
import TasksLoading from "../medical/loading/TasksLoading.vue";
import PageHeader from "../medical/PageHeader.vue";
import TasksList from "./ui/tasks/TasksList.vue";

const projectStore = useProjectsStore();
const route = useRoute();

const tasks = ref(null);
const loading = ref(false);

const getTasks = async () => {
  loading.value = true;
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 1500));

  tasks.value = projectStore.getTasksProjectById(
    route.query.id,
    route.query.type,
  );
  loading.value = false;
};

onMounted(getTasks);
</script>

<style scoped>
.project-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}

.fixed-top {
  flex-shrink: 0;
  margin-top: 16px;
}

.search-box {
  position: relative;
  margin-top: 10px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  outline: none;
  font-size: 14px;
  background: #f8fafc;
}
</style>
