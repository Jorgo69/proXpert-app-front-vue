<script setup>
import { RouterView } from 'vue-router';
import Header from './components/container/helper/Header.vue';
import ToastNotification from '@/components/common/ToastNotification.vue'
import Footer from './components/container/helper/Footer.vue';
</script>

<template>
  <!-- <Header /> -->
  <RouterView />
  <ToastNotification />
  <!-- <Footer /> -->
</template>

<style scoped></style>