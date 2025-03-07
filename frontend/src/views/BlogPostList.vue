<script setup lang="ts">
import BlogPostCard from '@/components/BlogPostCard.vue';

import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';

const { posts, getPosts } = usePostsStore();

onMounted(async () => {
  await getPosts();
});
</script>

<template>
  <main class="post-list">
    <BlogPostCard v-for="post in posts" :key="post.slug" :post="post" :editable="false" />
  </main>
</template>
