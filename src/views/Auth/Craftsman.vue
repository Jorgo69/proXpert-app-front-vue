<template>
  <!-- <div class="min-h-screen bg-gray-50 py-8"></div> -->
  <Container class="">
    <!-- <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <StepProgress :steps="steps" :currentStep="currentStep" />

      <Container class="bg-white rounded-2xl hover:shadow-lg shadow-red-100 p-8">

        <Step1 v-if="currentStep === 1" :form="form" :errors="errors" />
        <Step2 v-if="currentStep === 2" :form="form" :errors="errors" :account-type="form.accountType"  />
        <Step3 v-if="currentStep === 3" :form="form" :errors="errors" />
        <Step4 v-if="currentStep === 4" :form="form" :errors="errors" />

        <div class="flex justify-between pt-8 border-t border-gray-200">
          <BaseButton
            variant="secondary"
            type="button"
            @click="prevStep"
            :disabled="currentStep <= 1"
            class="px-8 py-3 border rounded-lg disabled:opacity-50"
          >
            Retour
          </BaseButton>

          <BaseButton
            @click="nextStep"
            :disabled="hasStepErrors"
            class="px-8 py-3 bg-red-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {{ currentStep === steps.length ? 'Finaliser' : 'Continuer' }}
          </BaseButton>
        </div>

      </Container>
    </div>
  </Container>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'

import StepProgress from '@/components/common/StepProgress.vue'
import Step1 from './CraftsmanStep/Step1.vue'
import Step2 from './CraftsmanStep/Step2.vue'
import Step3 from './CraftsmanStep/Step3.vue'
import Step4 from './CraftsmanStep/Step4.vue'
import { validateStep, validateSteps1And2 } from '@/utils/validators/register/craftsman-validator'
import { useToast } from '@/composables/useToast'
import BaseButton from '@/components/common/BaseButton.vue'
import api from '@/utils/api'
import { handleApiError } from '../../utils/handleApiError'
import Container from '../../components/common/Container.vue'

const { addToast } = useToast();

const steps = [
  { number: 1, title: 'Informations personnelles' },
  { number: 2, title: 'Profil professionnel' },
  { number: 3, title: 'Vérification SMS' },
  { number: 4, title: 'Abonnement' },
]

const currentStep = ref(1)

const form = reactive({
  accountType: 'craftsman_individual', // Doit correspondre à l'initialisation de Step1

  // étape 1
  npi: '',
  ifu: '',
  name: '',
  firstname: '',
  email: '',
  telephone: '',
  password: '',
  password_confirmation: '',
  location: '',
  image: '',

  // étape 2
  sector: '',
  sub_sectors: [],
  speciality: '',
  experience: '',
  documents: [],
  commercial_register: [],

  // étape 3
  verificationCode: '',
  validity_code_timestamp: '',
  verification_code: '',
  new_email: '',

  // étape 4
  plan: '',
  // acceptConditions: false,
})

const errors = reactive({})

// validation dynamique
const stepErrors = computed(() => validateStep(currentStep.value, form))
watch(
  stepErrors,
  (newVal) => {
    Object.keys(errors).forEach((k) => delete errors[k])
    Object.assign(errors, newVal)
  },
  { immediate: true, deep: true }
)

const hasStepErrors = computed(
  () => Object.keys(stepErrors.value).length > 0
)

