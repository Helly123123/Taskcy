<template>
  <div class="scrollable-content">
    <div class="list-stack">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div @click="pushTo('ProjectInfo', project.id)" class="card-top">
          <div class="info">
            <h3 class="name">{{ project.name }} {{ project.emoji }}</h3>
            <p class="cat">{{ project.category }}</p>
          </div>
          <span class="limit-badge">
            {{ project.info.completed }}/{{ project.info.total }}
          </span>
        </div>

        <div class="card-bottom">
          <div class="user-stack">
            <img src="https://i.pravatar.cc/100?u=a1" alt="u1" />
            <img src="https://i.pravatar.cc/100?u=a2" alt="u2" />
          </div>
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{
                width:
                  calculateProgress(
                    project.info.completed,
                    project.info.total,
                  ) + '%',
                backgroundColor: project.color,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";

const projectStore = useProjectsStore();
const router = useRouter();

// Используем геттер, который мы создали в Pinia
const projects = computed(() => projectStore.projectsWithInfo);

console.log(projects.value);
// Функция для расчета процента (чтобы не делить на ноль)
const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

const pushTo = (pageName, id) => {
  router.push({
    name: pageName,
    query: { id: id },
  });
};
</script>

<style scoped>
.scrollable-content {
  flex: 1; /* Занимает всё оставшееся пространство */
  overflow-y: auto; /* Включает внутренний скролл */
  padding-top: 12px;
  padding-bottom: 24px;

  /* Скрытие полосы прокрутки для чистого вида */
  scrollbar-width: none; /* Firefox */
}

.scrollable-content::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Карточки (без изменений) */
.project-card {
  padding: 20px;
  border: 1px solid #f1f5f9;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.name {
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #002055;
}

.cat {
  margin: 4px 0 0;
  font-weight: 400;
  font-size: 13px;
  line-height: 92%;
  color: #848a94;
}

.limit-badge {
  padding: 5px 10px;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-stack {
  display: flex;
}

.user-stack img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: -8px;
  object-fit: cover;
}

.progress-track {
  flex: 1;
  height: 7px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
}
</style>
