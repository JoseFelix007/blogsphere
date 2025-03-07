<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBarLink from './NavBarLink.vue';

const theme = ref(getInitialTheme());

onMounted(() => {
  document.body.classList.add(theme.value);
});

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
  document.body.classList.remove(theme.value === 'light' ? 'dark' : 'light');
  document.body.classList.add(theme.value);
};

function getInitialTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

const router = useRouter();
const usersStore = useUsersStore();

const logout = async () => {
  const success = await usersStore.logout();
  if (success) {
    router.push('/login');
  }
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <NavBarLink class="navbar__logo" routeName="home">BlogPosts</NavBarLink>
    </div>
    <div class="navbar__center">
      <NavBarLink class="navbar__link" routeName="home">Explorar</NavBarLink>
      <template v-if="usersStore.isLoggedIn">
        <NavBarLink class="navbar__link" routeName="my-posts-list">Mis posts</NavBarLink>
        <NavBarLink class="navbar__link" routeName="my-posts-new">Nuevo</NavBarLink>
      </template>
    </div>
    <div class="navbar__right">
      <div class="navbar__theme_switcher">
        <input class="navbar__theme_switcher_toggle" id="navbar__theme_switcher_toggle" type="checkbox"
          @click="toggleTheme" />
        <label class="navbar__theme_switcher_label" for="navbar__theme_switcher_toggle"></label>
      </div>
      <template v-if="usersStore.isLoggedIn">
        <span class="navbar__account">{{ usersStore.user.user.username }}</span>
        <a class="navbar__logout navbar__button" @click="logout">Logout</a>
      </template>
      <template v-else>
        <NavBarLink class="navbar__login navbar__button" routeName="login">Login</NavBarLink>
      </template>
    </div>
  </nav>
</template>