<template>
  <div class="task-list">
    <h3 class="monthly-title">Monthly</h3>

    <div v-for="item in tasks" :key="item.type" class="card">
      <div @click="pushTo('Tasks', projectId, item.type)" class="card-info">
        <h4>{{ item.title }}</h4>
        <p>{{ item.count }} Task now</p>
      </div>
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.75 12.4167L6.58333 6.58333L0.75 0.75"
          stroke="#002055"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tasks: {
    type: Array,
  },
  projectId: {
    type: Number,
  },
});

import { useRouter } from "vue-router";

const router = useRouter();

const pushTo = (pageName, id, type) => {
  router.push({
    name: pageName,
    query: { id: id, type: type },
  });
};
</script>

<style scoped>
.monthly-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: #002055;
  margin-bottom: 16px;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid #e9f1ff;
  margin-bottom: 12px;
}
.card.active {
  border-color: #6c63ff;
}
.card h4 {
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #002055;
}
.card p {
  margin: 4px 0 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #848a94;
}
.more-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
}
</style>
