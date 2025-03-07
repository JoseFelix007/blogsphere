<script setup lang="ts">
import BaseEditor from './editor/BaseEditor.vue';

import { usePostsStore } from '@/stores/posts';
const postsStore = usePostsStore();

const handleUploadImage = async (blockId: string, file: File) => {
  return await postsStore.uploadImageToBlock(blockId, file);
};
</script>

<template>
  <BaseEditor v-model="postsStore.post.content" @upload-image="handleUploadImage" />
</template>