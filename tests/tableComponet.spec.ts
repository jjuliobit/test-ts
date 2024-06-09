import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TableComponent from '../components/Table.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useDataTableStore } from '../stores/table';

// Descreve o conjunto de testes para o componente TableComponent
describe('TableComponent', () => {
    // Declaração das variáveis de teste
    let store: ReturnType<typeof useDataTableStore>; // Store do Pinia
    let wrapper; // Componente montado para teste

    // Configuração antes de cada teste
    beforeEach(async () => {
        // Cria uma nova instância do Pinia
        const pinia = createPinia();
        // Ativa o Pinia
        setActivePinia(pinia);
        // Inicializa a store useDataTableStore com dados iniciais
        store = useDataTableStore(pinia);
        store.headers = ['Nome', 'Idade', 'Email'];
        store.rows = [
            ['Alice', 25, 'alice@example.com'],
            ['Bob', 30, 'bob@example.com'],
            ['Charlie', 35, 'charlie@example.com']
        ];
        // Monta o componente TableComponent para teste
        wrapper = mount(TableComponent, {
            global: {
                plugins: [pinia] // Adiciona o Pinia ao plugin global do wrapper
            }
        });
    });

    // Teste para verificar se a tabela está sendo renderizada corretamente
    it('renders table with correct headers and rows', () => {
        // Verifica se os cabeçalhos estão corretos
        const headers = wrapper.findAll('th');
        const expectedHeaders = [...store.headers, 'Actions'];
        headers.forEach((header, index) => {
            expect(header.text()).toBe(expectedHeaders[index]);
        });

        // Verifica se as linhas estão corretas
        const rows = wrapper.findAll('tbody tr');
        expect(rows).toHaveLength(store.rows.length);
        rows.forEach((rowWrapper, rowIndex) => {
            const cells = rowWrapper.findAll('td');
            cells.forEach((cellWrapper, cellIndex) => {
                if (cellIndex < store.headers.length) {
                    expect(cellWrapper.text()).toBe(String(store.rows[rowIndex][cellIndex]));
                }
            });
        });
    });

    // Teste para verificar a exclusão de uma linha
    it('deletes a row correctly', async () => {
        // Encontra o botão de exclusão para a segunda linha usando seu atributo data-test
        const deleteButton = wrapper.get('[data-test="delete-button-1"]');

        // Simula o clique no botão de exclusão
        await deleteButton.trigger('click');

        // Linhas esperadas após a exclusão
        const expectedRows = [
            ['Alice', 25, 'alice@example.com'],
            ['Charlie', 35, 'charlie@example.com']
        ];

        // Compara as linhas
        expect(store.rows).toEqual(expectedRows);
    });

    // Teste para verificar a edição de uma linha
    it('edits a row correctly', async () => {
        // Mock para window.prompt
        window.prompt = vi.fn()
            .mockReturnValueOnce('Juliana')  // Novo nome
            .mockReturnValueOnce(35)       // Nova idade
            .mockReturnValueOnce('juliana@example.com');  // Novo email

        // Encontra o botão de edição para a segunda linha usando seu atributo data-test
        const editButton = wrapper.get('[data-test="edit-button-1"]');

        // Simula o clique no botão de edição
        await editButton.trigger('click');

        // Linhas esperadas após a edição
        const expectedRows = [
            ['Alice', 25, 'alice@example.com'], // Nome alterado
            ['Juliana', 35, 'juliana@example.com'], // Mantido
            ['Charlie', 35, 'charlie@example.com'] // Mantido
        ];

        // Compara as linhas
        expect(store.rows).toEqual(expectedRows);
    });

    // Testes adicionais para editar e adicionar linhas podem ser adicionados aqui...
});
