<template>
  <header class="fixed top-0 left-0 w-full z-50">
    <div class="bg-white rounded-xl shadow-md mx-auto mt-4 px-6 py-3 max-w-7xl">
      <!-- Mobile -->
      <div class="mobile-header flex items-center justify-between md:hidden">
        <!-- Burger -->
        <button @click="toggleMenu" aria-label="Ouvrir le menu">
          <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex-1 flex justify-center cursor-pointer" @click="goTo('home')">
          <iconLogo class="w-24" />
        </div>

        <!-- Boutons -->
        <div class="flex gap-2">
          <BaseButton variant="primary" size="small">
            {{ $t('S\'inscrire') }}
          </BaseButton>
          <BaseButton variant="secondary" size="small">
            {{ $t('Se connecter') }}
          </BaseButton>
        </div>
      </div>

      <!-- Desktop -->
      <div class="desktop-header hidden md:flex items-center justify-between">
        <!-- Logo -->
        <div class="cursor-pointer" @click="goTo('home')">
          <iconLogo class="w-28" />
        </div>

        <!-- Nav -->
        <div class="nav-links flex-1 flex justify-center gap-8">
          <BaseButton class="nav-link" type="link" to="/find-expert" variant="nav">
            {{ $t('Trouver un expert') }}
          </BaseButton>
          <BaseButton class="nav-link" type="link" to="/services" variant="nav">
            {{ $t('Nos Services') }}
          </BaseButton>
          <BaseButton class="nav-link" type="link" to="/help" variant="nav">
            {{ $t('Besoin d\'aide ?') }}
          </BaseButton>
        </div>

        <!-- Auth -->
        <div class="flex gap-2">
          <BaseButton variant="primary">
            {{ $t('S\'inscrire') }}
          </BaseButton>
          <BaseButton variant="secondary">
            {{ $t('Se connecter') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div v-if="isMenuOpen" class="mobile-overlay md:hidden">
      <button class="absolute top-6 right-6" @click="toggleMenu" aria-label="Fermer le menu">
        <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex flex-col items-center gap-6 w-full px-8">
        <router-link to="/find-expert" @click="toggleMenu">{{ $t('Trouver un expert') }}</router-link>
        <router-link to="/services" @click="toggleMenu">{{ $t('Nos Services') }}</router-link>
        <router-link to="/help" @click="toggleMenu">{{ $t('Besoin d\'aide ?') }}</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import iconLogo from "@/assets/icons/iconLogo.vue";
import BaseButton from "@/components/common/BaseButton.vue";

const router = useRouter();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goTo = (routeName) => {
  router.push({ name: routeName });
  isMenuOpen.value = false;
};
</script>

<style scoped>
@reference "@/assets/styles/tailwind.css";

.desktop-header .nav-links .nav-link {
  @apply relative cursor-pointer px-4 py-2;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 2px;
  width: 0;
  background: red;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}
.nav-link:hover::after {
  width: 100%;
}
.mobile-overlay {
  @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#061741] text-white;
}
</style>
