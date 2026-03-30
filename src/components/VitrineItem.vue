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
    <span class="vitrine-marker__number">{{ object.object_number }}</span>
  </button>
</template>

<style scoped>
.vitrine-marker {
  position: absolute;
  z-index: 10;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(188, 0, 45, 0.5);
  color: white;
  cursor: pointer;
}

@media (min-width: 768px) {
  .vitrine-marker {
    width: 2.5rem;
    height: 2.5rem;
  }
}

.vitrine-marker--selected {
  background-color: #bc002d;
  border-color: white;
}

.vitrine-marker__number {
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
}

@media (min-width: 768px) {
  .vitrine-marker__number {
    font-size: 0.875rem;
  }
}
</style>
