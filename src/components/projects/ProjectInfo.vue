<template>
  <div class="task-status-container">
    <Transition name="fade" mode="out-in">
      <div v-if="loading" class="loader-overlay">
        <div class="modern-loader">
          <div class="inner-circle"></div>
          <div class="pulse"></div>
        </div>
        <span class="loading-text">Загрузка данных</span>
      </div>

      <div v-else class="content-view">
        <PageHeader :projectName="projectInfo.name" />
        <Chart :tasks="projectInfo.info" />
        <TasksList :projectId="projectInfo.id" :tasks="projectInfo.info" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import PageHeader from "../medical/PageHeader.vue";
import Chart from "./ui/ProjectInfo/Chart.vue";
import TasksList from "./ui/ProjectInfo/TasksList.vue";

import { useProjectsStore } from "@/stores/projectsStore";
const projectsStore = useProjectsStore();

import { useRoute } from "vue-router";
const route = useRoute();

const projectInfo = ref(null);
const loading = ref(true);

const getInfoById = async () => {
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  projectInfo.value = projectsStore.getInfoProjectById(route.query.id);

  loading.value = false;
  console.log(projectInfo.value);
};

onMounted(getInfoById);
</script>

<style scoped>
.task-status-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  margin-bottom: 60px;
}

/* Центрирование лоадера строго посередине */
.loader-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

/* Стили современного лоадера */
.modern-loader {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6c63ff, #3f37c9);
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.4);
}

.pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid #6c63ff;
  border-radius: 50%;
  animation: ripple 1.5s ease-out infinite;
  opacity: 0;
}

.modern-loader::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px dashed #6c63ff;
  border-radius: 50%;
  animation: spin 3s linear infinite;
  opacity: 0.3;
}

/* Текст под лоадером */
.loading-text {
  margin-top: 20px;
  font-weight: 500;
  color: #6c63ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.8rem;
  animation: pulse-text 1.5s ease-in-out infinite;
}

/* Анимации */
@keyframes ripple {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-text {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

/* Плавный переход контента */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
