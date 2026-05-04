/**
 * COSMIC AI - BACKEND WITH CORS FIX
 */

export default async function handler(req, res) {
  // Configuração de CORS para permitir acesso do GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Trata a requisição de pré-vôo (preflight) do navegador
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'CosmicAI API is online' });
  }

  const { message, lang = 'pt-BR' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(200).json({ message: "As estrelas estão sem energia. (API Key faltando na Vercel)" });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `Você é o CosmicAI, um assistente astrológico de luxo. Responda em ${lang}. Seja elegante, use emojis de estrelas e seja breve.` 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(200).json({ message: "O cosmos está instável agora. Tente novamente." });
    }

    return res.status(200).json({ message: data.choices[0].message.content });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
