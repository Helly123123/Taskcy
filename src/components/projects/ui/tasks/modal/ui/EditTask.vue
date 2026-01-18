<template>
  <div class="mobile-app-container animate-fade-in">
    <CreateLoading :text="'Saving tasks...'" :loading="loading" />
    <div class="task-card" :class="{ 'blur-content': loading }">
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
import { reactive, ref, onMounted, watch } from "vue"; // добавили watch и onMounted
import CreateLoading from "@/components/medical/loading/CreateLoading.vue";
import DatePicker from "primevue/datepicker";
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

// Инициализируем пустыми данными
const formData = reactive({
  name: "",
  project: "",
  date: new Date(),
  startTime: null,
  endTime: null,
  boardType: "not_started",
});

// Функция для заполнения формы данными из пропса
const fillForm = () => {
  if (props.task) {
    formData.name = props.task.name || "";
    formData.boardType = props.task.boardType || "not_started";

    // Обработка даты (превращаем строку из БД в объект JS Date для DatePicker)
    if (props.task.date) {
      formData.date = new Date(props.task.date);
    }

    // Если startTime/endTime строки, их тоже нужно превратить в Date объекты
    formData.startTime = props.task.startTime
      ? new Date(props.task.startTime)
      : null;
    formData.endTime = props.task.endTime ? new Date(props.task.endTime) : null;

    formData.projectId = props.task.projectId;
  }
};

// Вызываем при загрузке
onMounted(() => {
  fillForm();
});

const pushTo = (pageName, id, type) => {
  router.push({
    name: pageName,
    query: { id: id, type: type },
  });
};

const saveTask = async () => {
  loading.value = true;

  // Небольшая задержка для красоты (как у тебя было)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (props.task?.id) {
    console.log(props.task?.id);
    // РЕДАКТИРОВАНИЕ
    projectsStore.updateTaskFields(props.task.projectId, props.task.id, {
      name: formData.name,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
    });
  }

  loading.value = false;

  // Редирект обратно
  pushTo(
    "Tasks",
    formData.project?.id || props.task?.projectId,
    formData.boardType,
  );
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
