<script setup lang="ts">
import BaseContentEditable from '../BaseContentEditable.vue';

const props = defineProps({ level: { type: Number, default: 1 } });
const content = defineModel<string>();

const placeholder = "Escribe aquí tu Título...";

const tag = `h${props.level}`;

const emit = defineEmits(['enter']);
const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event);
};
</script>

<template>
  <BaseContentEditable :tag="tag" v-model="content" :placeholder="placeholder" @enter="handleEnter" />
</template>