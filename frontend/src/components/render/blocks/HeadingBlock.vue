<script setup lang="ts">
interface Block {
  id: string;
  type: string;
  content: string;
  removable: boolean;
}
const props = defineProps<{ block: Block }>();
const getTag = () => {
  switch (props.block.type) {
    case 'heading_1':
      return 'h1';
    case 'heading_2':
      return 'h2';
    case 'heading_3':
      return 'h3';
    default:
      return 'div';
  }
};
</script>

<template>
  <component :is="getTag()">
    {{ block.content }}
  </component>
</template>