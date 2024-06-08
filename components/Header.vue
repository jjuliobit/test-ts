<template>
  <header class="bg-gray-800 text-white py-4">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-lg font-bold">
        <NuxtLink to="/" class="text-white hover:text-gray-400">Logo</NuxtLink>
      </div>
      <ul class="flex space-x-4">
        <li><NuxtLink to="/login" class="text-white hover:text-gray-400">Login</NuxtLink></li>
        <li><NuxtLink to="/table" class="text-white hover:text-gray-400">Tabela</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>