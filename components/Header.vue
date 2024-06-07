<!-- Header.vue -->
<template>
    <header>
      <nav>
        <ul>
            <li><NuxtLink to="/login">Login</NuxtLink></li>
            <li><NuxtLink to="/table">Tabela</NuxtLink></li>            
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  /* Estilos específicos para o cabeçalho */
  header {
    background-color: #333;
    color: white;
  }
  
  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    display: inline;
    margin-right: 10px;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  