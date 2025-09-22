<template>
  <Container>
    <h2 class="text-center text-3xl font-bold mb-2">Ce qu'ils disent de nous</h2>
    <p class="text-center text-lg text-gray-600 mb-10">
      Leurs expériences témoignent de notre engagement et de notre fiabilité.
    </p>

    <div class="flex items-center space-x-6 overflow-x-auto snap-x snap-mandatory pb-4 relative">
      <button class="absolute left-0 z-10 p-2 rounded-full shadow-md bg-white hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button class="absolute right-0 z-10 p-2 rounded-full shadow-md bg-white hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      <div class="flex-shrink-0 w-80 snap-center">
        <TestimonialCard
          :profile-image-src="kossiTImage"
          author-name="Kossi T."
          location="Porto-Novo - Tokpota"
          :rating="5"
          review-text="Excellent service ! Le plombier est arrivé rapidement et a réparé ma fuite sans problème. Très professionnel !"
          service="Réparation de fuite d'eau"
          date="Août 2025"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <TestimonialCard
          :profile-image-src="kossiTImage"
          author-name="Kossi T."
          location="Porto-Novo - Tokpota"
          :rating="5"
          review-text="Excellent service ! Le plombier est arrivé rapidement et a réparé ma fuite sans problème. Très professionnel !"
          service="Réparation de fuite d'eau"
          date="Août 2025"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <TestimonialCard
          :profile-image-src="kossiTImage"
          author-name="Kossi T."
          location="Porto-Novo - Tokpota"
          :rating="5"
          review-text="Excellent service ! Le plombier est arrivé rapidement et a réparé ma fuite sans problème. Très professionnel !"
          service="Réparation de fuite d'eau"
          date="Août 2025"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <TestimonialCard
          :profile-image-src="kossiTImage"
          author-name="Kossi T."
          location="Porto-Novo - Tokpota"
          :rating="5"
          review-text="Excellent service ! Le plombier est arrivé rapidement et a réparé ma fuite sans problème. Très professionnel !"
          service="Réparation de fuite d'eau"
          date="Août 2025"
        />
      </div>
      <div class="flex-shrink-0 w-80 snap-center">
        <TestimonialCard
          :profile-image-src="kossiTImage"
          author-name="Kossi T."
          location="Porto-Novo - Tokpota"
          :rating="5"
          review-text="Excellent service ! Le plombier est arrivé rapidement et a réparé ma fuite sans problème. Très professionnel !"
          service="Réparation de fuite d'eau"
          date="Août 2025"
        />
      </div>
      </div>
  </Container>
</template>

<script setup>
import Container from '@/components/common/Container.vue';
import TestimonialCard from '@/components/common/TestimonialComponent.vue';
// Remember to import your images using 'import'
import kossiTImage from '@/assets/images/hero-section.png';
</script>