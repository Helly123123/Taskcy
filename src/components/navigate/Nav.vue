<template>
  <AddingOptions
    :isOpen="isOpenOptionsModal"
    @close="isOpenOptionsModal = false"
  />

  <transition name="fade">
    <div v-show="!isKeyboardVisible" class="cont">
      <nav class="navigate">
        <ul class="nav-list">
          <li
            @click="pushTo('Home')"
            :class="{ active: getPageName === 'Home' }"
            class="nav-item"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                stroke="#848A94"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>

          <li
            @click="pushTo('Project')"
            :class="{ active: getPageName === 'Project' }"
            class="nav-item"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.919 14.232C19.919 17.81 17.81 19.919 14.232 19.919H6.45C2.863 19.919 0.75 17.81 0.75 14.232V6.432C0.75 2.859 2.064 0.75 5.643 0.75H7.643C8.361 0.751 9.037 1.088 9.467 1.663L10.38 2.877C10.812 3.451 11.488 3.789 12.206 3.79H15.036C18.623 3.79 19.947 5.616 19.947 9.267L19.919 14.232Z"
                stroke="#848A94"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.9812 12.9629H14.7162"
                stroke="#848A94"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>

          <li @click="openModal" class="nav-item center-button">
            <button class="fab">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 0.75C9.5 0.335786 9.16421 0 8.75 0C8.33579 0 8 0.335786 8 0.75L8 8H0.75C0.335786 8 0 8.33579 0 8.75C0 9.16421 0.335786 9.5 0.75 9.5H8V16.75C8 17.1642 8.33579 17.5 8.75 17.5C9.16421 17.5 9.5 17.1642 9.5 16.75V9.5H16.75C17.1642 9.5 17.5 9.16421 17.5 8.75C17.5 8.33579 17.1642 8 16.75 8H9.5L9.5 0.75Z"
                  fill="white"
                />
              </svg>
            </button>
          </li>

          <li class="nav-item">
            <img src="/navigate/chat.svg" alt="Chat" />
          </li>
          <li class="nav-item">
            <img src="/navigate/profile.svg" alt="Profile" />
          </li>
        </ul>
      </nav>
    </div>
  </transition>
</template>

<script setup>
import AddingOptions from "./AddingOptions.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const getPageName = computed(() => route.name);
const isOpenOptionsModal = ref(false);

// --- ЛОГИКА СКРЫТИЯ САЙДБАРА ПРИ КЛАВИАТУРЕ ---
const isKeyboardVisible = ref(false);
let initialHeight = window.innerHeight;

const handleResize = () => {
  // Если текущая высота окна стала значительно меньше (на 150px+) начальной,
  // значит открылась клавиатура.
  isKeyboardVisible.value = window.innerHeight < initialHeight - 150;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
// --------------------------------------------

const pushTo = (pageName) => {
  router.push({ name: pageName });
};

const openModal = () => (isOpenOptionsModal.value = true);
</script>

<style scoped>
.cont {
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 100;
}

/* Анимация плавного появления и исчезновения */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.navigate {
  padding: 10px 20px;
  box-shadow: 0 0 9px 0 rgba(140, 168, 216, 0.05);
  background: #fff;
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: 1;
}

.nav-item img {
  width: 24px;
  height: 24px;
  filter: grayscale(1) opacity(0.5);
  transition: 0.3s;
}

.nav-item.active svg path {
  fill: #756ef3;
  stroke: #ffffff;
}

.center-button {
  position: relative;
  flex: 0 0 60px;
}

.fab {
  width: 46px;
  height: 46px;
  background-color: #7367f0;
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s;
}

.fab:active {
  transform: scale(0.9);
}
</style>
