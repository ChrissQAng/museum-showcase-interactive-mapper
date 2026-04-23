<script setup lang="ts">
import type { MuseumObject } from '../types';

const props = defineProps<{
  object: MuseumObject;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  select: [object: MuseumObject];
}>();
</script>

<template>
  <button
    @click="emit('select', props.object)"
    class="vitrine-marker"
    :class="{ 'vitrine-marker--selected': isSelected }"
    :style="{
      left: `${object.pos_x}%`,
      top: `${object.pos_y}%`,
    }"
    :title="`Object ${object.object_number}`"
  >
    <span class="vitrine-marker__icon">✕</span>
  </button>
</template>

<style scoped>
.vitrine-marker {
  position: absolute;
  z-index: 10;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  border-radius: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

@media (min-width: 768px) {
  .vitrine-marker {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.vitrine-marker--selected .vitrine-marker__icon {
  opacity: 1;
  text-shadow: 0 0 4px white;
}

.vitrine-marker__icon {
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1;
  opacity: 0.85;
}
</style>
