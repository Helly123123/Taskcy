<template>
  <div class="project-card">
    <div class="card-top">
      <span class="category">{{ category }}</span>
      <div
        class="icon-box"
        :style="{ backgroundColor: color + '15', color: color }"
      >
        💼
      </div>
    </div>
    <h3 class="title">{{ title }}</h3>
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: progress + '%', backgroundColor: color }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps(["category", "title", "progress", "color"]);
</script>

<style scoped>
.project-card {
  min-width: 240px;
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}
.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.category {
  color: #999;
  font-size: 13px;
}
.icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 16px;
  margin: 0 0 20px 0;
  height: 40px;
  overflow: hidden;
}
.progress-bar {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style>
