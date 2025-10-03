<template>
  <div class="space-y-8">
    <!-- Choix plan -->
    <div class="grid lg:grid-cols-3 gap-8 mb-8">
      <!-- Carte réutilisable -->
      <div v-for="plan in plans" :key="plan.id"
           :class="['bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300',
             form.plan === plan.id ? 'border-red-500 shadow-2xl' : 'border-gray-200 hover:border-red-300']">
        
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
          <div class="text-3xl font-bold text-red-600 mb-2">{{ plan.price }}</div>
          <p class="text-gray-600">/ mois</p>
        </div>
        
        <ul class="space-y-3 mb-6">
          <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-center">
            <span class="text-green-500 mr-2">✔</span>
            <span class="text-gray-700">{{ feature }}</span>
          </li>
        </ul>
        
        <button
          type="button"
          @click="form.plan = plan.id"
          :class="['w-full py-3 rounded-lg font-semibold transition-colors',
            form.plan === plan.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        >
          {{ form.plan === plan.id ? 'Sélectionné' : 'Sélectionner' }}
        </button>
      </div>
    </div>

    <p v-if="errors.plan" class="text-red-500 text-xs">{{ errors.plan }}</p>

    <!-- Conditions générales -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div class="flex items-start">
        
        <input
          type="checkbox"
          id="conditions"
          v-model="form.acceptConditions"
          class="mt-1 mr-3 w-5 h-5 text-red-600 focus:ring-red-500"
        />

        <label for="conditions" class="text-gray-700">
          J'accepte les <a href="#" class="text-red-600 hover:underline">conditions générales d'utilisation</a> 
          et la <a href="#" class="text-red-600 hover:underline">politique de confidentialité</a>
        </label>
      </div>
    </div>

    <p v-if="!acceptConditions" class="text-red-500 text-xs">Vous devez accepter les conditions pour continuer</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  form: Object,
  errors: Object
})

const acceptConditions = ref(false)

// Liste des plans (plus propre que répéter 3 fois)
const plans = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '10.000 FCFA',
    period: '/ mois',
    features: ['10 demandes / mois', 'Profil basique', 'Support email'],
    popular: false
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '35.000 FCFA',
    period: '/ mois',
    features: ['Demandes illimitées', 'Profil mis en avant', 'Support prioritaire', 'Accès aux statistiques'],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '75.000 FCFA',
    period: '/ mois',
    features: ['Demandes illimitées', 'Visibilité maximale', 'Support VIP', 'Statistiques avancées', 'Offres partenaires'],
    popular: false
  }
]

</script>
