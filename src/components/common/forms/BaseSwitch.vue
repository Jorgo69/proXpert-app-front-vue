<template>
  <label 
    class="toggle-switch" 
    :class="{ 'is-checked': isChecked, 'is-dragging': isDragging, 'is-disabled': disabled }" 
    @click="handleClick"
  >
    <input type="checkbox" :checked="isChecked" :value="modelValue" :disabled="disabled" />
    
    <div 
      class="switch-visual"
      ref="switchTrack" 
      @mousedown.prevent="startDrag"
      @touchstart.prevent="startDrag"
    >
      <div 
        class="switch-knob"
        :style="{ transform: knobTransform }"
      ></div>
    </div>

    <span class="label-text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';

// --- 1. PROPS ET ÉTATS ---

const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  activeValue: { type: [Boolean, String, Number], default: true },
  inactiveValue: { type: [Boolean, String, Number], default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

// Variables d'état pour le glissement
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const trackWidth = ref(0); // Largeur de la piste pour calculer la position du bouton
const knobOffset = 2;      // Marge intérieure du bouton (en px, doit correspondre au CSS)
const maxKnobTranslate = 22; // Déplacement maximal du bouton (en px, doit correspondre au CSS)

// Référence au DOM pour obtenir la largeur de la piste
const switchTrack = ref(null);

// --- 2. PROPRIÉTÉS CALCULÉES ---

// Vérifie si la valeur actuelle correspond à la valeur 'active' (ON)
const isChecked = computed(() => props.modelValue === props.activeValue);

// Calcule la transformation (position) du bouton en fonction de l'état de glissement
const knobTransform = computed(() => {
  if (isDragging.value) {
    // Si on glisse, utilise la position de la souris
    const deltaX = currentX.value - startX.value;
    const initialPosition = isChecked.value ? maxKnobTranslate : 0;
    
    // Calcule la nouvelle position, clampée entre 0 et maxKnobTranslate
    const newPosition = Math.min(
      Math.max(0, initialPosition + deltaX),
      maxKnobTranslate
    );
    
    return `translateX(${newPosition}px)`;

  } else {
    // Si pas en glissement, utilise la position finale ON ou OFF
    return isChecked.value ? `translateX(${maxKnobTranslate}px)` : 'translateX(0)';
  }
});

// --- 3. FONCTIONS D'INTERACTION ---

// Gère le clic simple (si ce n'était pas un glissement)
const handleClick = () => {
  // Le glissement est géré par stopDrag. Si c'est un clic, on bascule
  if (!isDragging.value && !props.disabled) {
    toggleState();
  }
};

// Bascule l'état ON/OFF
const toggleState = () => {
  const newValue = isChecked.value ? props.inactiveValue : props.activeValue;
  emit('update:modelValue', newValue);
};

// --- 4. GESTION DU GLISSEMENT (DRAG) ---

const startDrag = (event) => {
  if (props.disabled) return;
  
  // Définit l'événement de départ pour la souris ou le tactile
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  
  isDragging.value = true;
  startX.value = clientX;
  currentX.value = clientX;

  // Ajoute les écouteurs globaux pour le déplacement et l'arrêt
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', onDrag);
  window.addEventListener('touchend', stopDrag);
};

const onDrag = (event) => {
  if (!isDragging.value) return;

  // Récupère la position X actuelle
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  currentX.value = clientX;
};

const stopDrag = (event) => {
  if (!isDragging.value) return;

  // Supprime les écouteurs
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', stopDrag);

  // Calcule le déplacement total
  const deltaX = currentX.value - startX.value;
  
  // Détermine la position initiale (0 ou maxKnobTranslate)
  const initialPosition = isChecked.value ? maxKnobTranslate : 0;
  
  // Position finale après glissement (avant de clamp)
  const finalPosition = initialPosition + deltaX;

  // Seuil pour basculer : au-delà de la moitié de la course
  const shouldToggle = (finalPosition > maxKnobTranslate / 2 && !isChecked.value) ||
                       (finalPosition < maxKnobTranslate / 2 && isChecked.value);
  
  // Applique le basculement si le mouvement a dépassé le seuil
  if (shouldToggle) {
    toggleState();
  }

  // Réinitialise l'état de glissement après un court délai pour éviter d'interférer avec handleClick
  setTimeout(() => {
    isDragging.value = false;
  }, 50); 
};

// --- 5. CYCLE DE VIE ---

// onMounted/onUnmounted sont optionnels ici mais utiles pour d'autres interactions
onMounted(() => {
  if (switchTrack.value) {
    trackWidth.value = switchTrack.value.offsetWidth;
  }
});

onUnmounted(() => {
  // Assurez-vous de nettoyer les écouteurs si le composant est détruit pendant un glissement
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', stopDrag);
});
</script>

<style scoped>
/* Les styles restent similaires mais on ajoute la gestion du 'is-dragging' */

.toggle-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.toggle-switch.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.switch-visual {
  width: 50px; 
  height: 28px;
  background-color: #ccc;
  border-radius: 14px;
  position: relative;
  /* Désactive la transition lors du glissement pour un mouvement fluide */
  transition: background-color 0.3s; 
}

.is-checked .switch-visual {
  background-color: #4cd964; 
}

.switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  
  /* Ajout de la transition UNIQUEMENT quand on ne glisse PAS */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.is-dragging .switch-knob {
  /* Supprime la transition pendant le glissement */
  transition: none; 
}

/* La position finale du bouton si non glissant est gérée par knobTransform */

.label-text {
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
}

input[type="checkbox"] {
  opacity: 0; 
  width: 0;
  height: 0;
  position: absolute;
}
</style>