/**
 * COSMIC AI - NEW CLEAN BACKEND
 * Minimal and robust proxy for OpenAI
 */

export default async function handler(req, res) {
  // Simple CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') return res.status(200).json({ status: 'ready' });

  const { message, lang = 'pt-BR' } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a stable, fast model
        messages: [
          { 
            role: 'system', 
            content: `You are CosmicAI. Assist with astrology and horoscopes in ${lang}. Be elegant and brief.` 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI Error:', data);
      return res.status(200).json({ message: "Desculpe, o cosmos está instável. Verifique sua chave API." });
    }

    return res.status(200).json({ message: data.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}
