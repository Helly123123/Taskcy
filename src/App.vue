<script setup>
import { useWebAppHapticFeedback } from "vue-tg";

// Получаем доступ к функциям вибрации
const { impactOccurred, notificationOccurred, selectionChanged } =
  useWebAppHapticFeedback();

const triggerVibration = () => {
  // 1. Легкая вибрация (impact)
  // Варианты: 'light', 'medium', 'heavy', 'rigid', 'soft'
  impactOccurred("medium");

  console.log("Вибрация вызвана!");
};

const triggerSuccess = () => {
  // 2. Вибрация-уведомление (особый паттерн)
  // Варианты: 'error', 'success', 'warning'
  notificationOccurred("success");
};
</script>

<template>
  <div class="actions">
    <button @click="triggerVibration">Обычный клик (Impact)</button>
    <br /><br />
    <button @click="triggerSuccess">Успех (Notification)</button>
  </div>
</template>

<style scoped>
button {
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
  background: #2481cc;
  color: white;
  cursor: pointer;
}
</style>
