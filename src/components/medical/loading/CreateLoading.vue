<template>
  <Transition name="fade">
    <div v-if="loading" class="loading-overlay">
      <div class="loader-content">
        <div class="spinner-wrapper">
          <div class="main-spinner" :style="{ borderTopColor: color }"></div>
          <div class="inner-spinner"></div>
        </div>
        <p class="loading-text">{{ text }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
  },
  color: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  text-align: center;
}

.spinner-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
}

.main-spinner {
  width: 100%;
  height: 100%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #756ef3;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.inner-spinner {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  border-bottom: 3px solid #9c69e3;
  border-radius: 50%;
  animation: spin-reverse 1.5s linear infinite;
}

.loading-text {
  font-weight: 600;
  color: #002055;
  font-size: 18px;
  letter-spacing: 0.5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
