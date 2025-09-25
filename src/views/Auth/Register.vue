<!-- views/Auth/Register.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Choisissez votre profil
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Indiquez si vous êtes un artisan indépendant ou une entreprise afin que nous puissions 
          vous proposer un formulaire adapté.
        </p>
      </div>

      <!-- Cartes directement dans le composant -->
      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Carte Artisan -->
        <div 
          class="bg-white rounded-2xl shadow-lg border-2 p-8 cursor-pointer transition-all duration-300 min-h-[350px] flex flex-col justify-center"
          :class="selectedProfile === 'artisan' ? 'border-red-500' : 'border-gray-200 hover:border-red-300'"
          @click="selectedProfile = 'artisan'"
        >
          <div class="text-center">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🔧</span>
            </div>
            <h3 class="text-2xl font-bold mb-4">Je suis un artisan indépendant</h3>
            <p class="text-gray-600 text-lg">
              Vous travaillez à votre compte et gérez votre activité individuellement.
            </p>
          </div>
        </div>

        <!-- Carte Entreprise -->
        <div 
          class="bg-white rounded-2xl shadow-lg border-2 p-8 cursor-pointer transition-all duration-300 min-h-[350px] flex flex-col justify-center"
          :class="selectedProfile === 'entreprise' ? 'border-red-500' : 'border-gray-200 hover:border-red-300'"
          @click="selectedProfile = 'entreprise'"
        >
          <div class="text-center">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🏢</span>
            </div>
            <h3 class="text-2xl font-bold mb-4">Je représente une entreprise</h3>
            <p class="text-gray-600 text-lg">
              Vous inscrivez une société avec plusieurs artisans ou employés.
            </p>
          </div>
        </div>
      </div>

      <!-- Bouton -->
      <div class="text-center mt-16">
        <button
          @click="continueToNextStep"
          :disabled="!selectedProfile"
          class="bg-red-600 text-white px-12 py-4 rounded-lg text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedProfile = ref(null)

const continueToNextStep = () => {
  if (selectedProfile.value === 'artisan') {
    router.push('/registrer/craftman/informations')
  } else if (selectedProfile.value === 'entreprise') {
    router.push('/register/entreprise/informations')
  }
}
</script>