<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="min-w-72 p-4 rounded-lg shadow-lg flex items-center justify-between"
        >
          <div class="flex items-center">
            <component :is="getIcon(toast.type)" class="w-5 h-5 mr-3 flex-shrink-0" />
            <p class="text-sm font-medium">{{ toast.message }}</p>
          </div>
          <button 
            @click="removeToast(toast.id)"
            class="ml-4 text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useToast } from '@/composables/useToast'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon 
} from '@heroicons/vue/24/solid'

const { toasts } = useToast()

const toastClasses = (type) => {
  const base = 'border-l-4'
  const types = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800'
  }
  return `${base} ${types[type] || types.info}`
}

const getIcon = (type) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
  }
  return icons[type] || icons.info
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>