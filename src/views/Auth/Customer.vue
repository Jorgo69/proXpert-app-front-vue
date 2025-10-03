<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <StepProgress :steps="steps" :currentStep="currentStep" />

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <Step1 v-if="currentStep === 1" :form="form" :errors="errors" />
        <Step2 v-if="currentStep === 2" :form="form" :errors="errors" />
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import StepProgress from '@/components/common/StepProgress.vue'
import Step1 from './EntrepriseStep/Step1.vue'
import Step2 from './EntrepriseStep/Step2.vue'
import Step3 from './EntrepriseStep/Step3.vue'
import Step4 from './EntrepriseStep/Step4.vue'
import { validateStep } from '@/utils/validators/register/craftsman-validator'
import { useToast } from '@/composables/useToast'
import BaseButton from '@/components/common/BaseButton.vue'
import api from '@/utils/api'

const { addToast } = useToast()

const steps = [
  { number: 1, title: 'Informations personnelles' },
  { number: 2, title: 'Profil professionnel' },
  { number: 3, title: 'Vérification SMS' },
  { number: 4, title: 'Abonnement' },
]

const currentStep = ref(1)

const form = reactive({
  // étape 1
  nip: '',
  name: '',
  firstname: '',
  email: '',
  telephone: '',
  password: '',
  password_confirmation: '',
  location: '',

  // étape 2
  secteur: '',
  metier: '',
  specialite: '',
  experience: '',
  diplomes: '',
  portfolio: [],

  // étape 3
  verificationCode: '',
  validity_code_timestamp: '',
  verification_code: '',
  new_email: '',

  // étape 4
  plan: '',
  acceptConditions: false,
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
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (v === null || v === '') return // on saute les vides
        if (Array.isArray(v)) {
          v.forEach((f, i) => formData.append(`${k}[${i}]`, f))
        } else {
          formData.append(k, v)
        }
      })

      for (let [key, value] of formData.entries()) {
  console.log(key, value)
}

      const res = await api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data.success) {
        addToast('Code envoyé par SMS', 'success')

        // stocker infos utiles pour l’étape 3
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
      console.error(e)
      addToast('Erreur API register', 'error')
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
