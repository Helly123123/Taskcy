<template>
  <div class="scrollable-content">
    <div :class="['list-container', { 'grid-mode': isGrid }]">
      <div
        v-if="projects.length > 0"
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >
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
      <NoData v-else :type="'projects'" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";
import NoData from "@/components/medical/LackInformation/NoData.vue";

const props = defineProps({
  isGrid: {
    type: Boolean,
    default: false,
  },
});

const projectStore = useProjectsStore();
const router = useRouter();
const projects = computed(() => projectStore.projectsWithInfo);

const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

const pushTo = (pageName, id) => {
  router.push({ name: pageName, query: { id: id } });
};
</script>

<style scoped>
.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  scrollbar-width: none;
}
.scrollable-content::-webkit-scrollbar {
  display: none;
}

/* Базовый контейнер (режим списка) */
.list-container {
  display: grid;
  grid-template-columns: 1fr; /* В колонку по умолчанию */
  gap: 16px;
  transition: all 0.3s ease;
}

/* Режим сетки (2 в ряд) */
.list-container.grid-mode {
  grid-template-columns: 1fr 1fr; /* Две колонки */
}

.project-card {
  padding: 20px;
  border: 1px solid #f1f5f9;
  border-radius: 28px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Адаптация содержимого для узких карточек в сетке */
.grid-mode .card-top {
  flex-direction: column;
  gap: 8px;
}

.grid-mode .name {
  font-size: 13px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.name {
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: #002055;
}
.cat {
  margin: 4px 0 0;
  font-weight: 400;
  font-size: 13px;
  color: #848a94;
}

.limit-badge {
  padding: 5px 10px;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: -8px;
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
  transition: width 0.3s ease;
}
</style>
