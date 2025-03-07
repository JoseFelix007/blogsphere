<script setup lang="ts">
interface Block {
  id: string;
  type: string;
  content: string;
  removable: boolean;
}
defineProps<{ block: Block }>();
</script>

<template>
  <img class="post-img" :src="block.content" />
</template>