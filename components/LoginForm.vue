<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Formulário de Login</h1>
      
      <form @submit.prevent="handleLoginFormSubmit" class="space-y-6">
        <div>
          <label for="username" class="block text-gray-700">Usuário:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
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
