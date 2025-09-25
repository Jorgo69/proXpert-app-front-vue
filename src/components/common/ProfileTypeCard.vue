<template>
  <section align="center">
    <!-- En-tête -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Choisissez votre profil
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Indiquez si vous êtes un artisan indépendant ou une entreprise afin que nous puissions 
        vous proposer un formulaire adapté.
      </p>
    </div>

    <!-- Sélection des profils -->
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <!-- Carte Artisan Indépendant -->
      <Card  
        :class="[
          'cursor-pointer transition-all duration-300 border-2',
          selectedProfile === 'artisan' 
            ? 'border-red-500 shadow-lg shadow-red-500/20' 
            : 'border-gray-200 hover:border-red-300'
        ]"
        @click="selectProfile('artisan')"
      >
        <div class="text-center p-6">
          <!-- Icône Artisan -->
          <div class="flex justify-center mb-4">
            <IconLink 
              :icon="ToolsIcon" 
              size="lg"
              :bg-color="selectedProfile === 'artisan' ? 'bg-red-100' : 'bg-gray-100'"
              :text-color="selectedProfile === 'artisan' ? 'text-red-600' : 'text-gray-600'"
            />
          </div>
          
          <h3 class="text-xl font-semibold mb-2">Je suis un artisan indépendant</h3>
          <p class="text-gray-600 text-sm">
            Vous travaillez à votre compte et gérez votre activité individuellement
          </p>
        </div>
      </Card>

      <!-- Carte Entreprise -->
      <Card 
        :class="[
          'cursor-pointer transition-all duration-300 border-2',
          selectedProfile === 'entreprise' 
            ? 'border-red-500 shadow-lg shadow-red-500/20' 
            : 'border-gray-200 hover:border-red-300'
        ]"
        @click="selectProfile('entreprise')"
      >
        <div class="text-center p-6">
          <!-- Icône Entreprise -->
          <div class="flex justify-center mb-4">
            <IconLink 
              :icon="BuildingIcon" 
              size="lg"
              :bg-color="selectedProfile === 'entreprise' ? 'bg-red-100' : 'bg-gray-100'"
              :text-color="selectedProfile === 'entreprise' ? 'text-red-600' : 'text-gray-600'"
            />
          </div>
          
          <h3 class="text-xl font-semibold mb-2">Je représente une entreprise</h3>
          <p class="text-gray-600 text-sm">
            Vous inscrivez une société avec plusieurs artisans ou employés
          </p>
        </div>
      </Card>
    </div>

    <!-- Bouton de continuation -->
    <div class="mt-12 text-center">
      <BaseButton
        variant="primary"
        size="large"
        :disabled="!selectedProfile"
        @click="continueToNextStep"
        class="px-8"
      >
        Continuer
        <template #icon-right>
          <ArrowRightIcon class="w-5 h-5 ml-2" />
        </template>
      </BaseButton>
    </div>
</section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Composants existants
import Container from '@/components/common/Container.vue'
import Card from '@/components/common/Card.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import IconLink from '@/components/common/IconLink.vue'

// Icônes (à adapter selon votre bibliothèque d'icônes)
import ToolsIcon from '@/assets/icons/tournviceIcon.svg'
import BuildingIcon from '@/assets/icons/tournviceIcon.svg'
import ArrowRightIcon from '@/assets/icons/tournviceIcon.svg'

const router = useRouter()
const selectedProfile = ref(null)

const selectProfile = (profile) => {
  selectedProfile.value = profile
}

const continueToNextStep = () => {
  if (selectedProfile.value === 'artisan') {
    router.push('/inscription/artisan/informations')
  } else if (selectedProfile.value === 'entreprise') {
    router.push('/inscription/entreprise/informations')
  }
}
</script>