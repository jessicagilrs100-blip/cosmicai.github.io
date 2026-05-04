// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Usar window.scrollTo em vez de scrollIntoView para maior controle
            const targetPosition = target.offsetTop;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        if (navbar) {
            navbar.style.boxShadow = '0 10px 30px rgba(147, 51, 234, 0.1)';
        }
    } else {
        if (navbar) {
            navbar.style.boxShadow = 'none';
        }
    }
    
    lastScroll = currentScroll;
});

// Analytics tracking (basic)
function trackEvent(eventName, eventData) {
    if (window.umami) {
        window.umami.track(eventName, eventData);
    }
}

// Track CTA clicks
document.querySelectorAll('.btn-large, .btn-primary, .hero-link').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            buttonText: btn.textContent,
            buttonClass: btn.className
        });
    });
});

// Funcao robusta para fazer scroll para a secao de features
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        // Usar window.scrollTo para maior controle e garantir que role completamente
        const targetPosition = featuresSection.offsetTop;
        
        // Usar requestAnimationFrame para garantir que o scroll seja suave e completo
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Fallback: se o scroll suave nao funcionar, usar scroll direto apos 1 segundo
        setTimeout(function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll < targetPosition - 10) {
                window.scrollTo(0, targetPosition);
            }
        }, 1000);
    }
}

// Garantir que o link hero funcione perfeitamente
function setupHeroLink() {
    const heroLink = document.getElementById('hero-link');
    if (heroLink) {
        // Garantir que o link seja clicavel
        heroLink.style.pointerEvents = 'auto';
        heroLink.style.cursor = 'pointer';
        
        // Remover o href padrao para evitar comportamento de link tradicional
        heroLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Chamar a funcao de scroll robusta
            scrollToFeatures();
        });
        
        // Adicionar listener de toque para garantir resposta no mobile
        heroLink.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Chamar a funcao de scroll robusta
            scrollToFeatures();
        }, false);
        
        // Adicionar listener de touchstart para evitar comportamento padrao
        heroLink.addEventListener('touchstart', function(e) {
            // Nao fazer nada, apenas evitar comportamento padrao
        }, false);
        
        console.log('Hero link setup complete - entire cover is clickable and scrolls to features');
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroLink);
} else {
    setupHeroLink();
}

// Garantir que o link seja configurado apos qualquer carregamento dinamico
window.addEventListener('load', setupHeroLink);

console.log('CosmicAI Landing Page loaded successfully! ✨');