async function nextStep() {
  const stepErr = validateStep(currentStep.value, form)
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, stepErr)

  if (Object.keys(stepErr).length > 0) {
    addToast('Veuillez corriger les erreurs', 'error')
    return
  }

  // Étape 2 → register
  if (currentStep.value === 2) {
      const allErrors = validateSteps1And2(form)
  
      if (Object.keys(allErrors).length > 0) {
        Object.keys(errors).forEach((k) => delete errors[k])
        Object.assign(errors, allErrors)
        addToast('Veuillez corriger toutes les erreurs', 'error')
        return
      }

      try {
        // Créer un FormData pour envoyer les fichiers
        const formData = new FormData()
        
        // Champs texte
        formData.append('type', form.accountType)
        formData.append('name', form.name)
        formData.append('firstname', form.firstname)
        formData.append('email', form.email)
        formData.append('telephone', form.telephone)
        formData.append('password', form.password)
        formData.append('password_confirmation', form.password_confirmation)
        
        if (form.location) formData.append('location', form.location)
        if (form.city) formData.append('city_id', form.city)
        if (form.sector) formData.append('sector_id', form.sector)
        if (form.speciality) formData.append('speciality', form.speciality)
        if (form.experience) formData.append('experience_year', form.experience)
        
        // Champs conditionnels selon le type de compte
        if (form.accountType === 'craftsman_individual' && form.npi) {
          formData.append('npi', form.npi)
        }
        
        if (form.accountType === 'craftsman_entreprise') {
          if (form.ifu) formData.append('ifu', form.ifu)
          if (form.company_name) formData.append('company_name', form.company_name)
        }
        
        // Image de profil (single file)
        if (form.image && form.image.length > 0) {
          formData.append('image', form.image[0]) // ← Prendre le premier fichier
        }
        
        // Registre de commerce (single file pour entreprise)
        if (form.accountType === 'craftsman_entreprise' && 
            form.commercial_register && 
            form.commercial_register.length > 0) {
          formData.append('commercial_register', form.commercial_register[0]) // ← Prendre le premier
        }
        
        // Documents (multiple files pour entreprise)
        // if (form.accountType === 'craftsman_entreprise' &&
        if (form.documents && 
            form.documents.length > 0) {
          form.documents.forEach((doc, index) => {
            formData.append(`documents[${index}]`, doc) // ← Array de fichiers
            // OU si le backend attend juste "documents[]":
            // formData.append('documents[]', doc)
          })
        }
        
        // Sous-secteurs (array d'IDs)
        if (form.sub_sectors && form.sub_sectors.length > 0) {
          form.sub_sectors.forEach((subSectorId, index) => {
            formData.append(`sub_sector_id[${index}]`, subSectorId)
            // OU si le backend attend "sub_sector_id[]":
            // formData.append('sub_sector_id[]', subSectorId)
          })
        }

        console.log('FormData envoyé (aperçu):')
        for (let [key, value] of formData.entries()) {
          console.log(key, value)
        }

        const res = await api.post('/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }, // ← Important !
        })

        if (res.data.success) {
          addToast('Code envoyé par SMS', 'success')

          form.validity_code_timestamp = res.data.validity_code_timestamp
          form.verification_code = res.data.verification_code
          form.new_email = res.data.new_email || ''
          form.email = res.data.email || form.email

          console.log('DEV: code reçu =', res.data.verification_code)

          currentStep.value = 3
      } else {
        addToast("Erreur lors de l'inscription", 'error')
      }
    } catch (e) {
      handleApiError(e, addToast)
      // console.error("Erreur API register:", e.response?.data || e.message)
      // console.error(e)
      // addToast('Erreur API register', 'error')
    }
    return
  }

  // Étape 3 → vérifier code
  if (currentStep.value === 3) {
    try {
      const payload = {
        code: form.verificationCode,
        validity_code_timestamp: form.validity_code_timestamp,
        email: form.email,
        verification_code: form.verification_code,
        new_email: form.new_email,
      }

      const res = await api.post('/otp/verify', payload)

      if (res.data.access_token) {
        addToast('Numéro vérifié', 'success')
        localStorage.setItem('token', res.data.access_token)
        currentStep.value = 4
      } else {
        addToast('Code invalide', 'error')
      }
    } catch (e) {
      console.error(e)
      addToast('Erreur de vérification', 'error')
    }
    return
  }

  // Étape 4 → finaliser
  if (currentStep.value === steps.length) {
    addToast('Inscription finalisée 🎉', 'success')
    return
  }

  currentStep.value++
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

// persistance localStorage
// onMounted(() => {
//   const saved = JSON.parse(localStorage.getItem('craftsmanForm') || '{}')
//   if (saved.form) Object.assign(form, saved.form)
//   if (saved.currentStep) currentStep.value = saved.currentStep
// })
// onMounted(() => {
//   const saved = JSON.parse(localStorage.getItem('craftsmanForm') || '{}')
//   if (saved.form) {
//     const normalized = normalizeSavedForm(saved.form)
//     // GARDER seulement les clés du form réactif existant (évite d'ajouter d'anciennes)
//     Object.keys(form).forEach(k => {
//       if (normalized[k] !== undefined) form[k] = normalized[k]
//     })
//   }
//   if (saved.currentStep) currentStep.value = saved.currentStep
// })


watch(
  form,
  (val) => {
    localStorage.setItem(
      'craftsmanForm',
      JSON.stringify({
        form: { ...val },
        currentStep: currentStep.value,
      })
    )
  },
  { deep: true }
)

watch(currentStep, (val) => {
  const saved = JSON.parse(localStorage.getItem('craftsmanForm') || '{}')
  localStorage.setItem(
    'craftsmanForm',
    JSON.stringify({
      form: saved.form || { ...form },
      currentStep: val,
    })
  )
})
</script>
