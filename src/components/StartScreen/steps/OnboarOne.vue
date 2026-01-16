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
      class="main-swiper animate-fade-in"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="slide-inner">
          <div class="image-box animate-float">
            <img :src="slide.image" alt="" class="slide-img" />
          </div>

          <div class="text-content">
            <span class="category-tag animate-up-1">{{ slide.category }}</span>
            <h1 class="main-title animate-up-2" v-html="slide.title"></h1>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="bottom-nav animate-slide-up">
      <button v-if="!isLastSlide" class="skip-link" @click="skip">Skip</button>
      <div v-else style="width: 40px"></div>
      <div class="custom-pagination"></div>

      <button class="action-button" @click="nextSlide">
        <span class="arrow">{{ isLastSlide ? "✓" : "→" }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Импортируем роутер
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    const swiperRef = ref(null);
    const isLastSlide = ref(false);

    const slides = [
      {
        category: "Task Management",
        title:
          'Let\'s create a <span class="purple">space</span> for your workflows.',
        image: "startScreen/steps/step_one.png",
      },
      {
        category: "Task Management",
        title:
          'Work more <span class="purple">Structured</span> and Organized 👌',
        image: "startScreen/steps/step_two.png",
      },
      {
        category: "Task Management",
        title:
          'Manage your <span class="purple">Tasks</span> quickly for Results ✌️',
        image: "startScreen/steps/step_three.png",
      },
    ];

    const onSwiper = (swiper) => {
      swiperRef.value = swiper;
    };

    const onSlideChange = () => {
      // Обновляем состояние, если дошли до конца
      isLastSlide.value = swiperRef.value.isEnd;
    };

    const nextSlide = () => {
      if (swiperRef.value.isEnd) {
        // Если это последний слайд — переходим на регистрацию
        router.push("/auth/sign-up");
      } else {
        // Иначе листаем дальше
        swiperRef.value.slideNext();
      }
    };

    const skip = () => {
      // Кнопка Skip обычно тоже ведет на финальную страницу
      router.push("/auth/sign-up");
    };

    return {
      slides,
      modules: [Pagination],
      onSwiper,
      onSlideChange,
      nextSlide,
      skip,
      isLastSlide,
    };
  },
};
</script>

<style scoped>
/* Стили остаются без изменений, как в вашем исходном коде */
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
}

.main-swiper {
  width: 100%;
  flex: 1;
}

.slide-inner {
  padding-top: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 40px;
}

.slide-img {
  max-width: 100%;
  max-height: 40vh;
  object-fit: contain;
}

.text-content {
  width: 100%;
  padding: 0 30px;
  margin-bottom: 140px;
}

.category-tag {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #756ef3;
  margin-bottom: 12px;
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
  background: white;
  z-index: 10;
}

.skip-link {
  border: none;
  background: transparent;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: #002055;
  cursor: pointer;
  opacity: 0.6;
}

.custom-pagination {
  display: flex;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #cbd5e1;
  opacity: 1;
  border-radius: 4px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  width: 24px;
  background: #756ef3;
}

.action-button {
  width: 100px;
  height: 100px;
  background: #756ef3;
  border: none;
  border-top-left-radius: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.action-button:active {
  transform: scale(0.9);
}

.arrow {
  color: white;
  font-size: 30px;
  transform: translate(5px, 5px);
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-up-1,
.animate-up-2 {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-up-1 {
  animation-delay: 0.4s;
}
.animate-up-2 {
  animation-delay: 0.6s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
