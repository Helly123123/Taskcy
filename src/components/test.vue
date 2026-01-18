<template>
  <button @click="pushTo('startScreen')">push</button>
</template>

<script setup>
const pushTo = (pageName) => {
  localStorage.clear();
};
</script>
