<template>
  <main class="mobile-container">
    <RouterView />
  </main>
</template>

<script setup></script>

<style scoped>
.mobile-container {
  display: flex;
  flex-direction: column;
  /* align-items: center;  <-- УБЕРИ ЭТО, оно мешает растягиванию */
  min-height: 100vh;
  width: 100%;
  max-width: 768px; /* Ограничение для планшетов */
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 40px;
}

.desktop-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  color: white;
  z-index: 9999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.message-box {
  padding: 2rem;
  border: 2px border-radius 12px;
  background: #2a2a2a;
}

/* Логика переключения через Media Queries */
/* @media (min-width: 769px) {
  .desktop-overlay {
    display: flex;
  }

  .mobile-container {
    display: none;
  }
} */
</style>
