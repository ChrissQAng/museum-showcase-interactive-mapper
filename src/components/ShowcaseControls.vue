<script setup lang="ts">
import type { VitrineConfig } from '../types';

const props = defineProps<{
  activeVitrine: VitrineConfig;
  vitrineConfigs: VitrineConfig[];
  showPhoto: boolean;
  selectedVitrineId: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedVitrineId', value: string): void;
  (e: 'update:showPhoto', value: boolean): void;
}>();
</script>

<template>
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
    <div>
      <h2 class="text-3xl font-bold text-neutral-800 mb-2">{{ activeVitrine.name }}</h2>
      <div class="flex items-center gap-2">
        <!-- Simplified Static Label for now as requested, or clean selector if needed -->
        <span class="text-lg font-medium text-neutral-600 bg-white/50 px-3 py-1 rounded-md border border-neutral-200">
          Vitrine {{ activeVitrine.id }}
        </span>
      </div>
    </div>
  </div>
</template>
