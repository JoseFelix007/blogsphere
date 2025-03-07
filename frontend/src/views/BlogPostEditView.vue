<script setup lang="ts">
import BlogPostEditor from '@/components/BlogPostEditor.vue';
import BlogLoader from '@/components/loader/BlogLoader.vue';
import { onMounted, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

import { usePostsStore } from '@/stores/posts';
const postsStore = usePostsStore();

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await loadPost();
  loading.value = false;
});

watch(() => route.name, async () => {
  loading.value = true;
  await loadPost();
  loading.value = false;
});

const loadPost = async () => {
  if (route.name === 'my-posts-new') {
    await postsStore.newPost();
  } else if (route.name === 'my-posts-edition') {
    await postsStore.fetchPost(route.params.slug as string);
  }
};
const save = async () => {
  loading.value = true;
  await postsStore.savePost();
  router.push({ name: 'my-posts-edition', params: { slug: postsStore.post.slug } });
  loading.value = false;
};
const publish = async () => {
  loading.value = true;
  await postsStore.publishPost();
  router.push({ name: 'posts-view', params: { slug: postsStore.post.slug } });
  loading.value = false;
};
</script>

<template>
  <BlogLoader v-if="loading" />
  <div v-else>
    <div class="blog-toolbar">
      <button class="blog-save" @click="save">Guardar borrador</button>
      <button class="blog-save primary" @click="publish">Publicar</button>
    </div>
    <BlogPostEditor />
  </div>
</template>