<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="closeModal"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <Transition name="sheet-slide" appear>
          <div v-if="isOpen" class="modal-container" :style="modalStyle">
            <div class="modal-handle-area">
              <div class="modal-handle"></div>
            </div>

            <div class="modal-content">
              <div class="task-preview" v-if="task">
                <h3>{{ task.title }}</h3>
                <p>Manage your task settings</p>
              </div>

              <ul v-if="stationOption === null" class="options-list">
                <li @click="selectedOption('edit')" class="options">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                  <span class="options-text">Edit Details</span>
                </li>

                <li @click="handleAction('add-subtask')" class="options">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span class="options-text">Add Sub-task</span>
                </li>

                <li @click="selectedOption('editStatus')" class="options">
                  <div
                    class="status-indicator"
                    :style="{
                      backgroundColor: formatStatus(task?.boardType).color,
                    }"
                    :class="task?.status"
                  ></div>
                  <span class="options-text">Change Status</span>
                  <span
                    :style="{
                      backgroundColor: formatStatus(task?.boardType).background,
                      color: formatStatus(task?.boardType).color,
                    }"
                    class="badge"
                    >{{ formatStatus(task?.boardType).title }}</span
                  >
                </li>

                <li @click="selectedOption('editPriority')" class="options">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    :fill="formatPriority(task?.priority).color"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15 2H1V11H15V2Z" fill="black" />
                    <path
                      d="M1 17V11M1 11H15V2H1M1 11V2M1 2V1"
                      :stroke="formatPriority(task?.priority).color"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="options-text">Set Priority</span>
                  <span
                    class="badge"
                    :style="{
                      color: formatPriority(task?.priority).color,
                    }"
                    >{{ formatPriority(task?.priority).text }}</span
                  >
                </li>

                <hr class="divider" />

                <li
                  @click="handleAction('delete')"
                  class="options delete-action"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF4D4D"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    ></path>
                  </svg>
                  <span class="options-text" style="color: #ff4d4d"
                    >Delete Task</span
                  >
                </li>
              </ul>

              <EditTask v-if="stationOption === 'edit'" :task="task" />
              <EditStatus v-if="stationOption === 'editStatus'" :task="task" />
              <EditPriority
                v-if="stationOption === 'editPriority'"
                :task="task"
              />

              <button
                v-if="stationOption === null"
                @click="closeModal"
                class="close-btn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.87348 5.81282C6.58058 5.51992 6.10571 5.51992 5.81282 5.81282C5.51992 6.10571 5.51992 6.58058 5.81282 6.87348L10.9393 12L5.81282 17.1265C5.51992 17.4194 5.51992 17.8943 5.81282 18.1872C6.10571 18.4801 6.58058 18.4801 6.87348 18.1872L12 13.0607L17.1265 18.1872C17.4194 18.4801 17.8943 18.4801 18.1872 18.1872C18.4801 17.8943 18.4801 17.4194 18.1872 17.1265L13.0607 12L18.1872 6.87348C18.4801 6.58058 18.4801 6.10571 18.1872 5.81282C17.8943 5.51992 17.4194 5.51992 17.1265 5.81282L12 10.9393L6.87348 5.81282Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button v-else @click="selectedOption(null)" class="close-btn">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.75 6.75L0.75 6.75M0.75 6.75L6.75 0.75M0.75 6.75L6.75 12.75"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import EditTask from "./ui/EditTask.vue";
import EditStatus from "./ui/EditStatus.vue";
import EditPriority from "./ui/EditPriority.vue";

const props = defineProps({
  isOpen: Boolean,
  task: Object,
});

const emit = defineEmits(["close", "action"]);

const stationOption = ref(null);

const priorityColor = computed(() => {
  const colors = { High: "#FF4D4D", Medium: "#FFA500", Low: "#4CAF50" };
  return colors[props.task?.priority] || "#002055";
});

const selectedOption = (value) => {
  stationOption.value = value;
};

const handleAction = (type) => {
  emit("action", { type, taskId: props.task?.id });
  closeModal();
};

const startY = ref(0);
const currentY = ref(0);
const isDragging = ref(false);

const modalStyle = computed(() => {
  const diff = isDragging.value
    ? Math.max(0, currentY.value - startY.value)
    : 0;
  return {
    transform: `translateY(${diff}px)`,
    transition: isDragging.value
      ? "none"
      : "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
  };
});

const closeModal = () => {
  isDragging.value = false;
  currentY.value = 0;
  startY.value = 0;
  emit("close");
};

const formatStatus = (status) => {
  const dict = {
    not_started: {
      title: "Not Started",
      color: "#0B01AA",
      background: "rgba(108, 99, 255, 0.6)",
    },
    in_progress: {
      title: "In Progress",

      color: "#A95B00",
      background: "rgba(255, 176, 84, 0.6)",
    },
    сompleted: {
      title: "Completed",
      color: "#399300",
      background: "rgba(168, 201, 147, 0.6)",
    },
  };
  return dict[status];
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

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY;
  isDragging.value = true;
};
const onTouchMove = (e) => {
  if (!isDragging.value) return;
  currentY.value = e.touches[0].clientY;
};
const onTouchEnd = () => {
  const diff = currentY.value - startY.value;
  isDragging.value = false;
  if (diff > 100) closeModal();
  else {
    currentY.value = 0;
    startY.value = 0;
  }
};

watch(
  () => props.isOpen,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  },
);
</script>

<style scoped>
/* Основные стили из вашего примера */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.modal-container {
  width: 100%;
  background: #fcfdff;
  border-radius: 30px 30px 0 0;
  padding-bottom: 40px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-handle-area {
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-handle {
  width: 36px;
  height: 4px;
  background: #e2e8f0;
  border-radius: 10px;
}

.modal-content {
  padding: 0 20px;
}

/* Стили для контекста задачи */
.task-preview {
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
}

.task-preview h3 {
  margin: 0;
  font-size: 20px;
  color: #002055;
}

.task-preview p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #7c8db5;
}

/* Элементы списка */
.options-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.options {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #f0f5ff;
  border-radius: 18px;
  margin-bottom: 8px;
  transition: background 0.2s;
}

.options:active {
  background: #f8faff;
}

.options-text {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  color: #002055;
}

.divider {
  border: none;
  border-top: 1px solid #f0f5ff;
  margin: 12px 0;
}

/* Индикаторы */
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.badge {
  font-size: 12px;
  padding: 4px 8px;
  background: #f0f5ff;
  border-radius: 8px;
}

.priority-label {
  font-size: 14px;
  font-weight: 600;
}

.delete-action {
  border-color: #fff0f0;
}

.close-btn {
  margin: 20px auto 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #7479ff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(116, 121, 255, 0.3);
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sheet-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-slide-leave-active {
  transition: transform 0.3s ease-in;
}
.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%);
}
</style>
