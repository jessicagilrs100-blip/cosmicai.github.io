// AI Chat Interface for CosmicAI - Real AI Integration with Secure Backend
class AIChatBotAPI {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.conversationHistory = [];
        this.sessionId = this.generateSessionId();
        this.apiEndpoint = this.getAPIEndpoint();
        this.initChat();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    getAPIEndpoint() {
        // Em desenvolvimento, use localhost:8000
        // Em produção, configure a URL do seu servidor
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000/api/chat';
        }
        // Para produção, você pode usar um serviço como Vercel, Heroku, ou seu próprio servidor
        // Configure a URL do seu servidor aqui
        return window.location.origin + ':8000/api/chat';
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
            // Fazer requisição ao servidor backend seguro
            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            return data.message || "Desculpe, não consegui processar sua pergunta.";
        } catch (error) {
            console.error("API Error:", error);
            return this.generateFallbackResponse(userMessage);
        }
    }

    generateFallbackResponse(userMessage) {
        const fallbackResponses = [
            "As estrelas estão um pouco distantes neste momento, mas sinto sua energia. Tente novamente em alguns instantes. 🌙",
            "O universo está se reorganizando. Por favor, reformule sua pergunta e as constelações responderão. ⭐",
            "Há interferência cósmica no momento. Aguarde um instante e tente novamente. ✨",
            "A energia está fluindo, mas preciso de um momento para me conectar com o cosmos. Tente novamente. 🌟",
            "Os planetas estão em movimento. Sua pergunta será respondida em breve. 🪐"
        ];
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        return fallbackResponses[randomIndex];
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat
if (typeof window !== "undefined") {
    window.cosmicAIChat = new AIChatBotAPI();
}
