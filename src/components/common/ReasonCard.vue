<template>
  <Card>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
      
      <div v-for="(reason, index) in reasons" :key="index" class="flex items-start mb-4">
        <div class="flex-shrink-0 mr-4">
          <img :src="reason.icon" :alt="reason.title" class="w-8 h-8">
        </div>
        
        <div>
          <h4 class="font-semibold">{{ reason.title }}</h4>
          <p class="text-sm text-gray-600">{{ reason.description }}</p>
        </div>
      </div>
    </div>
    
    <template #footer>
      <Button :variant="buttonVariant" :size="buttonSize" :type="buttonType" :to="buttonLink" class="w-full">
        {{ buttonText }}
      </Button>
    </template>
  </Card>
</template>

<script setup>
import Card from '@/components/common/Card.vue';
import Button from '@/components/common/BaseButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  reasons: {
    type: Array,
    required: true,
  },
  // Props pour le bouton
  buttonText: {
    type: String,
    required: true,
  },
  buttonVariant: {
    type: String,
    default: 'primary',
  },
  buttonSize: {
    type: String,
    default: 'large',
  },
  buttonType: {
    type: String,
    default: 'button',
  },
  buttonLink: {
    type: String,
    default: '#',
  }
});
</script>