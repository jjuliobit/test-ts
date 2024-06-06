<!-- pages/index.vue -->
<template>
    <div>
      <h1 v-if="auth.isAuthenticated">Bem-vindo, {{ auth.user?.username }}</h1>
      <LoginForm v-else />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '~/stores/auth';
  import LoginForm from '~/components/LoginForm.vue';
  
  const auth = useAuthStore();
  </script>
  