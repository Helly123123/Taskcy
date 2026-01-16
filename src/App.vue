<script setup>
import { onMounted, ref } from "vue";
import {
  useWebApp,
  useWebAppHapticFeedback,
  useWebAppTheme,
  MainButton,
} from "vue-tg";

// Извлекаем методы из хуков
const { WebApp, showAlert } = useWebApp();
const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();
const { themeParams } = useWebAppTheme();

const user = ref(null);

onMounted(() => {
  // Сообщаем Telegram, что приложение загружено
  WebApp.ready();

  // Безопасно получаем данные пользователя
  if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
    user.value = WebApp.initDataUnsafe.user;
  }
});

const triggerVibration = (type) => {
  if (type === "success") {
    notificationOccurred("success");
  } else {
    impactOccurred("medium");
  }
  console.log("Вибрация вызвана!");
};
</script>

<template>
  <div class="app-container">
    <div v-if="user">
      <h3>Привет, {{ user.first_name }}!</h3>
    </div>
    <div v-else>
      <h3>Загрузка данных пользователя...</h3>
    </div>

    <div class="actions">
      <button @click="triggerVibration('medium')">Обычный клик</button>
      <button @click="triggerVibration('success')">Успех</button>
    </div>

    <MainButton text="ОТПРАВИТЬ ДАННЫЕ" @click="() => showAlert('Нажато!')" />
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  /* Динамическая подстройка цвета текста под тему Telegram */
  color: v-bind("themeParams.text_color");
}
button {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: none;
  border-radius: 8px;
  background: v-bind('themeParams.button_color || "#2481cc"');
  color: v-bind('themeParams.button_text_color || "#ffffff"');
}
</style>
