<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
import HeadingBlock from './render/blocks/HeadingBlock.vue';
import TextBlock from './render/blocks/TextBlock.vue';
import ImageBlock from './render/blocks/ImageBlock.vue';

interface Block {
  id: string;
  type: string;
  content: string;
  removable: boolean;
}

const { post } = usePostsStore();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const getComponent = (block: Block) => {
  switch (block.type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return HeadingBlock;
    case 'text':
      return TextBlock;
    case 'image':
      return ImageBlock;
    default:
      return 'div';
  }
};
</script>

<template>
  <article class="post">
    <header class="post-header">
      <img class="post-img" :src="post.img" alt="">
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="post-info">
        <span>{{ post.user.username }}</span>
        <span class="post-info__sep"></span>
        <time :datetime="post.created_at">{{ formatDate(post.created_at) }}</time>
      </div>
    </header>

    <section class="post-section" v-for="(block, idx) in post.content" :key="idx">
      <template v-if="idx > 1">
        <component :is="getComponent(block)" :block="block" />
      </template>
    </section>

    <footer>
      <p>Comparte este post en redes sociales:</p>
    </footer>
  </article>
</template>
