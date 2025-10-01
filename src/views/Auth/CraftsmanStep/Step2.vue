<template>
  <div class="space-y-8">
    <!-- Spécialité -->
    <FormField
      v-if="isEntreprise"
      name="company_name"
      label="Nom de l'entreprise "
      v-model="form.company_name"
      :error="errors.company_name"
      placeholder="Le nom de votre entreprise..." 
    />

    <!-- Secteur d'activité -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Secteur d'activité *
      </label>
      <select 
        v-model="form.secteur"
        name="sector"
        @change="onSectorChange"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500"
      >
        <option value="">Sélectionnez votre secteur</option>
        <option v-for="sector in sectors" :key="sector.id" :value="sector.id">
          {{ sector.name }}
        </option>
      </select>
      <p v-if="errors.sector" class="text-red-500 text-xs mt-1">{{ errors.sector }}</p>
    </div>

    <!-- Sous-secteurs -->
    <BaseMultiSelect
      name="sub_sectors" 
      label="Sous-secteur(s) " 
      placeholder="Recherchez un sous-secteur..."
      v-model="form.sub_sectors" 
      :options="subSectorOptions" 
      :error="errors.sub_sectors" 
      required
    />

    <!-- Villes -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Ville *
      </label>
      <select 
        v-model="form.city"
        name="city"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500"
      >
        <option value="">Sélectionnez votre ville</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
      <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
    </div>
    

    <!-- Spécialité -->
    <FormField
      name="speciality"
      label="Spécialité "
      v-model="form.speciality"
      :error="errors.speciality"
      placeholder="Ex: Installation électrique, Rénovation salle de bain..." 
    />

    <!-- Années d'expérience -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-3">
        Année(s) d'expérience(s) *
      </label>
      <select 
        v-model="form.experience"
        name="experience"
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500"
      >
        <option value="">Sélectionnez</option>
        <option value="2020">2020 ans</option>
        <option value="2021">2021 ans</option>
        <option value="2022">2022 ans</option>
        <option value="2023">2023 ans</option>
      </select>
      <p v-if="errors.experience" class="text-red-500 text-xs mt-1">{{ errors.experience }}</p>
    </div>

    <!-- Diplômes -->
    <FormField 
      name="diplomes" 
      label="Diplôme(s)" 
      v-model="form.diplomes" 
      :error="errors.diplomes" 
      placeholder="Ex: CAP Électricien, BTS Bâtiment..." 
    />

    <!-- Document -->
    <BaseFileUpload
      v-if="isEntreprise"
      label="Vos documents justificatifs "
      v-model="form.documents"
      :multiple="true"
      accept=".pdf"
      :maxFiles="5"
      :maxSize="3145728"
      placeholder="Glissez-déposez vos diplômes ou"
      previewLabel="Diplômes sélectionnés"
      hint="Formats acceptés: PDF. Max 3MB par fichier"
      icon="🎓"
      :previewColumns="3"
      :showImagePreviews="true"
      required
    />

    <!-- Portfolio -->
    <BaseFileUpload
      v-if="isEntreprise"
      label="Registre de commerce"
      v-model="form.diplomas"
      :multiple="true"
      accept=".pdf"
      :maxFiles="5"
      :maxSize="3145728"
      placeholder="Glissez-déposez vos diplômes ou"
      previewLabel="Diplômes sélectionnés"
      hint="Formats acceptés: PDF. Max 3MB par fichier"
      icon="🎓"
      :previewColumns="3"
      :showImagePreviews="true"
    />


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import FormField from '@/components/common/FormField.vue'
import BaseMultiSelect from '../../../components/common/forms/BaseMultiSelect.vue'
import BaseFileUpload from '../../../components/common/forms/BaseFileUpload.vue'

const props = defineProps({
  form: Object,
  errors: Object
})

const form = props.form

const fileInput = ref(null)
const uploadedFiles = ref([])

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  uploadedFiles.value = [...uploadedFiles.value, ...files]
  form.portfolio = uploadedFiles.value
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
  form.portfolio = uploadedFiles.value
}

// états
const loadingSectors = ref(false)
const loadingSubSectors = ref(false)
const loadingCities = ref(false)

const sectors = ref([])
const cities = ref([])
const subSectorOptions = ref([])

// API
const loadSectors = async () => {
  try {
    loadingSectors.value = true
    const response = await api.get('/vbeta/sectors')
    sectors.value = response.data.data || response.data
  } catch (e) {
    sectors.value = []
  } finally {
    loadingSectors.value = false
  }
}

const loadCities = async () => {
  try {
    loadingCities.value = true
    const response = await api.get('/vbeta/cities')
    cities.value = response.data.data || response.data
  } catch (e) {
    cities.value = []
  } finally {
    loadingCities.value = false
  }
}

const onSectorChange = async () => {
  form.sub_sectors = []
  subSectorOptions.value = []
  
  if (!form.secteur) return
  
  try {
    loadingSubSectors.value = true
    // const response = await api.get(`/vbeta/sub-sectors?sector_id=${form.secteur}`)
    // Injecte l'ID directement dans le chemin de l'URL
    const response = await api.get(`/vbeta/sectors/${form.secteur}/sub-sectors`);
    const subSectors = response.data.data || response.data
    subSectorOptions.value = subSectors.map(s => ({
      label: s.name,
      value: s.id
    }))
  } catch (e) {
    subSectorOptions.value = []
  } finally {
    loadingSubSectors.value = false
  }
}

onMounted(async () => {
  await loadSectors()
  await loadCities()
})
</script>
