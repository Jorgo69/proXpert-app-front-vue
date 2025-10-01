**Excellent idée !** Créons un composant `BaseFileUpload` réutilisable avec toutes les fonctionnalités dont vous avez besoin. 🚀

## 📁 **BaseFileUpload.vue** (Composant réutilisable)

```vue
<template>
  <div class="file-upload-container">
    <label class="block text-sm font-medium text-gray-700 mb-3">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div
      :class="[
        'border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300',
        isDragOver ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-red-300',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'
      ]"
      @click="!disabled && triggerFileInput()"
      @drop="!disabled && handleDrop($event)"
      @dragover="!disabled && handleDragOver($event)"
      @dragleave="!disabled && handleDragLeave($event)"
    >
      <!-- Zone de dépôt -->
      <div class="flex flex-col items-center justify-center">
        <span class="text-4xl mb-2">{{ icon }}</span>
        <p class="text-gray-600 mb-2">{{ placeholder }}</p>
        <button 
          type="button"
          :disabled="disabled"
          @click.stop="!disabled && triggerFileInput()"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-colors',
            disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-600 hover:bg-red-200'
          ]"
        >
          Parcourir
        </button>
        
        <!-- Informations supplémentaires -->
        <p v-if="hint" class="text-xs text-gray-500 mt-2">{{ hint }}</p>
      </div>

      <!-- Input fichier caché -->
      <input 
        type="file" 
        ref="fileInput"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleFileSelect"
        class="hidden"
      />
    </div>

    <!-- Aperçu des fichiers -->
    <div v-if="modelValue.length > 0" class="mt-4">
      <p class="text-sm text-gray-600 mb-2">{{ previewLabel }} :</p>
      <div class="grid gap-3" :class="previewGridClass">
        <!-- Mode aperçu image -->
        <div 
          v-for="(file, index) in modelValue" 
          :key="getFileKey(file, index)"
          class="relative group"
        >
          <div class="border rounded-lg overflow-hidden bg-white shadow-sm">
            <!-- Aperçu image -->
            <div v-if="isImageFile(file)" class="aspect-square bg-gray-100 flex items-center justify-center">
              <img 
                :src="getFilePreview(file)" 
                :alt="file.name"
                class="w-full h-full object-cover"
                @load="handleImageLoad"
                @error="handleImageError"
              />
            </div>
            
            <!-- Aperçu document -->
            <div v-else class="aspect-square bg-gray-50 flex flex-col items-center justify-center p-4">
              <span class="text-3xl mb-2">📄</span>
              <p class="text-xs text-gray-600 text-center break-words">{{ getFileName(file) }}</p>
            </div>
            
            <!-- Overlay d'actions -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div class="flex space-x-2">
                <!-- Bouton visualiser (pour les images) -->
                <button 
                  v-if="isImageFile(file)"
                  type="button"
                  @click.stop="previewFile(file)"
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <span class="text-lg">👁️</span>
                </button>
                
                <!-- Bouton supprimer -->
                <button 
                  type="button"
                  @click.stop="removeFile(index)"
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <span class="text-lg text-red-500">×</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Nom du fichier sous l'aperçu -->
          <p class="text-xs text-gray-600 mt-1 text-center truncate">{{ getFileName(file) }}</p>
        </div>
        
        <!-- Liste simple (alternative) -->
        <div 
          v-if="!showImagePreviews && modelValue.length > 0"
          class="flex flex-wrap gap-2"
        >
          <div 
            v-for="(file, index) in modelValue" 
            :key="getFileKey(file, index)"
            class="flex items-center bg-gray-100 px-3 py-1 rounded text-sm"
          >
            <span>{{ getFileName(file) }}</span>
            <button 
              type="button"
              @click="removeFile(index)"
              class="ml-2 text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de prévisualisation -->
    <div 
      v-if="previewModalVisible" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closePreview"
    >
      <div class="bg-white rounded-lg max-w-4xl max-h-full overflow-auto" @click.stop>
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ currentPreviewFile?.name }}</h3>
          <button @click="closePreview" class="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div class="p-4">
          <img 
            v-if="isImageFile(currentPreviewFile)" 
            :src="getFilePreview(currentPreviewFile)" 
            :alt="currentPreviewFile?.name"
            class="max-w-full max-h-96 object-contain mx-auto"
          />
          <div v-else class="text-center py-8">
            <span class="text-6xl mb-4">📄</span>
            <p class="text-gray-600">Aperçu non disponible pour ce type de fichier</p>
            <p class="text-sm text-gray-500 mt-2">{{ currentPreviewFile?.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message d'erreur -->
    <span v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Base
  label: String,
  modelValue: {
    type: Array,
    default: () => []
  },
  required: Boolean,
  error: String,
  disabled: Boolean,
  
  // Configuration
  multiple: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: '*/*'
  },
  maxFiles: {
    type: Number,
    default: 10
  },
  maxSize: {
    type: Number, // en bytes
    default: 10 * 1024 * 1024 // 10MB
  },
  
  // Personnalisation
  placeholder: {
    type: String,
    default: 'Glissez-déposez vos fichiers ou'
  },
  previewLabel: {
    type: String,
    default: 'Fichiers sélectionnés'
  },
  hint: String,
  icon: {
    type: String,
    default: '📁'
  },
  
  // Aperçu
  showImagePreviews: {
    type: Boolean,
    default: true
  },
  previewColumns: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits(['update:modelValue', 'files-selected', 'file-removed'])

const fileInput = ref(null)
const isDragOver = ref(false)
const previewModalVisible = ref(false)
const currentPreviewFile = ref(null)

// Classes CSS dynamiques pour la grille d'aperçu
const previewGridClass = computed(() => {
  const cols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }
  return `grid ${cols[props.previewColumns]}`
})

// Déclencher l'input fichier
const triggerFileInput = () => {
  fileInput.value.click()
}

// Gestion de la sélection de fichiers
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
  event.target.value = '' // Reset pour permettre la sélection des mêmes fichiers
}

// Gestion du drag & drop
const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const handleDragOver = (event) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event) => {
  event.preventDefault()
  isDragOver.value = false
}

// Traitement des fichiers
const processFiles = (files) => {
  if (!files.length) return
  
  // Vérification du nombre de fichiers
  if (!props.multiple && files.length > 1) {
    alert('Veuillez sélectionner un seul fichier')
    return
  }
  
  const currentCount = props.modelValue.length
  const newCount = currentCount + files.length
  
  if (newCount > props.maxFiles) {
    alert(`Maximum ${props.maxFiles} fichiers autorisés`)
    return
  }
  
  // Vérification de la taille des fichiers
  const oversizedFiles = files.filter(file => file.size > props.maxSize)
  if (oversizedFiles.length > 0) {
    alert(`Certains fichiers dépassent la taille maximale de ${props.maxSize / 1024 / 1024}MB`)
    return
  }
  
  // Ajouter les nouveaux fichiers
  const newFiles = props.multiple 
    ? [...props.modelValue, ...files]
    : [files[0]] // Pour single file, prendre le premier
  
  emit('update:modelValue', newFiles)
  emit('files-selected', files)
}

// Supprimer un fichier
const removeFile = (index) => {
  const removedFile = props.modelValue[index]
  const newFiles = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newFiles)
  emit('file-removed', removedFile)
}

// Utilitaires pour les fichiers
const getFileKey = (file, index) => {
  return file.name + '-' + file.size + '-' + index
}

const getFileName = (file) => {
  return file.name.length > 20 
    ? file.name.substring(0, 17) + '...' 
    : file.name
}

const isImageFile = (file) => {
  return file.type.startsWith('image/')
}

const getFilePreview = (file) => {
  if (file.preview) return file.preview
  return URL.createObjectURL(file)
}

// Prévisualisation
const previewFile = (file) => {
  currentPreviewFile.value = file
  previewModalVisible.value = true
}

const closePreview = () => {
  previewModalVisible.value = false
  currentPreviewFile.value = null
}

// Gestion des erreurs d'image
const handleImageLoad = (event) => {
  // Image chargée avec succès
}

const handleImageError = (event) => {
  // Gérer l'erreur de chargement de l'image
  event.target.style.display = 'none'
}
</script>

<style scoped>
.file-upload-container {
  font-family: inherit;
}

.grid {
  display: grid;
  gap: 0.75rem;
}

/* Animation pour le drag & drop */
.border-dashed {
  border-style: dashed;
}
</style>
```

