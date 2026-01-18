<template>
  <div class="card-content">
    <div class="task-main">
      <div class="main-info">
        <span :class="['status-dot', task.boardType]"></span>
        <h3
          :class="['name', { 'line-through': task.boardType === 'completed' }]"
        >
          {{ task.name }}
        </h3>
      </div>

      <div class="task-meta">
        <div class="time-info">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span
            >{{ formatTime(task.startTime) }} -
            {{ formatTime(task.endTime) }}</span
          >
        </div>

        <span
          :style="{
            backgroundColor: formatPriority(task.priority).background,
            color: formatPriority(task.priority).color,
          }"
          :class="['priority-tag', task.priority]"
        >
          {{ formatPriority(task.priority).text }}
        </span>
      </div>
    </div>

    <div class="actions">
      <span
        :style="{
          backgroundColor: getStatusStyles(task.boardType).background,
          color: getStatusStyles(task.boardType).color,
        }"
        class="status-badge"
      >
        {{ getStatusStyles(task.boardType).title }}
      </span>

      <button @click="openInfoModal(task)" class="menu-btn">
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
          <circle cx="2" cy="2" r="2" fill="#848A94" />
          <circle cx="8" cy="2" r="2" fill="#848A94" />
          <circle cx="14" cy="2" r="2" fill="#848A94" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: Object,
  openInfoModal: Function,
});

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const getStatusStyles = (status) => {
  const dict = {
    not_started: {
      title: "Not Started",
      color: "#475569",
      background: "#f1f5f9",
    },
    in_progress: {
      title: "In Progress",
      color: "#92400e",
      background: "#fef3c7",
    },
    сompleted: { title: "Completed", color: "#166534", background: "#dcfce7" },
  };
  return dict[status] || { title: "Status", color: "#000", background: "#eee" };
};

const formatPriority = (priority) => {
  const dict = {
    low: {
      text: "Low",
      value: "low",
      color: "#399300",
      background: "rgba(168, 201, 147, 0.6)",
    },
    medium: {
      text: "Medium",
      value: "medium",
      color: "#2196F3",
      background: "rgba(33, 150, 243, 0.6)",
    },
    high: {
      text: "High",
      value: "high",
      color: "#FF9800",
      background: "rgba(255, 152, 0, 0.6)",
    },
    critical: {
      text: "Critical",
      value: "critical",
      color: "#F44336",
      background: "rgba(244, 67, 54, 0.6)",
    },
  };
  return dict[priority];
};
</script>

<style scoped>
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Изменено для лучшего выравнивания при нескольких строках */
  border-radius: 8px;
}

.task-main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 18px; /* Выравнивание под текстом заголовка, пропуская точку */
}

/* Стили времени */
.time-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
}

/* Стили приоритетов */
.priority-tag {
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.not_started {
  background: #94a3b8;
}
.status-dot.in_progress {
  background: #3b82f6;
}
.status-dot.completed {
  background: #10b981;
}

.name {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
  color: #1e293b;
}

.line-through {
  text-decoration: line-through;
  color: #94a3b8;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.menu-btn:hover {
  background: #f1f5f9;
}
</style>
