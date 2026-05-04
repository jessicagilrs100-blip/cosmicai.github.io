/**
 * COSMIC AI - NEW CLEAN FRONTEND
 * Simple and direct chat interface
 */

const CosmicChat = {
    init() {
        this.container = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.button = document.getElementById('send-btn');
        
        if (this.button) {
            this.button.onclick = () => this.send();
            this.input.onkeypress = (e) => e.key === 'Enter' && this.send();
        }
    },

    async send() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMsg(text, 'user');
        this.input.value = '';
        
        // Loading state
        const loading = this.addMsg('...', 'bot');

        try {
            const res = await fetch('https://cosmic-ai-horoscope.vercel.app/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text,
                    lang: document.documentElement.lang || 'pt-BR'
                })
            });
            
            const data = await res.json();
            loading.querySelector('p').textContent = data.message || 'Error';
        } catch (e) {
            loading.querySelector('p').textContent = 'Connection failed.';
        }
        
        this.container.scrollTop = this.container.scrollHeight;
    },

    addMsg(text, type) {
        const div = document.createElement('div');
        div.className = `chat-message ${type}-message`;
        div.innerHTML = `<p>${text}</p>`;
        this.container.appendChild(div);
        this.container.scrollTop = this.container.scrollHeight;
        return div;
    }
};

document.addEventListener('DOMContentLoaded', () => CosmicChat.init());
