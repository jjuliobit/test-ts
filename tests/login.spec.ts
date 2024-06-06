import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../stores/auth'
import LoginForm from '../components/LoginForm.vue'

test('deve permitir o login com credenciais válidas', async () => {
    // Cria uma instância do Pinia para o teste
    const pinia = createTestingPinia()

    // Usa a loja de autenticação com o Pinia criado
    const authStore = useAuthStore(pinia)

    // Renderiza o componente LoginForm com o Pinia fornecido
    const { getByLabelText, getByText } = render(LoginForm, {
        global: {
            plugins: [pinia],
        },
    })

    // Preenche os campos de usuário e senha
    const userInput = getByLabelText('Usuário:')
    const passwordInput = getByLabelText('Senha:')

    // Simula a entrada de usuário e senha nos campos
    await fireEvent.update(userInput, 'teste')
    await fireEvent.update(passwordInput, 'julio1')

    // Verifica se os campos de entrada foram preenchidos corretamente
    console.log('User Input Value:', userInput.value)
    console.log('Password Input Value:', passwordInput.value)

    // Verifica se o botão "Entrar" está presente no DOM
    const loginButton = getByText('Entrar')
    console.log('Login Button:', loginButton)

    // Submete o formulário
    await fireEvent.click(loginButton)

    // Verifica se a função de autenticação é chamada corretamente
    console.log('Authentication function called:', authStore.login)
    console.log('IsAuthenticated after click:', authStore.isAuthenticated)

    // Verifica se o usuário foi autenticado com sucesso
    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.user?.username).toBe('teste')
})
