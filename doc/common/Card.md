📄 Documentation du Composant Card

Le composant Card est un conteneur Vue 3 conçu pour présenter du contenu de manière visuellement agréable. Il offre une structure standard avec des slots pour l'en-tête, le corps et le pied de page, ainsi que des options de style personnalisables.

Installation et Utilisation Basique

Importez et enregistrez le composant Card.vue dans votre application.
Extrait de code

<template>
  <Card>
    <h2>Mon Contenu</h2>
    <p>Ce contenu est affiché dans le corps de la carte.</p>
  </Card>
</template>

<script setup>
import Card from '@/components/Card.vue';
</script>

Propriétés (Props)

Le composant Card accepte une seule propriété pour contrôler sa taille.

1. size

    Type : String

    Valeur par défaut : 'medium'

    Valeurs possibles : 'small', 'medium', 'large'

    Description : Cette propriété ajuste la quantité de padding à l'intérieur de la carte pour la rendre plus petite, moyenne ou grande.

size	Classes appliquées	Résultat
'small'	p-4	Une carte avec un padding réduit.
'medium' (par défaut)	p-6	Une carte de taille standard.
'large'	p-8	Une carte avec un padding plus large.

Exemple :
Extrait de code

<Card size="large">
  </Card>

Slots (Emplacements de Contenu)

Le composant Card utilise des slots pour vous permettre d'injecter du contenu structuré à des endroits spécifiques.

1. Le Slot par défaut (<slot></slot>)

    Nom : default

    Description : C'est le slot principal pour le corps de la carte. Tout le contenu qui n'est pas placé dans un slot nommé sera affiché ici.

Exemple :
Extrait de code

<Card>
  <p>Ceci est le contenu principal.</p>
</Card>

2. Le Slot header (<slot name="header"></slot>)

    Nom : header

    Description : Cet emplacement est destiné à l'en-tête de la carte. Il est parfait pour les titres ou les icônes. La div contenant ce slot n'est rendue que si le slot est utilisé.

Exemple :
Extrait de code

<Card>
  <template #header>
    <h3 class="text-xl font-bold">Titre de la carte</h3>
  </template>
  <p>Contenu principal.</p>
</Card>

3. Le Slot footer (<slot name="footer"></slot>)

    Nom : footer

    Description : Cet emplacement est destiné au pied de page de la carte, idéal pour les boutons, les liens ou d'autres informations de fin. Comme le slot header, il n'est rendu que s'il est utilisé.

Exemple :
Extrait de code

<Card>
  <p>Contenu principal.</p>
  <template #footer>
    <button>En savoir plus</button>
  </template>
</Card>

Comportement et Design par défaut

Le composant Card intègre des styles et des effets par défaut pour un rendu optimal.

    Coins arrondis : rounded-lg

    Bordure : border border-gray-200

    Ombre : shadow-md

    Effet de survol : Au survol (hover), la carte se soulève légèrement (-translate-y-1) et une ombre rouge (shadow-lg hover:shadow-red-500/50) est ajoutée, créant un effet 3D subtil et élégant.