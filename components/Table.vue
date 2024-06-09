<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-10">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-6 text-center">Tabela</h1>
      <div class="mb-4 flex justify-end">
        <button @click="addRow" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        data-test="add-button"  
        >
          Add
        </button>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ header }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-100">
            <td v-for="cell in row" :key="cell" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ cell }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="editRow(index)" class="text-indigo-600 hover:text-indigo-900 mr-2" :data-test="'edit-button-' + index">Edit</button>
              <button @click="deleteRow(index)" class="text-red-600 hover:text-red-900" :data-test="'delete-button-' + index">Delete</button>              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useDataTableStore } from '../stores/table'

export default defineComponent({
  setup() {
    const dataTableStore = useDataTableStore()

    const addRow = () => {
      const newRow = Array(dataTableStore.headers.length).fill('New Data')
      dataTableStore.rows.push(newRow)
    }

    const editRow = (index) => {
      const row = dataTableStore.rows[index]
      const editedRow = row.map(cell => prompt('Edit cell', cell) || cell)
      dataTableStore.rows.splice(index, 1, editedRow)
    }

    const deleteRow = (index) => {
      dataTableStore.rows.splice(index, 1)
    }

    return {
      headers: dataTableStore.headers,
      rows: dataTableStore.rows,
      addRow,
      editRow,
      deleteRow
    }
  }
})
</script>
