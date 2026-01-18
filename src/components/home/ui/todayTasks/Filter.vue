<template>
  <div class="filter-row">
    <button
      v-for="f in options"
      :key="f.value"
      :class="['filter-btn', { active: currentFilter === f.value }]"
      @click="selectedValue(f.value)"
    >
      {{ f.text }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
  currentFilter: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update"]);

function selectedValue(value) {
  emit("update", value);
}

const options = [
  { text: "All", value: "all" },
  { text: "Not Started", value: "not_started" },
  { text: "In Progress", value: "in_progress" },
  { text: "Compteted", value: "сompleted" },
];
</script>

<style scoped>
/* Filters */
.filter-row {
  display: flex;
  gap: 10px;
  padding: 25px 25px 15px;
  overflow-x: auto;
}
.filter-btn {
  padding: 6px 16px;
  border-radius: 16px;
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 12px;
  line-height: 171%;
  border: 1px solid #ffffff;

  color: #848a94;
  transition: 0.2s;
}
.filter-btn.active {
  border: 1px solid #756ef3;
}
</style>
