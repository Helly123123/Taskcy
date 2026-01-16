<template>
  <div class="image-placeholder">
    <div class="images-cont">
      <div class="circle-clipper">
        <img
          class="step-image male-hero"
          src="/startScreen/steps/three/male.svg"
          alt="Male"
        />
      </div>

      <div class="overlays">
        <img
          class="message-image top-left"
          src="/startScreen/steps/three/step_three_message_one.svg"
          alt="Message 1"
        />
        <img
          class="message-image mid-right"
          src="/startScreen/steps/three/step_three_message_two.svg"
          alt="Message 2"
        />

        <div class="dot yellow large-dot"></div>
        <div class="dot yellow small-dot"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-placeholder {
  width: 100%;
  min-height: 600px;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible; /* Разрешаем плашкам немного выходить за границы секции */
}

.images-cont {
  position: relative;
  width: 500px;
  height: 500px;
}

.circle-clipper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #c6c3fb;
  border-radius: 50%;
  overflow: hidden; /* Мужчина будет обрезан по дуге круга */
  z-index: 1;
  /* Добавляем мягкое свечение самому кругу */
  box-shadow: 0 20px 50px rgba(198, 195, 251, 0.3);
}

.male-hero {
  position: absolute;
  bottom: -10px; /* Стык с нижним краем круга */
  left: 50%;
  transform: translateX(-50%);
  /* Персонаж занимает почти весь круг */
  width: 115%;
  height: auto;
  object-fit: contain;
  z-index: 2;
}

.overlays {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.message-image {
  position: absolute;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12));
  /* Увеличенный размер плашек */
  width: 280px;
}

/* Позиционирование плашек относительно увеличенного круга */
.top-left {
  top: 5%;
  left: -120px;
}

.mid-right {
  top: 40%;
  right: -100px;
}

/* Декоративные точки */
.dot {
  position: absolute;
  border-radius: 50%;
}

.yellow {
  background-color: #ffd66b;
}

.large-dot {
  width: 70px;
  height: 70px;
  bottom: -20px;
  left: -80px;
}

.small-dot {
  width: 25px;
  height: 25px;
  top: 10%;
  right: -40px;
}

/* --- АДАПТИВНОСТЬ --- */

@media (max-width: 768px) {
  .images-cont {
    width: 400px;
    height: 400px;
  }
  .message-image {
    width: 220px;
  }
  .top-left {
    left: -50px;
  }
  .mid-right {
    right: -50px;
  }

  .large-dot {
    width: 50px;
    height: 50px;
    left: -30px;
  }
}

@media (max-width: 480px) {
  .images-cont {
    width: 320px;
    height: 320px;
  }
  .message-image {
    width: 150px;
  }
  .image-placeholder {
    min-height: 450px;
  }
}
</style>
