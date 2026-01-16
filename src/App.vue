<script setup>
import { onMounted, ref } from "vue";
import {
  useWebApp,
  useWebAppHapticFeedback,
  useWebAppTheme,
  MainButton,
} from "vue-tg";

const { WebApp } = useWebApp();
const { themeParams } = useWebAppTheme();

// Извлекаем все функции вибрации
const { impactOccurred, notificationOccurred, selectionChanged } =
  useWebAppHapticFeedback();

const user = ref(null);

onMounted(() => {
  WebApp.ready();
  if (WebApp.initDataUnsafe?.user) {
    user.value = WebApp.initDataUnsafe.user;
  }
});

// 1. IMPACT - Физический отклик (разная сила "удара")
const triggerImpact = (style) => {
  // стили: 'light', 'medium', 'heavy', 'rigid', 'soft'
  impactOccurred(style);
  console.log(`Impact: ${style}`);
};

// 2. NOTIFICATION - Паттерны уведомлений (двойные/тройные вибрации)
const triggerNotification = (type) => {
  // типы: 'error', 'success', 'warning'
  notificationOccurred(type);
  console.log(`Notification: ${type}`);
};

// 3. SELECTION - Легкий щелчок
const triggerSelection = () => {
  selectionChanged();
  console.log("Selection changed");
};
</script>

<template>
  <div class="app-container">
    <h3>📳 Тест вибраций</h3>

    <div class="section">
      <h4>Impact (Сила удара)</h4>
      <div class="grid">
        <button @click="triggerImpact('light')">Light</button>
        <button @click="triggerImpact('medium')">Medium</button>
        <button @click="triggerImpact('heavy')">Heavy</button>
        <button @click="triggerImpact('soft')">Soft</button>
        <button @click="triggerImpact('rigid')">Rigid</button>
      </div>
    </div>

    <div class="section">
      <h4>Notification (События)</h4>
      <div class="grid">
        <button class="btn-success" @click="triggerNotification('success')">
          Success (Успех)
        </button>
        <button class="btn-warning" @click="triggerNotification('warning')">
          Warning (Внимание)
        </button>
        <button class="btn-error" @click="triggerNotification('error')">
          Error (Ошибка)
        </button>
      </div>
    </div>

    <div class="section">
      <h4>Selection (Выбор)</h4>
      <button class="btn-select" @click="triggerSelection">
        Легкий щелчок
      </button>
    </div>

    <MainButton text="ЗАКРЫТЬ" @click="() => WebApp.close()" />
  </div>
</template>

<style scoped>
.app-container {
  padding: 15px;
  font-family: sans-serif;
  color: v-bind('themeParams.text_color || "#000"');
  background: v-bind('themeParams.bg_color || "#fff"');
  min-height: 100vh;
}

.section {
  margin-bottom: 25px;
  padding: 10px;
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 12px;
}

h4 {
  margin-top: 0;
  opacity: 0.7;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

button {
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: v-bind('themeParams.button_color || "#2481cc"');
  color: v-bind('themeParams.button_text_color || "#fff"');
  font-weight: bold;
  cursor: pointer;
}

.btn-success {
  background: #4caf50 !important;
}
.btn-warning {
  background: #ff9800 !important;
}
.btn-error {
  background: #f44336 !important;
}
.btn-select {
  width: 100%;
  background: #9c27b0 !important;
}

button:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>
