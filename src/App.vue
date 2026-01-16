<script setup>
import {
  useWebApp,
  useWebAppHapticFeedback,
  useWebAppTheme,
  MainButton,
  BackButton,
  SettingsButton,
} from "vue-tg";
import { ref } from "vue";

// 1. Основные инструменты
const { WebApp, showAlert, showConfirm, showScanQrPopup } = useWebApp();
const { colorScheme, themeParams } = useWebAppTheme();
const { impactOccurred, notificationOccurred, selectionChanged } =
  useWebAppHapticFeedback();

const user = WebApp.initDataUnsafe?.user;

// --- МЕТОДЫ ВИБРАЦИИ ---
const playImpact = (style) => impactOccurred(style); // 'light', 'medium', 'heavy', 'rigid', 'soft'
const playNotification = (type) => notificationOccurred(type); // 'error', 'success', 'warning'
const playSelection = () => selectionChanged();

// --- ДРУГИЕ ВОЗМОЖНОСТИ ---
const handleMainClick = () => {
  playNotification("success");
  showAlert("Главная кнопка нажата!");
};

const scanQR = () => {
  showScanQrPopup({ text: "Сканируй любой код" }, (result) => {
    showAlert(`Результат: ${result}`);
    return true; // закрыть попап
  });
};

const requestWriteAccess = () => {
  WebApp.requestWriteAccess((allowed) => {
    if (allowed) showAlert("Доступ получен!");
  });
};
</script>

<template>
  <MainButton text="ОСНОВНОЕ ДЕЙСТВИЕ" @click="handleMainClick" />
  <BackButton @click="() => showAlert('Нажали назад')" />
  <SettingsButton @click="() => showAlert('Настройки')" />

  <div class="app-container">
    <header>
      <h3>Привет, {{ user?.first_name || "Пользователь" }}!</h3>
      <p>Тема: {{ colorScheme }}</p>
    </header>

    <section>
      <h4>📳 Виды вибрации (Haptic)</h4>
      <div class="grid">
        <button @click="playImpact('light')">Light</button>
        <button @click="playImpact('heavy')">Heavy</button>
        <button @click="playImpact('soft')">Soft</button>
        <button @click="playSelection">Selection</button>
      </div>
      <div class="grid">
        <button class="btn-success" @click="playNotification('success')">
          Success
        </button>
        <button class="btn-error" @click="playNotification('error')">
          Error
        </button>
        <button class="btn-warning" @click="playNotification('warning')">
          Warning
        </button>
      </div>
    </section>

    <section>
      <h4>🛠 Возможности SDK</h4>
      <div class="list">
        <button @click="scanQR">📷 Сканировать QR</button>
        <button @click="() => WebApp.openTelegramLink('https://t.me/durov')">
          🔗 Открыть ссылку
        </button>
        <button @click="requestWriteAccess">✉️ Разрешить писать в ЛС</button>
        <button @click="() => WebApp.expand()">
          ↔️ Развернуть на весь экран
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app-container {
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
  font-family: sans-serif;
  /* Используем цвета из темы Telegram */
  color: v-bind("themeParams.text_color");
}

section {
  margin-top: 24px;
  background: v-bind("themeParams.secondary_bg_color");
  padding: 12px;
  border-radius: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 8px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: v-bind("themeParams.button_color");
  color: v-bind("themeParams.button_text_color");
  cursor: pointer;
  font-weight: bold;
}

.btn-success {
  background: #4caf50;
}
.btn-error {
  background: #f44336;
}
.btn-warning {
  background: #ff9800;
}
</style>
