/**
 * CosmicAI - Core AI Chat System (Rebuilt)
 * Handles communication with the backend AI proxy
 */

class CosmicAIChat {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.sessionId = this.generateSessionId();
        this.isTyping = false;

        this.init();
    }

    generateSessionId() {
        return 'cosmic_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }

    init() {
        if (!this.chatInput || !this.sendBtn) return;

        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        console.log('CosmicAI: Chat System Initialized');
    }

    async handleSend() {
        const text = this.chatInput.value.trim();
        if (!text || this.isTyping) return;

        this.addMessage(text, 'user');
        this.chatInput.value = '';
        
        await this.getAIResponse(text);
    }

    addMessage(text, sender) {
        if (!this.chatMessages) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-message`;
        
        const p = document.createElement('p');
        p.textContent = text;
        msgDiv.appendChild(p);

        this.chatMessages.appendChild(msgDiv);
        this.scrollToBottom();
        return msgDiv;
    }

    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator-container';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async getAIResponse(message) {
        this.showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    sessionId: this.sessionId,
                    lang: document.documentElement.lang || 'pt-BR'
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            this.hideTyping();
            this.addMessage(data.message || this.getErrorMessage(), 'bot');

        } catch (error) {
            console.error('CosmicAI Error:', error);
            this.hideTyping();
            this.addMessage(this.getErrorMessage(), 'bot');
        }
    }

    getErrorMessage() {
        const lang = document.documentElement.lang || 'pt-BR';
        const errors = {
            'pt-BR': 'As estrelas estão em silêncio no momento. Tente novamente em breve. ✨',
            'en': 'The stars are silent at the moment. Please try again soon. ✨',
            'es': 'Las estrellas están en silencio en este momento. Por favor, inténtalo de novo pronto. ✨'
        };
        return errors[lang] || errors['pt-BR'];
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicAI = new CosmicAIChat();
});
