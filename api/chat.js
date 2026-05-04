export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message, lang = 'pt-BR' } = req.body;
    console.log('Received message:', message, 'lang:', lang);

    if (!process.env.OPENAI_API_KEY) {
        console.error('Missing OPENAI_API_KEY');
        return res.status(500).json({ error: 'API Key not configured' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Modelo muito mais barato e rápido
                messages: [
                    { 
                        role: 'system', 
                        content: `Você é o CosmicAI, um assistente de astrologia de luxo, místico e altamente preciso. 
                        Sua personalidade é elegante, empática e profunda. 
                        Você fornece horóscopos detalhados, insights sobre signos, compatibilidade amorosa e conselhos baseados nos movimentos celestiais.
                        Sempre responda no idioma: ${lang}. 
                        Mantenha um tom profissional, mas envolto em mistério cósmico.` 
                    },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500 // Limite para evitar consumo excessivo
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error('OpenAI Error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }
        return res.status(200).json({ message: data.choices[0].message.content });
    } catch (err) {
        console.error('Fetch Error:', err);
        return res.status(500).json({ error: 'Internal error' });
    }
}
