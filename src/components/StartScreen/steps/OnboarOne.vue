<template>
  <div class="onboarding-wrapper">
    <swiper
      :modules="modules"
      :pagination="{
        clickable: true,
        el: '.custom-pagination',
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="main-swiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="slide-inner">
          <StepOne v-if="index + 1 === 1" />
          <StepTwo v-else-if="index + 1 === 2" />
          <StepThree v-else />
          <div class="text-content">
            <span class="category-tag">{{ slide.category }}</span>
            <h1 class="main-title" v-html="slide.title"></h1>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="bottom-nav">
      <button class="skip-link" @click="skip">Skip</button>

      <div class="custom-pagination"></div>
      <button class="action-button" @click="nextSlide">
        <span class="arrow">→</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import StepOne from "../images/StepOne.vue";
import StepTwo from "../images/StepTwo.vue";
import StepThree from "../images/StepThree.vue";

// Обязательно импортируем базовые стили
import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
    StepOne,
    StepTwo,
    StepThree,
  },
  setup() {
    const swiperRef = ref(null);

    const slides = [
      {
        category: "Task Management",
        title:
          'Let\'s create a <span class="purple">space</span> for your workflows.',
        image: "/step_one.svg",
        circle: "/Circle.svg",
      },
      {
        category: "Task Management",
        title:
          'Work more <span class="purple">Structured</span> and Organized 👌',
        image: "/step_one.svg",
        circle: "/Circle.svg",
      },
      {
        category: "Task Management",
        title:
          'Manage your <span class="purple">Tasks</span> quickly for Results ✌️',
      },
    ];

    const onSwiper = (swiper) => {
      swiperRef.value = swiper;
    };

    const onSlideChange = () => {
      console.log("Slide changed");
    };

    const nextSlide = () => {
      if (swiperRef.value.isEnd) {
        alert("Welcome to App!");
      } else {
        swiperRef.value.slideNext();
      }
    };

    const skip = () => console.log("Skipped");

    return {
      slides,
      modules: [Pagination],
      onSwiper,
      onSlideChange,
      nextSlide,
      skip,
    };
  },
};
</script>

<style scoped>
/* 1. Основной контейнер */
.onboarding-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Переменная для управления отступом от краев */
  --side-gap: 20px;
}

.main-swiper {
  width: 100%;
  flex: 1;
}

.slide-inner {
  padding: 40px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 2. Область с изображениями */

/* 3. Текстовый блок */
.text-content {
  padding: 0 30px;
  margin-bottom: 120px;
  z-index: 5;
}

.category-tag {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #756ef3;
  margin-bottom: 8px;
  display: block;
}

.main-title {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.25;
  color: #002055;
}

:deep(.purple) {
  color: #756ef3;
  font-weight: 600;
}

/* 4. Навигация (кнопки и точки) */
.bottom-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 10;
  background: white;
}

.skip-link {
  background-color: transparent;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #002055;
  margin-right: 10px;
}

.custom-pagination {
  display: flex;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #cbd5e1;
  opacity: 1;
  border-radius: 4px;
  transition: width 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  width: 24px;
  background: #756ef3;
}

/* Кнопка в углу */
.action-button {
  width: 90px;
  height: 90px;
  background: #756ef3;
  border: none;
  border-top-left-radius: 45px;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  color: white;
  font-size: 26px;
  margin-left: 10px;
  margin-top: 10px;
}

/* Адаптивность для узких экранов */
@media (max-width: 375px) {
  .message-image {
    width: 140px; /* Уменьшаем еще сильнее на маленьких iPhone */
  }
  .main-title {
    font-size: 28px;
  }
}
</style>
