<template>
  <div class="flex items-center justify-center mb-8">
    <div class="flex items-center space-x-4">
      <template v-for="(step, idx) in steps" :key="step.number">
        <div class="flex items-center">
          <div :class="stepClasses(step.number)">{{ step.number }}</div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Étape {{ step.number }}</p>
            <p class="font-semibold">{{ step.title }}</p>
          </div>
        </div>

        <div v-if="idx < steps.length - 1" :class="lineClasses(step.number)"></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStep: { type: Number, required: true },
  steps: { type: Array, required: true }
})

const stepClasses = (step) => [
  'rounded-full w-10 h-10 flex items-center justify-center font-semibold border-2',
  step < props.currentStep ? 'bg-green-500 border-green-500 text-white' :
  step === props.currentStep ? 'border-red-500 text-red-500' :
  'border-gray-300 text-gray-400'
]

const lineClasses = (step) => [
  'w-16 h-1 mx-2',
  step < props.currentStep ? 'bg-green-500' : 'bg-gray-300'
]
</script>
