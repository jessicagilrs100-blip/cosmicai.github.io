// AI Chat Interface for CosmicAI - Manus Proxy Version
class AIChatBotManus {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.sessionId = this.generateSessionId();
        this.initChat();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    initChat() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        const checkElements = setInterval(() => {
            const sendBtn = document.getElementById("send-btn");
            const chatInput = document.getElementById("chat-input");

            if (sendBtn && chatInput) {
                sendBtn.onclick = () => this.sendMessage();
                chatInput.onkeypress = (e) => {
                    if (e.key === "Enter") this.sendMessage();
                };
                clearInterval(checkElements);
            }
        }, 500);
    }

    async sendMessage() {
        const input = document.getElementById("chat-input");
        const message = input.value.trim();

        if (!message || this.isLoading) return;

        this.addMessageToChat(message, "user");
        input.value = "";

        this.isLoading = true;
        this.showLoadingIndicator();

        try {
            const response = await this.getAIResponse(message);
            this.addMessageToChat(response, "bot");
        } catch (error) {
            console.error("Error getting AI response:", error);
            this.addMessageToChat(
                "Desculpe, houve um erro ao processar sua pergunta. Tente novamente em alguns momentos. ✨",
                "bot"
            );
        } finally {
            this.isLoading = false;
            this.removeLoadingIndicator();
        }
    }

    addMessageToChat(text, sender) {
        const messagesContainer = document.getElementById("chat-messages");
        if (!messagesContainer) return;

        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showLoadingIndicator() {
        const messagesContainer = document.getElementById("chat-messages");
        if (!messagesContainer) return;

        const loadingDiv = document.createElement("div");
        loadingDiv.className = "chat-message bot-message loading";
        loadingDiv.id = "loading-indicator";
        loadingDiv.innerHTML = "<div class=\"typing-indicator\"><span></span><span></span><span></span></div>";
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeLoadingIndicator() {
        const loading = document.getElementById("loading-indicator");
        if (loading) loading.remove();
    }

    async getAIResponse(userMessage) {
        try {
            // Usando o endpoint atualizado do servidor de IA
            const response = await fetch('https://8000-iowkzk6h9u3qd8bi5x5ua-0cc9ef00.us2.manus.computer/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: userMessage,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return data.message || "Desculpe, as estrelas estão em silêncio agora.";
        } catch (error) {
            console.error("API Error:", error);
            return "As estrelas estão um pouco distantes neste momento. Tente novamente em instantes. 🌙";
        }
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat when DOM is ready
if (typeof window !== "undefined") {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cosmicAIChat = new AIChatBotManus();
        });
    } else {
        window.cosmicAIChat = new AIChatBotManus();
    }
}
