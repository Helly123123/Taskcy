<template>
  <div class="calendar-container" ref="scrollContainer">
    <div
      v-for="day in monthDays"
      :key="day.fullDate"
      :class="['day-card', { active: activeDate === day.fullDate }]"
      @click="selectedDateValue(day.fullDate)"
      :ref="(el) => setDayRef(el, day.fullDate)"
    >
      <span class="m-name">{{ day.month }}</span>
      <span class="d-num">{{ day.dayNumber }}</span>
      <span class="d-name">{{ day.weekday }}</span>

      <div v-if="hasTasks(day.fullDate)" class="task-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";

const props = defineProps({
  tasks: { type: Array, default: () => [] },
  activeDate: { type: String, required: true },
});

const emit = defineEmits(["selectedDate", "close"]);

const scrollContainer = ref(null);
const dayRefs = ref({});

const setDayRef = (el, date) => {
  if (el) dayRefs.value[date] = el;
};

function selectedDateValue(date) {
  emit("selectedDate", date);
}

// Центрирование активного дня
const scrollToActiveDate = () => {
  const activeEl = dayRefs.value[props.activeDate];
  if (activeEl && scrollContainer.value) {
    activeEl.scrollIntoView({
      behavior: "smooth",
      inline: "center", // Центрируем карточку по горизонтали
      block: "nearest",
    });
  }
};

// Генерация данных (ваша функция без изменений)
const getMonthData = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    const d = date.getDate();
    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({
      fullDate: formatted,
      month: date.toLocaleString("en-US", { month: "short" }),
      dayNumber: d,
      weekday: date.toLocaleString("en-US", { weekday: "short" }),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const monthDays = ref(getMonthData());
const hasTasks = (dateStr) =>
  props.tasks.some((t) => (t.date?.split("T")[0] || t.date) === dateStr);

// Скроллим при монтировании
onMounted(async () => {
  await nextTick(); // Ждем, пока DOM отрисуется
  scrollToActiveDate();
});

// Скроллим, если активная дата изменилась программно
watch(
  () => props.activeDate,
  () => {
    scrollToActiveDate();
  },
);
</script>

<style scoped>
.calendar-container {
  display: flex;
  gap: 12px;
  /* padding: 0px 25px; */
  overflow-x: auto;
  scrollbar-width: none;
}
.calendar-container::-webkit-scrollbar {
  display: none;
}

.day-card {
  min-width: 60px;
  height: 105px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e9f1ff;
  position: relative;
}
.day-card.active {
  color: white;

  box-shadow: 0 5px 10px 0 rgba(49, 123, 250, 0.08);
  background: #756ef3;
}
.m-name {
  font-size: 11px;
  opacity: 0.7;
  font-weight: 500;
}
.d-num {
  font-size: 19px;
  font-weight: 800;
  margin: 4px 0;
}
.d-name {
  font-size: 12px;
  font-weight: 600;
}

.task-indicator {
  position: absolute;
  bottom: 10px;
  width: 4px;
  height: 4px;
  background: #ff708a;
  border-radius: 50%;
}
.active .task-indicator {
  background: white;
}
</style>
