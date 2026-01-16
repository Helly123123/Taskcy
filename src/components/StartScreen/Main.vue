<template>
  <Artboard v-if="step === '1'" />
  <OnboarOne v-else-if="step === '2'" />
</template>

<script setup>
import { computed } from "vue"; // Импортируем computed
import { useRoute } from "vue-router";
import Artboard from "./steps/Artboard.vue";
import OnboarOne from "./steps/OnboarOne.vue";

const route = useRoute();

// Создаем реактивную переменную, которая следит за query.step
const step = computed(() => route.query.step);
</script>
