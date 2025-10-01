<template>
  <div class="multi-select-container">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Zone de sélection -->
    <div class="relative">
      <!-- Input de recherche -->
      <div 
        class="min-h-12 p-2 border border-gray-300 rounded-lg bg-white flex flex-wrap items-center gap-1 cursor-text"
        @click="focusInput"
      >
        <!-- Tags des éléments sélectionnés -->
        <div 
          v-for="(item, index) in selectedItems" 
          :key="index"
          class="tag flex items-center bg-red-100 text-red-700 text-sm px-2 py-1 rounded-full"
        >
          <span>{{ item.label }}</span>
          <button 
            type="button" 
            @click.stop="removeItem(item.value)"
            class="ml-1 text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>

        <!-- Input de recherche -->
        <input
          ref="searchInput"
          type="text"
          :placeholder="selectedItems.length ? '' : placeholder"
          v-model="searchText"
          @focus="isOpen = true"
          @blur="handleBlur"
          @keydown.delete="handleBackspace"
          @keydown.down.prevent="focusNext"
          @keydown.up.prevent="focusPrev"
          @keydown.enter.prevent="selectFocused"
          class="flex-1 min-w-32 px-1 py-1 border-0 focus:outline-none focus:ring-0"
        />
      </div>

      <!-- Liste déroulante des options -->
      <div 
        v-if="isOpen && filteredOptions.length" 
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg"
      >
        <div
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          @mousedown.prevent="toggleItem(option.value)"
          :class="{ 
            'p-3 cursor-pointer hover:bg-red-50 transition-colors': true,
            'bg-red-100': focusedIndex === index 
          }"
        >
          <div class="flex items-center">
            <div :class="{
              'w-4 h-4 border rounded mr-3 flex items-center justify-center': true,
              'border-red-500': isSelected(option.value),
              'bg-red-500 border-red-500': isSelected(option.value)
            }">
              <span v-if="isSelected(option.value)" class="text-white text-xs">✓</span>
            </div>
            <span>{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- Message "Aucun résultat" -->
      <div 
        v-else-if="isOpen && searchText && !filteredOptions.length" 
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 p-3 text-gray-500 shadow-lg"
      >
        Aucun résultat trouvé pour "{{ searchText }}"
      </div>
    </div>

    <!-- Message d'erreur -->
    <span v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

const props = defineProps({
  name: String,
  label: String,
  placeholder: { type: String, default: 'Rechercher et sélectionner...' },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  required: Boolean,
  error: String,
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchText = ref('');
const focusedIndex = ref(0);
const searchInput = ref(null);

// Options sélectionnées (pour l'affichage des tags)
const selectedItems = computed(() => {
  return props.options.filter(option => props.modelValue.includes(option.value));
});

// Options filtrées (non sélectionnées + recherche)
const filteredOptions = computed(() => {
  const query = searchText.value.toLowerCase().trim();
  
  let filtered = props.options;
  
  // Filtrer par recherche textuelle
  if (query) {
    filtered = filtered.filter(option => 
      option.label.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

// Vérifier si une option est sélectionnée
const isSelected = (value) => {
  return props.modelValue.includes(value);
};

// Basculer la sélection d'un élément
const toggleItem = (value) => {
  let newValues;
  
  if (isSelected(value)) {
    // Désélectionner
    newValues = props.modelValue.filter(item => item !== value);
  } else {
    // Sélectionner
    newValues = [...props.modelValue, value];
  }
  
  emit('update:modelValue', newValues);
  searchText.value = '';
  focusInput();
};

// Supprimer un élément (via le tag ×)
const removeItem = (value) => {
  const newValues = props.modelValue.filter(item => item !== value);
  emit('update:modelValue', newValues);
};

// Gestion du blur
const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
    focusedIndex.value = 0;
  }, 200);
};

// Focus sur l'input
const focusInput = () => {
  searchInput.value?.focus();
  isOpen.value = true;
};

// Navigation clavier
const focusNext = () => {
  if (focusedIndex.value < filteredOptions.value.length - 1) {
    focusedIndex.value++;
  }
};

const focusPrev = () => {
  if (focusedIndex.value > 0) {
    focusedIndex.value--;
  }
};

const selectFocused = () => {
  if (filteredOptions.value.length > 0 && focusedIndex.value >= 0) {
    toggleItem(filteredOptions.value[focusedIndex.value].value);
  }
};

// Supprimer le dernier tag avec Backspace
const handleBackspace = () => {
  if (!searchText.value && props.modelValue.length > 0) {
    const lastValue = props.modelValue[props.modelValue.length - 1];
    removeItem(lastValue);
  }
};
</script>

<style scoped>
.multi-select-container {
  font-family: inherit;
}

.tag {
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
</style>