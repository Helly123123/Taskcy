<template>
  <div
    v-if="project"
    class="card"
    :class="{ 'card-active': isActive }"
    :style="cardStyle"
  >
    <div class="card-content">
      <h3 class="card-title">{{ project.name }}</h3>
      <p class="card-category">{{ project.category }}</p>
    </div>

    <div class="card-footer">
      <div class="progress-box">
        <div class="progress-labels">
          <span>Progress</span>
          <span class="stats">{{ completed }}/{{ total }}</span>
        </div>
        <div class="progress-track">
          <div
            class="progress-bar"
            :style="{ width: progressWidth + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  project: Object,
  isActive: Boolean,
});

// Расчеты на основе массива info
const total = computed(
  () => props.project?.info?.reduce((a, b) => a + b.count, 0) || 1,
);
const completed = computed(
  () => props.project?.info?.find((i) => i.type === "сompleted")?.count || 0,
);
const progressWidth = computed(() => (completed.value / total.value) * 100);

// Динамические стили
const cardStyle = computed(() => {
  const color = props.project?.color || "#6366F1";
  if (props.isActive) {
    return { backgroundColor: color, borderColor: "transparent" };
  }
  return { borderColor: color + "40", backgroundColor: "#FFFFFF" };
});
</script>

<style scoped>
.card {
  height: 160px;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-sizing: border-box;
  text-align: left;
}

.card-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #002055;
}
.card-active .card-title {
  color: #ffffff;
}

.card-category {
  margin: 4px 0 0 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #a0bac5;
}
.card-active .card-category {
  color: rgba(255, 255, 255, 0.7);
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-stack {
  display: flex;
}
.avatar-item {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #eee;
  border: 2px solid white;
  margin-left: -10px;
}
.avatar-item:first-child {
  margin-left: 0;
}
.card-active .avatar-item {
  background: rgba(255, 255, 255, 0.3);
}

.progress-box {
  flex: 1;
}
.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #c5dafd;
}
.card-active .progress-labels {
  color: #fff;
}

.progress-track {
  height: 6px;
  background: #f0f0f0;
  border-radius: 10px;
}
.card-active .progress-track {
  background: rgba(255, 255, 255, 0.2);
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  background: v-bind("project?.color");
}
.card-active .progress-bar {
  background: #fff;
}
</style>
