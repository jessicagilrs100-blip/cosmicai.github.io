// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
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
document.querySelectorAll('.btn-large, .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            buttonText: btn.textContent,
            buttonClass: btn.className
        });
    });
});

// Setup hero section para ser clicavel
function setupHeroClick() {
    const heroSection = document.getElementById('hero-section');
    const featuresSection = document.getElementById('features');
    
    if (heroSection && featuresSection) {
        // Funcao para fazer scroll
        function performScroll() {
            const targetTop = featuresSection.offsetTop;
            
            // Usar window.scrollTo com behavior smooth
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
            
            // Fallback: se nao funcionar, fazer scroll direto apos 500ms
            setTimeout(function() {
                if (window.pageYOffset < targetTop - 50) {
                    window.scrollTo(0, targetTop);
                }
            }, 500);
        }
        
        // Listener de clique simples
        heroSection.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            performScroll();
            trackEvent('Hero_Click', { action: 'scroll_to_features' });
        });
        
        // Listener de toque para mobile
        heroSection.addEventListener('touchstart', function(e) {
            // Apenas marcar que houve toque
            this.dataset.touched = 'true';
        }, false);
        
        heroSection.addEventListener('touchend', function(e) {
            if (this.dataset.touched === 'true') {
                e.preventDefault();
                e.stopPropagation();
                performScroll();
                trackEvent('Hero_Touch', { action: 'scroll_to_features' });
                this.dataset.touched = 'false';
            }
        }, false);
        
        console.log('Hero click setup complete');
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeroClick);
} else {
    setupHeroClick();
}

// Garantir que seja configurado apos load completo
window.addEventListener('load', setupHeroClick);

console.log('CosmicAI Landing Page loaded successfully! ✨');
