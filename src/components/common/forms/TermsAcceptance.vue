<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <div class="flex items-start">
      <input
        type="checkbox"
        id="conditions"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="mt-1 mr-3 w-5 h-5 text-red-600 focus:ring-red-500 focus:ring-2 rounded"
      >
      <label for="conditions" class="text-gray-700 text-sm leading-relaxed">
        J'accepte les 
        <a 
          href="/terms" 
          target="_blank"
          class="text-red-600 hover:underline font-medium"
        >
          conditions générales d'utilisation
        </a> 
        et la 
        <a 
          href="/privacy" 
          target="_blank"
          class="text-red-600 hover:underline font-medium"
        >
          politique de confidentialité
        </a>. 
        Je comprends que mon inscription sera effective après validation du paiement.
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>