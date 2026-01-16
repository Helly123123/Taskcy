<template>
  <div class="screen-container">
    <div class="image-section animate-fade-down">
      <img class="hero-image" src="/Artboard.png" alt="Artboard illustration" />
    </div>

    <div class="content-card animate-slide-up">
      <div class="drag-handle"></div>

      <h1 class="brand-title stagger-1">Taskcy</h1>

      <h2 class="main-heading stagger-2">
        Building Better <br />
        Workplaces
      </h2>

      <p class="description stagger-3">
        Create a unique emotional story that describes <br />
        better than words
      </p>

      <button @click="pushTo('startScreen')" class="get-started-btn stagger-4">
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
    name: pageName,
    query: { step: "2" },
  });
};
</script>

<style scoped>
.screen-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #725fff;
  font-family: "PT Sans", sans-serif;
  overflow: hidden; /* Чтобы элементы не создавали скролл при выезде */
}

.image-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: auto;
  max-height: 45vh;
  object-fit: contain;
}

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
  z-index: 2;
}

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
  transition: all 0.3s ease;
}

.get-started-btn:active {
  transform: scale(0.95);
}

/* --- КЛЮЧЕВЫЕ АНИМАЦИИ --- */

/* 1. Появление картинки сверху */
.animate-fade-down {
  animation: fadeDown 0.8s ease-out forwards;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 2. Выезд карточки снизу */
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* 3. Общий класс для текстовых элементов (по умолчанию скрыты) */
.stagger-1,
.stagger-2,
.stagger-3,
.stagger-4 {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Настройка задержек (Delay) для каскада */
.stagger-1 {
  animation-delay: 0.5s;
}
.stagger-2 {
  animation-delay: 0.6s;
}
.stagger-3 {
  animation-delay: 0.7s;
}
.stagger-4 {
  animation-delay: 0.8s;
}
</style>
