// AI Chat Interface for CosmicAI - Integrated Version
class AIChatBot {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.initChat();
    }

    initChat() {
        // A interface agora é parte do HTML estático ou injetada no local específico
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Usar setInterval para garantir que os elementos existam (caso sejam injetados dinamicamente)
        const checkElements = setInterval(() => {
            const sendBtn = document.getElementById('send-btn');
            const chatInput = document.getElementById('chat-input');

            if (sendBtn && chatInput) {
                sendBtn.onclick = () => this.sendMessage();
                chatInput.onkeypress = (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                };
                clearInterval(checkElements);
            }
        }, 500);
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message || this.isLoading) return;

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
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showLoadingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

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
        const lowerMessage = userMessage.toLowerCase();
        
        // Simulação de respostas astrológicas
        const responseMap = {
            'signo': 'Cada signo tem uma energia única! Áries é fogo e ação, Touro é terra e estabilidade, Gêmeos é ar e comunicação... Qual o seu signo para eu te contar mais?',
            'horóscopo': 'O horóscopo de hoje indica fortes influências de Júpiter, trazendo expansão. É um ótimo momento para novos começos!',
            'futuro': 'As estrelas mostram caminhos, mas você é quem caminha. Vejo uma energia de mudança positiva se aproximando.',
            'amor': 'No amor, a vênus está em uma posição favorável para diálogos sinceros. Se estiver solteiro, abra seu coração para o inesperado.',
            'trabalho': 'Profissionalmente, o momento pede foco e organização. Evite decisões impulsivas nesta semana.',
            'sorte': 'Seus números da sorte hoje são 7, 14 e 22. Use as cores azul ou violeta para atrair boas vibrações.',
            'compatibilidade': 'A compatibilidade astral vai além do signo solar. Mas signos do mesmo elemento (como Fogo com Fogo) costumam ter uma química instantânea!',
            'mapa astral': 'Seu mapa astral é sua identidade cósmica. Ele revela seus desafios e seus maiores talentos naturais.',
        };

        // Pequeno delay para parecer real
        await new Promise(resolve => setTimeout(resolve, 1500));

        for (const [keyword, response] of Object.entries(responseMap)) {
            if (lowerMessage.includes(keyword)) return response;
        }

        return 'Que pergunta interessante! As estrelas dizem que a curiosidade é o primeiro passo para a sabedoria. Como posso te ajudar mais com o cosmos?';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat
if (typeof window !== 'undefined') {
    window.cosmicAIChat = new AIChatBot();
}
