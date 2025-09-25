<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <StepProgress :steps="steps" :currentStep="currentStep" />

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <Step1 v-if="currentStep === 1" :form="form" :errors="errors" />
        <Step2 v-if="currentStep === 2" :form="form" :errors="errors" />
        <Step3 v-if="currentStep === 3" :form="form" :errors="errors" />

        <div class="flex justify-between pt-8 border-t border-gray-200">
          <button type="button" @click="prevStep"
                  :disabled="currentStep === 1"
                  class="px-8 py-3 border rounded-lg disabled:opacity-50">
            Retour
          </button>

          <button type="button" @click="nextStep"
                  :disabled="hasStepErrors"
                  class="px-8 py-3 bg-red-600 text-white rounded-lg disabled:bg-gray-400">
            {{ currentStep === steps.length ? 'Finaliser' : 'Continuer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import StepProgress from '@/components/common/StepProgress.vue'
import Step1 from './CraftsmanStep/Step1.vue'
import Step2 from './CraftsmanStep/Step2.vue'
import Step3 from './CraftsmanStep/Step3.vue'
import { validateStep } from '@/utils/validators.js'

const steps = [
  { number: 1, title: 'Informations personnelles' },
  { number: 2, title: 'Profil professionnel' },
  { number: 3, title: 'Paiement & validation' }
]

const currentStep = ref(1)

const form = reactive({
  nipi: '', nom: '', prenom: '', email: '', telephone: '',
  adresse: '', password: '', passwordConfirm: '',
  secteur: '', metier: '', specialite: '', experience: '',
  diplomes: '', portfolio: [], plan: '',
  acceptConditions: false
})

const errors = reactive({})

// computed contenant les erreurs de l'étape courante (toujours à jour)
const stepErrors = computed(() => validateStep(currentStep.value, form))

// synchronise l'objet `errors` utilisé par les champs (affichage)
// watch(stepErrors, (newVal) => {
//   Object.keys(errors).forEach(k => delete errors[k])
//   Object.assign(errors, newVal)
// }, { immediate: true, deep: true })

const hasStepErrors = computed(() => Object.keys(stepErrors.value).length > 0)

function nextStep() {
  const stepErr = validateStep(currentStep.value, form)

  // copie dans errors (pour affichage)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, stepErr)

  if (Object.keys(stepErr).length === 0) {
    if (currentStep.value < steps.length) {
      currentStep.value++
    } else {
      // finaliser
      console.log('Formulaire prêt :', JSON.parse(JSON.stringify(form)))
    }
  } else {
    // focus sur premier champ en faute si possible
    const first = Object.keys(stepErr)[0]
    const el = document.querySelector(`[name="${first}"]`)
    if (el) el.focus()
  }
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('craftsmanForm') || '{}')
  if (saved.form) Object.assign(form, saved.form)
  if (saved.currentStep) currentStep.value = saved.currentStep
})

// Sauvegarder automatiquement
watch(
  () => ({ ...form, currentStep: currentStep.value }),
  (val) => {
    localStorage.setItem('craftsmanForm', JSON.stringify({
      form: { ...form },
      currentStep: currentStep.value
    }))
  },
  { deep: true }
)
</script>
