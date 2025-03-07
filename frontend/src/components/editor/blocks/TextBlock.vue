<script setup lang="ts">
import BaseContentEditable from '../BaseContentEditable.vue';

const content = defineModel<string>();
const placeholder = "Escribe aquí tu texto...";

const emit = defineEmits(['enter']);
const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event);
};
</script>

<template>
  <BaseContentEditable tag="p" v-model="content" :placeholder="placeholder" @enter="handleEnter" />
</template>