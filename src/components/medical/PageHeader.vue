<template>
  <header class="top-bar">
    <button
      v-if="route.name != 'Home'"
      @click="pushTo('back')"
      class="icon-btn"
    >
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.58334 12.4167L0.75001 6.58333L6.58334 0.75"
          stroke="#002055"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="icon-btn-fantom" v-else></div>
    <div v-if="projectName">
      <h1 class="page-title">{{ projectName }}</h1>
      <span class="subtitle">{{ getTypeSubtitle(subtitle) }}</span>
    </div>
    <div v-else>
      <h1 class="page-title">{{ getTypeHeader(route.name) }}</h1>
      <span class="subtitle">{{ getTypeSubtitle(subtitle) }}</span>
    </div>
    <button v-if="gettingDisplayPermission" class="icon-btn">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8333 10H4.16667"
          stroke="#002055"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 4.16663V15.8333"
          stroke="#002055"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="icon-btn-fantom" v-else></div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  projectName: {
    type: String,
  },
  subtitle: {
    type: String,
  },
});

const route = useRoute();
const router = useRouter();

const pushTo = (page) => {
  if (page === "back") router.back();
  else router.push(page);
};

const gettingDisplayPermission = computed(
  () => route.name === "Prsoject" || route.name === "ProjectInfos",
);

const getTypeSubtitle = (pageName) => {
  switch (pageName) {
    case "not_started":
      return "Not Started";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "home":
      return "Home";
  }
};

const getTypeHeader = (pageName) => {
  switch (pageName) {
    case "Project":
      return "Projects";
    case "SignIn":
      return "Sign In";
    case "SignUp":
      return "Sign Up";
    case "AddProject":
      return "Add Project";
    case "AddTasks":
      return "Add Tasks";
    case "Tasks":
      return "Tasks";
    case "TodayTasks":
      return "Today Task";
    case "Home":
      return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
      });
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 44px;
}

.page-title {
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  text-align: center;
  color: #002055;
}

.subtitle {
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #848a94;
  text-align: center;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #f1f5f9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-btn-fantom {
  width: 42px;
  height: 42px;
}
</style>
