// ===================================
// Tela Inicial - JavaScript Interativo
// ===================================

// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Loading Screen
    // ===================================
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
        }, 800);
    });

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Adicionar classe quando rolar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scroll para Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Animação de Fade In ao Rolar
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos cards
    document.querySelectorAll('.row.mb-2 > div').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    // ===================================
    // Carousel Auto-play com Pause ao Hover
    // ===================================
    const carousel = document.querySelector('#myCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });

        // Adicionar efeito de parallax ao carousel
        carousel.addEventListener('slide.bs.carousel', function(e) {
            const activeItem = e.relatedTarget;
            activeItem.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                activeItem.style.transform = 'scale(1)';
            }, 600);
        });
    }

    // ===================================
    // Animação dos Cards ao Hover
    // ===================================
    document.querySelectorAll('.row.mb-2 .row').forEach(card => {
        card.classList.add('card-container');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ===================================
    // Search Bar Enhancement
    // ===================================
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });

        // Simular busca (pode ser conectado a uma API real)
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                
                if (searchTerm) {
                    showNotification(`Buscando por: "${searchTerm}"...`, 'info');
                    // Aqui você pode adicionar a lógica de busca real
                    console.log('Termo de busca:', searchTerm);
                }
            }
        });
    }

    // ===================================
    // Botões de Login e Sign-up
    // ===================================
    const loginBtn = document.querySelector('.btn-light');
    const signupBtn = document.querySelector('.btn-primary');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecionando para login...', 'info');
            // Adicionar lógica de redirecionamento
            setTimeout(() => {
                console.log('Redirecionar para página de login');
            }, 1000);
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Abrindo formulário de cadastro...', 'success');
            // Adicionar lógica de redirecionamento
            setTimeout(() => {
                console.log('Redirecionar para página de cadastro');
            }, 1000);
        });
    }

    // ===================================
    // Theme Toggle Enhancement
    // ===================================
    const themeToggle = document.querySelector('#bd-theme');
    const themeButtons = document.querySelectorAll('[data-bs-theme-value]');

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-bs-theme-value');
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            
            showNotification(`Tema alterado para: ${theme}`, 'success');
            
            // Atualizar ícone ativo
            updateThemeIcon(theme);
        });
    });

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // ===================================
    // Navigation Active State
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover active de todos
            navLinks.forEach(l => l.classList.remove('active'));
            // Adicionar active ao clicado
            this.classList.add('active');
        });
    });

    // ===================================
    // Parallax Effect no Scroll
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel-item');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // Easter Egg: Konami Code
    // ===================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            activateEasterEgg();
        }
    });

    // ===================================
    // Funções Auxiliares
    // ===================================

    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'info' ? 'primary' : 'success'} notification-toast`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 250px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Função para atualizar ícone do tema
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon-active use');
        const icons = {
            'light': '#sun-fill',
            'dark': '#moon-stars-fill',
            'auto': '#circle-half'
        };
        
        if (themeIcon && icons[theme]) {
            themeIcon.setAttribute('href', icons[theme]);
        }

        // Atualizar botões ativos
        themeButtons.forEach(btn => {
            const btnTheme = btn.getAttribute('data-bs-theme-value');
            if (btnTheme === theme) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    // Easter Egg
    function activateEasterEgg() {
        showNotification('🎉 Código Konami ativado! Você encontrou o Easter Egg!', 'success');
        
        // Adicionar efeito visual especial
        document.body.style.animation = 'rainbow 2s linear';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    // ===================================
    // Performance Monitoring
    // ===================================
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Página carregada em: ${pageLoadTime}ms`);
            }, 0);
        });
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 Bem-vindo ao Console!', 'color: #712cf9; font-size: 20px; font-weight: bold;');
    console.log('%cSe você está aqui, provavelmente é um desenvolvedor curioso! 👨‍💻', 'color: #6c757d; font-size: 14px;');
    console.log('%cTente o código Konami para um Easter Egg! 🎮', 'color: #28a745; font-size: 12px;');

});

// ===================================
// Animações CSS adicionais via JavaScript
// ===================================
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

    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);