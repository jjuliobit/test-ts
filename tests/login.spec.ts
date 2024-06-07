import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Login from '../components/LoginForm.vue'; // Altere o caminho conforme necessário

// Mock do useRouter
const mockRouterPush = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

// Mock do useAuthStore
const mockLogin = vi.fn();
vi.mock('../stores/auth', () => ({
    useAuthStore: () => ({
        login: mockLogin,
    }),
}));

describe('Login Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Login);
        vi.clearAllMocks();
    });

    it('Faz login com sucesso e navega para /dashboard', async () => {
        mockLogin.mockResolvedValue(true);

        // Define os valores dos campos de entrada
        await wrapper.find('#username').setValue('julio');
        await wrapper.find('#password').setValue('teste123');

        // Simula o envio do formulário
        await wrapper.find('form').trigger('submit.prevent');


        // Verifica se a função de login foi chamada com os valores corretos
        expect(mockLogin).toHaveBeenCalledWith('julio', 'teste123');

        // Verifica se a navegação ocorreu corretamente
        expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
    });

    it('Exibe mensagem de erro no login falhado', async () => {
        mockLogin.mockResolvedValue(false);

        // Define os valores dos campos de entrada
        await wrapper.find('#username').setValue('julio');
        await wrapper.find('#password').setValue('teste123');

        // Simula o envio do formulário
        await wrapper.find('form').trigger('submit.prevent');

        // Verifica se a função de login foi chamada com os valores corretos
        expect(mockLogin).toHaveBeenCalledWith('julio', 'teste123');

        // Verifica se a navegação não ocorreu
        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});
