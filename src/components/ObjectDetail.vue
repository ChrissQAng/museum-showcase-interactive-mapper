<script setup lang="ts">
import { computed } from 'vue';
import type { MuseumObject, Language } from '../types';

const props = defineProps<{
  object: MuseumObject | null;
  language: Language;
}>();

const emit = defineEmits<{
  close: [];
}>();

const getText = computed(() => {
  if (!props.object) return '';
  switch (props.language) {
    case 'de': return props.object.text_de;
    case 'en': return props.object.text_en;
    case 'jp': return props.object.text_jp;
    default: return props.object.text_en;
  }
});

// const getLabel = computed(() => {
//   switch (props.language) {
//     case 'de': return "Objekt-Details";
//     case 'en': return "Object Details";
//     case 'jp': return "オブジェクトの詳細";
//     default: return "Object Details";
//   }
// });
</script>

<template>
  <!-- Empty State -->
  <div 
    v-if="!object"
    class="h-full flex flex-col items-center justify-center text-neutral-500 p-8 text-center bg-neutral-900/50 rounded-xl border border-dashed border-neutral-800"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-lg text-neutral-600">Bitte wählen Sie ein Objekt aus der Vitrine, um historische Details zu sehen.</p>
  </div>

  <!-- Object Detail Card -->
  <div 
    v-else
    class="detail-card"
  >
    <div class="bg-[#c4c5bc] border-b border-neutral-400/50 p-6 flex items-center justify-between">
      <div>
        <!-- <h2 class="text-neutral-600 text-sm font-semibold tracking-widest uppercase mb-1">
          {{ getLabel }}
        </h2> -->
        <span class="text-3xl font-bold text-neutral-800 tracking-tighter">
          {{ object.object_number }}
        </span>
      </div>
      <button 
        @click="emit('close')"
        class="close-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="p-8">
      <div class="prose prose-neutral max-w-none">
        <p class="text-lg md:text-xl leading-relaxed text-neutral-800 font-light">
          {{ getText }}
        </p>
      </div>
      
      <div class="mt-8 pt-8 border-t border-neutral-400/30 flex flex-col gap-4">
        <div class="flex items-center gap-3 text-sm text-neutral-600">
          <span class="w-2 h-2 rounded-full bg-[#bc002d]"></span>
          <span>Vitrine ID: {{ object.vitrine_id }}</span>
        </div>
        <div class="flex items-center gap-3 text-sm text-neutral-600">
          <span class="w-2 h-2 rounded-full bg-neutral-500"></span>
          <span>Position: {{ object.pos_x }}% X / {{ object.pos_y }}% Y</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-card {
  background-color: #D8D9D0;
  border: 1px solid #a3a3a3;
  border-radius: 0.75rem;
  overflow: hidden;
}

.close-btn {
  padding: 0.5rem;
  border-radius: 9999px;
  color: #737373;
  cursor: pointer;
  background: transparent;
  border: none;
}

</style>
