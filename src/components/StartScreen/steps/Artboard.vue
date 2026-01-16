<template>
  <div class="screen-container">
    <div class="image-section">
      <img class="hero-image" src="/Artboard.png" alt="Artboard illustration" />
    </div>

    <div class="content-card">
      <div class="drag-handle"></div>
      <h1 class="brand-title">Taskcy</h1>

      <h2 class="main-heading">
        Building Better <br />
        Workplaces
      </h2>

      <p class="description">
        Create a unique emotional story that describes <br />
        better than words
      </p>

      <button @click="pushTo('startScreen')" class="get-started-btn">
        Get Started
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushTo = (pageName) => {
  router.push({
    name: pageName, // имя роута из вашего index.js
    query: { step: "2" },
  });
};
</script>

<style scoped>
/* Основной контейнер на весь экран */
.screen-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #725fff; /* Цвет фона за картинкой */
  font-family: "PT Sans", sans-serif;
}

/* Секция с картинкой */
.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px; /* Запас, чтобы картинка не уходила слишком глубоко под блок */
}

.hero-image {
  width: 100%;
  height: auto;
  max-height: 45vh;
  object-fit: contain;
}

/* Белая карточка */
.content-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8f6ff 100%);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 20px 30px 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.05);
}

/* Маленькая полоска (индикатор пагинации или слайдера) */
.drag-handle {
  width: 40px;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 30px;
}

.brand-title {
  font-family: "Poller One", sans-serif;
  font-size: 56px;
  margin: 0 0 10px 0;
  color: #756ef3;
}

.main-heading {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  color: #2f394b;
  margin-bottom: 15px;
}

.description {
  font-size: 14px;
  line-height: 1.6;
  color: #8d8d8d;
  margin-bottom: 35px;
  max-width: 280px;
}

.get-started-btn {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #8b78ff 0%, #5451d6 100%);
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 10px 20px rgba(117, 110, 243, 0.3);
  transition: transform 0.2s ease;
}

.get-started-btn:active {
  transform: scale(0.98);
}
</style>
