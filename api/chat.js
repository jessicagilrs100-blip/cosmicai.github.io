/**
 * CosmicAI - Backend API Proxy (Rebuilt)
 * Handles OpenAI requests securely on Vercel
 */

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, sessionId, lang } = req.body;

    if (!message || !sessionId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const systemPrompt = `You are CosmicAI, a luxury astrological assistant. 
    Personality: Wise, mysterious, elegant, and inspiring.
    Knowledge: Deep understanding of zodiac signs, birth charts, and planetary movements.
    Rule: Always respond in the language of the user (${lang || 'Portuguese'}).
    Tone: Poetic and encouraging. Use astrological emojis.
    Constraint: Max 3 paragraphs.`;

    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

        if (!apiKey) {
            return res.status(500).json({ message: "As estrelas precisam de uma chave para brilhar. (API Key missing)" });
        }

        const response = await fetch(`${apiBase}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('API Error:', data);
            return res.status(200).json({ 
                message: "O cosmos está em transição. Tente novamente em instantes. ✨" 
            });
        }

        return res.status(200).json({ 
            message: data.choices[0].message.content 
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
