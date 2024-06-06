// stores/auth.ts
import { defineStore } from 'pinia';

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
        async login(username: string, password: string): Promise<boolean> {
            // Simular uma chamada de API
            if (username === 'teste' && password === 'julio1') {
                this.user = { username };
                this.isAuthenticated = true;
                return true;
            }
            return false;
        },
        logout() {
            this.user = null;
            this.isAuthenticated = false;
        },
    },
});
