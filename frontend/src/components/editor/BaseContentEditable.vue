<script setup lang="ts">
import { nextTick, ref } from 'vue';

defineProps<{ tag: string, placeholder: string }>();
const content = defineModel<string>();

const editable = ref<HTMLElement>();


const onInput = (event: InputEvent) => {
  content.value = (event.target?.innerText || '').replace(/\n/g, '');

  nextTick(() => {
    if (editable.value && content.value === '') {
      editable.value.innerHTML = '';
    }
  });
};

const emit = defineEmits(['enter']);
const onEnter = (event: KeyboardEvent) => {
  emit('enter', event);
};
</script>

<template>
  <tag v-once ref="editable" :contenteditable="true" :placeholder="placeholder" @input.prevent="onInput"
    @keyup.enter.prevent="onEnter">
    {{ content }}
  </tag>
</template>