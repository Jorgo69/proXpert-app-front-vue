<template>
  <Container>
    <div class="flex items-center justify-between p-6 bg-red-50 rounded-lg shadow-sm">
      <div>
        <h3 class="text-2xl font-bold mb-1">Prêt à commencer ?</h3>
        <p class="text-gray-600">
          Rejoignez notre communauté et réalisez vos projets en toute sérénité.
        </p>
      </div>
      
      <div class="flex-shrink-0">
        <Button variant="secondary" size="large" type="link" to="/register">
          Commencer maintenant
        </Button>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from '@/components/common/Container.vue';
import Button from '@/components/common/BaseButton.vue';
</script>