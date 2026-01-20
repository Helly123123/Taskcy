<template>
  <TaskInfoModal
    :task="selecteItem"
    :isOpen="isOpenInfoModal"
    @close="isOpenInfoModal = false"
  />
  <div class="scrollable-content">
    <div v-auto-animate class="list-stack">
      <div
        v-if="tasks?.length > 0"
        v-for="task in tasks"
        :key="task.id"
        class="project-card"
        :class="{ 'is-completed-card': task.boardType === 'сompleted' }"
      >
        <TaskCard :task="task" :openInfoModal="openInfoModal" />
      </div>
      <NoData :type="'tasks'" v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import TaskInfoModal from "./modal/TaskInfoModal.vue";
import TaskCard from "./TaskCard.vue";
import NoData from "@/components/medical/LackInformation/NoData.vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const isOpenInfoModal = ref(false);
const selecteItem = ref(null);

const openInfoModal = (item) => {
  selecteItem.value = item;
  isOpenInfoModal.value = true;
};
</script>

<style scoped>
.scrollable-content {
  flex: 1;
  margin-top: 16px;
  overflow-y: auto;
  scrollbar-width: none;
}

.scrollable-content::-webkit-scrollbar {
  display: none;
}

.list-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card {
  padding: 18px 20px;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  background: #fff;
  /* Для AutoAnimate важно оставить CSS чистым */
  transition: background 0.2s ease;
}

.is-completed-card {
  background: #fcfdfe;
}
</style>
