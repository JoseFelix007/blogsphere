import { post } from "@/api";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

interface User {
  user: {
    username: string;
  };
  token?: string;
}

interface UserLogin {
  username: string;
  password: string;
}

interface UserRegister {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export const useUsersStore = defineStore('users', () => {
  const user = ref<User>(getUserFromLocalStorage());

  const isLoggedIn = computed(() => {
    return !!user.value.token;
  });

  const login = async (userLogin: UserLogin) => {
    try {
      const response = await post<User>('/login', userLogin);
      user.value.user = response.user;
      user.value.token = response.token;
      console.log(user.value);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  const register = async (userRegister: UserRegister) => {
    try {
      const response = await post<User>('/register', userRegister);
      user.value.user = response.user;
      user.value.token = response.token;
      console.log(user.value);
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error); 
      return false;
    }
  }

  const logout = async () => {
    await post('/logout');
    user.value = { user: { username: '' } };
    return true;
  };

  watch(user, (newUser) => {
    localStorage.setItem('user', JSON.stringify(newUser));
  }, { deep: true }); 

  function getUserFromLocalStorage(): User {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : { user: { username: '' } };
  }

  return { user, isLoggedIn, login, register, logout };
});