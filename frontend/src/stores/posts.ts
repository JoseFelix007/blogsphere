import { reactive } from 'vue'
import { defineStore } from 'pinia'
import * as api from '@/api';

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

export const usePostsStore = defineStore('posts', () => {
  const post = reactive<Post>({
    slug: '',
    img: '',
    title: '',
    user: { username: '' },
    content: [],
    created_at: '',
    status: 'new'
  });

  const newPost = async () => {
    try {
      const response = await api.post<Post>(`/posts`);
      Object.assign(post, response);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPost = async (slug: string) => {
    try {
      const response = await api.get<Post>(`/posts/${slug}`);
      Object.assign(post, response);
    } catch (error) {
      console.error(error);
    }
  };
  const savePost = async () => {
    try {
      post.status = 'draft';
      const response = await api.put<Post>(`/posts/${post.slug}`, post);
      Object.assign(post, response);
    } catch (error) {
      console.error(error);
    }
  };
  const publishPost = async () => {
    try {
      post.status = 'published';
      const response = await api.put<Post>(`/posts/${post.slug}`, post);
      Object.assign(post, response);
    } catch (error) {
      post.status = 'draft';
      console.error(error);
    }
  };
  const uploadImageToBlock = async (blockId: string, file: File) => {
    try {
      const blockIndex = post.content.findIndex(block => block.id === blockId);
      if (blockIndex === -1) {
        throw new Error('Bloque no encontrado');
      }

      const formData = new FormData();
      formData.append('image', file);
      const response = await api.post<{ route: string }>(`/posts/${post.slug}/images`, formData);

      post.content[blockIndex].content = response.route;
    } catch (error) {
      console.error(error);
    }
  };

  const posts = reactive<Post[]>([]);

  const getPosts = async () => {
    try {
      const response = await api.get<Post[]>(`/posts`);
      Object.assign(posts, response);
    } catch (error) {
      console.error(error);
    }
  };

  const myPosts = reactive<Post[]>([]);

  const getMyPosts = async () => {
    try {
      const response = await api.get<Post[]>(`/my-posts`);
      Object.assign(myPosts, response);
    } catch (error) {
      console.error(error);
    }
  };

  return { post, newPost, fetchPost, savePost, publishPost, uploadImageToBlock, posts, getPosts, myPosts, getMyPosts }
})
