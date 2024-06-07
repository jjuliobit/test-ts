import { vi, expect, describe, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '../stores/auth';

// Mock do useRouter
const mockRouterPush = vi.fn();
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}));

describe('AuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Fazer o login bem-sucedido e retornar nome do usuario', async () => {
        const store = useAuthStore();

        // Chama a função handleLoginFormSubmit com credenciais corretas
        await store.handleLoginFormSubmit('julio', 'teste123');

        // Verifica se o nome de usuário foi retornado corretamente após um login bem-sucedido
        expect(store.user?.username).toBe('julio');
    });
});
