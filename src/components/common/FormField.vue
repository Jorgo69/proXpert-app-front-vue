<template>
  <div class="space-y-2">
    <label :for="name" class="block text-sm font-medium text-gray-700">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="name"
      :name="name"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="inputClasses"
    />

    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  error: String,
  name: String
})

defineEmits(['update:modelValue'])

const inputClasses = [
  'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
  'border-gray-300 focus:ring-red-200 focus:border-red-500'
]
</script>
