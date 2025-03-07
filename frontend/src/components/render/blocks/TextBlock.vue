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
  <p>
    {{ block.content }}
  </p>
</template>