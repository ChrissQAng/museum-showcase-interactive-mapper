<script setup lang="ts">
import { ref, computed } from 'vue';
import { allObjects, vitrineConfigs } from './data';
import type { MuseumObject, Language, VitrineConfig } from './types';
import AppHeader from './components/AppHeader.vue';
import VitrineView from './components/VitrineView.vue';
import ObjectDetail from './components/ObjectDetail.vue';

const defaultVitrine: VitrineConfig = vitrineConfigs[0] ?? {
  id: "1",
  name: "Default Showcase",
  imageUrl: "/museum1.jpg"
};

const language = ref<Language>('de');
const selectedVitrineId = ref<string>(defaultVitrine.id);
const selectedObject = ref<MuseumObject | null>(null);

const filteredObjects = computed(() => {
  return allObjects.filter(obj => obj.vitrine_id === selectedVitrineId.value);
});

const activeVitrine = computed<VitrineConfig>(() => {
  return vitrineConfigs.find(v => v.id === selectedVitrineId.value) ?? defaultVitrine;
});

const languages: Language[] = ['de', 'en', 'jp'];
</script>

<template>
  <div class="min-h-screen museum-gradient text-neutral-800 pb-20">
    <AppHeader 
      :language="language"
      :languages="languages"
      :activeVitrine="activeVitrine"
      :allVitrines="vitrineConfigs"
      @update:language="language = $event"
      @update:vitrine="(id) => { selectedVitrineId = id; selectedObject = null; }"
    />

    <main class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Main Content Area (Showcase View) -->
        <div class="lg:col-span-8">
          <VitrineView
            :config="activeVitrine"
            :objects="filteredObjects"
            :selectedObjectId="selectedObject?.object_number ?? null"
            :language="language"
            @objectSelect="selectedObject = $event"
            @deselect="selectedObject = null"
          />
        </div>

        <!-- Sidebar Area (Object Details) -->
        <div v-if="selectedObject" class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <ObjectDetail 
            :object="selectedObject" 
            :language="language"
            @close="selectedObject = null"
          />
        </div>

      </div>
    </main>
  </div>
</template>


