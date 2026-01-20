<template>
  <div class="slider-section">
    <swiper
      :modules="[Pagination]"
      :slides-per-view="'auto'"
      :space-between="16"
      :slides-offset-before="0"
      :slides-offset-after="20"
      @slideChange="onSlideChange"
      @slide-change="onSlideChange"
      class="my-swiper"
    >
      <swiper-slide
        v-for="(item, index) in projects"
        :key="item.id"
        style="width: 280px"
      >
        <ProjectCard :project="item" :is-active="activeIndex === index" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import ProjectCard from "./ProjectCard.vue";
import "swiper/css";

const activeIndex = ref(0);

const projects = ref([
  {
    id: 1,
    name: "Work",
    category: "IT",
    color: "#27AE60",
    info: [
      { type: "сompleted", count: 1 },
      { type: "not_started", count: 6 },
    ],
  },
  {
    id: 2,
    name: "Uber Eats",
    category: "Personal Project",
    color: "#6366F1",
    info: [
      { type: "сompleted", count: 4 },
      { type: "not_started", count: 4 },
    ],
  },
  {
    id: 3,
    name: "Branding",
    category: "Design",
    color: "#F2994A",
    info: [
      { type: "сompleted", count: 2 },
      { type: "not_started", count: 2 },
    ],
  },
]);

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex;
};
</script>

<style scoped>
.slider-section {
  background: #fff;
  width: 100%;
  overflow: hidden;
}
.header {
  margin-bottom: 15px;
}
.header h2 {
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.count-badge {
  background: #f0f4ff;
  color: #6366f1;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
}
.my-swiper {
  padding-bottom: 20px !important;
  overflow: visible !important;
}
</style>
