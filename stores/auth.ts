// stores/auth.ts
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

interface User {
    username: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(username: string, password: string): Promise<{ success: boolean; username?: string }> {
            // Simular uma chamada de API
            if (username === 'julio' && password === 'teste123') {
                this.user = { username };
                this.isAuthenticated = true;
                return { success: true, username }; // Retorna o nome de usuário
            }
            return { success: false };
        },
        logout() {
            this.user = null;
            this.isAuthenticated = false;
        },
        async handleLoginFormSubmit(username: string, password: string) {
            const { success, username: loggedInUsername } = await this.login(username, password);
            if (success) {
                console.log('Login bem sucedido! Nome de usuário:', loggedInUsername);
                const router = useRouter();
                router.push('/dashboard'); // Redirecionando para a página de dashboard
            } else {
                console.log('Login falhou!');
            }
        },
    },
});
