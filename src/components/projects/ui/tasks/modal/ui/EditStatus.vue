<template>
  <div class="mobile-app-container animate-fade-in">
    <CreateLoading :text="'Saving status...'" :loading="loading" />

    <div class="task-card" :class="{ 'blur-content': loading }">
      <div class="form-content">
        <div class="form-group">
          <label>Status</label>
          <div class="board-selector">
            <button
              v-for="opt in statusOprions"
              :key="opt.value"
              :class="[
                'board-btn',
                { active: formData.boardType === opt.value },
              ]"
              @click="formData.boardType = opt.value"
            >
              {{ opt.text }}
            </button>
          </div>
        </div>
      </div>

      <footer class="footer">
        <button class="save-button" @click="saveTask" :disabled="loading">
          {{ loading ? "Saving..." : "Save" }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import CreateLoading from "@/components/medical/loading/CreateLoading.vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";

const router = useRouter();
const projectsStore = useProjectsStore();

const props = defineProps({
  task: {
    type: Object,
  },
});

const loading = ref(false);

const formData = reactive({
  boardType: props.task.boardType,
});

const statusOprions = [
  {
    text: "Not Started",
    value: "not_started",
  },
  {
    text: "In Progress",
    value: "in_progress",
  },
  {
    text: "Completed",
    value: "сompleted",
  },
];

const pushTo = (pageName, id, type) => {
  router.push({
    name: pageName,
    query: { id: id, type: type },
  });
};

const saveTask = async () => {
  if (!props.task?.id || !props.task?.projectId) {
    console.error("Missing task ID or Project ID", props.task);
    return;
  }

  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const success = projectsStore.updateTaskStatus(
      props.task.projectId,
      props.task.id,
      formData.boardType,
    );

    if (success) {
      pushTo("Tasks", props.task.projectId, formData.boardType);
      console.log("Task updated successfully");
    } else {
      console.error("Task not found in store");
    }
  } catch (e) {
    console.error("Error updating task:", e);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.task-card {
  width: 100%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: filter 0.3s ease;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.form-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
}
.form-content::-webkit-scrollbar {
  display: none;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 13px;
  color: #9ea5b1;
  font-weight: 500;
  margin-bottom: 8px;
}

.custom-input {
  width: 100%;
  height: 64px;
  padding: 0 24px;
  background-color: #fcfcfc;
  border: 1px solid #f1f1f1;
  border-radius: 16px;
  font-size: 16px;
  outline: none;
}

:deep(.prime-overrides) {
  width: 100% !important;
  background-color: #fcfcfc !important;
  border: 1px solid #f1f1f1 !important;
  border-radius: 16px !important;
  height: 64px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #002055 !important;
  outline: none;
}

:deep(.p-select-label),
:deep(.p-datepicker-input) {
  padding: 0 24px !important;
  background: transparent !important;
  border: none !important;
  display: flex;
  align-items: center;
}

.time-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.project-pill {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.board-selector {
  display: flex;
  gap: 10px;
}
.board-btn {
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #f0f4f8;
  background: #fff;
  color: #9ea5b1;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

.board-btn.active {
  border-color: #6c72ff;
  color: #6c72ff;
  background: #fdfdff;
  box-shadow: 0 4px 12px rgba(108, 114, 255, 0.1);
}

.save-button {
  width: 100%;
  height: 60px;
  background: #6c72ff;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(108, 114, 255, 0.3);
}

.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
