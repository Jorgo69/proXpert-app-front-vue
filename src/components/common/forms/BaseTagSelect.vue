<template>
  <div class="tag-select-container">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-3">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>

    <div v-if="modelValue.length" class="selected-tags mb-2 flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
      <div 
        v-for="(item, index) in selectedItems" 
        :key="index"
        class="tag flex items-center bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full"
      >
        <span>{{ item.label }}</span>
        <button 
          type="button" 
          @click.stop="removeItem(item.value)"
          class="ml-2 font-bold focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>

    <div class="relative">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="searchText"
        @focus="isOpen = true"
        @blur="closeOnBlur"
        @keydown.down.prevent="focusNext"
        @keydown.up.prevent="focusPrev"
        @keydown.enter.prevent="selectFocused"
        @keydown.tab="closeOnBlur"
        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
      />
      
      <ul v-if="isOpen && filteredOptions.length" class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
        <li
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          @mousedown.prevent="selectItem(option.value)"
          :class="{ 
            'p-3 cursor-pointer hover:bg-red-50': true,
            'bg-red-100': focusedIndex === index 
          }"
        >
          {{ option.label }}
        </li>
      </ul>
      <div v-else-if="isOpen && !filteredOptions.length" class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 p-3 text-gray-500 shadow-lg">
        Aucun résultat trouvé.
      </div>
    </div>

    <span v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  name: String,
  label: String,
  placeholder: { type: String, default: 'Rechercher et sélectionner...' },
  // La liste complète de toutes les options possibles
  options: {
    type: Array,
    required: true,
    // Format attendu: [{ label: 'Bâtiment', value: 'batiment' }, ...]
  },
  // v-model (Array des valeurs sélectionnées)
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
const focusedIndex = ref(-1); // Pour la navigation au clavier

// 1. Options déjà sélectionnées (pour les tags)
const selectedItems = computed(() => {
  // Filtre et mappe les options complètes basées sur les valeurs dans modelValue
  return props.options.filter(option => props.modelValue.includes(option.value));
});

// 2. Options filtrées et non sélectionnées (pour la liste déroulante)
const filteredOptions = computed(() => {
  const query = searchText.value.toLowerCase().trim();
  
  return props.options
    // 1. Filtrer pour la recherche textuelle
    .filter(option => option.label.toLowerCase().includes(query))
    // 2. Filtrer les options déjà sélectionnées
    .filter(option => !props.modelValue.includes(option.value));
});

// 3. Logique de sélection d'un élément
const selectItem = (value) => {
  if (!props.modelValue.includes(value)) {
    // Ajout de la nouvelle valeur
    const newValues = [...props.modelValue, value];
    emit('update:modelValue', newValues);
    
    // Réinitialise la recherche et ferme la liste
    searchText.value = '';
    isOpen.value = false;
    focusedIndex.value = -1;
  }
};

// 4. Logique de suppression d'un élément (retrait d'un tag)
const removeItem = (valueToRemove) => {
  const newValues = props.modelValue.filter(value => value !== valueToRemove);
  emit('update:modelValue', newValues);
};

// 5. Gestion de la fermeture (pour éviter les conflits de focus)
let blurTimeout = null;

const closeOnBlur = () => {
  // Utiliser un timeout pour permettre l'exécution de selectItem()
  blurTimeout = setTimeout(() => {
    isOpen.value = false;
    searchText.value = ''; // Optionnel: effacer le texte de recherche
    focusedIndex.value = -1;
  }, 150);
};

// 6. Navigation au clavier
const focusNext = () => {
  if (focusedIndex.value < filteredOptions.value.length - 1) {
    focusedIndex.value++;
  } else {
    focusedIndex.value = 0; // Boucle vers le premier
  }
};

const focusPrev = () => {
  if (focusedIndex.value > 0) {
    focusedIndex.value--;
  } else {
    focusedIndex.value = filteredOptions.value.length - 1; // Boucle vers le dernier
  }
};

const selectFocused = () => {
  if (focusedIndex.value !== -1 && filteredOptions.value.length > 0) {
    selectItem(filteredOptions.value[focusedIndex.value].value);
  }
};
</script>

<style scoped>
/* Pour l'instant, on se base sur les classes Tailwind de base, pas besoin de styles complexes */
</style>