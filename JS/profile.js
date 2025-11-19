// JavaScript para página de perfil do usuário com funcionalidades interativas

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {

    // ===== VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL =====
    const form = document.querySelector('.needs-validation');
    const inputs = form.querySelectorAll('input, select');

    // ===== PRÉ-VISUALIZAÇÃO DA FOTO DE PERFIL =====
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const profilePicPreview = document.getElementById('profile-pic-preview');

    if (profilePicUpload && profilePicPreview) {
        profilePicUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePicPreview.src = e.target.result;
                    profilePicPreview.classList.add('is-valid'); // Feedback visual de sucesso
                    profilePicUpload.classList.remove('is-invalid');
                }
                reader.readAsDataURL(file);
            } else {
                profilePicPreview.src = 'https://via.placeholder.com/150?text=Foto';
                profilePicPreview.classList.remove('is-valid');
            }
        });
    }

    // Carregar dados das unidades SENAI
    let senaiUnitsData = {};
    const stateSelect = document.getElementById('state');
    const unitSelect = document.getElementById('unit');

    // Função para carregar o JSON (simulado, pois o arquivo está local)
    function loadSenaiUnits() {
        const states = {
            "AC": "Acre", "AL": "Alagoas", "AP": "Amapá", "AM": "Amazonas", "BA": "Bahia", "CE": "Ceará",
            "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás", "MA": "Maranhão", "MT": "Mato Grosso",
            "MS": "Mato Grosso do Sul", "MG": "Minas Gerais", "PA": "Pará", "PB": "Paraíba", "PR": "Paraná",
            "PE": "Pernambuco", "PI": "Piauí", "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte",
            "RS": "Rio Grande do Sul", "RO": "Rondônia", "RR": "Roraima", "SC": "Santa Catarina",
            "SP": "São Paulo", "SE": "Sergipe", "TO": "Tocantins"
        };

        // Simulação de dados do JSON (senai_units.json)
        senaiUnitsData = {
            "AC": ["SENAI Rio Branco", "SENAI Cruzeiro do Sul"],
            "AL": ["SENAI Poço", "SENAI Benedito Bentes"],
            "AM": ["SENAI Manaus", "SENAI Distrito Industrial"],
            "AP": ["SENAI Macapá"],
            "BA": ["SENAI Cimatec", "SENAI Dendezeiros", "SENAI Feira de Santana"],
            "CE": ["SENAI Jacarecanga", "SENAI Maracanaú"],
            "DF": ["SENAI Taguatinga", "SENAI Gama"],
            "ES": ["SENAI Vitória", "SENAI Serra"],
            "GO": ["SENAI Vila Canaã", "SENAI Catalão"],
            "MA": ["SENAI São Luís", "SENAI Imperatriz"],
            "MG": ["SENAI Contagem", "SENAI Betim", "SENAI Juiz de Fora"],
            "MS": ["SENAI Campo Grande", "SENAI Três Lagoas"],
            "MT": ["SENAI Cuiabá", "SENAI Rondonópolis"],
            "PA": ["SENAI Belém", "SENAI Ananindeua"],
            "PB": ["SENAI João Pessoa", "SENAI Campina Grande"],
            "PE": ["SENAI Santo Amaro", "SENAI Cabo de Santo Agostinho"],
            "PI": ["SENAI Teresina"],
            "PR": ["SENAI Curitiba", "SENAI Londrina", "SENAI Maringá"],
            "RJ": ["SENAI Maracanã", "SENAI Cinelândia", "SENAI Niterói"],
            "RN": ["SENAI Natal", "SENAI Mossoró"],
            "RO": ["SENAI Porto Velho"],
            "RR": ["SENAI Boa Vista"],
            "RS": ["SENAI Porto Alegre", "SENAI Caxias do Sul", "SENAI Santa Cruz do Sul"],
            "SC": ["SENAI Florianópolis", "SENAI Joinville", "SENAI Blumenau"],
            "SE": ["SENAI Aracaju"],
            "SP": ["SENAI Brás", "SENAI Ipiranga", "SENAI Santo Amaro", "SENAI Jundiaí"],
            "TO": ["SENAI Palmas", "SENAI Araguaína"]
        };

        // Preencher o select de estados
        for (const uf in states) {
            const option = document.createElement('option');
            option.value = uf;
            option.textContent = states[uf];
            stateSelect.appendChild(option);
        }
    }

    // Função para carregar as unidades com base no estado
    function loadUnitsByState(uf) {
        unitSelect.innerHTML = '<option value="">Selecione a Unidade...</option>';
        unitSelect.disabled = true;
        unitSelect.classList.remove('is-valid', 'is-invalid');

        if (uf && senaiUnitsData[uf]) {
            senaiUnitsData[uf].forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                unitSelect.appendChild(option);
            });
            unitSelect.disabled = false;
        }
    }

    // Event listener para o select de estado
    if (stateSelect) {
        stateSelect.addEventListener('change', function () {
            loadUnitsByState(this.value);
            validateField(this);
        });
    }

    // Event listener para o select de unidade
    if (unitSelect) {
        unitSelect.addEventListener('change', function () {
            validateField(this);
        });
    }

    loadSenaiUnits(); // Carregar os estados ao iniciar

    // Adicionar validação em tempo real para cada campo
    inputs.forEach(input => {
        // Ignorar o campo de upload de arquivo na validação de blur/input
        if (input.type === 'file') return;
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    // Função de validação de campo individual
    function validateField(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                return false;
            }
        }

        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        return true;
    }

    // ===== VALIDAÇÃO NO SUBMIT DO FORMULÁRIO =====
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        } else {
            // Scroll para o primeiro campo inválido
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });

    // ===== SIMULAÇÃO DE ENVIO DO FORMULÁRIO =====
    function submitForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simular envio (substituir por chamada real de API)
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Mostrar mensagem de sucesso
            showNotification('Perfil atualizado com sucesso!', 'success');

            // Opcional: resetar validação visual
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        }, 2000);
    }

    // ===== SISTEMA DE NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#198754' : type === 'error' ? '#dc3545' : '#712cf9'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ===== FORMATAÇÃO AUTOMÁTICA DE CAMPOS =====



    // ===== SALVAR INFORMAÇÕES LOCALMENTE =====
    const saveInfoCheckbox = document.getElementById('save-info');
    if (saveInfoCheckbox) {
        // Carregar informações salvas
        loadSavedInfo();

        saveInfoCheckbox.addEventListener('change', function () {
            if (this.checked) {
                showNotification('As informações serão salvas localmente', 'info');
            }
        });
    }

    function loadSavedInfo() {
        const savedData = localStorage.getItem('userProfileData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = document.getElementById(key);
                    if (field && field.type !== 'password') {
                        field.value = data[key];
                    }
                });
                showNotification('Informações carregadas', 'info');
            } catch (e) {
                console.error('Erro ao carregar dados salvos:', e);
            }
        }
    }

    function saveFormData() {
        const formData = {};
        inputs.forEach(input => {
            if (input.id && input.type !== 'password' && input.value) {
                formData[input.id] = input.value;
            }
        });
        localStorage.setItem('userProfileData', JSON.stringify(formData));
    }

    // Salvar dados ao sair de cada campo (se checkbox marcado)
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (saveInfoCheckbox && saveInfoCheckbox.checked) {
                saveFormData();
            }
        });
    });

    // ===== INDICADOR DE PROGRESSO DO FORMULÁRIO =====
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    document.body.prepend(progressIndicator);

    function updateProgress() {
        const totalFields = inputs.length;
        const filledFields = Array.from(inputs).filter(input => input.value.trim() !== '').length;
        const progress = (filledFields / totalFields) * 100;
        progressIndicator.style.width = progress + '%';
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
    });

    updateProgress(); // Atualizar no carregamento



    // ===== ATALHOS DE TECLADO =====
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + S para salvar
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }

        // Ctrl/Cmd + K para limpar formulário
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (confirm('Deseja limpar todos os campos do formulário?')) {
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                updateProgress();
                showNotification('Formulário limpo', 'info');
            }
        }
    });

    // ===== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.col-sm-6, .col-12').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ===== TOOLTIP PERSONALIZADO =====
    function addTooltip(element, text) {
        element.setAttribute('data-tooltip', text);
    }

    // Adicionar tooltips informativos
    const firstNameLabel = document.querySelector('label[for="firstName"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const stateLabel = document.querySelector('label[for="state"]');
    const unitLabel = document.querySelector('label[for="unit"]');
    const picLabel = document.querySelector('label[for="profile-pic-upload"]');

    if (firstNameLabel) {
        addTooltip(firstNameLabel, 'Digite seu primeiro nome');
    }
    if (emailLabel) {
        addTooltip(emailLabel, 'Usaremos para enviar atualizações');
    }
    if (stateLabel) {
        addTooltip(stateLabel, 'Selecione o estado onde você reside ou estuda');
    }
    if (unitLabel) {
        addTooltip(unitLabel, 'Selecione a unidade SENAI mais próxima');
    }
    // Adicionar tooltip ao input de arquivo (se necessário, mas o label é mais comum)
    if (profilePicUpload) {
        addTooltip(profilePicUpload, 'Clique para selecionar sua foto de perfil');
    }

    // ===== FEEDBACK VISUAL AO COPIAR =====
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('copy', function () {
            showNotification('Texto copiado!', 'info');
        });
    });

    // ===== DETECÇÃO DE PREENCHIMENTO AUTOMÁTICO =====
    setTimeout(() => {
        inputs.forEach(input => {
            if (input.value) {
                input.classList.add('is-valid');
            }
        });
        updateProgress();
    }, 500);

    // ===== ANIMAÇÕES CSS ADICIONAIS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
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

    // ===== LOG DE INICIALIZAÇÃO =====
    console.log('✅ Sistema de perfil do usuário inicializado com sucesso!');
    console.log('📋 Funcionalidades ativas:');
    console.log('   - Validação em tempo real');
    console.log('   - Pré-visualização de foto de perfil');
    console.log('   - Carregamento dinâmico de unidades SENAI');

    console.log('   - Sistema de notificações');
    console.log('   - Salvamento local de dados');
    console.log('   - Indicador de progresso');
    console.log('   - Atalhos de teclado (Ctrl+S para salvar, Ctrl+K para limpar)');
    console.log('   - Animações e transições suaves');
});

// ===== FUNÇÃO DE LIMPEZA AO SAIR DA PÁGINA =====
window.addEventListener('beforeunload', function (e) {
    const form = document.querySelector('.needs-validation');
    const hasUnsavedChanges = Array.from(form.querySelectorAll('input')).some(input =>
        input.value.trim() !== '' && !localStorage.getItem('userProfileData')
    );

    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
    }
});
