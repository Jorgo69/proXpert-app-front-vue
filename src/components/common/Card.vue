<template>
  <div 
    :class="[
      'rounded-lg transition-all duration-300 transform',
      'border border-gray-200',
      'hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-1',
      'p-6',
      size === 'small' ? 'p-4' : size === 'large' ? 'p-8' : '',
    ]"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header"></slot>
    </div>
    
    <div class="card-content">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="pt-4 mt-4 border-t border-gray-200 text-right">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  size: { 
    type: String, 
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

// Pour accéder aux slots dans le script, on utilise useSlots()
const $slots = useSlots();
</script>