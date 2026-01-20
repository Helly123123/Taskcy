<template>
  <main class="mobile-container">
    <div class="content-area">
      <RouterView />
    </div>

    <Nav />
  </main>
</template>

<script setup>
import Nav from "./components/navigate/Nav.vue";
</script>

<style scoped>
.mobile-container {
  display: flex;
  flex-direction: column;

  /* Гарантируем высоту на весь экран мобильного браузера */
  height: 100vh;
  height: 100dvh;

  width: 100%;
  max-width: 768px;
  margin: 0 auto;

  /* Контейнер — это жесткая рамка, он сам не скроллится */
  overflow: hidden;
  position: relative;
}

.content-area {
  flex: 1;
  width: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  padding: 0 40px;

  /* Плавный скролл для iOS */
  -webkit-overflow-scrolling: touch;
}

.content-area::-webkit-scrollbar {
  display: none;
}
</style>
