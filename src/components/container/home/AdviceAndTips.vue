<template>
  <Container>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h2 class="text-3xl font-bold">Conseils & Astuces</h2>
      </div>
      <button class="p-2 rounded-full shadow-md bg-white hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>

    <div class="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-4">
      <div class="flex-shrink-0 w-80 snap-center">
        <ArticleComponent 
          :image-src="articleImage1"
          category="CONSTRUCTION"
          title="5 astuces pour rénover sa salle de bain avec un petit budget"
          excerpt="Découvrez des conseils pratiques pour optimiser vos travaux sans exploser vos finances, avec des idées simples et efficaces..."
          author="Admin"
          date="3 Sept. 2025"
          link="/articles/renover-salle-de-bain"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <ArticleComponent 
          :image-src="articleImage1"
          category="CONSTRUCTION"
          title="5 astuces pour rénover sa salle de bain avec un petit budget"
          excerpt="Découvrez des conseils pratiques pour optimiser vos travaux sans exploser vos finances, avec des idées simples et efficaces..."
          author="Admin"
          date="3 Sept. 2025"
          link="/articles/renover-salle-de-bain"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <ArticleComponent 
          :image-src="articleImage1"
          category="CONSTRUCTION"
          title="5 astuces pour rénover sa salle de bain avec un petit budget"
          excerpt="Découvrez des conseils pratiques pour optimiser vos travaux sans exploser vos finances, avec des idées simples et efficaces..."
          author="Admin"
          date="3 Sept. 2025"
          link="/articles/renover-salle-de-bain"
        />
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from '@/components/common/Container.vue';
import ArticleComponent from '@/components/common/ArticleComponent.vue';
// N'oubliez pas d'importer les chemins d'images avec 'import'
import articleImage1 from '@/assets/images/hero-section.png';
</script>