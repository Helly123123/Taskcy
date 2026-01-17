<template>
  <div class="create-project-container animate-fade-in">
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loader-content">
          <div class="spinner-wrapper">
            <div
              class="main-spinner"
              :style="{ borderTopColor: formData.color }"
            ></div>
            <div class="inner-spinner"></div>
          </div>
          <p class="loading-text">Creating project...</p>
        </div>
      </div>
    </Transition>

    <PageHeader />

    <div class="content-wrapper" :class="{ 'blur-content': loading }">
      <div class="logo-section cascade-1" @click="triggerFileInput">
        <div class="logo-placeholder" :style="{ borderColor: formData.color }">
          <div class="logo-icon-box">
            <img v-if="logoPreview" :src="logoPreview" class="preview-img" />
            <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M13.5 3L6 13.5H12L10.5 21L18 10.5H12L13.5 3Z"
                :stroke="formData.color"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <h3 class="upload-title">
          {{ logoPreview ? "Change logo" : "Upload logo file" }}
        </h3>
        <p class="upload-subtitle">Your logo will be visible to everyone</p>
        <input
          type="file"
          ref="fileInput"
          class="hidden-input"
          accept="image/*"
          @change="handleFileUpload"
        />
      </div>

      <form class="project-form" @submit.prevent="addProject">
        <div class="input-group cascade-2">
          <label class="label">Project Name</label>
          <input
            v-model="formData.name"
            class="custom-input"
            placeholder="Enter project name"
            type="text"
            required
          />
        </div>

        <div class="input-group cascade-3">
          <label class="label">Category</label>
          <input
            v-model="formData.category"
            class="custom-input"
            placeholder="E.g. Development, Design..."
            type="text"
          />
        </div>

        <div class="input-group cascade-4">
          <label class="label">Project Color</label>
          <div class="color-picker">
            <div
              v-for="color in colors"
              :key="color"
              :style="{ backgroundColor: color }"
              :class="['color-option', { active: formData.color === color }]"
              @click="formData.color = color"
            ></div>
          </div>
        </div>

        <button
          type="submit"
          class="create-btn cascade-4"
          :style="{ background: formData.color }"
          :disabled="loading"
        >
          {{ loading ? "Creating..." : "Create Project" }}
        </button>
      </form>
    </div>

    <div class="dot dot-yellow floating-1"></div>
    <div class="dot dot-blue floating-2"></div>
    <div class="dot dot-pink floating-3"></div>
    <div class="dot dot-red-small floating-1"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import PageHeader from "@/components/medical/PageHeader.vue";
import { useProjectsStore } from "@/stores/projectsStore";
import { useRouter } from "vue-router";

const router = useRouter();
const projectStore = useProjectsStore();

const fileInput = ref(null);
const logoPreview = ref(null);
const loading = ref(false);

const colors = ["#756EF3", "#FFAB2D", "#FF7D97", "#27AE60", "#002055"];

const formData = reactive({
  name: "",
  category: "",
  logo: null,
  color: "#756EF3",
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.logo = file;
    logoPreview.value = URL.createObjectURL(file);
  }
};

const addProject = async () => {
  if (!formData.name) return;

  loading.value = true;

  // Simulated delay for animation effect
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const newProject = {
    name: formData.name,
    category: formData.category,
    logo: logoPreview.value,
    color: formData.color,
  };

  const result = projectStore.addProject(newProject);

  router.push({
    name: "ProjectInfo",
    query: { id: result.id },
  });
};
</script>

<style scoped>
.create-project-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #ffffff;
  overflow-x: hidden;
}

.content-wrapper {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  width: 90%;
  transition: filter 0.3s ease;
}

.blur-content {
  filter: blur(4px);
  pointer-events: none;
}

/* Form Styles */
.custom-input {
  width: 100%;
  padding: 16px;
  border: 1px solid #e6eaf0;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.custom-input:focus {
  border-color: #756ef3;
}

/* --- LOADING OVERLAY --- */
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

/* Animations */
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

/* Rest of the UI Styles */
.logo-section {
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
}
.logo-placeholder {
  width: 100px;
  height: 100px;
  border: 2px dashed #756ef3;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.3s ease;
}
.logo-icon-box {
  width: 100%;
  height: 100%;
  background: #f8f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hidden-input {
  display: none;
}
.upload-title {
  font-weight: 500;
  font-size: 18px;
  color: #002055;
  margin-bottom: 4px;
}
.upload-subtitle {
  font-weight: 400;
  font-size: 12px;
  color: #848a94;
}
.input-group {
  margin: 24px 0;
}
.label {
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: #848a94;
  margin-bottom: 8px;
}
.color-picker {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.color-option {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  border: 3px solid transparent;
}
.color-option.active {
  border-color: #e6eaf0;
  transform: scale(1.15);
}

.create-btn {
  width: 100%;
  height: 64px;
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(117, 110, 243, 0.2);
  transition: all 0.3s ease;
}
.create-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

/* Decorative Elements */
.dot {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}
.dot-yellow {
  width: 8px;
  height: 8px;
  background: #fecd56;
  top: 120px;
  right: 20px;
}
.dot-blue {
  width: 14px;
  height: 14px;
  background: #c7c4ff;
  top: 140px;
  right: 50px;
  opacity: 0.6;
}
.dot-pink {
  width: 6px;
  height: 6px;
  background: #ffcfd5;
  top: 175px;
  right: 35px;
}
.dot-red-small {
  width: 6px;
  height: 6px;
  background: #ffcfd5;
  top: 250px;
  left: 30px;
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
.cascade-1 {
  animation: fadeInUp 0.6s ease-out 0.1s both;
}
.cascade-2 {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}
.cascade-3 {
  animation: fadeInUp 0.6s ease-out 0.3s both;
}
.cascade-4 {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
.floating-1 {
  animation: float 3s ease-in-out infinite;
}
.floating-2 {
  animation: float 4s ease-in-out infinite;
}
.floating-3 {
  animation: float 5s ease-in-out infinite;
}
</style>
