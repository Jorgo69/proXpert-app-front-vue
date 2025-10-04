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
        <div class="flex-1 flex justify-center cursor-pointer" @click="goTo('/')">
          <iconLogo class="w-24" />
        </div>

        <!-- Boutons -->
        <div class="flex gap-2">
          <BaseButton @click="goTo('register')" variant="primary" size="small">
            <BellIcon />
          </BaseButton>
          <BaseButton @click="goTo('login')" variant="transparent" size="small">
            <UserCircleIcon class="size-6 bg-black" />
          </BaseButton>
        </div>
      </div>

      <!-- Desktop -->
      <div class="desktop-header hidden md:flex items-center justify-between">
        <!-- Logo -->
        <div class="cursor-pointer" @click="goTo('/')">
          <iconLogo class="w-28" />
        </div>

        <!-- Nav -->
        <div class="nav-links flex-1 flex justify-center gap-8">
          <BaseButton class="nav-link" type="link" to="/find-expert" variant="nav">
            {{ $t('Mes Projets') }}
          </BaseButton>
          <BaseButton class="nav-link" type="link" to="/services" variant="nav">
            {{ $t('Nouvelles Offre') }}
          </BaseButton>
          <BaseButton class="nav-link" type="link" to="/services" variant="nav">
            {{ $t('Messagerie') }}
          </BaseButton>
          <BaseButton class="nav-link" type="link" to="/help" variant="nav">
            {{ $t('Paiement') }}
          </BaseButton>
        </div>

        <!-- Auth -->
        <div class="flex gap-2">
          <BaseButton variant="transparent" @click="goTo('register')" size="large">
            <BellAlertIcon  class="size-10"/>
          </BaseButton>
          <BaseButton variant="transparent" @click="goTo('login')" size="large">
            <UserCircleIcon class="size-10" />
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
        <router-link to="/find-expert" @click="toggleMenu">{{ $t('Mes Projets') }}</router-link>
        <router-link to="/find-expert" @click="toggleMenu">{{ $t('Nouvelles Offres') }}</router-link>
        <router-link to="/services" @click="toggleMenu">{{ $t('Messagerie') }}</router-link>
        <router-link to="/help" @click="toggleMenu">{{ $t('Paiement') }}</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import iconLogo from "@/assets/icons/iconLogo.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import { BellAlertIcon, BellIcon, UserCircleIcon } from "@heroicons/vue/16/solid";

BellIcon

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
