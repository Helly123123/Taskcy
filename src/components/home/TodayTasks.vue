<template>
  <div class="phone-screen">
    <PageHeader />
    <Calendar
      :active-date="selectedDate"
      :tasks="tasks"
      @selected-date="updateSelectedDate"
    />

    <Filter :currentFilter="currentFilter" @update="updateCurrentFilter" />
    <div class="tasks-scroll">
      <TasksList :tasks="tasks" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Calendar from "./ui/todayTasks/Calendar.vue";
import Filter from "./ui/todayTasks/Filter.vue";
import TasksList from "../projects/ui/tasks/TasksList.vue";
import PageHeader from "../medical/PageHeader.vue";

import { useProjectsStore } from "@/stores/projectsStore";
const projectsStore = useProjectsStore();
const getTodayStr = () => {
  return new Date().toISOString().split("T")[0];
};
const selectedDate = ref(getTodayStr());
const currentFilter = ref("all");

const loading = ref(false);
const tasks = ref([]);

function updateCurrentFilter(value) {
  currentFilter.value = value;
  getTasks();
}

function updateSelectedDate(newDate) {
  selectedDate.value = newDate;
  getTasks();
}

const getTasks = async () => {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    tasks.value =
      projectsStore.findTasksByDateAndStatus(
        currentFilter.value,
        selectedDate.value,
      ) || [];

    console.log(tasks.value, currentFilter.value, selectedDate.value);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getTasks();
});
</script>

<style scoped>
.phone-screen {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.task-anim-enter-active,
.task-anim-leave-active {
  transition: all 0.3s ease;
}
.task-anim-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.task-anim-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.empty-state {
  text-align: center;
  color: #8e8e93;
  margin-top: 40px;
  font-style: italic;
  font-size: 14px;
}
</style>
