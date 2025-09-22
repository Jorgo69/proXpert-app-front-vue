<script setup lang="ts">
import BaseButton from '../../common/BaseButton.vue';
import Card from '../../common/Card.vue';

</script>

<template>
    <section class="py-12">
        <div class="container mx-auto px-4">
            <h2 class="text-left text-3xl font-bold mb-12">Comment ça marche ?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                    <template #header>
                        <div class="flex flex-col items-center mb-6">
                            <img 
                            src="../../../assets/icons/searchIcon.svg" 
                            alt="Icône de tournevis" 
                            class="icon-border text-red-500 p-4 rounded-full border border-red-500 w-16 h-16"
                            />
                        </div>
                    </template>
                    <div class="text-left">
                        <BaseButton type="link" class="bg-">
                            Trouver un talent
                        </BaseButton>
                        <p class="text-gray-600">
                            Des milliers de profils de freelance talentueux et validés sont à portée de clic.
                        </p>
                    </div>
                </Card>
                
                <Card>
                    <template #header>
                        <div class="flex flex-col items-center mb-6">
                            <img 
                            src="../../../assets/icons/handIcon.svg" 
                            alt="Autre icône" 
                            class="icon-border text-red-500 p-4 rounded-full border border-red-500 w-16 h-16"
                            />
                        </div>
                    </template>
                    <div class="text-left">
                        <h3 class="text-xl font-semibold mb-2">Paiement 100% sécurisé</h3>
                        <p class="text-gray-600">
                            Le paiement est bloqué jusqu’à ce que la mission soit validée par vos soins.
                        </p>
                    </div>
                </Card>
                
                <Card>
                    <template #header>
                        <div class="flex flex-col items-center mb-6">
                            <img 
                            src="../../../assets/icons/tournviceIcon.svg" 
                            alt="Dernière icône" 
                            class="icon-border text-red-500 p-4 rounded-full border border-red-500 w-16 h-16"
                            />
                        </div>
                    </template>
                    <div class="text-lfet">
                        <h3 class="text-xl font-semibold mb-2">Travaillez en toute sérénité</h3>
                        <p class="text-gray-600">
                            Un travail de qualité et une équipe pour vous accompagner à chaque étape de votre projet.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    </section>
</template>