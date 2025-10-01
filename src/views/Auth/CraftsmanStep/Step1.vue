<template>
  <Container class="grid md:grid-cols-2 gap-6">

    <BaseSwitch v-model="form.accountType" active-value="craftsman_entreprise" inactive-value="craftsman_individual">
      <span v-if="isIndividual"> A votre propre compte ?</span>
      <span v-if="isEntreprise"> Etes vous une entreprise ?</span>
    </BaseSwitch>

    <FormField v-if="isIndividual" name="npi" label="NPI " required v-model="form.npi" :error="errors.npi" placeholder="Votre numéro NPI" />

    <FormField v-if="isEntreprise" name="ifu" label="IFU " required v-model="form.ifu" :error="errors.ifu" placeholder="Votre numéro IFU" />

    <FormField name="name" label="Nom " v-model="form.name" :error="errors.name" placeholder="Votre Nom" required/>
    <FormField name="firstname" label="Prénom " v-model="form.firstname" :error="errors.firstname" placeholder="Votre Prenom" required />
    <FormField name="email" label="Email " type="email" v-model="form.email" :error="errors.email" placeholder="Votre Email" required />
    <FormField name="telephone" label="Téléphone " type="tel" v-model="form.telephone" :error="errors.telephone" placeholder="Votre Numero de telephone" required />
    
    <div class="md:col-span-2">
      <FormField name="location" label="Adresse complète " v-model="form.location" :error="errors.location" placeholder="Votre localisation" />
    </div>
    
     
    <FormField name="password" label="Mot de passe " type="password" v-model="form.password" :error="errors.password" placeholder="Votre Mot de passe" required />
    <FormField name="password_confirmation" label="Confirmation " type="password" v-model="form.password_confirmation" :error="errors.password_confirmation" placeholder="Confimez votre Mot de passe" required />

    <div class="md:col-span-2">
    <BaseFileUpload
      label="Photo de profil"
      v-model="form.image"
      :multiple="false"
      accept=".pdf,.jpg,.jpeg,.png"
      :maxFiles="1"
      :maxSize="3145728"
      placeholder="Glissez-déposez votre image pour le profil ou"
      previewLabel="Images sélectionnés"
      hint="Formats acceptés: JPG, PNG. Max 3MB"
      icon="🎓"
      :previewColumns="6"
      :showImagePreviews="true"
    />
    </div>

    
  </Container>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import FormField from '@/components/common/FormField.vue'
import Container from '../../../components/common/Container.vue';
import BaseSwitch from '../../../components/common/forms/BaseSwitch.vue';
import BaseFileUpload from '../../../components/common/forms/BaseFileUpload.vue';

// On reçoit le form et errors du parent
const props = defineProps({
  form: Object,
  errors: Object
})

const accountType = ref('craftsman_individual');

// 💡 Propriétés calculées pour simplifier l'affichage/validation
// Utilisation direct de form() vu que c'est un etat que veut partager a tout les composant donc
// on a defini le form() dans le Parent
const isIndividual = computed(() => props.form.accountType === 'craftsman_individual');
const isEntreprise = computed(() => props.form.accountType === 'craftsman_entreprise');

watch(accountType, (newValue, oldValue) => {
  console.log("Ancienne valeur :", oldValue);
  console.log("Nouvelle valeur (mise à jour) :", newValue);
  console.log("---");
});



</script>
