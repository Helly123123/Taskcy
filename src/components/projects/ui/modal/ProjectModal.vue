<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="closeModal"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <Transition name="sheet-slide" appear>
          <div v-if="isOpen" class="modal-container" :style="modalStyle">
            <div class="modal-handle-area">
              <div class="modal-handle"></div>
            </div>

            <div class="modal-content">
              <ul class="options-list">
                <li @click="pushTo('AddTasks')" class="options">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.492 0.788574H5.753C2.678 0.788574 0.75 2.96557 0.75 6.04757V14.3616C0.75 17.4436 2.669 19.6206 5.753 19.6206H14.577C17.662 19.6206 19.581 17.4436 19.581 14.3616V10.3336"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.82751 8.9205L14.3005 1.4475C15.2315 0.5175 16.7405 0.5175 17.6715 1.4475L18.8885 2.6645C19.8195 3.5955 19.8195 5.1055 18.8885 6.0355L11.3795 13.5445C10.9725 13.9515 10.4205 14.1805 9.84451 14.1805H6.09851L6.19251 10.4005C6.20651 9.8445 6.43351 9.3145 6.82751 8.9205Z"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.1649 2.60211L17.7309 7.16811"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="options-text">Create Task</span>
                </li>
                <li @click="pushTo('AddProject')" class="options">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 7.07733V14.4037"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.4167 10.7405H7.08334"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.4357 0.75H6.06429C2.79762 0.75 0.75 3.06208 0.75 6.33516V15.1648C0.75 18.4379 2.7881 20.75 6.06429 20.75H15.4357C18.7119 20.75 20.75 18.4379 20.75 15.1648V6.33516C20.75 3.06208 18.7119 0.75 15.4357 0.75Z"
                      stroke="#002055"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="options-text">Create Project</span>
                </li>
              </ul>

              <button @click="closeModal" class="close-btn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.87348 5.81282C6.58058 5.51992 6.10571 5.51992 5.81282 5.81282C5.51992 6.10571 5.51992 6.58058 5.81282 6.87348L10.9393 12L5.81282 17.1265C5.51992 17.4194 5.51992 17.8943 5.81282 18.1872C6.10571 18.4801 6.58058 18.4801 6.87348 18.1872L12 13.0607L17.1265 18.1872C17.4194 18.4801 17.8943 18.4801 18.1872 18.1872C18.4801 17.8943 18.4801 17.4194 18.1872 17.1265L13.0607 12L18.1872 6.87348C18.4801 6.58058 18.4801 6.10571 18.1872 5.81282C17.8943 5.51992 17.4194 5.51992 17.1265 5.81282L12 10.9393L6.87348 5.81282Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
});

const router = useRouter();
const emit = defineEmits(["close"]);

const pushTo = (pageName) => {
  closeModal();
  router.push({
    name: pageName,
  });
};

const startY = ref(0);
const currentY = ref(0);
const isDragging = ref(false);

const modalStyle = computed(() => {
  const diff = isDragging.value
    ? Math.max(0, currentY.value - startY.value)
    : 0;
  return {
    transform: `translateY(${diff}px)`,
    transition: isDragging.value
      ? "none"
      : "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
  };
});

const closeModal = () => {
  isDragging.value = false;
  currentY.value = 0;
  startY.value = 0;
  emit("close");
};

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY;
  isDragging.value = true;
};

const onTouchMove = (e) => {
  if (!isDragging.value) return;
  currentY.value = e.touches[0].clientY;
};

const onTouchEnd = () => {
  const diff = currentY.value - startY.value;
  isDragging.value = false;

  // Если протащили вниз более чем на 100px — закрываем
  if (diff > 100) {
    closeModal();
  } else {
    // Возвращаем на место
    currentY.value = 0;
    startY.value = 0;
  }
};

// Блокировка скролла
watch(
  () => props.isOpen,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  },
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: flex-end; /* Важно: прижимает контент к низу */
  z-index: 1000;
  touch-action: none; /* Отключаем системный скролл, чтобы работал наш drag */
}

.modal-container {
  width: 100%;
  background: white;
  border-radius: 30px 30px 0 0;
  padding-bottom: 30px;
  will-change: transform;
}

.modal-handle-area {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-handle {
  width: 40px;
  height: 5px;
  background: #e0e7ff;
  border-radius: 10px;
}

.modal-content {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* АНИМАЦИИ */

/* 1. Плавное появление фона (Fade) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 2. Выезд снизу вверх (Slide) */
/* enter-active задает параметры анимации при появлении */
.sheet-slide-enter-active {
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}
/* leave-active задает параметры анимации при исчезновении */
.sheet-slide-leave-active {
  transition: transform 0.3s ease-in;
}

/* Начальное состояние при появлении и конечное при скрытии — полностью за экраном снизу */
.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%) !important;
}

/* Стили списка и кнопки из вашего дизайна */
.options-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.options {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 18px;
  border: 1px solid #f0f5ff;
  border-radius: 20px;
  margin-bottom: 12px;
  cursor: pointer;
}

.options-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #002055;
}

.close-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #7479ff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
