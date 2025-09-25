<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors hover:border-red-300">
      <div class="flex flex-col items-center justify-center">
        <svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
        </svg>
        
        <p class="text-gray-600 mb-2">Glissez-déposez vos fichiers ou</p>
        <button 
          type="button"
          @click="triggerFileInput"
          class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          Parcourir
        </button>
        <input 
          type="file" 
          ref="fileInput"
          :multiple="multiple"
          :accept="accept"
          @change="handleFileUpload"
          class="hidden"
        >
        <p class="text-xs text-gray-500 mt-2">
          {{ accept ? `Formats acceptés: ${accept}` : 'Tous les formats acceptés' }}
          {{ multiple ? ' (Plusieurs fichiers autorisés)' : '' }}
        </p>
      </div>
      
      <!-- Aperçu des fichiers -->
      <div v-if="uploadedFiles.length > 0" class="mt-4">
        <p class="text-sm text-gray-600 mb-2">Fichiers sélectionnés :</p>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(file, index) in uploadedFiles" 
            :key="index"
            class="flex items-center bg-gray-100 px-3 py-1 rounded-lg"
          >
            <span class="text-sm truncate max-w-32">{{ file.name }}</span>
            <button 
              type="button"
              @click="removeFile(index)"
              class="ml-2 text-red-500 hover:text-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: String,
  modelValue: {
    type: Array,
    default: () => []
  },
  required: Boolean,
  error: String,
  name: String,
  accept: String,
  multiple: Boolean,
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB par défaut
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const uploadedFiles = ref([...props.modelValue])

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  const validFiles = files.filter(file => {
    if (file.size > props.maxSize) {
      alert(`Le fichier ${file.name} est trop volumineux (max: ${props.maxSize / 1024 / 1024}MB)`)
      return false
    }
    return true
  })
  
  if (props.multiple) {
    uploadedFiles.value = [...uploadedFiles.value, ...validFiles]
  } else {
    uploadedFiles.value = validFiles
  }
  
  emit('update:modelValue', uploadedFiles.value)
  
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  emit('update:modelValue', uploadedFiles.value)
}

// Synchroniser avec la prop modelValue
watch(() => props.modelValue, (newValue) => {
  uploadedFiles.value = [...newValue]
}, { immediate: true })
</script>
