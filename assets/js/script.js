// Funcao global para fazer scroll DIRETO para features (sem animacao)
function scrollToFeatures(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        // Scroll DIRETO sem animacao
        window.scrollTo(0, featuresSection.offsetTop);
    }
}

// Smooth scrolling para links de navegacao (com animacao)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Links de navegacao usam scroll suave
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animacoes ao scroll
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

document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito de scroll na navbar
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

// Analytics
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

console.log('CosmicAI Landing Page loaded successfully! ✨');
