// ============================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // ============================================
    // TOGGLE DE SENHA
    // ============================================
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Atualizar ícone (opcional - pode adicionar classe para mudar o ícone)
        this.classList.toggle('active');
    });

    // ============================================
    // VALIDAÇÃO EM TEMPO REAL
    // ============================================
    
    // Validar email ao perder o foco
    emailInput.addEventListener('blur', function() {
        validateEmail(this);
    });

    // Remover erro ao começar a digitar
    emailInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            removeError(this);
        }
    });

    // Validar senha ao perder o foco
    passwordInput.addEventListener('blur', function() {
        validatePassword(this);
    });

    // Remover erro ao começar a digitar
    passwordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            removeError(this);
        }
    });

    // ============================================
    // SUBMIT DO FORMULÁRIO
    // ============================================
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos os campos
        const isEmailValid = validateEmail(emailInput);
        const isPasswordValid = validatePassword(passwordInput);

        // Se todos os campos forem válidos, processar o formulário
        if (isEmailValid && isPasswordValid) {
            // Aqui você pode adicionar a lógica de envio do formulário
            console.log('Formulário válido! Enviando...');
            
            // Simular sucesso
            showSuccessMessage();
            
            // Em produção, você faria algo como:
            // submitFormData();
        } else {
            // Mostrar mensagem de erro geral
            console.log('Por favor, corrija os erros no formulário.');
        }
    });

    // ============================================
    // FUNÇÕES DE VALIDAÇÃO
    // ============================================

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = input.value.trim();

        if (value === '') {
            showError(input, 'O email é obrigatório');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(input, 'Por favor, insira um email válido');
            return false;
        } else {
            removeError(input);
            return true;
        }
    }

    function validatePassword(input) {
        const value = input.value.trim();

        if (value === '') {
            showError(input, 'A senha é obrigatória');
            return false;
        } else if (value.length < 6) {
            showError(input, 'A senha deve ter pelo menos 6 caracteres');
            return false;
        } else {
            removeError(input);
            return true;
        }
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        if (errorMessage && message) {
            errorMessage.textContent = message;
        }
    }

    function removeError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }

    function showSuccessMessage() {
        // Criar elemento de sucesso
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.textContent = '✓ Login realizado com sucesso!';
        
        document.body.appendChild(successDiv);

        // Remover após 3 segundos
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 3000);
    }

    // ============================================
    // ANIMAÇÕES CSS DINÂMICAS
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// FUNÇÃO DE ENVIO (EXEMPLO)
// ============================================
async function submitFormData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    const formData = {
        email: email,
        password: password,
        remember: remember
    };

    try {
        // Exemplo de requisição (ajuste a URL conforme necessário)
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login bem-sucedido:', data);
            // Redirecionar ou atualizar a interface
            window.location.href = '/dashboard';
        } else {
            console.error('Erro no login:', data.message);
            // Mostrar mensagem de erro
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}