document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Tabs do Cardápio
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-categoria');
    
    if (tabBtns.length && menuCategories.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active de todos os botões e categorias
                tabBtns.forEach(b => b.classList.remove('active'));
                menuCategories.forEach(cat => cat.classList.remove('active'));
                
                // Adiciona active no botão clicado
                this.classList.add('active');
                
                // Mostra a categoria correspondente
                const categoria = this.getAttribute('data-categoria');
                document.getElementById(categoria)?.classList.add('active');
            });
        });
    }

    // Galeria - Lightbox (simplificado)
    const galeriaItems = document.querySelectorAll('.galeria-item img');
    if (galeriaItems.length) {
        galeriaItems.forEach(item => {
            item.addEventListener('click', function() {
                // Cria um lightbox básico
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <span class="close-lightbox">&times;</span>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // Fecha o lightbox
                const closeBtn = lightbox.querySelector('.close-lightbox');
                closeBtn.addEventListener('click', function() {
                    lightbox.remove();
                });
                
                // Fecha ao clicar fora da imagem
                lightbox.addEventListener('click', function(e) {
                    if (e.target === this) {
                        lightbox.remove();
                    }
                });
            });
        });
    }

    // Formulário de Contato
    const contactForm = document.querySelector('.contato-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mensagem = this.querySelector('textarea').value;
            
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simulação de envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Formulário de Reservas
    const reservaForm = document.querySelector('.reserva-form');
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação
            const nome = this.querySelector('#nome').value;
            const telefone = this.querySelector('#telefone').value;
            const data = this.querySelector('#data').value;
            const hora = this.querySelector('#hora').value;
            
            if (!nome || !telefone || !data || !hora) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de reserva
            alert(`Reserva confirmada para ${data} às ${hora} em nome de ${nome}. Entraremos em contato para confirmar.`);
            this.reset();
        });
    }

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Por favor, insira seu e-mail.');
                return;
            }
            
            alert(`Obrigado por assinar nossa newsletter! Um e-mail foi enviado para ${email}.`);
            this.reset();
        });
    }

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                }
            }
        });
    });

    // Atualiza o ano no footer automaticamente
    const yearSpan = document.querySelector('footer .footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }

    // Efeito de rolagem para aparecer elementos
    const scrollElements = document.querySelectorAll('.section-title, .section-subtitle, .menu-item, .especial-card, .galeria-item');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Inicializa elementos visíveis na carga
    window.addEventListener('load', () => {
        handleScrollAnimation();
    });
    
    // Verifica durante a rolagem
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});