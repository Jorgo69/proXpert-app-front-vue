<template>
  <button v-if="type === 'button'" :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
  <router-link v-else-if="type === 'link' && to" :to="to" :class="buttonClasses">
    <slot></slot>
  </router-link>
  <a v-else-if="type === 'external' && href" :href="href" target="_blank" :class="buttonClasses">
    <slot></slot>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 'button' pour un <button>, 'link' pour un <router-link>, 'external' pour un <a>
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'link', 'external'].includes(value),
  },
  // 'primary' pour le style principal, 'secondary' pour le style secondaire
  variant: {
    type: String,
    default: 'primary',
    // validator: (value) => ['primary', 'secondary'].includes(value),
    validator: (value) => ['primary', 'secondary', 'nav'].includes(value),
  },
  // 'normal', 'small', 'large' pour la taille du bouton
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'small', 'large'].includes(value),
  },
  // Route pour un lien interne
  to: {
    type: [String, Object],
    default: '',
  },
  // Lien pour un lien externe
  href: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  
  const sizeClasses = {
    normal: 'px-4 py-2 text-sm',
    small: 'px-3 py-1 text-xs',
    large: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-red-800 text-white',
    secondary: 'bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    nav: 'text-black hover:text-primary', // Ajoutez des styles pour les liens ici
  };

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
  ];
});

const handleClick = (event) => {
  emit('click', event);
};
</script>


