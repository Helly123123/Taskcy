<template>
  <div class="empty-container">
    <div class="image-wrapper">
      <img
        :src="type === 'tasks' ? options.tasks.image : options.project.image"
        alt="No tasks"
        class="empty-image"
      />
    </div>

    <h3 class="title">
      {{ type === "tasks" ? options.tasks.title : options.project.title }}
    </h3>
    <p class="description">
      {{
        type === "tasks"
          ? options.tasks.description
          : options.project.description
      }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
  },
});

const options = {
  project: {
    image: "/noData/no_projects.png",
    title: "No projects found",
    description:
      "t looks like you haven't created any projects yet. Start by creating a workspace for your tasks",
  },

  tasks: {
    image: "/noData/no_tasks.png",
    title: "No tasks yet",
    description:
      " Your to-do list is empty. Add a new task to start your productive day!",
  },
};
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.image-wrapper {
  width: 160px; /* Немного увеличил, чтобы картинка смотрелась выразительнее */
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  overflow: hidden; /* Чтобы картинка не выходила за пределы круга */
}

.empty-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Сохраняет пропорции картинки */
  /* Если у картинки прозрачный фон, можно использовать object-fit: contain */
}

.title {
  font-weight: 600;
  font-size: 25px;
  line-height: 100%;
  color: #002055;
  margin: 0 0 10px 0;
}

.description {
  font-weight: 400;
  font-size: 14px;
  line-height: 171%;
  color: #868d95;
  max-width: 280px;
}
</style>
