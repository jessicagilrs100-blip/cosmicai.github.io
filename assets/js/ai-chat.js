const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    const loadingId = appendMessage('bot', '...');

    try {
        const lang = document.getElementById('language-select').value;
        // Usando URL relativa para que funcione tanto em produção quanto em preview
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, lang: lang })
        });

        const data = await response.json();
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        
        if (data.message) {
            appendMessage('bot', data.message);
        } else if (data.error) {
            appendMessage('bot', `Erro: ${data.error}`);
        } else {
            appendMessage('bot', 'Erro: Resposta inválida da API.');
        }
    } catch (err) {
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        appendMessage('bot', `Erro de Conexão: ${err.message}`);
    }
}

function appendMessage(role, text) {
    const div = document.createElement('div');
    const id = 'msg-' + Math.random().toString(36).substr(2, 9);
    div.className = `message ${role}`;
    div.id = id;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

if (sendBtn) sendBtn.addEventListener('click', sendMessage);
if (chatInput) chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
