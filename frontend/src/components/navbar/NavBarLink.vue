<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{ routeName: string; }>();

const router = useRouter();
const route = useRoute();
const isActive = computed(() => route.name === props.routeName);
const path = computed(() => {
  const matchedRoute = router.getRoutes().find(route => route.name === props.routeName);
  return matchedRoute ? matchedRoute.path : '/';
});
</script>

<template>
  <RouterLink :to="path" :class="{ active: isActive }">
    <slot />
  </RouterLink>
</template>
