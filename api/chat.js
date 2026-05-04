// Vercel Serverless Function for CosmicAI Chat
// This function handles all AI chat requests

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

// Store conversation history in memory (in production, use a database like Redis or MongoDB)
const conversationHistories = new Map();

// Clean up old sessions every hour
setInterval(() => {
    const now = Date.now();
    for (const [sessionId, data] of conversationHistories.entries()) {
        if (now - data.lastAccess > 3600000) { // 1 hour
            conversationHistories.delete(sessionId);
        }
    }
}, 3600000);

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        // Get or create conversation history for this session
        if (!conversationHistories.has(sessionId)) {
            conversationHistories.set(sessionId, {
                messages: [],
                lastAccess: Date.now()
            });
        }

        const sessionData = conversationHistories.get(sessionId);
        sessionData.lastAccess = Date.now();
        const history = sessionData.messages;

        // Add user message to history
        history.push({
            role: 'user',
            content: message
        });

        // Keep only last 20 messages to save tokens
        if (history.length > 20) {
            sessionData.messages = history.slice(-20);
        }

        // Call OpenAI-compatible API (Manus LLM Proxy or direct OpenAI)
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('OPENAI_API_KEY not configured');
            return res.status(500).json({ error: 'API key not configured' });
        }

        const apiBaseUrl = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
        
        const response = await fetch(`${apiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
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
            
            // Fallback response if API fails
            const fallbackResponses = [
                "As estrelas estão um pouco distantes neste momento, mas sinto sua energia. Tente novamente em alguns instantes. 🌙",
                "O universo está se reorganizando. Por favor, reformule sua pergunta e as constelações responderão. ⭐",
                "Há interferência cósmica no momento. Aguarde um instante e tente novamente. ✨",
                "A energia está fluindo, mas preciso de um momento para me conectar com o cosmos. Tente novamente. 🌟",
                "Os planetas estão em movimento. Sua pergunta será respondida em breve. 🪐"
            ];
            const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
            return res.status(200).json({ message: fallbackResponses[randomIndex] });
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Add AI response to history
        history.push({
            role: 'assistant',
            content: aiMessage
        });

        return res.status(200).json({ message: aiMessage });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
