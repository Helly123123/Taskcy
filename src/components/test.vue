<template>
  <button @click="pushTo('startScreen')">push</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushTo = (pageName) => {
  router.push({
    name: pageName,
    query: { step: "1" },
  });
};
</script>