## 🎯 **Utilisation dans vos formulaires :**

### **Exemple 1 : Upload multiple d'images (Portfolio)**
```vue
<BaseFileUpload
  label="Portfolio (photos de vos réalisations)"
  v-model="form.portfolio"
  :multiple="true"
  accept="image/*"
  :maxFiles="10"
  :maxSize="5242880" <!-- 5MB -->
  placeholder="Glissez-déposez vos photos ou"
  previewLabel="Photos sélectionnées"
  hint="Formats acceptés: JPG, PNG, WEBP. Max 5MB par image"
  icon="🖼️"
  :previewColumns="4"
  :showImagePreviews="true"
/>
```

### **Exemple 2 : Upload unique de document**
```vue
<BaseFileUpload
  label="CV (PDF)"
  v-model="form.cv"
  :multiple="false"
  accept=".pdf,.doc,.docx"
  :maxSize="2097152" <!-- 2MB -->
  placeholder="Glissez-déposez votre CV ou"
  previewLabel="CV sélectionné"
  hint="Formats acceptés: PDF, DOC, DOCX. Max 2MB"
  icon="📄"
  :previewColumns="1"
  :showImagePreviews="false"
/>
```

### **Exemple 3 : Upload de diplômes**
```vue
<BaseFileUpload
  label="Diplômes et certificats"
  v-model="form.diplomas"
  :multiple="true"
  accept=".pdf,.jpg,.jpeg,.png"
  :maxFiles="5"
  :maxSize="3145728" <!-- 3MB -->
  placeholder="Glissez-déposez vos diplômes ou"
  previewLabel="Diplômes sélectionnés"
  hint="Formats acceptés: PDF, JPG, PNG. Max 3MB par fichier"
  icon="🎓"
  :previewColumns="3"
  :showImagePreviews="true"
/>
```

## ✨ **Fonctionnalités incluses :**

- ✅ **Drag & Drop** avec feedback visuel
- ✅ **Multiples ou unique** fichier
- ✅ **Aperçu des images** avec modal de visualisation
- ✅ **Limites configurables** (taille, nombre)
- ✅ **Types de fichiers** spécifiques
- ✅ **Interface responsive** et accessible
- ✅ **Événements** pour personnalisation
- ✅ **Design cohérent** avec votre thème

**Maintenant vous avez un composant d'upload réutilisable partout !** 🎉