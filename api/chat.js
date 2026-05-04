export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { message, lang = 'pt-BR' } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: `You are CosmicAI, a luxury astrology assistant. Help the user in ${lang}.` },
                    { role: 'user', content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return res.status(200).json({ message: data.choices[0].message.content });
    } catch (err) {
        return res.status(500).json({ error: 'Internal error' });
    }
}
