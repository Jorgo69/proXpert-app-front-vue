<template>
  <div class="space-y-8">
    <!-- Secteur d'activité -->
    <!-- <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Secteur d'activité *
      </label>
      <select 
        v-model="form.secteur"
        name="secteur"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500"
      >
        <option value="">Sélectionnez votre secteur</option>
        <option value="batiment">Bâtiment & Construction</option>
        <option value="renovation">Rénovation</option>
        <option value="electricite">Électricité</option>
        <option value="plomberie">Plomberie</option>
        <option value="menuiserie">Menuiserie</option>
        <option value="metal">Métallerie</option>
        <option value="autres">Autres</option>
      </select>
      <p v-if="errors.secteur" class="text-red-500 text-xs mt-1">{{ errors.secteur }}</p>
    </div> -->

    <!-- Métier principal -->
    <!-- <FormField name="metier" label="Métier principal *" v-model="form.metier" :error="errors.metier" placeholder="Ex: Électricien, Plombier, Menuisier..." /> -->

    <!-- Spécialité -->
    <!-- <FormField name="specialite" label="Spécialité *" v-model="form.specialite" :error="errors.specialite" placeholder="Ex: Installation électrique, Rénovation salle de bain..." /> -->

    <!-- Années d'expérience -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Année(s) d'expérience(s) *
      </label>
      <!-- <select 
        v-model="form.experience"
        name="experience"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500"
      >
        <option value="">Sélectionnez</option>
        <option value="0-2">0-2 ans</option>
        <option value="3-5">3-5 ans</option>
        <option value="6-10">6-10 ans</option>
        <option value="10+">Plus de 10 ans</option>
      </select> -->
      <p v-if="errors.experience" class="text-red-500 text-xs mt-1">{{ errors.experience }}</p>
    </div>

    <!-- Diplômes -->
    <FormField name="diplomes" label="Diplôme(s)" v-model="form.diplomes" :error="errors.diplomes" placeholder="Ex: CAP Électricien, BTS Bâtiment..." />

    <!-- Portfolio - Upload de photos -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Portfolio (photos de vos réalisations)
      </label>
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div class="flex flex-col items-center justify-center">
          <span class="text-4xl mb-2">📁</span>
          <p class="text-gray-600 mb-2">Glissez-déposez vos photos ou</p>
          <button 
            type="button"
            @click="triggerFileInput"
            class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Parcourir
          </button>
          <input 
            type="file" 
            ref="fileInput"
            multiple 
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          >
        </div>
        
        <!-- Aperçu des fichiers -->
        <div v-if="uploadedFiles.length > 0" class="mt-4">
          <p class="text-sm text-gray-600 mb-2">Fichiers sélectionnés :</p>
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="(file, index) in uploadedFiles" 
              :key="index"
              class="flex items-center bg-gray-100 px-3 py-1 rounded"
            >
              <span class="text-sm">{{ file.name }}</span>
              <button 
                type="button"
                @click="removeFile(index)"
                class="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormField from '@/components/common/FormField.vue'

const props = defineProps({
  form: Object,
  errors: Object
})

const fileInput = ref(null)
const uploadedFiles = ref([])

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  props.form.portfolio = uploadedFiles.value
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  props.form.portfolio = uploadedFiles.value
}
</script>
