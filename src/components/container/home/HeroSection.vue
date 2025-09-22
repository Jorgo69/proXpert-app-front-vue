<script setup>
import BaseButton from '../../common/BaseButton.vue';


</script>

<template>
    
    <div 
        class="relative w-full h-screen bg-cover bg-center bg-[url(@/assets/images/hero-section.png)]">

        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 ">
            <div class="text-white text-center md:text-left md:ml-20">
                <h1 class="text-4xl md:text-6xl font-bold text-black">
                    <span class="text-primary">
                        Construisez 
                    </span>
                    avec les
                    <br> meilleurs talents locaux
                </h1>
                <p class="mt-4 max-w-lg text-black font-bold">
                    Nous mettons en avant les artisans béninois les plus compétents pour vous accompagner dans tous vos projets, de l’idée à la réalisation.
                </p>
                <div class="mt-6 flex gap-4 justify-center md:justify-start text-black font-bold">
                    <button class="btn-primary"></button>
                    <BaseButton>
                        Rejoindre notre réseau
                    </BaseButton>
                    <BaseButton variant="secondary" class="bg-white">
                        Trouver un professionnel
                    </BaseButton>
                </div>
            </div>
        </div>
        
    </div>
</template>
