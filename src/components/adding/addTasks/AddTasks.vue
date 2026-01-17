<template>
  <div class="mobile-app-container animate-fade-in">
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loader-content">
          <div class="spinner-wrapper">
            <div class="main-spinner"></div>
            <div class="inner-spinner"></div>
          </div>
          <p class="loading-text">Saving task...</p>
        </div>
      </div>
    </Transition>

    <div class="task-card" :class="{ 'blur-content': loading }">
      <PageHeader />

      <div class="form-content">
        <div class="form-group">
          <label>Task Name</label>
          <input
            type="text"
            class="custom-input"
            v-model="formData.name"
            placeholder="Enter task name"
          />
        </div>

        <div class="form-group">
          <label>Project</label>
          <Select
            v-model="formData.project"
            :options="projects"
            optionLabel="name"
            class="prime-overrides"
            appendTo="body"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="project-pill">
                <span
                  class="dot"
                  :style="{ background: slotProps.value.color }"
                ></span>
                <span>{{ slotProps.value.name }}</span>
              </div>
            </template>
            <template #option="slotProps">
              <div class="project-pill">
                <span
                  class="dot"
                  :style="{ background: slotProps.option.color }"
                ></span>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Select>
        </div>

        <div class="form-group">
          <label>Date</label>
          <DatePicker
            v-model="formData.date"
            dateFormat="MM d, yy"
            showIcon
            iconDisplay="input"
            class="prime-overrides"
          />
        </div>

        <div class="time-grid">
          <div class="form-group">
            <label>Start Time</label>
            <DatePicker
              v-model="formData.startTime"
              timeOnly
              hourFormat="12"
              placeholder="09:30 am"
              class="prime-overrides"
            />
          </div>
          <div class="form-group">
            <label>End Time</label>
            <DatePicker
              v-model="formData.endTime"
              timeOnly
              hourFormat="12"
              placeholder="03:30 pm"
              class="prime-overrides"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Board</label>
          <div class="board-selector">
            <button
              v-for="opt in ['not_started', 'in_progress', 'сompleted']"
              :key="opt"
              :class="['board-btn', { active: formData.boardType === opt }]"
              @click="formData.boardType = opt"
            >
              {{ opt }}
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
import { computed, reactive, ref } from "vue";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import PageHeader from "@/components/medical/PageHeader.vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";

const projectsStore = useProjectsStore();
const router = useRouter();
const loading = ref(false);

const formData = reactive({
  name: "",
  project: "",
  date: new Date(2021, 10, 1),
  startTime: null,
  endTime: null,
  boardType: "not_started",
});

const projects = computed(() => projectsStore.projectsWithInfo);

const pushTo = (pageName, id, type) => {
  router.push({
    name: pageName,
    query: { id: id, type: type },
  });
};

const saveTask = async () => {
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  projectsStore.addTaskToProject(formData.project.name, formData);

  loading.value = false;

  pushTo("Tasks", formData.project.id, formData.boardType);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

.task-card {
  width: 100%;
  max-width: 420px;
  margin-bottom: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: filter 0.3s ease;
}

.blur-content {
  filter: blur(4px);
  pointer-events: none;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  text-align: center;
}

.spinner-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
}

.main-spinner {
  width: 100%;
  height: 100%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #6c72ff;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.inner-spinner {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-bottom: 3px solid #ffab2d;
  border-radius: 50%;
  animation: spin-reverse 1.2s linear infinite;
}

.loading-text {
  font-weight: 600;
  color: #002055;
  font-size: 16px;
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
