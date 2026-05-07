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

// Funções do Modal de Horóscopo
function openModal(sign) {
    const modal = document.getElementById('predictionModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalSignName = document.getElementById('modalSignName');
    const modalSignDates = document.getElementById('modalSignDates');
    const modalBody = document.getElementById('modalBody');

    // Detect language from HTML lang attribute
    const lang = document.documentElement.lang.toLowerCase() || 'pt-br';
    const t = translations[lang] || translations['pt-br'];
    
    const signIcons = {
        aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', 
        leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', 
        sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
    };

    const data = t.signs[sign];
    if (data) {
        modalIcon.textContent = signIcons[sign];
        modalSignName.textContent = data.name;
        modalSignDates.textContent = data.dates;
        modalBody.innerHTML = `
            <div class="prediction-section">
                <h3>${t.predictionTitle}</h3>
                <p>${data.text}</p>
            </div>
            <div class="prediction-section">
                <h3>${t.astralTipTitle}</h3>
                <p>${t.astralTipText}</p>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('predictionModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('predictionModal');
    if (event.target == modal) {
        closeModal();
    }
};

console.log('Zodíacos Landing Page loaded successfully! ✨');
