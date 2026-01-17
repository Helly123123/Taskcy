<template>
  <div class="scrollable-content">
    <div v-auto-animate class="list-stack">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="project-card"
        :class="{ 'is-completed-card': task.boardType === 'сompleted' }"
      >
        <div class="card-content">
          <div class="main-info">
            <span :class="['status-dot', task.boardType]"></span>
            <h3
              :class="[
                'name',
                { 'line-through': task.boardType === 'сompleted' },
              ]"
            >
              {{ task.name }}
            </h3>
          </div>

          <div class="actions">
            <span :class="['status-badge', task.boardType]">
              {{ formatStatus(task.boardType) }}
            </span>

            <button class="menu-btn" @click.stop="openMenu(task.id)">
              <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#848A94" />
                <circle cx="8" cy="2" r="2" fill="#848A94" />
                <circle cx="14" cy="2" r="2" fill="#848A94" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vAutoAnimate } from "@formkit/auto-animate/vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const formatStatus = (status) => {
  const dict = {
    not_started: "Not Started",
    in_progress: "In Progress",
    сompleted: "Completed",
  };
  return dict[status] || "План";
};

const openMenu = (id) => console.log("Menu id:", id);
</script>

<style scoped>
.scrollable-content {
  flex: 1;
  margin-top: 16px;
  overflow-y: auto;
  scrollbar-width: none;
}

.scrollable-content::-webkit-scrollbar {
  display: none;
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card {
  padding: 18px 20px;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  background: #fff;
  /* Для AutoAnimate важно оставить CSS чистым */
  transition: background 0.2s ease;
}

.is-completed-card {
  background: #fcfdfe;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.not_started {
  background: #cbd5e1;
}
.status-dot.in_progress {
  background: #3b82f6;
}
.status-dot.сompleted {
  background: #10b981;
}

.name {
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  color: #002055;
}

.line-through {
  text-decoration: line-through;
  color: #94a3b8;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  background: #f1f5f9;
  color: #64748b;
}

.status-badge.in_progress {
  background: #eff6ff;
  color: #3b82f6;
}
.status-badge.сompleted {
  background: #ecfdf5;
  color: #10b981;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
}

.menu-btn:hover {
  background: #f1f5f9;
}
</style>
