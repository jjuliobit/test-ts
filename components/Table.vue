<!-- components/DataTable.vue -->
<template>
        <h1>Tabela</h1>
        <table>
            <thead>
              <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows" :key="index">
                <td v-for="cell in row" :key="cell">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { useDataTableStore } from '../stores/table'
  
  export default defineComponent({
    setup() {
      const dataTableStore = useDataTableStore()
  
      return {
        headers: dataTableStore.headers,
        rows: dataTableStore.rows
      }
    }
  })
  </script>  