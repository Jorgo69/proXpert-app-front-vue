<template>
  <footer class="bg-red-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="col-span-1 lg:col-span-2">
          <h3 class="font-bold text-lg mb-4 text-primary">
            <img :src="Logo" alt="Logo de la platforme">
          </h3>
          <p class="text-sm">
            Notre plateforme met en relation clients et artisans de confiance pour concrétiser vos projets, du devis à la réalisation, en toute simplicité.
          </p>
        </div>

        <div class="flex flex-col">
          <h4 class="font-semibold text-sm mb-2">Explorer</h4>
          <a href="#" class="text-sm hover:text-red-300">Trouver un expert</a>
          <a href="#" class="text-sm hover:text-red-300">Nos Services</a>
        </div>
        
        <div class="flex flex-col">
          <h4 class="font-semibold text-sm mb-2">À propos</h4>
          <a href="#" class="text-sm hover:text-red-300">Qui sommes-nous ?</a>
          <a href="#" class="text-sm hover:text-red-300">Mission & valeurs</a>
        </div>
        
        <div class="flex flex-col">
          <h4 class="font-semibold text-sm mb-2">Support</h4>
          <a href="#" class="text-sm hover:text-red-300">Contact</a>
          <a href="#" class="text-sm hover:text-red-300">FAQ</a>
        </div>
        
        <div class="flex flex-col">
          <h4 class="font-semibold text-sm mb-2">Légal</h4>
          <a href="#" class="text-sm hover:text-red-300">Politique de confidentialité</a>
          <a href="#" class="text-sm hover:text-red-300">Conditions Générales</a>
        </div>
        
        <div class="flex flex-col items-end lg:flex">
          <img src="@/assets/images/hero-section.png" alt="QR Code" class="w-24 h-24 mb-2">
          <span class="text-sm text-center">Télécharger l'app</span>
        </div>
      </div>

      <hr class="border-red-600 my-8">

      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="md:w-1/2 mb-4 md:mb-0">
          <p class="text-sm mb-2">Inscrivez-vous pour recevoir nos conseils, inspirations et offres exclusives.</p>
          <div class="flex">
            <input type="email" placeholder="Saisissez votre mail ici" class="px-4 py-2 rounded-lg w-full md:w-auto text-gray-800">
            <Button variant="secondary" size="normal" class="ml-2">Je m'abonne</Button>
          </div>
        </div>

        <div class="flex space-x-4">
          <a href="#" target="_blank" class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-500">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.35c0 .732.593 1.325 1.325 1.325h11.493v-9.294h-3.13v-3.626h3.13v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.793.143v3.25l-1.928.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.626l-.472 3.626h-3.154v9.293h6.115c.732 0 1.325-.593 1.325-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
          </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from '@/components/common/BaseButton.vue';
import Logo from "@/assets/icons/iconLogo.vue";
// N'oubliez pas d'importer le QR code si vous le mettez en local
// import qrCodeImage from '@/assets/images/qr-code.png';
</script>