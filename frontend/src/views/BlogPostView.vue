<script setup lang="ts">
import BlogPost from '@/components/BlogPost.vue';

import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postsStore = usePostsStore();

onMounted(async () => {
  if (typeof route.params.slug === 'string') {
    await postsStore.fetchPost(route.params.slug);
  } else {
    await postsStore.newPost();
  }
});
</script>

<template>
  <BlogPost />
</template>
