<template>
  <Container class="text-left">
    <h2 class="text-3xl font-bold mb-2">Nos catégories populaires</h2>
    <p class="text-lg text-gray-600 mb-10">
      Une sélection de métiers pour réaliser vos projets avec les meilleurs artisans du Bénin.
    </p>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
      <IconLink type="circle" size="small" :src="searchIcon" alt="Électricité" text="Électricité" />
      <IconLink type="circle" size="small" :src="tournviceIcon" alt="Rénovation" text="Rénovation" />
      <IconLink type="circle" size="small" :src="handIcon" alt="Rénovation" text="Rénovation" />
      <IconLink type="circle" size="small" :src="handIcon" alt="Rénovation" text="Rénovation" />
      <IconLink type="circle" size="small" :src="handIcon" alt="Rénovation" text="Rénovation" />
      <IconLink type="circle" size="small" :src="handIcon" alt="Rénovation" text="Rénovation" />
    </div>
  </Container>
</template>

<script setup>
import Container from '@/components/common/Container.vue'
import Card from '@/components/common/Card.vue'
import IconLink from '../../common/IconLink.vue';

import searchIcon from '@/assets/icons/searchIcon.svg';
import tournviceIcon from '@/assets/icons/tournviceIcon.svg';
import handIcon from '@/assets/icons/handIcon.svg';
// ... importez toutes vos icônes ici
</script>