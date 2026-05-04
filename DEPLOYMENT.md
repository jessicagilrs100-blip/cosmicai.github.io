# CosmicAI - Guia de Deploy Permanente

Este guia explica como fazer o deploy permanente do CosmicAI com a IA integrada.

## Opção 1: Deploy no Vercel (Recomendado) ⭐

O Vercel é a plataforma ideal para este projeto, pois oferece:
- ✅ Serverless Functions (sem servidor para gerenciar)
- ✅ Deploy automático do GitHub
- ✅ HTTPS grátis
- ✅ CDN global para velocidade
- ✅ Variáveis de ambiente seguras

### Passos:

1. **Acesse o Vercel:**
   - Vá para https://vercel.com
   - Faça login com sua conta GitHub

2. **Importe o Repositório:**
   - Clique em "Add New..." → "Project"
   - Selecione o repositório `cosmicai.github.io`
   - Clique em "Import"

3. **Configure as Variáveis de Ambiente:**
   - Na seção "Environment Variables", adicione:
     - **OPENAI_API_KEY**: Sua chave de API da OpenAI (sk-proj-...)
     - **OPENAI_API_BASE**: `https://api.openai.com/v1` (ou deixe em branco para usar o padrão)
     - **OPENAI_MODEL**: `gpt-4.1-mini` (ou outro modelo suportado)

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build ser concluído
   - Seu site estará disponível em: `https://seu-projeto.vercel.app`

5. **Configure o Domínio Customizado (Opcional):**
   - Na aba "Settings" → "Domains"
   - Adicione seu domínio customizado
   - Configure os registros DNS conforme instruído

## Opção 2: Deploy no Netlify

1. **Acesse o Netlify:**
   - Vá para https://netlify.com
   - Faça login com sua conta GitHub

2. **Conecte o Repositório:**
   - Clique em "New site from Git"
   - Selecione GitHub e escolha o repositório

3. **Configure o Build:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Configure as Variáveis de Ambiente:**
   - Na aba "Site settings" → "Build & deploy" → "Environment"
   - Adicione as mesmas variáveis do Vercel

5. **Deploy:**
   - Clique em "Deploy site"
   - Seu site estará disponível em: `https://seu-site.netlify.app`

## Opção 3: Deploy em seu Próprio Servidor

Se preferir usar seu próprio servidor (VPS, AWS, DigitalOcean, etc.):

1. **Instale as Dependências:**
   ```bash
   npm install
   ```

2. **Build o Projeto:**
   ```bash
   npm run build
   ```

3. **Inicie o Servidor:**
   ```bash
   npm start
   ```

4. **Configure as Variáveis de Ambiente:**
   - Crie um arquivo `.env` com:
     ```
     OPENAI_API_KEY=sua_chave_aqui
     PORT=3000
     NODE_ENV=production
     ```

5. **Configure um Proxy Reverso (Nginx/Apache):**
   - Aponte seu domínio para o servidor Node.js
   - Configure SSL/HTTPS

## Estrutura do Projeto para Deploy

```
cosmicai.github.io/
├── api/
│   └── chat.js              # Serverless Function (Vercel/Netlify)
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── ai-chat.css
│   └── js/
│       ├── ai-chat-permanent.js  # Script do chat para produção
│       └── script.js
├── trends.html              # Página com o chat
├── index.html               # Página inicial
├── package.json             # Dependências
├── vercel.json              # Configuração do Vercel
└── vite.config.js           # Configuração do Vite
```

## Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `OPENAI_API_KEY` | Chave de API da OpenAI | `sk-proj-...` |
| `OPENAI_API_BASE` | URL base da API (opcional) | `https://api.openai.com/v1` |
| `OPENAI_MODEL` | Modelo de IA a usar | `gpt-4.1-mini` |
| `PORT` | Porta do servidor (apenas para deploy próprio) | `3000` |
| `NODE_ENV` | Ambiente de execução | `production` |

## Monitoramento e Manutenção

### Vercel:
- Acesse o dashboard do Vercel para ver logs
- Monitore o uso de Serverless Functions
- Configure alertas de erro

### Netlify:
- Acesse o dashboard do Netlify para ver logs
- Monitore o uso de bandwidth
- Configure webhooks para notificações

### Seu Servidor:
- Configure logs com PM2 ou systemd
- Use ferramentas como New Relic ou DataDog para monitoramento
- Configure backups automáticos

## Troubleshooting

### "API key not configured"
- Verifique se a variável `OPENAI_API_KEY` está configurada corretamente
- Certifique-se de que a chave não expirou

### "Chat não responde"
- Verifique os logs da plataforma de deploy
- Teste a API diretamente: `curl -X POST https://seu-site.com/api/chat -H "Content-Type: application/json" -d '{"message":"Olá","sessionId":"test"}'`

### "Erro 500"
- Verifique se a chave de API está válida
- Verifique se o modelo de IA especificado existe
- Consulte os logs para mais detalhes

## Próximos Passos

1. ✅ Faça o deploy em uma das plataformas acima
2. ✅ Configure seu domínio customizado
3. ✅ Teste o chat no site ao vivo
4. ✅ Configure monitoramento e alertas
5. ✅ Compartilhe o site com seus usuários!

## Suporte

Para dúvidas sobre:
- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com
- **OpenAI API**: https://platform.openai.com/docs

Sucesso no seu deploy! 🚀✨
