<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold">Vérification du numéro</h2>
      <p class="text-sm text-gray-600 mt-2">
        Un code à 6 chiffres a été envoyé au numéro :
        <span class="font-medium">{{ formattedPhone }}</span>
      </p>
    </div>

    <div class="max-w-sm mx-auto">
      <FormField
        name="verificationCode"
        label="Code de vérification"
        v-model="form.verificationCode"
        :error="errors.verificationCode"
        placeholder="123456"
      />

      <div class="flex items-center justify-between mt-4">
        <button
          type="button"
          class="px-4 py-2 border rounded-lg text-sm"
          @click="onResend"
          :disabled="cooldown > 0"
        >
          <span v-if="cooldown === 0">Renvoyer le code</span>
          <span v-else>Renvoyer dans {{ cooldown }}s</span>
        </button>

        <button
          type="button"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
          @click="$emit('editPhone')"
        >
          Modifier le numéro
        </button>
      </div>

      <p v-if="hint" class="text-xs text-gray-500 mt-3">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, computed } from 'vue'
import FormField from '@/components/common/FormField.vue'

const props = defineProps({
  form: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['resendRequested', 'editPhone'])

// cooldown (secondes) avant de pouvoir renvoyer
const cooldown = ref(0)
let timer = null

const startCooldown = (seconds = 30) => {
  cooldown.value = seconds
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// déclenche l'événement pour le parent qui fera l'appel API d'envoi
const onResend = () => {
  if (cooldown.value > 0) return
  emit('resendRequested')       // parent doit écouter et appeler l'API d'envoi SMS
  startCooldown(30)
}

// affichage téléphone (masqué partiellement pour UX)
const formattedPhone = computed(() => {
  const p = String(props.form.telephone || '')
  if (!p) return '—'
  // masque le milieu, conserve début et fin
  if (p.length <= 6) return p
  const start = p.slice(0, 3)
  const end = p.slice(-3)
  return `${start}•••${end}`
})

const hint = 'Si vous ne recevez pas le SMS, vérifiez le numéro ou réessayez après quelques secondes.'
</script>
