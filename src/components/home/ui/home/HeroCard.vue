<template>
  <div class="hero-card">
    <div class="hero-body">
      <div class="hero-content">
        <p class="hero-text">Your today's task<br />almost done!</p>
        <button class="view-task-btn">View Task</button>
      </div>
      <div class="hero-chart-container">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path
            class="circle-bg-hero"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle-hero"
            stroke-dasharray="85, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="21" class="percentage-hero">85%</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Hero */
.hero-card {
  background: #756ef3;
  border-radius: 1.75rem;
  padding: 1.25rem 1.5rem 1.5rem;
  color: white;
  margin-bottom: 2rem;
}
.hero-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -0.5rem;
  opacity: 0.7;
}
.hero-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.hero-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0 0 1.2rem 0;
}
.view-task-btn {
  background: white;
  color: #756ef3;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}
.circular-chart {
  width: 5.5rem;
  height: 5.5rem;
}
.circle-bg-hero {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3.5;
}
.circle-hero {
  fill: none;
  stroke: white;
  stroke-width: 3.5;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
.percentage-hero {
  fill: white;
  font-size: 8px;
  font-weight: 800;
  text-anchor: middle;
}
</style>
