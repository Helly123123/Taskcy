<template>
  <div class="mobile-app-container animate-fade-in">
    <CreateLoading :text="'Saving priority...'" :loading="loading" />

    <div class="task-card" :class="{ 'blur-content': loading }">
      <div class="form-content">
        <div class="form-group">
          <label>Priority</label>
          <Select
            v-model="formData.priority"
            :options="priorityOptions"
            optionLabel="text"
            optionValue="value"
            placeholder="Select Priority"
            class="prime-overrides"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="project-pill">
                <span
                  class="dot"
                  :style="{
                    background: priorityOptions.find(
                      (o) => o.value === slotProps.value,
                    )?.color,
                  }"
                ></span>
                <span>{{
                  priorityOptions.find((o) => o.value === slotProps.value)?.text
                }}</span>
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>

            <template #option="slotProps">
              <div class="project-pill">
                <span
                  class="dot"
                  :style="{ background: slotProps.option.color }"
                ></span>
                <span>{{ slotProps.option.text }}</span>
              </div>
            </template>
          </Select>
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
import { computed, reactive, ref } from "vue";
import CreateLoading from "@/components/medical/loading/CreateLoading.vue";
import Select from "primevue/select";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";

const projectsStore = useProjectsStore();
const router = useRouter();
const loading = ref(false);

const props = defineProps({
  task: {
    type: Object,
  },
});

const projects = computed(() => projectsStore.projectsWithInfo);

console.log(projects);

const formData = reactive({
  priority: props.task.priority,
});

const priorityOptions = [
  { text: "Low", value: "low", color: "#4CAF50" },
  { text: "Medium", value: "medium", color: "#2196F3" },
  { text: "High", value: "high", color: "#FF9800" },
  { text: "Critical", value: "critical", color: "#F44336" },
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
    const success = projectsStore.updateTaskPriority(
      props.task.projectId,
      props.task.id,
      formData.priority,
    );

    if (success) {
      //   pushTo("Tasks", props.task.projectId, formData.boardType);
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
