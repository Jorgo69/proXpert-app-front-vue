<!-- components/IconCircle.vue -->
<template>
  <div class="flex flex-col items-center">
    <!-- Cercle avec icône -->
    <div
      class="flex items-center justify-center rounded-full"
      :class="[
        bgColor,
        textColor,
        sizeClasses
      ]"
    >
      <component :is="icon" class="w-1/2 h-1/2" />
    </div>

    <!-- Titre optionnel -->
    <p v-if="label" class="mt-2 text-sm font-medium text-gray-700">
      {{ label }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, String], // ex: import { HomeIcon } from "lucide-vue-next"
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "md", // sm, md, lg
  },
  bgColor: {
    type: String,
    default: "bg-gray-100",
  },
  textColor: {
    type: String,
    default: "text-gray-700",
  },
})

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
}
</script>
