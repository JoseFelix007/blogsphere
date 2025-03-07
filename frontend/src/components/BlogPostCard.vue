<script setup lang="ts">
import { useRouter } from 'vue-router';
import DefaultPost from './svg/DefaultPost.vue';

interface Block {
  id: string;
  type: string;
  content: string;
  removable: boolean;
}
interface Post {
  slug: string;
  img: string;
  title: string;
  user: { username: string };
  content: Block[];
  created_at: string;
  status: 'new' | 'draft' | 'published';
}
const props = defineProps<{ post: Post, editable: boolean }>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const getSummary = (content: Block[]) => {
  const firstTextBlock = content.find(block => block.type === 'text');
  return firstTextBlock ? firstTextBlock.content?.slice(0, 100) + '...' : '';
};

const router = useRouter();
const viewPost = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('post-card__edit')) {
    return;
  }
  router.push({ name: 'posts-view', params: { slug: props.post.slug } });
};
const editPost = () => {
  router.push({ name: 'my-posts-edition', params: { slug: props.post.slug } });
};
</script>

<template>
  <div class="post-card" @click="viewPost">
    <div class="post-card__left">
      <template v-if="post.img">
        <img :src="post.img" alt="Imagen del post" class="post-card__image">
      </template>
      <template v-else>
        <DefaultPost />
      </template>
    </div>
    <div class="post-card__right">
      <div class="post-card__tags">
        <span v-if="post.status === 'draft'" class="post-card__tag gray">Borrador</span>
        <span v-else-if="post.status === 'published'" class="post-card__tag primary">Publicado</span>
      </div>
      <p class="post-card__title">{{ post.title }}</p>
      <div class="post-card__meta">
        <div class="post-card__info">
          <span>{{ post.user.username }}</span>
          <span class="post-card__info__sep"></span>
          <time :datetime="post.created_at">{{ formatDate(post.created_at) }}</time>
        </div>
      </div>
      <p class="post-card__summary">{{ getSummary(post.content) }}</p>
    </div>
    <div class="post-card__corner">
      <button v-if="editable" class="post-card__edit" @click="editPost">Editar</button>
    </div>
  </div>
</template>