📄 Documentation du Composant Container

Le composant Container est un composant Vue 3 flexible et réutilisable qui gère la mise en page de base pour votre contenu. Il est conçu pour centrer votre contenu horizontalement, contrôler sa largeur et faciliter l'intégration de grilles (grids) avec Tailwind CSS.

Installation et Utilisation Basique

Importez et enregistrez le composant dans votre application Vue. Vous pouvez ensuite l'utiliser en l'enveloppant autour du contenu que vous souhaitez mettre en page.
Extrait de code

<template>
  <Container>
    <h1>Titre de ma page</h1>
    <p>Ce contenu est centré et a une largeur maximale par défaut.</p>
  </Container>
</template>

<script setup>
import Container from '@/components/Container.vue';
</script>

Propriétés (Props)

Le composant Container accepte plusieurs propriétés pour personnaliser son comportement.

1. fluid

    Type : Boolean

    Valeur par défaut : false

    Description : Si mis à true, le conteneur s'étendra sur toute la largeur de l'écran (w-full max-w-full), ignorant la largeur maximale standard de Tailwind (.container).

fluid	Classes appliquées	Résultat
false (par défaut)	container	Le contenu est centré et a une largeur maximale fixe, adaptée aux breakpoints de Tailwind.
true	w-full max-w-full	Le contenu remplit la largeur disponible de l'écran.

Exemple :
Extrait de code

<Container fluid>
  </Container>

2. align

    Type : String

    Valeur par défaut : 'center'

    Valeurs possibles : 'left', 'right', 'center'

    Description : Contrôle l'alignement du texte à l'intérieur du conteneur.

align	Classe appliquée
'center' (par défaut)	text-center
'left'	text-left
'right'	text-right

Exemple :
Extrait de code

<Container align="left">
  </Container>

3. grid

    Type : Boolean

    Valeur par défaut : false

    Description : Si mis à true, le conteneur se transforme en une grille CSS, permettant d'organiser les éléments enfants en colonnes. Cette prop doit être utilisée conjointement avec responsiveCols et gap.

4. responsiveCols

    Type : Object

    Valeur par défaut : { sm: 1, md: 2, lg: 4 }

    Description : Définit le nombre de colonnes pour la grille en fonction des breakpoints de Tailwind (sm, md, lg, etc.). Cette prop est ignorée si grid est à false.

Exemple :
Extrait de code

<Container grid :responsive-cols="{ sm: 1, md: 2, lg: 3 }">
  </Container>

5. gap

    Type : Number

    Valeur par défaut : 4

    Description : Définit l'espacement (gap) entre les colonnes et les rangées de la grille. S'applique uniquement si grid est à true. La valeur correspond aux classes de gap- de Tailwind.

Exemple :
Extrait de code

<Container grid :responsive-cols="{ sm: 1, md: 2, lg: 3 }" :gap="8">
  </Container>

Utilisation Avancée : Scénarios Fréquents

Scénario 1 : Centrage de contenu simple

    Besoin : Centrer le contenu et le limiter à la largeur par défaut.

    Solution : N'utilisez aucune prop.

Extrait de code

<Container>
</Container>

Scénario 2 : Mise en page "Full-width"

    Besoin : Un en-tête qui s'étend sur toute la largeur de l'écran.

    Solution : Utilisez la prop fluid.

Extrait de code

<Container fluid>
  <p>Mon en-tête full-width.</p>
</Container>

Scénario 3 : Grille de 3 colonnes sur ordinateur

    Besoin : Afficher 3 cartes par ligne sur les grands écrans.

    Solution : Utilisez les props grid, responsiveCols et gap.

Extrait de code

<Container grid :responsive-cols="{ sm: 1, md: 2, lg: 3 }" gap="6">
  <Card />
  <Card />
  <Card />
</Container>

