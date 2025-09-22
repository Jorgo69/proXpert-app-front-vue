<script setup>
import BaseButton from '../../common/BaseButton.vue';
import SearchBar from '../../common/SearchBar.vue';
</script>

<template>
  <div 
    class="relative w-full h-screen bg-cover bg-center bg-[url(@/assets/images/hero-section.png)]"
  >
    <!-- Overlay contenu -->
    <div class="absolute inset-0 flex flex-col items-center md:items-start justify-center p-4 md:pl-20">
      
      <div class="text-black text-center md:text-left max-w-xl">
        <h1 class="text-4xl md:text-6xl font-bold">
          <span class="text-primary">Construisez</span>
          avec les <br> meilleurs talents locaux
        </h1>

        <p class="mt-4 font-bold">
          Nous mettons en avant les artisans béninois les plus compétents pour vous accompagner
          dans tous vos projets, de l’idée à la réalisation.
        </p>

        <div class="mt-6 flex gap-4 justify-center md:justify-start">
          <BaseButton>
            Rejoindre notre réseau
          </BaseButton>
          <BaseButton variant="secondary" class="bg-white text-black">
            Trouver un professionnel
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-4 max-w-4xl">
      <SearchBar />
    </div>

  </div>
</template>
