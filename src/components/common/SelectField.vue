<template>
  <div class="space-y-2">
    <label :for="name" class="block text-sm font-medium text-gray-700">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    
    <select
      :id="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="selectClasses"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  placeholder: { type: String, default: 'Sélectionnez une option' },
  required: Boolean,
  error: String,
  name: String,
  options: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])

const selectClasses = [
  'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
  'border-gray-300 focus:ring-red-200 focus:border-red-500',
  'bg-white appearance-none'
]
</script>