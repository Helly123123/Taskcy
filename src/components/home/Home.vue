<template>
  <div class="dashboard">
    <!-- <header class="header">
      <div class="user-info">
        <img
          src="https://i.pravatar.cc/100?u=livia"
          alt="Avatar"
          class="avatar"
        />
        <div class="user-text">
          <span class="greeting">Hello!</span>
          <h1 class="user-name">Livia Vaccaro</h1>
        </div>
      </div>
      <div class="notification">
        <div class="bell-icon">🔔</div>
        <div class="dot"></div>
      </div>
    </header> -->

    <div class="hero-card">
      <div class="hero-content">
        <p>Your today's task<br />almost done!</p>
        <button @click="pushTo" class="view-task-btn">View Task</button>
      </div>
      <div class="hero-progress">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path
            class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            class="circle"
            stroke-dasharray="85, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" class="percentage">85%</text>
        </svg>
      </div>
    </div>

    <section class="section">
      <div class="section-header">
        <h2>In Progress</h2>
        <span class="badge count-badge">6</span>
      </div>
      <div class="horizontal-scroll">
        <ProjectCard
          category="Office Project"
          title="Grocery shopping app design"
          :progress="60"
          color="#3b82f6"
        />
        <ProjectCard
          category="Personal Project"
          title="Uber Eats redesign challenge"
          :progress="45"
          color="#f97316"
        />
      </div>
    </section>

    <section class="section">
      <div class="section-header underline">
        <h2>Task Groups</h2>
        <span class="badge">4</span>
      </div>
      <div class="task-groups-list">
        <TaskGroupItem
          title="Office Project"
          tasks="23"
          progress="70"
          color="#ec4899"
          icon="💼"
        />
        <TaskGroupItem
          title="Personal Project"
          tasks="30"
          progress="52"
          color="#8b5cf6"
          icon="👤"
        />
        <TaskGroupItem
          title="Daily Study"
          tasks="30"
          progress="87"
          color="#f97316"
          icon="📖"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectCard from "./ui/home/ProjectCard.vue";
import TaskGroupItem from "./ui/home/TaskGroupItem.vue";
const pushTo = (pageName) => {
  localStorage.clear();
};
</script>

<style>
/* Глобальные стили для примера */
body {
  margin: 0;
  background-color: #f8faff;
  font-family: "Inter", sans-serif;
}

.dashboard {
  padding: 24px;
  max-width: 450px;
  margin: 0 auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.greeting {
  color: #888;
  font-size: 14px;
}
.user-name {
  font-size: 18px;
  margin: 0;
  font-weight: 700;
}
.notification {
  position: relative;
  font-size: 20px;
}
.dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: #5a4af4;
  border-radius: 50%;
  border: 2px solid white;
}

/* Hero Card */
.hero-card {
  border-radius: 24px;
  padding: 25px;
  color: white;
  box-shadow: 0 5px 10px 0 rgba(49, 123, 250, 0.08);
  background: #756ef3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
}
.hero-content p {
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  margin-bottom: 15px;
}
.view-task-btn {
  background: #eee9ff;
  color: #5a4af4;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

/* Circular Chart */
.circular-chart {
  width: 85px;
  height: 85px;
}
.circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3;
}
.circle {
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
}
.percentage {
  fill: white;
  font-size: 8px;
  font-weight: bold;
  text-anchor: middle;
}

/* Sections */
.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}
.section-header h2 {
  font-size: 20px;
  margin: 0;
}
.badge {
  background: #eee;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  color: #666;
}
.count-badge {
  background: #e0e7ff;
  color: #5a4af4;
}
.underline h2 {
  border-bottom: 3px solid #5a4af4;
  padding-bottom: 4px;
}

.horizontal-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
}
.horizontal-scroll::-webkit-scrollbar {
  display: none;
}
</style>
