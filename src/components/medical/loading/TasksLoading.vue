<template>
  <div class="scrollable-content">
    <div class="list-stack">
      <div v-for="i in 5" :key="i" class="skeleton-card">
        <div class="skeleton-info">
          <div class="skeleton-dot"></div>
          <div class="skeleton-text"></div>
        </div>
        <div class="skeleton-badge"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.scrollable-content {
  margin-top: 16px;
  flex: 1;
  overflow-y: auto;
}

.skeleton-card {
  height: 60px;
  padding: 16px 20px;
  margin-bottom: 12px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.skeleton-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skeleton-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f1f5f9;
}

.skeleton-text {
  width: 140px;
  height: 12px;
  background: #f1f5f9;
  border-radius: 4px;
}

.skeleton-badge {
  width: 60px;
  height: 24px;
  background: #f1f5f9;
  border-radius: 8px;
}

/* Анимация перелива */
.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
