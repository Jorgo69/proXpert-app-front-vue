<template>
  <Container>
    <h2 class="text-center text-3xl font-bold mb-2">Pourquoi rejoindre notre communauté ?</h2>
    <p class="text-center text-lg text-gray-600 mb-10">
      Que vous soyez un client à la recherche d'un artisan ou un professionnel souhaitant développer sa visibilité, notre plateforme vous offre les outils pour réussir.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ReasonCard
        title="Pour les artisans"
        :reasons="artisansReasons"
        buttonText="Commencer mon Inscription"
        buttonVariant="primary"
        buttonType="link"
        buttonLink="/registrer/craftman/informations"
      />

      <ReasonCard
        title="Pour les clients"
        :reasons="clientsReasons"
        buttonText="Rechercher un professionnel"
        buttonVariant="secondary"
        buttonType="link"
        buttonLink="/"
      />
    </div>
  </Container>
</template>

<script setup>
import Container from '@/components/common/Container.vue';
import ReasonCard from '@/components/common/ReasonCard.vue';

// Importez les icônes nécessaires
import visibilityIcon from '@/assets/icons/searchIcon.svg';
import portfolioIcon from '@/assets/icons/searchIcon.svg';
import statsIcon from '@/assets/icons/searchIcon.svg';

import searchIcon from '@/assets/icons/searchIcon.svg';
import followIcon from '@/assets/icons/searchIcon.svg';
import chatIcon from '@/assets/icons/searchIcon.svg';

const artisansReasons = [
  { icon: visibilityIcon, title: "Gagnez en visibilité", description: "Mettez en avant vos réalisations et touchez plus de clients localement et au-delà." },
  { icon: portfolioIcon, title: "Présentez vos réalisations", description: "Portfolio en ligne pour valoriser votre savoir-faire." },
  { icon: statsIcon, title: "Outils et statistiques", description: "Bénéficiez d'outils de gestion et de statistiques pour améliorer vos performances." },
];

const clientsReasons = [
  { icon: searchIcon, title: "Trouver des artisans qualifiés", description: "Accédez à une base d’artisans vérifiés dans différents métiers." },
  { icon: followIcon, title: "Suivi et gestion de projet", description: "Suivez l’avancement de vos travaux, organisez vos étapes et gardez le contrôle." },
  { icon: chatIcon, title: "Échanges simplifiés", description: "Contact direct avec les artisans ou accompagnement par l'agence." },
];
</script>