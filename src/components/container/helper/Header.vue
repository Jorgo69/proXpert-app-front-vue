<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import iconLogo from "@/assets/icons/iconLogo.vue";
import iconBell from "@/assets/icons/iconBell.vue"; 
import iconUser from "@/assets/icons/iconUser.vue";

import BaseButton from '@/components/common/BaseButton.vue';

const router = useRouter();
const route = useRoute();

// État de l'utilisateur (à remplacer par une gestion d'état plus robuste, comme Pinia)
const isLoggedIn = ref(false); // Changez cette valeur pour tester les deux états

// Logique pour le menu mobile
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fonctions de navigation
const goTo = (routeName) => {
  router.push({ name: routeName });
  isMenuOpen.value = false; // Ferme le menu mobile
};

// Pour les boutons "S'inscrire" et "Se connecter"
const handleAuthAction = (action) => {
  if (action === 'signup') {
    // Logique pour la page d'inscription
    console.log('Naviguer vers la page d\'inscription');
  } else if (action === 'login') {
    // Logique pour la page de connexion
    console.log('Naviguer vers la page de connexion');
  }
};
</script>

<template>
  <div class="header">
    <div class="mobile-header md:hidden">
      <button @click="toggleMenu" aria-label="Ouvrir le menu">
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex-1 flex justify-center cursor-pointer" @click="goTo('home')">
        <iconLogo />
      </div>

      <div v-if="isLoggedIn" class="flex items-center gap-4">
        <iconBell class="w-6 h-6" />
        <iconUser class="w-6 h-6" />
      </div>

      <div v-else class="flex gap-2 text-xs">
        <button class="btn-primary" @click="handleAuthAction('signup')">{{ $t('S\'inscrire') }}</button>
        <button class="btn-secondary" @click="handleAuthAction('login')">{{ $t('Se connecter') }}</button>
      </div>
    </div>

    <div class="desktop-header hidden md:flex">
      <div class="cursor-pointer" @click="goTo('home')">
        <iconLogo />
      </div>
      
      <div class="nav-links">
        <div v-if="!isLoggedIn" class="flex items-center gap-8">
          <!-- <router-link to="/find-expert" class="nav-link">{{ $t('Trouver un expert') }}</router-link> -->
           <BaseButton class="nav-link" type="link" to="/find-expert" variant="nav">
            {{ $t('Find an expert') }}
            </BaseButton>
            <BaseButton class="nav-link" type="link" to="services" variant="nav">
                {{ $t('Services')  }}
            </BaseButton>
            <BaseButton class="nav-link" type="link" to="services" variant="nav">
                {{ $t('Need Help ?')  }}
            </BaseButton>
        </div>

        <div v-else class="flex items-center gap-8">
          <router-link to="/my-projects" class="nav-link">{{ $t('Mes Projets') }}</router-link>
          <router-link to="/messaging" class="nav-link">{{ $t('Messagerie') }}</router-link>
          <router-link to="/payment" class="nav-link">{{ $t('Paiement') }}</router-link>
          </div>
      </div>

      <div class="flex items-center gap-4">
        <div v-if="isLoggedIn" class="flex items-center gap-6">
          <iconBell class="w-6 h-6" />
          <iconUser class="w-6 h-6" />
        </div>
        <div v-else class="flex gap-2">
          <!-- <button class="btn-primary" @click="handleAuthAction('signup')">{{ $t('S\'inscrire') }}</button> -->
            <BaseButton variant="primary" @click="handleAuthAction('signup')">
                {{ $t('register') }}
            </BaseButton>
            <BaseButton variant="secondary" @click="handleAuthAction('login')">
                {{ $t('login') }}
            </BaseButton>
          <!-- <button class="btn-secondary" @click="handleAuthAction('login')">{{ $t('Se connecter') }}</button> -->
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="mobile-overlay md:hidden">
      <button class="absolute top-6 right-6" @click="toggleMenu" aria-label="Fermer le menu">
        <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex flex-col items-center gap-6 w-full px-8">
        <div v-if="!isLoggedIn" class="flex flex-col items-center gap-6">
          <router-link to="/find-expert" @click="toggleMenu">{{ $t('Trouver un expert') }}</router-link>
          <router-link to="/services" @click="toggleMenu">{{ $t('Nos Services') }}</router-link>
          <router-link to="/help" @click="toggleMenu">{{ $t('Besoin d\'aide ?') }}</router-link>
        </div>
        <div v-else class="flex flex-col items-center gap-6">
          <router-link to="/my-projects" @click="toggleMenu">{{ $t('Mes Projets') }}</router-link>
          <router-link to="/messaging" @click="toggleMenu">{{ $t('Messagerie') }}</router-link>
          <router-link to="/payment" @click="toggleMenu">{{ $t('Paiement') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez cette ligne en haut pour référencer votre fichier CSS principal */
@reference "@/assets/styles/tailwind.css"; 
/*
  Enveloppez vos styles avec `@apply` dans un bloc `@layer components`.
  La couche `components` est le meilleur endroit pour les classes personnalisées
  qui sont composées de classes utilitaires.
*/
@layer components {
  .header {
    @apply relative w-full text-base font-normal text-white bg-[#ffffff] py-4 px-4 md:px-24;
  }

  .mobile-header,
  .desktop-header {
    @apply flex items-center justify-between;
  }

  .desktop-header .nav-links {
    @apply flex-1 flex justify-center;
  }

  .nav-link {
    @apply relative cursor-pointer px-4 py-2;
  }
  
  .btn-primary {
    @apply px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors;
  }

  .mobile-overlay {
    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#061741] text-white;
  }
}

/* Ces styles sans `@apply` n'ont pas besoin d'être dans un bloc `@layer` */
.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 2px;
  width: 0;
  background: white;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}
.nav-link:hover::after {
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
}
</style>