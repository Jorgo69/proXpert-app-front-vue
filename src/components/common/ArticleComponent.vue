<template>
  <Card>
    <img :src="imageSrc" :alt="title" class="w-full object-cover mb-4">

    <div class="px-4 py-2">
      <span class="text-xs font-semibold text-gray-500 uppercase">{{ category }}</span>
      <h3 class="font-bold text-lg mt-1 mb-2">{{ title }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ excerpt }}</p>
    </div>

    <template #footer>
      <div class="flex justify-between items-center text-sm text-gray-500">
        <span>Par {{ author }} - {{ date }}</span>
        <a :href="link" class="text-red-600 hover:underline">Lire l'article</a>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from '@/components/common/Card.vue';

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
  },
});
</script>