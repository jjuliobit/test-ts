<template>
  <form @submit.prevent="handleLoginFormSubmit">
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
import { useAuthStore } from '../stores/auth'; // Supondo que você tenha um store Pinia configurado
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const router = useRouter();

const handleLoginFormSubmit = async () => {
  const success = await authStore.login(username.value, password.value); // Supondo que login retorne true/false
  if (success) {
    console.log('Login bem sucedido!');
    router.push('/dashboard'); // Navega para a página de dashboard após login bem-sucedido
  } else {
    console.log('Login falhou!');
  }
  // Limpa os campos após o envio
  username.value = '';
  password.value = '';
};
</script>
