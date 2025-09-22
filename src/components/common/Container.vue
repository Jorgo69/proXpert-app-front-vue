<template>
  <div 
    :class="[
      'mx-auto px-4 my-10',
      fluid ? 'w-full max-w-full' : 'container',
      grid ? gridClasses : '',
      `text-${align}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  align: { 
    type: String, 
    default: 'center',
    validator: (value) => ['left', 'right', 'center'].includes(value)
  },
  fluid: { 
    type: Boolean, 
    default: false 
  },
  grid: { 
    type: Boolean, 
    default: false 
  },
  responsiveCols: { 
    type: Object, 
    default: () => ({ sm: 1, md: 2, lg: 4 }) 
  },
  gap: { 
    type: Number, 
    default: 4 
  }
});

const gridClasses = computed(() => {
  if (!props.grid) {
    return '';
  }
  const entries = Object.entries(props.responsiveCols);
  return [
    'grid',
    ...entries.map(([bp, cols]) => `${bp}:grid-cols-${cols}`),
    `gap-${props.gap}`
  ];
});
</script>