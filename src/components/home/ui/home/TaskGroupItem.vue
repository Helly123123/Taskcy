<template>
  <div class="group-item">
    <div class="group-info">
      <div class="group-icon" :style="{ backgroundColor: color + '15' }">
        {{ icon }}
      </div>
      <div>
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
          :stroke="color"
          :stroke-dasharray="progress + ', 100'"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="21" class="percentage-text">{{ progress }}%</text>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "tasks", "progress", "color", "icon"]);
</script>

<style scoped>
.group-item {
  background: white;
  padding: 12px 16px;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.group-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.group-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.group-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}
.group-subtitle {
  margin: 2px 0 0 0;
  color: #aaa;
  font-size: 12px;
}

.mini-chart {
  width: 45px;
  height: 45px;
}
.circle-bg {
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 3;
}
.circle {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}
.percentage-text {
  font-size: 9px;
  font-weight: bold;
  text-anchor: middle;
  fill: #333;
}
</style>
