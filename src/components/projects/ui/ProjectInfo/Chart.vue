<template>
  <div class="chart-section">
    <div class="donut-wrapper">
      <svg viewBox="0 0 100 100" class="donut-svg">
        <circle cx="50" cy="50" r="40" class="circle-bg" stroke="#A8C993" />

        <circle
          cx="50"
          cy="50"
          r="40"
          class="circle-progress"
          :style="{
            stroke: '#FFB054',
            strokeDashoffset: chartData.progress.offset,
            transform: `rotate(${chartData.progress.angle}deg)`,
          }"
        />

        <circle
          cx="50"
          cy="50"
          r="40"
          class="circle-progress"
          :style="{
            stroke: '#6C63FF',
            strokeDashoffset: chartData.completed.offset,
            transform: `rotate(${chartData.completed.angle}deg)`,
          }"
        />
      </svg>
      <div class="chart-text">
        <span class="percent">{{ totalCompletion }}%</span>
        <span class="label">Complete</span>
      </div>
    </div>

    <div class="legend">
      <div v-for="item in info" :key="item.type" class="legend-item">
        <span class="dot" :style="{ backgroundColor: item.color }"></span>
        <span class="legend-text"> {{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, toRefs } from "vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [], // Хорошая практика: пустой массив по умолчанию
  },
});

const info = reactive([
  { type: "сompleted", color: "#A8C993", title: "Completed" },
  { type: "in_progress", color: "#FFB054", title: "In Progress" },
  { type: "not_started", color: "#6C63FF", title: "Not Started" },
]);

// tasks теперь — это Ref
const { tasks } = toRefs(props);

const CIRCUMFERENCE = 251.3;

const totalCompletion = computed(() => {
  // Добавляем .value
  const total = tasks.value.reduce((acc, task) => acc + task.count, 0);

  // Проверяем на существование через find, чтобы не "упасть"
  const completedTask = tasks.value.find((t) => t.type === "completed"); // исправлена опечатка 'сompleted'
  const completed = completedTask ? completedTask.count : 0;

  return total > 0 ? Math.round((completed / total) * 100) : 0;
});

const chartData = computed(() => {
  const total = tasks.value.reduce((acc, task) => acc + task.count, 0);
  if (total === 0)
    return {
      completed: { offset: CIRCUMFERENCE, angle: 0 },
      progress: { offset: CIRCUMFERENCE, angle: 0 },
    };

  const getPercent = (count) => (count / total) * 100;

  const completedCount =
    tasks.value.find((t) => t.type === "completed")?.count || 0;
  const progressCount =
    tasks.value.find((t) => t.type === "in_progress")?.count || 0;

  const compPerc = getPercent(completedCount);
  const compOffset = CIRCUMFERENCE - (compPerc / 100) * CIRCUMFERENCE;

  const progPerc = getPercent(progressCount);
  const progOffset = CIRCUMFERENCE - (progPerc / 100) * CIRCUMFERENCE;

  return {
    completed: { offset: compOffset, angle: -90 },
    progress: { offset: progOffset, angle: -90 + compPerc * 3.6 },
  };
});
</script>

<style scoped>
.chart-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
.donut-wrapper {
  position: relative;
  width: 220px;
  height: 220px;
}
.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-5deg);
}
.circle-bg {
  fill: none;
  stroke-width: 12;
}
.circle-progress {
  fill: none;
  stroke-width: 12;
  stroke-dasharray: 251.3;
  stroke-linecap: round;
  transform-origin: center;
  transition: all 0.5s ease;
}

.chart-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.percent {
  display: block;
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  text-align: center;
  color: #002055;
  margin-bottom: 6px;
}
.label {
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  text-align: center;
  color: #848a94;
}

.legend {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  font-size: 13px;
  font-weight: 600;
}
.legend-item {
  display: flex;
  align-items: center;
}

.legend-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #002055;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}
</style>
