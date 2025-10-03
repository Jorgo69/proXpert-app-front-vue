<template>
  <div class="grid md:grid-cols-2 gap-6">
    <FormField name="npi" label="NIP/IFU *" v-model="form.nip" :error="errors.nip" placeholder="Votre numéro NIPI ou IFU" />
    <FormField name="name" label="Nom *" v-model="form.name" :error="errors.name" />
    <FormField name="firstname" label="Prénom *" v-model="form.firstname" :error="errors.firstname" />
    <FormField name="email" label="Email *" type="email" v-model="form.email" :error="errors.email" />
    <FormField name="telephone" label="Téléphone *" type="tel" v-model="form.telephone" :error="errors.telephone" />
    <div class="md:col-span-2">
      <FormField name="location" label="Adresse complète *" v-model="form.location" :error="errors.location" />
    </div>
    <FormField name="password" label="Mot de passe *" type="password" v-model="form.password" :error="errors.password" />
    <FormField name="password_confirmation" label="Confirmation *" type="password" v-model="form.password_confirmation" :error="errors.password_confirmation" />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import FormField from '@/components/common/FormField.vue'

// On reçoit le form et errors du parent
const props = defineProps({
  form: Object,
  errors: Object
})
</script>
