<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usersStore = useUsersStore();

const user = ref({
  email: '',
  username: '',
  password: '',
  password_confirmation: ''
});

const register = async () => {
  const success = await usersStore.register(user.value);
  if (success) {
    router.push('/');
  }
};
</script>

<template>
  <div class="form-wrapper">
    <h3>BlogPosts</h3>
    <form @submit.prevent="register">
      <div class="form-control">
        <input type="text" required v-model="user.email">
        <label>Correo electrónico</label>
      </div>
      <div class="form-control">
        <input type="text" required v-model="user.username">
        <label>Usuario</label>
      </div>
      <div class="form-control">
        <input type="password" required v-model="user.password">
        <label>Contraseña</label>
      </div>
      <div class="form-control">
        <input type="password" required v-model="user.password_confirmation">
        <label>Repetir contraseña</label>
      </div>
      <button type="submit">Registrarse</button>
    </form>
    <p>¿Ya tienes una cuenta? <RouterLink to="/login">Iniciar sesión</RouterLink>
    </p>
  </div>
</template>