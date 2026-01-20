<template>
  <div class="group-item">
    <div class="group-info">
      <div class="text-content">
        <h4 class="group-title">{{ title }}</h4>
        <p class="group-subtitle">{{ tasks }} Tasks</p>
      </div>
    </div>
    <div class="group-progress">
      <svg viewBox="0 0 36 36" class="mini-chart">
        <path
          class="circle-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          stroke="#756ef3"
          :stroke-dasharray="progress + ', 100'"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="21.5" class="percentage-text">{{ progress }}%</text>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "tasks", "progress", "color", "icon"]);
</script>

<style scoped>
.group-item {
  border: 1px solid #e9f1ff;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.group-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0; /* Для корректного сокращения текста */
  flex: 1;
}

.group-icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.text-content {
  min-width: 0;
}

.group-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #002055;
}

.group-subtitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #848a94;
  margin-top: 4px;
}

.mini-chart {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.circle-bg {
  fill: none;
  stroke: #f3f4f6;
  stroke-width: 3;
}
.circle {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.6s ease;
}

.percentage-text {
  font-size: 9px;
  font-weight: 800;
  text-anchor: middle;
  font-weight: 500;
  font-size: 10px;
  line-height: 100%;
  text-align: center;
  fill: #002055;
}
</style>
