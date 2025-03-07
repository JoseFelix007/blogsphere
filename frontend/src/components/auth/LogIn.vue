<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usersStore = useUsersStore();

const user = ref({
  username: '',
  password: '',
});

const login = async () => {
  const success = await usersStore.login(user.value);
  if (success) {
    router.push('/');
  }
};
</script>

<template>
  <div class="form-wrapper">
    <h3>BlogPosts</h3>
    <form @submit.prevent="login">
      <div class="form-control">
        <input type="text" required v-model="user.username">
        <label>Correo electrónico</label>
      </div>
      <div class="form-control">
        <input type="password" required v-model="user.password">
        <label>Contraseña</label>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p>¿Nuevo aquí? <RouterLink to="/register">Regístrate</RouterLink>
    </p>
  </div>
</template>