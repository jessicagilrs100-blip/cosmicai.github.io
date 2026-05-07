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

    const predictions = {
        aries: { icon: '♈', name: 'Áries', dates: '21 de março - 19 de abril', text: 'Sua energia está em alta hoje. Aproveite para focar em projetos pessoais que exigem coragem e iniciativa. No amor, seja mais direto sobre seus sentimentos.' },
        taurus: { icon: '♉', name: 'Touro', dates: '20 de abril - 20 de maio', text: 'O dia pede paciência e foco na estabilidade financeira. Evite gastos impulsivos. No campo emocional, procure momentos de conforto e tranquilidade.' },
        gemini: { icon: '♊', name: 'Gêmeos', dates: '21 de maio - 20 de junho', text: 'Sua mente está ágil e cheia de ideias. Ótimo momento para conversas importantes e aprendizados. Mantenha o foco para não se dispersar.' },
        cancer: { icon: '♋', name: 'Câncer', dates: '21 de junho - 22 de julho', text: 'Sua intuição está aguçada. Ouça sua voz interior ao tomar decisões familiares. No trabalho, sua dedicação será notada e valorizada.' },
        leo: { icon: '♌', name: 'Leão', dates: '23 de julho - 22 de agosto', text: 'Seu brilho pessoal atrai olhares. Use seu carisma para liderar e inspirar. No amor, o momento é de paixão e criatividade.' },
        virgo: { icon: '♍', name: 'Virgem', dates: '23 de agosto - 22 de setembro', text: 'Dia excelente para organizar sua rotina e cuidar da saúde. Pequenos detalhes farão grande diferença no seu desempenho profissional.' },
        libra: { icon: '♎', name: 'Libra', dates: '23 de setembro - 22 de outubro', text: 'Busque o equilíbrio em suas relações. O dia favorece parcerias e acordos. No campo social, você será o centro das atenções de forma positiva.' },
        scorpio: { icon: '♏', name: 'Escorpião', dates: '23 de outubro - 21 de novembro', text: 'Momento de transformação profunda. Desapegue do que não serve mais. Sua força de vontade será sua maior aliada para superar desafios.' },
        sagittarius: { icon: '♐', name: 'Sagitário', dates: '22 de novembro - 21 de dezembro', text: 'Sua sede de aventura está renovada. Explore novos horizontes, mesmo que mentalmente. Otimismo será a chave para o sucesso hoje.' },
        capricorn: { icon: '♑', name: 'Capricórnio', dates: '22 de dezembro - 19 de janeiro', text: 'Foco total na carreira e objetivos de longo prazo. Sua persistência trará resultados sólidos. Não esqueça de reservar um tempo para o descanso.' },
        aquarius: { icon: '♒', name: 'Aquário', dates: '20 de janeiro - 18 de fevereiro', text: 'Ideias inovadoras podem surgir hoje. Compartilhe sua visão com pessoas que pensam como você. O dia favorece atividades em grupo.' },
        pisces: { icon: '♓', name: 'Peixes', dates: '19 de fevereiro - 20 de março', text: 'Sua sensibilidade está elevada. Use sua criatividade para expressar suas emoções. No amor, a conexão espiritual será fundamental.' }
    };

    const data = predictions[sign];
    if (data) {
        modalIcon.textContent = data.icon;
        modalSignName.textContent = data.name;
        modalSignDates.textContent = data.dates;
        modalBody.innerHTML = `
            <div class="prediction-section">
                <h3>Previsão do Dia</h3>
                <p>${data.text}</p>
            </div>
            <div class="prediction-section">
                <h3>Dica Astral</h3>
                <p>Mantenha o pensamento positivo e confie no fluxo do universo.</p>
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
