<template>
  <a :href="href" :class="containerClasses">
    <div :class="iconWrapperClasses">
      <img :src="src" :alt="alt" :class="iconClasses" />
    </div>
    <div v-if="text" :class="textClasses">
      {{ text }}
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  text: { type: String, default: '' },
  href: { type: String, default: '#' },
  type: {
    type: String,
    default: 'simple',
    validator: (value) => ['circle', 'simple'].includes(value),
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['small', 'normal', 'large'].includes(value),
  },
});

const containerClasses = computed(() => {
  return [
    'flex items-center justify-center flex-col text-center transition-all duration-300',
    props.type === 'circle' ? 'group' : 'group-hover:text-red-500',
  ];
});

const iconWrapperClasses = computed(() => {
  // Styles de base pour le cercle, qui seront surchargés par la taille
  const baseCircleClasses = 'rounded-full flex items-center justify-center mb-1';
  // Styles pour les différentes tailles de cercle
  const sizeWrapperClasses = {
    small: 'w-12 h-12',
    normal: 'w-16 h-16',
    large: 'w-20 h-20',
  };
  // Styles de couleur et de bordure pour le cercle
  const circleColorClasses = 'border border-red-500 bg-white transition-all duration-300 group-hover:bg-red-500';

  if (props.type === 'circle') {
    return [
      baseCircleClasses,
      sizeWrapperClasses[props.size],
      circleColorClasses
    ];
  }
  return [''];
});

const iconClasses = computed(() => {
  // Styles de base pour l'image d'icône
  const baseIconClasses = 'transition-all duration-300 group-hover:filter group-hover:invert group-hover:brightness-0';
  // Styles pour les différentes tailles d'icône
  const sizeIconClasses = {
    small: 'w-6 h-6',
    normal: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  return [
    baseIconClasses,
    sizeIconClasses[props.size],
  ];
});

const textClasses = computed(() => {
  // Styles de base pour le texte
  const baseTextClasses = 'mt-1 font-semibold';
  // Styles pour les différentes tailles de texte
  const sizeTextClasses = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base',
  };

  return [
    baseTextClasses,
    sizeTextClasses[props.size],
    props.type === 'circle' ? 'text-gray-800' : 'text-gray-800 group-hover:text-red-500',
  ];
});
</script>