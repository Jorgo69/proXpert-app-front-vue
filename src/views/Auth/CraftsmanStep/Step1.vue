<template>
  <div class="grid md:grid-cols-2 gap-6">
    <FormField name="nipi" label="NIPI/IFU *" v-model="form.nipi" :error="errors.nipi" placeholder="Votre numéro NIPI ou IFU" />
    <FormField name="nom" label="Nom *" v-model="form.nom" :error="errors.nom" />
    <FormField name="prenom" label="Prénom *" v-model="form.prenom" :error="errors.prenom" />
    <FormField name="email" label="Email *" type="email" v-model="form.email" :error="errors.email" />
    <FormField name="telephone" label="Téléphone *" type="tel" v-model="form.telephone" :error="errors.telephone" />
    <div class="md:col-span-2">
      <FormField name="adresse" label="Adresse complète *" v-model="form.adresse" :error="errors.adresse" />
    </div>
    <FormField name="password" label="Mot de passe *" type="password" v-model="form.password" :error="errors.password" />
    <FormField name="passwordConfirm" label="Confirmation *" type="password" v-model="form.passwordConfirm" :error="errors.passwordConfirm" />
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
