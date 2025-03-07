<script setup lang="ts">
import BlogPostCard from '@/components/BlogPostCard.vue';

import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';

const { myPosts, getMyPosts } = usePostsStore();

onMounted(async () => {
  await getMyPosts();
});
</script>

<template>
  <main class="post-list">
    <BlogPostCard v-for="post in myPosts" :key="post.slug" :post="post" :editable="true" />
  </main>
</template>
