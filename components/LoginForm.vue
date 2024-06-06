<!-- components/LoginForm.vue -->
<template>
    <form @submit.prevent="login">
      <div>
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Entrar</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = async () => {
    const success = await authStore.login(username.value, password.value);
    if (success) {
      console.log('Login bem sucedido!');
      router.push('/dashboard'); // Redirecionando para a página de dashboard
    } else {
      console.log('Login falhou!');
    }
    // Limpar campos após o envio
    username.value = '';
    password.value = '';
  };
  </script>
  