<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { allObjects, vitrineConfigs, loadData } from './data';
import type { MuseumObject, Language, VitrineConfig } from './types';
import AppHeader from './components/AppHeader.vue';
import VitrineView from './components/VitrineView.vue';
import ObjectDetail from './components/ObjectDetail.vue';

// Used until the spreadsheet data is loaded (or if it contains no showcase)
const emptyVitrine: VitrineConfig = { id: "", name: "" };

const defaultVitrine = computed<VitrineConfig>(() => vitrineConfigs.value[0] ?? emptyVitrine);

const language = ref<Language>('de');
const selectedVitrineId = ref<string>('');
const selectedObject = ref<MuseumObject | null>(null);

const isLoading = ref(true);
const loadError = ref<string | null>(null);

onMounted(async () => {
  try {
    await loadData();
    selectedVitrineId.value = defaultVitrine.value.id;
  } catch (error) {
    console.error(error);
    loadError.value = error instanceof Error ? error.message : String(error);
  } finally {
    isLoading.value = false;
  }
});

const filteredObjects = computed(() => {
  return allObjects.value.filter(obj => obj.vitrine_id === selectedVitrineId.value);
});

const activeVitrine = computed<VitrineConfig>(() => {
  return vitrineConfigs.value.find(v => v.id === selectedVitrineId.value) ?? defaultVitrine.value;
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

    <!-- Loading / error state while the spreadsheet files are fetched -->
    <main v-if="isLoading || loadError" class="container mx-auto px-6 py-12 text-center">
      <p v-if="isLoading" class="text-neutral-600 italic">Daten werden geladen …</p>
      <p v-else class="text-[#bc002d]">Fehler beim Laden der Daten: {{ loadError }}</p>
    </main>

    <main v-else class="container mx-auto px-6">
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


