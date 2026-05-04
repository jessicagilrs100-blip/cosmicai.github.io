// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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
        navbar.style.boxShadow = '0 10px 30px rgba(147, 51, 234, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
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
document.querySelectorAll('.btn-large, .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            buttonText: btn.textContent,
            buttonClass: btn.className
        });
    });
});

// Garantir que o botao da capa funcione no mobile
function setupHeroButton() {
    const heroBtn = document.getElementById('hero-cta-btn');
    if (heroBtn) {
        // Remover qualquer listener anterior
        heroBtn.onclick = null;
        
        // Funcao para fazer o scroll
        function performScroll() {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                // Usar setTimeout para garantir que o navegador processe
                setTimeout(function() {
                    featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
        
        // Adicionar listener de clique
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            performScroll();
        });
        
        // Adicionar listener de toque para garantir resposta no mobile
        heroBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            performScroll();
        }, false);
        
        // Adicionar listener de touchstart para feedback visual
        heroBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, false);
        
        console.log('Hero button setup complete - touch and click enabled');
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroButton);
} else {
    setupHeroButton();
}

// Garantir que o botao seja configurado apos qualquer carregamento dinamico
window.addEventListener('load', setupHeroButton);

console.log('CosmicAI Landing Page loaded successfully! ✨');
