<script setup lang="ts">
import type { Language, VitrineConfig } from '../types';

const props = defineProps<{
  language: Language;
  languages: Language[];
  activeVitrine: VitrineConfig;
  allVitrines: VitrineConfig[];
}>();

const emit = defineEmits<{
  (e: 'update:language', value: Language): void;
  (e: 'update:vitrine', value: string): void;
}>();

// Flag emoji mapping for languages
const flagMap: Record<Language, string> = {
  de: '🇩🇪',
  en: '🇬🇧',
  jp: '🇯🇵'
};

const langLabels: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
  jp: '日本語'
};
</script>

<template>
  <div class="sticky top-0 z-50">
    <!-- Main Header -->
    <header class="header-main">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Left: Title Text -->
        <div class="header-text">
          <h1 class="text-2xl md:text-3xl font-bold tracking-wide">Siebold-Museum</h1>
          <h2 class="text-sm md:text-base font-medium mt-1">Deutsch-Japanisches Forum Würzburg</h2>
        </div>

        <!-- Right: Banner Image -->
        <div class="flex items-center">
          <img 
            src="/museumBanner.jpg" 
            alt="Museum Banner" 
            class="h-16 md:h-20 w-auto object-contain"
          />
        </div>
      </div>
    </header>

    <!-- Language Switcher Bar (below header) -->
    <!-- ALIGNMENT CONTROL: This div controls the height and background of the bar -->
    <div class="language-bar h-24">
      <!-- CENTER CONTENT: flex items-center ensures vertical centering -->
      <div class="container mx-auto px-6 h-full flex items-center justify-between">
        
        <!-- Left: Vitrine Title -->
        <!-- Left: Vitrine Title -->
        <div class="relative group">
          <select 
            :value="activeVitrine.id" 
            @change="emit('update:vitrine', ($event.target as HTMLSelectElement).value)"
            class="vitrine-select"
          >
            <option v-for="v in allVitrines" :key="v.id" :value="v.id">
              Vitrine {{ v.id }}
            </option>
          </select>
          <!-- Custom Arrow Icon -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-neutral-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Right: Language Switcher -->
        <div class="flex gap-2 items-center justify-end mr-[0.9rem]">

          <button
            v-for="lang in languages"
            :key="lang"
            @click="emit('update:language', lang)"
            :title="langLabels[lang]"
            class="lang-btn"
            :class="{ 'lang-btn--active': language === lang }"
          >
            <span class="lang-btn__flag">{{ flagMap[lang] }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-main {
  background-color: #ffffff;
}

.header-text {
  color: #80856f;
}

.header-text h1,
.header-text h2 {
  color: #80856f;
}

.language-bar {
  background-color: #9a9f86;
}

.vitrine-select {
  appearance: none;
  color: #262626;
  font-weight: 500;
  font-size: 1.125rem;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0.25rem 2rem 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.vitrine-select:focus {
  outline: none;
}

.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
}

.lang-btn--active {
  background-color: white;
}

.lang-btn__flag {
  font-size: 3rem;
  line-height: 1;
}
</style>
