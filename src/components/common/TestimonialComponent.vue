<template>
  <Card>
    <template #header>
      <div class="flex items-center mb-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4">
          <img :src="profileImageSrc" :alt="authorName" class="w-full h-full object-cover">
        </div>
        <div>
          <h4 class="font-semibold">{{ authorName }}</h4>
          <p class="text-sm text-gray-500">{{ location }}</p>
        </div>
      </div>
    </template>

    <div class="flex flex-col">
      <div class="flex text-yellow-400 mb-2">
        <svg v-for="n in 5" :key="n" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.62-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      </div>

      <p class="text-gray-700 leading-relaxed italic">{{ reviewText }}</p>
    </div>

    <template #footer>
      <div class="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
        <span class="font-medium">Prestation: {{ service }}</span>
        <span>{{ date }}</span>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Card from '@/components/common/Card.vue';

const props = defineProps({
  profileImageSrc: { type: String, required: true },
  authorName: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 5 }, // Assume 5 stars, as shown in the mockup
  reviewText: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
});
</script>