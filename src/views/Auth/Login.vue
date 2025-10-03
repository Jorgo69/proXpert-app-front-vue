<template>
  <Container class="max-w-lg mx-auto px-4 py-8">
    <!-- Afficher l'étape actuelle -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        {{ currentStep === 1 ? 'Connexion' : 'Vérification SMS' }}
      </h2>
      <p class="text-gray-600 mt-2">
        {{ currentStep === 1 
          ? 'Entrez vos identifiants' 
          : 'Entrez le code reçu par SMS' 
        }}
      </p>
    </div>

    <!-- Étape 1 : Credentials -->
    <div v-if="currentStep === 1" class="space-y-4">
      <FormField 
        name="email" 
        label="Email" 
        type="email" 
        v-model="form.email" 
        :error="errors.email" 
        placeholder="votre@email.com" 
        required 
      />
      
      <FormField 
        name="password" 
        label="Mot de passe" 
        type="password" 
        v-model="form.password" 
        :error="errors.password" 
        placeholder="••••••••"
        required 
      />

      <BaseButton
        @click="handleLogin"
        :disabled="hasStepErrors"
        class="w-full px-8 py-3 bg-red-600 text-white rounded-lg disabled:bg-gray-400"
      >
        Continuer
      </BaseButton>
    </div>

    <!-- Étape 2 : Vérification OTP -->
    <div v-if="currentStep === 2" class="space-y-4">
      <FormField 
        name="verificationCode" 
        label="Code de vérification" 
        type="text" 
        v-model="form.verificationCode" 
        :error="errors.verificationCode" 
        placeholder="123456" 
        maxlength="6"
        required 
      />

      <p class="text-sm text-gray-600">
        Un code à 6 chiffres a été envoyé au numéro : 
        <strong>{{ maskedPhone }}</strong>
      </p>

      <BaseButton
        @click="handleVerifyOTP"
        :disabled="hasStepErrors"
        class="w-full px-8 py-3 bg-red-600 text-white rounded-lg disabled:bg-gray-400"
      >
        Vérifier et se connecter
      </BaseButton>

      <BaseButton
        variant="secondary"
        @click="currentStep = 1"
        class="w-full px-8 py-3 border rounded-lg"
      >
        Retour
      </BaseButton>
    </div>
  </Container>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import Container from '@/components/common/Container.vue'
import FormField from '@/components/common/FormField.vue'
import { validateStep } from '@/utils/validators/login/login-validator'
import { useToast } from '@/composables/useToast'
import api from '@/utils/api'
import { handleApiError } from '@/utils/handleApiError'

const { addToast } = useToast()
const router = useRouter()

const currentStep = ref(1)

const form = reactive({
  // Étape 1
  email: '',
  password: '',
  
  // Étape 2
  verificationCode: '',
  
  // Données reçues du backend après login
  validity_code_timestamp: '',
  verification_code: '',
  user: null,
})

const errors = reactive({})

// Validation dynamique
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

// Masquer le numéro de téléphone (afficher uniquement les 4 derniers chiffres)
const maskedPhone = computed(() => {
  if (!form.user?.telephone) return '***'
  const phone = form.user.telephone
  return phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4)
})

// ========== ÉTAPE 1 : LOGIN ==========
async function handleLogin() {
  const stepErr = validateStep(1, form)
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, stepErr)

  if (Object.keys(stepErr).length > 0) {
    addToast('Veuillez corriger les erreurs', 'error')
    return
  }

  try {
    const payload = {
      email: form.email,
      password: form.password,
    }

    console.log('Payload login:', payload)

    const res = await api.post('/login', payload, {
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.data.status) {
      addToast('Code envoyé par SMS', 'success')

      // Stocker les infos pour l'étape 2
      form.validity_code_timestamp = res.data.validity_code_timestamp
      form.verification_code = res.data.verification_code
      form.user = res.data.user

      console.log('DEV: code reçu =', res.data.verification_code)

      // Passer à l'étape 2
      currentStep.value = 2
    } else {
      addToast(res.data.message || 'Erreur lors de la connexion', 'error')
    }
  } catch (e) {
    handleApiError(e, addToast)
  }
}

// ========== ÉTAPE 2 : VÉRIFICATION OTP ==========
async function handleVerifyOTP() {
  const stepErr = validateStep(2, form)
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, stepErr)

  if (Object.keys(stepErr).length > 0) {
    addToast('Veuillez corriger les erreurs', 'error')
    return
  }

  try {
    const payload = {
      code: form.verificationCode,
      validity_code_timestamp: form.validity_code_timestamp,
      email: form.email,
      verification_code: form.verification_code,
    }

    console.log('Payload OTP:', payload)

    const res = await api.post('/otp/verify', payload)

    if (res.data.access_token) {
      addToast('Connexion réussie ! Bienvenue 🎉', 'success')
      
      // Stocker le token
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('user', JSON.stringify(form.user))
      
      // Rediriger vers le dashboard
      router.push('/dashboard')
    } else {
      addToast('Code invalide ou expiré', 'error')
    }
  } catch (e) {
    handleApiError(e, addToast)
  }
}
</script>