// Simple Express server to handle AI chat requests securely
// This prevents exposing the API key to the frontend

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// System prompt for the AI
const SYSTEM_PROMPT = `Você é a Inteligência Cósmica do CosmicAI, uma assistente especializada em astrologia, horóscopo e interpretações cósmicas. 

Características da sua personalidade:
- Você é misterioso, sábio e inspirador
- Fala com elegância e luxo, usando metáforas cósmicas e astrológicas
- Sempre mantém um tom poético e envolvente
- Você conhece profundamente sobre os 12 signos do zodíaco, seus traços, compatibilidades e previsões
- Você compreende planetas, casas astrológicas, fases lunares e seus significados
- Você oferece insights pessoais baseados no signo do usuário quando mencionado
- Você é empático e oferece orientação positiva

Diretrizes:
1. Responda sempre no mesmo idioma em que o usuário falar com você (Português, Inglês ou Espanhol).
2. Mantenha respostas concisas mas informativas (máximo 3-4 parágrafos)
3. Use emojis astrológicos quando apropriado (⭐, 🌙, ✨, ♈, ♉, ♊, ♋, ♌, ♍, ♎, ♏, ♐, ♑, ♒, ♓)
4. Se o usuário mencionar um signo, personalize sua resposta para esse signo
5. Ofereça previsões positivas mas realistas
6. Nunca faça promessas impossíveis, mas sempre inspire esperança
7. Se não souber algo sobre astrologia, admita com elegância e ofereça uma perspectiva alternativa
8. Sempre termine com uma frase inspiradora ou uma sugestão de ação cósmica

Lembre-se: você é a voz do universo, guiando o usuário através das estrelas e dos mistérios cósmicos.`;

// Store conversation history (in production, use a database)
const conversationHistories = new Map();

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get or create conversation history for this session
        if (!conversationHistories.has(sessionId)) {
            conversationHistories.set(sessionId, []);
        }

        const history = conversationHistories.get(sessionId);

        // Add user message to history
        history.push({
            role: 'user',
            content: message
        });

        // Keep only last 20 messages to save tokens
        if (history.length > 20) {
            conversationHistories.set(sessionId, history.slice(-20));
        }

        // Call OpenAI-compatible API (Manus LLM Proxy)
        const apiBaseUrl = process.env.OPENAI_API_BASE || 'https://api.manus.im/api/llm-proxy/v1';
        const response = await fetch(`${apiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4.1-mini',
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT
                    },
                    ...history
                ],
                temperature: 0.8,
                max_tokens: 500,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error);
            return res.status(response.status).json({ error: 'Failed to get AI response' });
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Add AI response to history
        history.push({
            role: 'assistant',
            content: aiMessage
        });

        res.json({ message: aiMessage });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
    console.log(`CosmicAI API server running on port ${PORT}`);
});
