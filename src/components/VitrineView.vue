<script setup lang="ts">
import { computed } from 'vue';
import type { MuseumObject, VitrineConfig, Language } from '../types';
import VitrineItem from './VitrineItem.vue';

const props = defineProps<{
  config: VitrineConfig;
  objects: MuseumObject[];
  selectedObjectId: number | null;
  language: Language;
}>();

const emit = defineEmits<{
  objectSelect: [object: MuseumObject];
  deselect: [];
}>();

const isDetailView = computed(() => props.selectedObjectId !== null);

const displayImageUrl = computed(() => {
  if (props.selectedObjectId !== null) {
    return `/detailVitrine${props.config.id}/dtv${props.config.id}-${props.selectedObjectId}.png`;
  }
  return props.config.imageUrl;
});

const instructionText = computed(() => {
  switch (props.language) {
    case 'de':
      return "Wählen Sie eine Nummer, um Objektdetails anzuzeigen.";
    case 'en':
      return "Select a number to view object details.";
    case 'jp':
      return "番号を選択して詳細を表示します。";
    default:
      return "Select a number to view object details.";
  }
});
</script>

<template>
  <div class="relative w-full max-w-5xl mx-auto">
    <!-- Responsive Aspect Ratio Container using 4/3 as a standard showcase ratio -->
    <div class="relative aspect-4/3 w-full bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">

      <!-- Image Layer -->
      <img
        v-if="displayImageUrl || config.imageUrl"
        :src="displayImageUrl ?? config.imageUrl"
        alt=""
        class="absolute inset-0 w-full h-full"
        :class="isDetailView ? 'object-contain' : 'object-cover'"
      />

      <!-- Object Markers (hidden in detail view) -->
      <template v-if="!isDetailView">
        <VitrineItem
          v-for="obj in objects"
          :key="obj.object_number"
          :object="obj"
          :isSelected="selectedObjectId === obj.object_number"
          @select="emit('objectSelect', $event)"
        />
      </template>

      <!-- Back Arrow (shown in detail view) -->
      <button
        v-if="isDetailView"
        class="back-button"
        @click="emit('deselect')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Legend Overlay -->
      <div class="legend-overlay">
        {{ config.name }} | {{ objects.length }} Objects
      </div>
    </div>
    
    <p class="mt-4 text-center text-sm text-neutral-600 italic">
      {{ instructionText }}
    </p>
  </div>
</template>

<style scoped>
.legend-overlay {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  color: #a3a3a3;
  border: 1px solid #404040;
}

.back-button {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.85);
}

@media (min-width: 768px) {
  .legend-overlay {
    font-size: 0.75rem;
  }
}
</style>
