Vous avez raison. Créer un composant pour les boutons et les liens est une excellente pratique. Cela rend votre code plus modulaire, plus facile à maintenir, et vous évite de réécrire les mêmes classes Tailwind partout. C'est l'essence même de la réutilisabilité dans Vue.

Je vous propose une approche simple et flexible en créant un seul composant intelligent qui peut agir comme un bouton ou un lien, en gérant différents types et tailles.

Création du composant Bouton/Lien (BaseButton.vue)

Ce composant sera capable de :

    Rendre un <button> ou un <router-link>.

    Gérer les types de boutons (primaire, secondaire).

    Gérer différentes tailles (normal, grand, petit).

    Gérer les actions de navigation (vers une route interne ou un lien externe).

1. Créez un nouveau fichier BaseButton.vue
Placez-le dans un dossier approprié, par exemple src/components/common/.
Extrait de code

<template>
  <button v-if="type === 'button'" :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
  <router-link v-else-if="type === 'link' && to" :to="to" :class="buttonClasses">
    <slot></slot>
  </router-link>
  <a v-else-if="type === 'external' && href" :href="href" target="_blank" :class="buttonClasses">
    <slot></slot>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 'button' pour un <button>, 'link' pour un <router-link>, 'external' pour un <a>
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'link', 'external'].includes(value),
  },
  // 'primary' pour le style principal, 'secondary' pour le style secondaire
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  // 'normal', 'small', 'large' pour la taille du bouton
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['normal', 'small', 'large'].includes(value),
  },
  // Route pour un lien interne
  to: {
    type: [String, Object],
    default: '',
  },
  // Lien pour un lien externe
  href: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  
  const sizeClasses = {
    normal: 'px-4 py-2 text-sm',
    small: 'px-3 py-1 text-xs',
    large: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
  };

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
  ];
});

const handleClick = (event) => {
  emit('click', event);
};
</script>

2. Utilisation du composant (Header.vue ou autre)

Maintenant, vous pouvez remplacer vos boutons et liens avec ce composant, en passant les propriétés nécessaires.

Exemple dans votre Header.vue :
Extrait de code

<template>
  <div v-if="!isLoggedIn" class="flex gap-2">
    <BaseButton variant="primary" @click="handleAuthAction('signup')">
      {{ $t('S\'inscrire') }}
    </BaseButton>

    <BaseButton variant="secondary" @click="handleAuthAction('login')">
      {{ $t('Se connecter') }}
    </BaseButton>
  </div>

  <div v-else-if="isLoggedIn">
    <BaseButton type="link" to="/dashboard" variant="primary">
      Tableau de bord
    </BaseButton>

    <BaseButton type="external" href="https://example.com" variant="secondary">
      Site externe
    </BaseButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';

const isLoggedIn = ref(false); // ou votre logique de connexion
const handleAuthAction = (action) => {
  console.log(`Action : ${action}`);
};
</script>

Avantages de cette approche :

    Réutilisabilité : Vous avez un seul composant pour tous vos boutons et liens, garantissant une cohérence visuelle à travers toute l'application.

    Flexibilité : Vous pouvez facilement changer la taille, la variante ou le comportement (bouton, lien, externe) en changeant simplement une prop.

    Maintenance facile : Si vous décidez de changer le design de tous vos boutons primaires, il suffit de modifier un seul endroit : le fichier BaseButton.vue.

    Code plus propre : Votre template dans Header.vue devient beaucoup plus lisible, car il n'est plus encombré de multiples classes Tailwind.

C'est une excellente idée de commencer à penser en termes de composants réutilisables dès le début de votre projet. Cela vous fera gagner beaucoup de temps et d'efforts sur le long terme.