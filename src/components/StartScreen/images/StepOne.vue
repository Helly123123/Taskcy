<template>
  <div class="image-placeholder">
    <div class="images-cont">
      <img class="step-image" src="/Circle.svg" alt="" />
      <div class="message-images-cont">
        <img
          class="message-image"
          :class="{ three: true }"
          src="/startScreen/steps/one/message_three.svg"
          alt=""
        />
        <img
          class="message-image"
          :class="{ two: true }"
          src="/startScreen/steps/one/message_two.svg"
          alt=""
        />

        <img
          class="message-image"
          :class="{ one: true }"
          src="/startScreen/steps/one/message_one.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.image-placeholder {
  flex: 1;
  position: relative;
  width: 100%;
  max-height: 55vh;
}

.images-cont {
  width: 100%;
  height: 100%;
  position: relative;
}

.message-images-cont {
  position: relative;
  width: 100%;
  height: 100%;
}

.message-image {
  position: absolute;
  object-fit: contain;
  transition: all 0.4s ease-out;
  /* Небольшая тень, чтобы элементы "летали" */
  filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.06));
}

.step-image {
  position: absolute;
}

/* Верхняя правая картинка */
.message-image.three {
  top: 10px;
  right: var(--side-gap);
  width: 300px; /* Фиксированный или % размер */
}

/* Средняя левая картинка */
.message-image.two {
  top: 40%;
  left: var(--side-gap);
  transform: translateY(-50%);
  width: 260px;
}

/* Нижняя правая картинка */
.message-image.one {
  bottom: 10px;
  right: var(--side-gap);
  width: 250px;
}
</style>
