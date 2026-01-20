<template>
  <div class="dashboard">
    <PageHeader :subtitle="'home'" />

    <div>
      <h2 class="title">
        Let’s make a <br />
        habits together 🙌
      </h2>
    </div>

    <section class="section">
      <div class="horizontal-scroll">
        <ProjectSlider
          category="Office Project"
          title="Grocery shopping app design"
          :progress="70"
          color="#3b82f6"
        />
        <ProjectCard
          category="Personal Project"
          title="Uber Eats redesign challenge"
          :progress="50"
          color="#f97316"
        />
      </div>
    </section>

    <section class="section">
      <HeroCard />
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Task Groups</h2>
        <span class="badge gray-badge">4</span>
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
import ProjectSlider from "./ui/home/ProjectSlider.vue";
import TaskGroupItem from "./ui/home/TaskGroupItem.vue";
import PageHeader from "../medical/PageHeader.vue";
import HeroCard from "./ui/home/HeroCard.vue";
</script>

<style>
.dashboard {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-sizing: border-box;
}

.title {
  font-weight: 600;
  font-size: 30px;
  line-height: 144%;
  color: #002055;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}
.section-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
}
.badge {
  padding: 0.15rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
}
.blue-badge {
  background: #eef2ff;
  color: #5a4af4;
}
.gray-badge {
  background: #f3f4f6;
  color: #9ca3af;
}

/* Horizontal Scroll */
.horizontal-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin: 0 -1.25rem; /* Вылет за края падинга */
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}
.horizontal-scroll::-webkit-scrollbar {
  display: none;
}

/* Desktop adjustment */
@media (min-width: 500px) {
  .horizontal-scroll {
    margin: 0;
    padding: 0;
  }
}
</style>
