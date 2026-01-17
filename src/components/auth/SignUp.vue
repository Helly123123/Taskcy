<template>
  <div class="register-container animate-fade-in">
    <PageHeader />

    <div class="content-wrapper">
      <h3 class="welcome-title cascade-1">Create Account</h3>
      <p class="subtitle cascade-2">
        Please Enter your Information and <br />
        create your account
      </p>

      <form class="login-form" @submit.prevent>
        <div class="input-group cascade-3">
          <input
            class="custom-input"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div class="input-group cascade-4">
          <input
            class="custom-input"
            placeholder="Enter your mail"
            type="email"
          />
        </div>
        <div class="input-group cascade-5">
          <input
            class="custom-input"
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <button class="submit-btn cascade-6">Sign Up</button>
      </form>
    </div>

    <p class="have-account cascade-7">
      Have an Account? <span @click="pushTo('sign-in')">Sign In</span>
    </p>

    <div class="dot dot-yellow floating-1"></div>
    <div class="dot dot-blue floating-2"></div>
    <div class="dot dot-pink floating-3"></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import PageHeader from "../medical/PageHeader.vue";
const router = useRouter();

const pushTo = (page) => {
  router.push(page);
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
}

.welcome-title {
  font-weight: 600;
  font-size: 25px;
  line-height: 100%;
  color: #002055;
  margin-bottom: 12px;
}

.subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 171%;
  color: #868d95;
  margin-bottom: 40px;
}

.input-group {
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
  height: 60px;
  border-radius: 18px;
  border: none;
  background: #756ef3;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(117, 110, 243, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #5e56e0;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: scale(0.98);
}

.have-account {
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #868d95;
  margin-top: 24px;
}

.have-account span {
  font-weight: 600;
  color: #756ef3;
  cursor: pointer;
}

/* Декоративные точки */
.dot {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.dot-yellow {
  width: 8px;
  height: 8px;
  background: #fecd56;
  top: 100px;
  right: 80px;
}
.dot-blue {
  width: 12px;
  height: 12px;
  background: #c7c4ff;
  top: 130px;
  right: 30px;
}
.dot-pink {
  width: 6px;
  height: 6px;
  background: #ffcfd5;
  top: 180px;
  right: 40px;
}

/* --- СЕКЦИЯ АНИМАЦИЙ --- */

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

/* Элементы плавно "выплывают" снизу */
.cascade-1,
.cascade-2,
.cascade-3,
.cascade-4,
.cascade-5,
.cascade-6,
.cascade-7 {
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.cascade-1 {
  animation-delay: 0.1s;
}
.cascade-2 {
  animation-delay: 0.2s;
}
.cascade-3 {
  animation-delay: 0.3s;
}
.cascade-4 {
  animation-delay: 0.4s;
}
.cascade-5 {
  animation-delay: 0.5s;
}
.cascade-6 {
  animation-delay: 0.6s;
}
.cascade-7 {
  animation-delay: 0.7s;
}

.slide-down {
  opacity: 0;
  animation: slideDown 0.8s ease-out forwards;
  animation-delay: 0.1s;
}

/* Анимация левитации для точек */
.floating-1 {
  animation: float 4s ease-in-out infinite;
}
.floating-2 {
  animation: float 5s ease-in-out infinite;
  animation-delay: 0.5s;
}
.floating-3 {
  animation: float 3s ease-in-out infinite;
  animation-delay: 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
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
    transform: translateY(-12px);
  }
}
</style>
