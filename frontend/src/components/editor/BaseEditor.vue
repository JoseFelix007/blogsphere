<script setup lang="ts">
import { nextTick } from 'vue';
import BaseBlock from './BaseBlock.vue';

interface Block {
  id: string;
  type: string;
  content: string;
  options?: any;
}

const blocks = defineModel<Block[]>({ required: true });

const addNewBlock = (type: string, order: number) => {
  blocks.value.splice(order + 1, 0, { id: (blocks.value.length + 1).toString(), type, content: '' });

  nextTick(() => {
    const currentBlockElement = document.getElementById(`block-${blocks.value[order].id}`)?.querySelector('[contenteditable="true"]');
    currentBlockElement!.innerHTML = blocks.value[order].content;

    const newBlockElement = document.getElementById(`block-${blocks.value[order + 1].id}`)?.querySelector('[contenteditable="true"]');
    newBlockElement?.focus();
  });
};

const deleteBlock = (order: number) => {
  blocks.value.splice(order, 1);
};

const handleEnter = (event: KeyboardEvent, order: number) => {
  addNewBlock('text', order);
};

const emit = defineEmits(['upload-image']);
</script>

<template>
  <div class="editor">
    <BaseBlock v-for="(block, idx) in blocks" :key="idx" :id="'block-' + block.id" v-model="blocks[idx]" :order="idx"
      @add-new-block="addNewBlock" @enter="handleEnter" @delete-block="deleteBlock"
      @upload-image="(file: File) => emit('upload-image', block.id, file)" />
  </div>
</template>