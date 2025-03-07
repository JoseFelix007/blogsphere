<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['upload-image']);

const content = defineModel<string>();
const placeholder = "Ingresa aquí tu imagen";

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit('upload-image', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      content.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const fileInput = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
  fileInput.value?.click();
};


import ImageIcon from '../icons/ImageIcon.vue';
</script>

<template>
  <div v-if="content" class="image-block-uploaded">
    <img :src="content" />
    <button class="image-block-uploaded--update" @click="triggerFileInput">actualizar</button>
    <input ref="fileInput" hidden type="file" @change="handleImageUpload" accept="image/*">
  </div>
  <div v-else class="image-block-upload" @click="triggerFileInput">
    <ImageIcon />
    <span>{{ placeholder }}</span>
    <input ref="fileInput" hidden type="file" @change="handleImageUpload" accept="image/*">
  </div>
</template>