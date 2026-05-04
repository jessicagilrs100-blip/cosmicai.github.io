// AI Chat Interface for CosmicAI - Permanent Deployment Version
class AIChatBotPermanent {
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
            // Call the Vercel Serverless Function
            // Chama o endpoint tRPC que agora está configurado no servidor real do Vercel
            const response = await fetch('https://cosmic-ai-horoscope.vercel.app/api/trpc/chat.send?batch=1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "0": { "json": { "message": userMessage } } })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            // O tRPC retorna os dados em um formato específico [ { result: { data: { json: { message: "..." } } } } ]
            return data[0]?.result?.data?.json?.message || "Desculpe, as estrelas estão em silêncio agora.";
        } catch (error) {
            console.error("API Error:", error);
            return this.generateFallbackResponse();
        }
    }

    generateFallbackResponse() {
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

// Initialize chat when DOM is ready
if (typeof window !== "undefined") {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cosmicAIChat = new AIChatBotPermanent();
        });
    } else {
        window.cosmicAIChat = new AIChatBotPermanent();
    }
}
