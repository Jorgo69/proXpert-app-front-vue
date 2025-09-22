<template>
  <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Trouvez l'artisan qu'il vous faut</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <div class="md:col-span-1">
        <select class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Métier</option>
          </select>
      </div>
      <div class="md:col-span-1">
        <select class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Ville</option>
          </select>
      </div>
      <div class="md:col-span-1">
        <select class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
          <option value="">Quartier</option>
          </select>
      </div>
      <div class="md:col-span-1">
        <Button variant="primary" class="w-full">
          Rechercher
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/common/BaseButton.vue'; // Assurez-vous d'avoir ce composant
</script>