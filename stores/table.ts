// store/index.js
import { defineStore } from 'pinia'

export const useDataTableStore = defineStore({
    id: 'dataTable',
    state: () => ({
        headers: ['Nome', 'Idade', 'Email'],
        rows: [
            ['Alice', 25, 'alice@example.com'],
            ['Bob', 30, 'bob@example.com'],
            ['Charlie', 35, 'charlie@example.com']
        ]
    })
})
