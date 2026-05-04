// AI Chat Interface for CosmicAI
class AIChatBot {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.apiKey = null;
        this.initChat();
    }

    initChat() {
        // Create chat container
        this.createChatUI();
        this.attachEventListeners();
        // NÃO abrir o chat automaticamente - deixar fechado até o usuário clicar
    }

    createChatUI() {
        // Check if chat already exists
        if (document.getElementById('ai-chat-container')) return;

        const chatHTML = `
            <div id="ai-chat-container" class="ai-chat-container hidden" style="z-index: 9999;">
                <div class="ai-chat-header">
                    <h3 data-i18n="chat_title">🌟 Assistente Cósmico</h3>
                    <button id="close-chat" class="close-chat-btn">✕</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="chat-message bot-message">
                        <p data-i18n="chat_welcome">Olá! Sou o Assistente Cósmico. Faça qualquer pergunta sobre astrologia, horóscopo ou seu destino. ✨</p>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" class="chat-input" placeholder="Faça uma pergunta..." data-i18n="chat_input_placeholder">
                    <button id="send-btn" class="send-btn">→</button>
                </div>
            </div>
            <button id="open-chat" class="open-chat-btn" style="z-index: 9998;">💬</button>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
        
        // Apply current translation to the newly created UI
        if (window.updateContent) {
            const currentLang = localStorage.getItem('preferred-lang') || 'pt-BR';
            window.updateContent(currentLang);
        }
    }

    attachEventListeners() {
        const sendBtn = document.getElementById('send-btn');
        const chatInput = document.getElementById('chat-input');
        const closeBtn = document.getElementById('close-chat');
        const openBtn = document.getElementById('open-chat');

        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        closeBtn.addEventListener('click', () => this.toggleChat());
        openBtn.addEventListener('click', () => this.toggleChat());

        // Hero CTA button listener
        const heroBtn = document.getElementById('hero-cta-btn');
        if (heroBtn) {
            heroBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openChat();
            });
        }
    }

    openChat() {
        const container = document.getElementById('ai-chat-container');
        const openBtn = document.getElementById('open-chat');
        if (container) container.classList.remove('hidden');
        if (openBtn) openBtn.classList.add('hidden');
        const input = document.getElementById('chat-input');
        if (input) input.focus();
    }

    toggleChat() {
        const container = document.getElementById('ai-chat-container');
        const openBtn = document.getElementById('open-chat');
        if (container) {
            const isHidden = container.classList.toggle('hidden');
            if (openBtn) {
                if (isHidden) {
                    openBtn.classList.remove('hidden');
                } else {
                    openBtn.classList.add('hidden');
                }
            }
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message to chat
        this.addMessageToChat(message, 'user');
        input.value = '';

        // Show loading state
        this.isLoading = true;
        this.showLoadingIndicator();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.addMessageToChat(response, 'bot');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.addMessageToChat('Desculpe, houve um erro ao processar sua pergunta. Tente novamente.', 'bot');
        } finally {
            this.isLoading = false;
            this.removeLoadingIndicator();
        }
    }

    addMessageToChat(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showLoadingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chat-message bot-message loading';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeLoadingIndicator() {
        const loading = document.getElementById('loading-indicator');
        if (loading) loading.remove();
    }

    async getAIResponse(userMessage) {
        // Use simple predefined responses for now (no API key needed)
        const responses = this.getContextualResponse(userMessage);
        
        // Simulate a slight delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return responses;
    }

    getContextualResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Astrological responses
        const responseMap = {
            'signo': 'Qual é o seu signo do zodíaco? Posso gerar uma previsão personalizada para você! Os 12 signos são: Áries, Touro, Gêmeos, Câncer, Leão, Virgem, Libra, Escorpião, Sagitário, Capricórnio, Aquário e Peixes.',
            'horóscopo': 'Seu horóscopo depende do seu signo solar e da posição atual dos planetas. Qual é seu signo para que eu possa gerar uma previsão mais precisa?',
            'futuro': 'O futuro é moldado pelas nossas escolhas e pela energia cósmica. As estrelas nos guiam, mas você tem o poder de criar seu próprio destino! 🌟',
            'amor': 'A compatibilidade amorosa depende muito da posição de Vênus e Marte em seu mapa astral. Cada signo tem características únicas em relacionamentos.',
            'trabalho': 'Mercúrio rege a comunicação e os negócios. A posição dos planetas pode influenciar períodos favoráveis para decisões profissionais.',
            'saúde': 'Marte influencia nossa energia vital. Mantenha-se atento aos ciclos lunares para melhor compreender seus ritmos naturais.',
            'sorte': 'A sorte é criada pela intenção e ação. Os planetas oferecem oportunidades, mas você deve estar pronto para aproveitá-las!',
            'compatibilidade': 'A compatibilidade entre signos é fascinante! Qual é o seu signo e o de seu parceiro(a)? Posso analisar a química entre vocês.',
            'mapa astral': 'Seu mapa astral é como um retrato do céu no momento do seu nascimento. Ele revela sua personalidade, destino e potencial único.',
            'lua': 'A Lua rege nossas emoções e intuição. Cada fase lunar tem significados especiais. Estamos em que fase lunar agora?',
            'mercúrio': 'Mercúrio rege a comunicação, inteligência e negócios. Quando Mercúrio está retrógrado, pode haver confusões nas comunicações.',
            'vênus': 'Vênus rege o amor, beleza e valores. Sua posição no mapa astral mostra como você ama e o que valoriza na vida.',
            'marte': 'Marte rege a ação, coragem e desejo. Mostra sua força de vontade e como você enfrenta desafios.',
            'jupiter': 'Júpiter é o planeta da sorte e expansão. Traz oportunidades de crescimento e abundância para sua vida.',
            'saturno': 'Saturno rege as lições de vida e responsabilidade. Seus ciclos trazem aprendizados importantes para nosso crescimento.',
        };

        // Check for keywords in the message
        for (const [keyword, response] of Object.entries(responseMap)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }

        // Default response
        return 'Que pergunta interessante! 🌙 Posso ajudar com informações sobre astrologia, horóscopo, signos do zodíaco, compatibilidade amorosa, e muito mais. O que você gostaria de saber?';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat
function initAIChat() {
    if (!window.cosmicAIChat) {
        window.cosmicAIChat = new AIChatBot();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChat);
} else {
    initAIChat();
}
