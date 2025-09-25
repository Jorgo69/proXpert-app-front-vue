<template>
  <div :class="cardClasses">
    <div 
      v-if="popular" 
      class="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold"
    >
      Populaire
    </div>
    
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ name }}</h3>
      <div class="text-3xl font-bold text-red-600 mb-2">{{ price }}</div>
      <p class="text-gray-600">{{ period }}</p>
    </div>
    
    <ul class="space-y-3 mb-6">
      <li 
        v-for="feature in features" 
        :key="feature"
        class="flex items-center"
      >
        <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
        <span class="text-gray-700">{{ feature }}</span>
      </li>
    </ul>
    
    <button
      @click="$emit('select')"
      :class="buttonClasses"
      type="button"
    >
      {{ selected ? 'Sélectionné' : 'Sélectionner' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  id: String,
  name: String,
  price: String,
  period: String,
  features: Array,
  popular: Boolean,
  selected: Boolean
})

defineEmits(['select'])

const cardClasses = computed(() => [
  'bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 relative cursor-pointer',
  props.selected 
    ? 'border-red-500 shadow-2xl ring-2 ring-red-200' 
    : 'border-gray-200 hover:border-red-300 hover:shadow-xl'
])

const buttonClasses = computed(() => [
  'w-full py-3 rounded-lg font-semibold transition-colors',
  props.selected 
    ? 'bg-red-600 text-white' 
    : props.popular
      ? 'bg-red-100 text-red-600 hover:bg-red-200'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
])
</script>