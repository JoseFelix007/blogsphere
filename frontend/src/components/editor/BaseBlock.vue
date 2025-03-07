<script setup lang="ts">
import { computed, ref, type Component } from 'vue';

const props = defineProps({ order: { type: Number, required: true } });

interface Block {
  id: string;
  type: string;
  content: string;
  removable?: boolean;
  options?: any;
}
const block = defineModel<Block>({ required: true });

const emit = defineEmits(['add-new-block', 'enter', 'delete-block', 'upload-image']);

const showDropdown = ref(false);
const addBlock = (option) => {
  emit('add-new-block', option.type, props.order);
};

import BaseDropdownMenu from './BaseDropdownMenu.vue';
import HeadingBlock from './blocks/HeadingBlock.vue';
import TextBlock from './blocks/TextBlock.vue';
import ImageBlock from './blocks/ImageBlock.vue';
const options = [
  { label: "Texto", type: "text", action: addBlock },
  { label: "Título 1", type: "heading_1", action: addBlock },
  { label: "Título 2", type: "heading_2", action: addBlock },
  { label: "Título 3", type: "heading_3", action: addBlock },
  { label: "Imagen", type: "image", action: addBlock },
];

const blockTypes: { [key: string]: { component: Component, options: object }; } = {
  text: { component: TextBlock, options: {} },
  heading_1: { component: HeadingBlock, options: { level: 1 } },
  heading_2: { component: HeadingBlock, options: { level: 2 } },
  heading_3: { component: HeadingBlock, options: { level: 3 } },
  image: { component: ImageBlock, options: {} },
};
const blockComponent = computed(() => blockTypes[block.value.type].component);
const blockOptions = computed(() => blockTypes[block.value.type].options);

interface VueClickOutsideElement extends HTMLElement {
  __vueClickOutside__?: (event: MouseEvent) => void;
}

const vClickOutside = {
  mounted: (el: VueClickOutsideElement, binding: any) => {
    el.__vueClickOutside__ = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.__vueClickOutside__);
  },
  unmounted: (el: VueClickOutsideElement) => {
    if (el.__vueClickOutside__) {
      document.body.removeEventListener('click', el.__vueClickOutside__);
    }
  },
}

const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event, props.order);
};

const deleteBlock = (option) => {
  emit('delete-block', props.order);
};

const showCurrentOptions = ref(false);
const currentOptions = [
  { label: "Eliminar", action: deleteBlock, disabled: block.value.removable === false },
];
</script>

<template>
  <div class="block">
    <div class="block-actions">
      <button class="block-action block-action-add base-dropdown--activator" :class="{ active: showDropdown }"
        @click="() => showDropdown = !showDropdown" v-click-outside="() => showDropdown = false">
        <span>+</span>
        <BaseDropdownMenu :options="options" v-model="showDropdown" display-key="label">
        </BaseDropdownMenu>
      </button>
      <button class="block-action block-action-current base-dropdown--activator" :class="{ active: showCurrentOptions }"
        @click="() => showCurrentOptions = !showCurrentOptions" v-click-outside="() => showCurrentOptions = false">
        <span>^</span>
        <BaseDropdownMenu :options="currentOptions" v-model="showCurrentOptions" display-key="label">
        </BaseDropdownMenu>
      </button>
    </div>
    <component :is="blockComponent" class="block-content" v-model="block.content" v-bind="blockOptions"
      @enter="handleEnter" @upload-image="(file: File) => emit('upload-image', file)" />
  </div>
</template>