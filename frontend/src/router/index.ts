import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteLocationNormalizedLoaded, type RouteLocationRaw } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import BlogPostList from '@/views/BlogPostList.vue';
import BlogPostView from '@/views/BlogPostView.vue';
import BlogPostEditView from '@/views/BlogPostEditView.vue';
import LogInView from '@/views/LogInView.vue';
import SignInView from '@/views/SignInView.vue';
import BlogPostUserList from '@/views/BlogPostUserList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogPostList,
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/register',
      name: 'register',
      component: SignInView,
    },
    {
      path: '/posts/:slug',
      name: 'posts-view',
      component: BlogPostView,
    },
    {
      path: '/my-posts',
      name: 'my-posts-list',
      component: BlogPostUserList,
    },
    {
      path: '/my-posts/new',
      name: 'my-posts-new',
      component: BlogPostEditView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-posts/:slug/edit',
      name: 'my-posts-edition',
      component: BlogPostEditView,
      meta: { requiresAuth: true },
    }
  ],
});

const originalPush = router.push;
router.push = (location: RouteLocationRaw) => {
    return originalPush.call(this, location).catch(error => { 
      if (error.name === 'NavigationDuplicated') {
        return;
      } else {
        console.error('Error de navegación:', error); 
      }
    });
};

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  const usersStore = useUsersStore();

  if (to.meta.requiresAuth && !usersStore.isLoggedIn) {
    return { name: 'login' }; 
  }
});

export default router
