<template>
  <div class="min-h-screen bg-gray-50 py-8 pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- En-tête -->
      <div class="my-20 mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Bonjour Jean, prêt à concrétiser vos projets aujourd'hui ?
        </h1>
        <p class="text-gray-600">
          Voici un aperçu de vos activités récentes et prochaines étapes.
        </p>
      </div>

      <!-- Cartes de statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <!-- Revenus estimés -->
        <Card class="bg-primary border-l-4 border-l-green-500">
          <template #header>
            <img 
                src="@/assets/icons/tabler_wallet.svg" 
                alt="Icône de porte monnaie" 
                class="icon-border text-red-500 p-4 rounded-full border border-red-500 w-16 h-16"
            />
          </template>
          <template #>
            Revenus estimés
          </template>
          <template #footer>
            1 200 000 f CFA
          </template>
        </Card>

        <!-- Projets en cours -->
        <Card class="bg-white border-l-4 border-l-blue-500">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Projets en cours</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">05</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">📋</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Taux d'acceptation -->
        <Card class="bg-white border-l-4 border-l-orange-500">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Taux d'acceptation</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">65 %</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">📈</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Devis envoyés -->
        <Card class="bg-white border-l-4 border-l-purple-500">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Devis envoyés</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">08</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">📤</span>
              </div>
            </div>
          </div>
        </Card>

      </div>

      <!-- Section inférieure avec 2 colonnes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Colonne gauche : Actions rapides -->
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Créer un devis</h3>
            
            <div class="space-y-4">
              <!-- Bouton Ajouter un projet -->
              <button class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center">
                  <div class="w-6 h-6 border-2 border-gray-300 rounded mr-3"></div>
                  <span class="text-gray-700">Ajouter un projet</span>
                </div>
                <span class="text-gray-400">→</span>
              </button>

              <!-- Bouton Gérer mon profil -->
              <button class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center">
                  <div class="w-6 h-6 border-2 border-gray-300 rounded mr-3"></div>
                  <span class="text-gray-700">Gérer mon profil</span>
                </div>
                <span class="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </Card>

        <!-- Colonne droite : Tableau des projets -->
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Projets récents</h3>
            
            <!-- En-têtes du tableau -->
            <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 mb-3">
              <div class="col-span-3">Client</div>
              <div class="col-span-2">Projet</div>
              <div class="col-span-2">Budget</div>
              <div class="col-span-2">Statut</div>
              <div class="col-span-2">Date</div>
              <div class="col-span-1">Action</div>
            </div>

            <!-- Ligne exemple -->
            <div class="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
              <div class="col-span-3 font-medium">Client 1</div>
              <div class="col-span-2">Rénovation salle de bain</div>
              <div class="col-span-2">450 000 f CFA</div>
              <div class="col-span-2">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">En attente</span>
              </div>
              <div class="col-span-2">15/12/2024</div>
              <div class="col-span-1">
                <button class="text-red-600 hover:text-red-800 text-sm">Voir</button>
              </div>
            </div>

            <!-- Autres lignes (vous pouvez les dupliquer) -->
            <div class="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
              <div class="col-span-3 font-medium">Client 2</div>
              <div class="col-span-2">Installation électrique</div>
              <div class="col-span-2">320 000 f CFA</div>
              <div class="col-span-2">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Accepté</span>
              </div>
              <div class="col-span-2">12/12/2024</div>
              <div class="col-span-1">
                <button class="text-red-600 hover:text-red-800 text-sm">Voir</button>
              </div>
            </div>

          </div>
        </Card>

      </div>

    </div>
  </div>
</template>

<script setup>
import Card from '@/components/common/Card.vue';
</script>