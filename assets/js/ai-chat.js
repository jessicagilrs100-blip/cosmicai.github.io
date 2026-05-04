// AI Chat Interface for CosmicAI - Integrated Version with Expanded Knowledge Base
class AIChatBot {
    constructor() {
        this.messages = [];
        this.isLoading = false;
        this.initChat();
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
                "Desculpe, houve um erro ao processar sua pergunta. Tente novamente.",
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

    // --- EXPANDED ASTROLOGICAL KNOWLEDGE BASE AND RESPONSE GENERATION ---
    async getAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        const signMatch = this.detectZodiacSign(lowerMessage);
        const topicMatch = this.detectTopic(lowerMessage);

        // Simulate a slight delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (signMatch && topicMatch) {
            return this.generateSignTopicResponse(signMatch, topicMatch);
        } else if (signMatch) {
            return this.generateSignOverview(signMatch);
        } else if (topicMatch) {
            return this.generateGeneralTopicResponse(topicMatch);
        } else {
            return this.generateGenericResponse();
        }
    }

    detectZodiacSign(message) {
        const signs = {
            aries: ["áries", "aries"],
            taurus: ["touro"],
            gemini: ["gêmeos", "gemeos"],
            cancer: ["câncer", "cancer"],
            leo: ["leão", "leao"],
            virgo: ["virgem"],
            libra: ["libra"],
            scorpio: ["escorpião", "escorpiao"],
            sagittarius: ["sagitário", "sagitario"],
            capricorn: ["capricórnio", "capricornio"],
            aquarius: ["aquário", "aquario"],
            pisces: ["peixes"],
        };

        for (const sign in signs) {
            for (const keyword of signs[sign]) {
                if (message.includes(keyword)) {
                    return sign;
                }
            }
        }
        return null;
    }

    detectTopic(message) {
        const topics = {
            love: ["amor", "relacionamento", "paixão", "namoro"],
            career: ["trabalho", "carreira", "emprego", "dinheiro", "finanças", "negócios"],
            health: ["saúde", "bem-estar", "energia"],
            luck: ["sorte", "oportunidade", "destino"],
            today: ["hoje", "dia", "agora"],
            week: ["semana"],
            month: ["mês", "mes"],
            year: ["ano"],
            compatibility: ["compatibilidade", "combinar"],
            astralMap: ["mapa astral"],
            moon: ["lua"],
            mercury: ["mercúrio", "mercurio"],
            venus: ["vênus", "venus"],
            mars: ["marte"],
            jupiter: ["júpiter", "jupiter"],
            saturn: ["saturno"],
            general: ["previsão", "horóscopo", "o que me espera"],
        };

        for (const topic in topics) {
            for (const keyword of topics[topic]) {
                if (message.includes(keyword)) {
                    return topic;
                }
            }
        }
        return null;
    }

    astrologicalData = {
        aries: {
            name: "Áries",
            emoji: "♈",
            dates: "21 Mar - 19 Abr",
            element: "Fogo",
            modality: "Cardinal",
            ruler: "Marte",
            traits: {
                positive: ["Corajoso", "Pioneiro", "Energético", "Líder", "Entusiasmado", "Independente"],
                negative: ["Impulsivo", "Temperamental", "Egoísta", "Competitivo demais", "Inquieto"],
            },
            love: [
                "Seu amor é intenso e apaixonado. Busque alguém que acompanhe seu ritmo e valorize sua iniciativa.",
                "A paixão ariana é contagiante. Cuidado para não sufocar o parceiro com sua intensidade. Dê espaço e valorize a individualidade.",
                "No amor, você é direto e honesto. Evite a impaciência e aprenda a ouvir mais o coração do outro.",
                "A aventura é a chave para o seu coração. Um relacionamento dinâmico e cheio de novas experiências te fará feliz.",
                "Sua energia no amor é magnética. Use-a para construir, não para dominar. A parceria é fundamental.",
            ],
            career: [
                "Sua natureza de liderança brilha em posições que exigem iniciativa e coragem. Não tenha medo de inovar.",
                "No trabalho, você é um visionário. Cuidado com a impulsividade em decisões importantes. Planeje antes de agir.",
                "Sua ambição te leva longe. Busque desafios que estimulem sua mente e seu espírito competitivo de forma saudável.",
                "A rotina pode ser um inimigo. Procure carreiras que ofereçam variedade e a chance de estar sempre aprendendo e crescendo.",
                "Sua determinação é um trunfo. Use-a para superar obstáculos e inspirar sua equipe. O sucesso é seu por direito.",
            ],
            health: [
                "Sua vitalidade é alta, mas o estresse pode afetar sua cabeça. Pratique exercícios físicos e técnicas de relaxamento.",
                "A energia ariana precisa ser canalizada. Esportes e atividades ao ar livre são ótimos para manter o equilíbrio.",
                "Cuidado com a impaciência, que pode levar a acidentes. Mantenha a calma e a atenção no presente.",
                "Sua saúde mental é tão importante quanto a física. Busque hobbies que aliviem a tensão e promovam a paz interior.",
                "A alimentação balanceada e o sono adequado são essenciais para sustentar sua energia inesgotável. Cuide-se!",
            ],
            finance: [
                "Você é proativo com suas finanças, mas pode ser impulsivo em gastos. Pense duas vezes antes de grandes investimentos.",
                "Sua coragem se estende às finanças. Não tenha medo de arriscar, mas faça-o com planejamento e pesquisa.",
                "A independência financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Evite dívidas desnecessárias. Sua natureza otimista pode às vezes ignorar os riscos. Seja prudente.",
                "Sua capacidade de iniciar projetos pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua energia está em alta. É um excelente dia para iniciar projetos e tomar a frente em situações.",
                "Aproveite o dia para resolver pendências. Sua determinação ariana fará a diferença.",
                "Um desafio pode surgir, mas sua coragem natural te ajudará a superá-lo com maestria.",
                "Foque em suas metas pessoais. A energia de hoje favorece a autoafirmação e a conquista.",
                "Cuidado com a impulsividade em decisões importantes. Respire fundo antes de agir.",
            ],
            week: [
                "Esta semana, sua liderança será testada. Mostre sua força e inspire aqueles ao seu redor.",
                "Aproveite a semana para focar em seus objetivos de carreira. Novas oportunidades podem surgir.",
                "Sua paixão estará em evidência. Ótimo período para reacender a chama no amor ou iniciar um novo romance.",
                "Cuidado com o excesso de trabalho. Encontre tempo para relaxar e recarregar suas energias.",
                "A semana pede ação e iniciativa. Não espere que as coisas aconteçam, faça-as acontecer!",
            ],
            month: [
                "Este mês, o universo te convida a explorar novos horizontes. Não se prenda ao passado.",
                "Sua criatividade estará em alta. Use-a para inovar em todas as áreas da sua vida.",
                "Um período de autodescoberta. Questione suas crenças e busque o que realmente te faz feliz.",
                "As finanças podem exigir mais atenção. Organize seus gastos e planeje o futuro com sabedoria.",
                "Este é um mês para focar em seu crescimento pessoal. Invista em cursos e novas experiências.",
            ],
            year: [
                "Este ano promete ser de grandes transformações e conquistas para você, Áries. Prepare-se para o novo!",
                "Sua energia estará renovada. Use-a para alcançar seus sonhos mais ambiciosos.",
                "Um ano para fortalecer seus relacionamentos e construir pontes. A comunicação será chave.",
                "Desafios podem surgir, mas sua resiliência ariana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar. Não tenha medo de mostrar ao mundo todo o seu potencial.",
            ],
        },
        taurus: {
            name: "Touro",
            emoji: "♉",
            dates: "20 Abr - 20 Mai",
            element: "Terra",
            modality: "Fixo",
            ruler: "Vênus",
            traits: {
                positive: ["Estável", "Confiável", "Sensual", "Paciente", "Determinado", "Prático"],
                negative: ["Teimoso", "Possessivo", "Materialista", "Inflexível", "Preguiçoso"],
            },
            love: [
                "Seu amor é leal e duradouro. Busque segurança e estabilidade em seus relacionamentos.",
                "A sensualidade taurina é um charme. Demonstre seu afeto através de gestos e carinhos.",
                "No amor, você valoriza a fidelidade. Evite o ciúme e confie mais no seu parceiro.",
                "Um relacionamento sólido e confortável é o seu ideal. Construa uma base de confiança e respeito mútuo.",
                "Sua dedicação no amor é admirável. Lembre-se de que o amor também precisa de novidade e espontaneidade.",
            ],
            career: [
                "Sua persistência e confiabilidade são valorizadas no ambiente de trabalho. Busque estabilidade e reconhecimento.",
                "No trabalho, você é prático e eficiente. Cuidado para não se apegar demais à rotina. Esteja aberto a mudanças.",
                "Sua busca por segurança financeira te impulsiona. Invista em carreiras que ofereçam solidez e crescimento.",
                "A paciência é sua virtude. Use-a para construir projetos de longo prazo e alcançar o sucesso duradouro.",
                "Sua ética de trabalho é impecável. Continue se dedicando e colherá os frutos do seu esforço.",
            ],
            health: [
                "Sua saúde é geralmente robusta, mas o estresse pode afetar sua garganta e pescoço. Cuide da sua voz e relaxe.",
                "Aprecie os prazeres da vida, mas com moderação. Uma alimentação equilibrada é fundamental para seu bem-estar.",
                "A natureza te acalma. Passe mais tempo ao ar livre e conecte-se com a terra para recarregar suas energias.",
                "Cuidado com a teimosia em relação a hábitos não saudáveis. Esteja aberto a novas rotinas e práticas.",
                "O descanso é essencial para sua recuperação. Priorize o sono e momentos de tranquilidade para manter o equilíbrio.",
            ],
            finance: [
                "Você é cauteloso e prático com o dinheiro. Sua busca por segurança financeira é uma prioridade.",
                "No campo financeiro, você é um bom poupador. Cuidado para não ser excessivamente apegado aos bens materiais.",
                "Invista em bens duráveis e imóveis. Sua intuição para investimentos sólidos é um diferencial.",
                "Evite gastos impulsivos com luxos desnecessários. Priorize o que realmente importa para sua segurança.",
                "Sua paciência e persistência podem levar a grandes ganhos a longo prazo. Confie no seu planejamento.",
            ],
            today: [
                "Hoje, a estabilidade é sua aliada. Concentre-se em tarefas que exigem paciência e atenção aos detalhes.",
                "Um dia favorável para cuidar de suas finanças e organizar seus bens. A praticidade taurina estará em alta.",
                "Aproveite para desfrutar dos pequenos prazeres da vida. Um bom jantar ou um momento de relaxamento farão bem.",
                "Cuidado com a teimosia em discussões. Esteja aberto a diferentes pontos de vista.",
                "Foque em construir algo sólido e duradouro. A energia de hoje favorece a concretização de projetos.",
            ],
            week: [
                "Esta semana, sua busca por segurança será recompensada. Boas notícias podem surgir no campo financeiro.",
                "Aproveite para fortalecer seus laços afetivos. O amor e a família estarão em destaque.",
                "No trabalho, sua dedicação será notada. Continue com seu ritmo constante e colha os frutos.",
                "Cuidado com a inércia. A semana pede um pouco mais de movimento e flexibilidade.",
                "Aproveite para se conectar com a natureza e recarregar suas energias. Momentos de paz são essenciais.",
            ],
            month: [
                "Este mês, o universo te convida a cultivar a paciência e a persistência. Grandes resultados virão com o tempo.",
                "Sua sensualidade estará em alta. Ótimo período para o amor e para cuidar da sua autoestima.",
                "As finanças podem exigir um planejamento mais detalhado. Organize seus gastos e invista com sabedoria.",
                "Um mês para fortalecer suas raízes e construir uma base sólida para o futuro.",
                "Cuidado com a zona de conforto. Esteja aberto a novas experiências e desafios.",
            ],
            year: [
                "Este ano promete ser de consolidação e crescimento para você, Touro. Colha os frutos do seu trabalho.",
                "Sua busca por segurança será atendida. Invista em projetos de longo prazo e construa seu legado.",
                "Um ano para fortalecer seus relacionamentos e aprofundar seus laços afetivos.",
                "Desafios podem surgir, mas sua resiliência taurina te fará superá-los com maestria.",
                "Este é o seu ano para desfrutar da vida e colher as recompensas de seus esforços. Celebre suas conquistas!",
            ],
        },
        gemini: {
            name: "Gêmeos",
            emoji: "♊",
            dates: "21 Mai - 20 Jun",
            element: "Ar",
            modality: "Mutável",
            ruler: "Mercúrio",
            traits: {
                positive: ["Comunicativo", "Curioso", "Adaptável", "Inteligente", "Versátil", "Jovial"],
                negative: ["Inconstante", "Superficial", "Ansioso", "Indeciso", "Fofoqueiro"],
            },
            love: [
                "Seu amor é leve e divertido. Busque um parceiro que estimule sua mente e sua curiosidade.",
                "A comunicação é a chave para o seu coração. Diálogos inteligentes e bom humor são essenciais.",
                "No amor, você precisa de liberdade e espaço. Evite a rotina e busque sempre a novidade.",
                "Um relacionamento dinâmico e cheio de trocas intelectuais te fará feliz. Compartilhe suas ideias.",
                "Sua versatilidade no amor é um charme. Cuidado para não parecer inconstante. Demonstre seu compromisso.",
            ],
            career: [
                "Sua mente ágil e sua capacidade de comunicação são trunfos no trabalho. Busque carreiras que exijam versatilidade.",
                "No trabalho, você é um excelente comunicador. Cuidado com a dispersão e o excesso de tarefas. Foco é importante.",
                "Sua curiosidade te leva a aprender sempre. Invista em áreas que permitam constante aprendizado e inovação.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitas interações.",
                "Sua capacidade de adaptação é um diferencial. Use-a para se destacar em diferentes projetos e equipes.",
            ],
            health: [
                "Sua mente está sempre ativa, o que pode gerar ansiedade. Pratique meditação e exercícios de respiração.",
                "A comunicação é importante para sua saúde. Expresse seus sentimentos e evite guardar mágoas.",
                "Cuidado com o sistema nervoso e respiratório. Evite o excesso de informações e o estresse.",
                "A variedade é a chave para sua saúde. Experimente diferentes atividades físicas e hobbies.",
                "Mantenha sua mente ativa com leituras e novos aprendizados. Isso contribui para seu bem-estar geral.",
            ],
            finance: [
                "Você é inteligente com o dinheiro, mas pode ser inconstante em seus gastos. Planeje suas finanças com cuidado.",
                "Sua versatilidade pode abrir portas para diferentes fontes de renda. Explore novas oportunidades.",
                "Cuidado com investimentos impulsivos. Pesquise e analise antes de tomar decisões financeiras.",
                "A comunicação é importante em suas finanças. Negocie e busque as melhores condições para seus investimentos.",
                "Sua mente ágil pode encontrar soluções criativas para seus problemas financeiros. Confie em sua inteligência.",
            ],
            today: [
                "Hoje, sua mente estará mais ágil e comunicativa. Ótimo dia para interações sociais e aprendizado.",
                "Aproveite para expressar suas ideias e opiniões. Sua voz será ouvida e valorizada.",
                "Cuidado com a dispersão. Tente focar em uma tarefa por vez para evitar a sobrecarga.",
                "Um dia favorável para resolver problemas que exigem raciocínio rápido e criatividade.",
                "Esteja aberto a novas informações e perspectivas. O universo tem muito a te ensinar hoje.",
            ],
            week: [
                "Esta semana, sua comunicação estará em alta. Ótimo período para apresentações e negociações.",
                "Aproveite para aprender algo novo. Cursos e leituras serão muito benéficos.",
                "Cuidado com a ansiedade. Encontre momentos de tranquilidade para equilibrar sua mente.",
                "Sua versatilidade será um trunfo no trabalho. Esteja aberto a diferentes projetos e desafios.",
                "A semana pede mais interação social. Conecte-se com amigos e familiares.",
            ],
            month: [
                "Este mês, o universo te convida a explorar sua curiosidade e sede de conhecimento. Não se limite!",
                "Sua mente estará borbulhando de ideias. Use-as para inovar e criar coisas novas.",
                "Um período para fortalecer seus laços sociais e ampliar sua rede de contatos.",
                "Cuidado com a inconstância em seus projetos. Mantenha o foco para alcançar seus objetivos.",
                "Este é um mês para se expressar e compartilhar suas ideias com o mundo. Sua voz importa!",
            ],
            year: [
                "Este ano promete ser de muito movimento e aprendizado para você, Gêmeos. Prepare-se para novas experiências!",
                "Sua mente estará mais afiada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um ano para fortalecer seus relacionamentos e construir pontes. A comunicação será chave.",
                "Desafios podem surgir, mas sua adaptabilidade geminiana te fará superá-los com facilidade.",
                "Este é o seu ano para se expressar e compartilhar seus talentos com o mundo. Brilhe!",
            ],
        },
        cancer: {
            name: "Câncer",
            emoji: "♋",
            dates: "21 Jun - 22 Jul",
            element: "Água",
            modality: "Cardinal",
            ruler: "Lua",
            traits: {
                positive: ["Emocional", "Protetor", "Intuitivo", "Leal", "Nutridor", "Sensível"],
                negative: ["Temperamental", "Melancólico", "Carente", "Manipulador", "Rancoroso"],
            },
            love: [
                "Seu amor é profundo e acolhedor. Busque um parceiro que valorize sua sensibilidade e seu carinho.",
                "A lealdade canceriana é um tesouro. Demonstre seu afeto através de gestos de cuidado e proteção.",
                "No amor, você precisa de segurança emocional. Evite o ciúme e confie mais no seu parceiro.",
                "Um relacionamento que ofereça um lar e um porto seguro é o seu ideal. Construa uma base de amor e cumplicidade.",
                "Sua intuição no amor é aguçada. Confie em seus sentimentos e siga seu coração.",
            ],
            career: [
                "Sua natureza protetora e intuitiva brilha em carreiras que envolvem cuidado e apoio. Você é um excelente cuidador.",
                "No trabalho, você é dedicado e atencioso. Cuidado para não absorver demais as emoções do ambiente. Proteja sua energia.",
                "Sua criatividade é um diferencial. Invista em áreas que permitam expressar sua sensibilidade e imaginação.",
                "A segurança é importante para você. Busque ambientes de trabalho que ofereçam estabilidade e um bom clima.",
                "Sua capacidade de nutrir e apoiar os outros é um trunfo. Use-a para construir equipes fortes e harmoniosas.",
            ],
            health: [
                "Suas emoções afetam diretamente sua saúde. Busque atividades que promovam o equilíbrio emocional, como yoga e meditação.",
                "Cuidado com o estômago e o sistema digestório. Uma alimentação leve e balanceada é fundamental.",
                "A água te acalma. Banhos relaxantes e momentos perto do mar ou rios são terapêuticos para você.",
                "Evite guardar mágoas e ressentimentos. Expresse seus sentimentos de forma saudável para evitar somatizações.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é cauteloso com o dinheiro e busca segurança para sua família. Suas finanças são bem administradas.",
                "Sua intuição pode te guiar em bons investimentos. Confie em seus pressentimentos, mas com análise.",
                "Cuidado com gastos emocionais. Busque o equilíbrio entre o prazer e a responsabilidade financeira.",
                "A segurança do lar é uma prioridade. Invista em seu conforto e bem-estar familiar.",
                "Sua capacidade de poupar e planejar o futuro é um trunfo. Construa uma base sólida para sua segurança.",
            ],
            today: [
                "Hoje, suas emoções estarão mais afloradas. Aproveite para se conectar com sua intuição e seus sentimentos.",
                "Um dia favorável para cuidar do lar e da família. Demonstre seu carinho e afeto.",
                "Cuidado com a melancolia. Busque atividades que te tragam alegria e bem-estar.",
                "Sua sensibilidade será um trunfo em suas interações. Ouça com o coração e ofereça apoio.",
                "Foque em sua segurança emocional. Evite situações que te deixem vulnerável.",
            ],
            week: [
                "Esta semana, suas emoções estarão em destaque. Aproveite para se reconectar com seus sentimentos mais profundos.",
                "A família e o lar serão o centro das atenções. Dedique tempo aos seus entes queridos.",
                "No trabalho, sua intuição será um guia. Confie em seus pressentimentos e siga sua voz interior.",
                "Cuidado com a carência. Busque o equilíbrio entre dar e receber afeto.",
                "A semana pede mais cuidado com sua saúde emocional. Pratique o autocuidado e o relaxamento.",
            ],
            month: [
                "Este mês, o universo te convida a fortalecer seus laços familiares e a cuidar do seu lar. Seu porto seguro.",
                "Sua intuição estará mais aguçada do que nunca. Confie em seus pressentimentos e siga sua voz interior.",
                "Um período para se reconectar com suas raízes e sua história. Valorize suas origens.",
                "Cuidado com a manipulação emocional. Proteja sua energia e seus sentimentos.",
                "Este é um mês para nutrir sua alma e seu corpo. Invista em seu bem-estar e em momentos de paz.",
            ],
            year: [
                "Este ano promete ser de grandes transformações emocionais e familiares para você, Câncer. Prepare-se para o novo!",
                "Sua intuição será seu maior guia. Confie em seus pressentimentos e siga seu coração.",
                "Um ano para fortalecer seus laços familiares e construir um lar ainda mais acolhedor.",
                "Desafios podem surgir, mas sua resiliência canceriana te fará superá-los com facilidade.",
                "Este é o seu ano para se reconectar com sua essência e nutrir sua alma. Brilhe com sua luz interior!",
            ],
        },
        leo: {
            name: "Leão",
            emoji: "♌",
            dates: "23 Jul - 22 Ago",
            element: "Fogo",
            modality: "Fixo",
            ruler: "Sol",
            traits: {
                positive: ["Generoso", "Leal", "Criativo", "Confiante", "Entusiasmado", "Dramático"],
                negative: ["Arrogante", "Vaidoso", "Dominador", "Teimoso", "Egocêntrico"],
            },
            love: [
                "Seu amor é grandioso e dramático. Busque um parceiro que admire sua luz e celebre suas conquistas.",
                "A paixão leonina é contagiante. Demonstre seu afeto com gestos grandiosos e declarações de amor.",
                "No amor, você precisa de admiração e reconhecimento. Evite o orgulho e aprenda a compartilhar o palco.",
                "Um relacionamento que ofereça brilho e aventura é o seu ideal. Compartilhe seus sonhos e conquistas.",
                "Sua lealdade no amor é inabalável. Cuidado para não ser possessivo. Dê espaço e confie no seu parceiro.",
            ],
            career: [
                "Sua liderança natural e sua criatividade brilham em posições de destaque. Você nasceu para brilhar.",
                "No trabalho, você é um inspirador. Cuidado com a arrogância e o desejo de ser sempre o centro das atenções.",
                "Sua ambição te leva a grandes conquistas. Busque carreiras que permitam expressar sua criatividade e seu talento.",
                "A rotina pode ser um inimigo. Procure ambientes de trabalho dinâmicos e com muitas oportunidades de brilhar.",
                "Sua generosidade é um trunfo. Use-a para motivar sua equipe e construir um ambiente de trabalho positivo.",
            ],
            health: [
                "Sua vitalidade é alta, mas o estresse pode afetar seu coração e sua coluna. Pratique exercícios e cuide da sua postura.",
                "A alegria é sua melhor medicina. Busque atividades que te tragam prazer e bem-estar.",
                "Cuidado com o excesso de festas e a vida noturna. Equilibre o lazer com o descanso.",
                "Sua autoestima é fundamental para sua saúde. Cuide da sua imagem e se sinta bem consigo mesmo.",
                "A alimentação balanceada e o sono adequado são essenciais para sustentar sua energia inesgotável. Cuide-se!",
            ],
            finance: [
                "Você é generoso com o dinheiro, mas pode ser impulsivo em gastos com luxos. Planeje suas finanças com cuidado.",
                "Sua confiança pode te guiar em bons investimentos. Acredite em seu potencial, mas com análise.",
                "Cuidado com a vaidade em suas finanças. Evite gastos desnecessários para impressionar os outros.",
                "A independência financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de liderar projetos pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua criatividade estará em alta. É um excelente dia para expressar sua arte e seus talentos.",
                "Aproveite para brilhar e ser o centro das atenções. Sua luz leonina será notada.",
                "Cuidado com o orgulho. Esteja aberto a ouvir os outros e a compartilhar o palco.",
                "Um dia favorável para o amor e para demonstrar seu afeto. Surpreenda quem você ama.",
                "Foque em suas metas pessoais. A energia de hoje favorece a autoafirmação e a conquista.",
            ],
            week: [
                "Esta semana, sua liderança será reconhecida. Assuma a frente em projetos e inspire sua equipe.",
                "Aproveite para cuidar da sua imagem e da sua autoestima. Sinta-se bem consigo mesmo.",
                "Cuidado com a arrogância. Mantenha a humildade e a generosidade em suas interações.",
                "Sua paixão estará em evidência. Ótimo período para reacender a chama no amor ou iniciar um novo romance.",
                "A semana pede mais criatividade e expressão. Use seus talentos para inovar e surpreender.",
            ],
            month: [
                "Este mês, o universo te convida a brilhar e a mostrar ao mundo todo o seu potencial. Não se esconda!",
                "Sua criatividade estará borbulhando de ideias. Use-as para inovar em todas as áreas da sua vida.",
                "Um período para fortalecer seus relacionamentos e construir pontes. A comunicação será chave.",
                "Cuidado com a vaidade. Mantenha o foco no que realmente importa e no seu crescimento pessoal.",
                "Este é um mês para celebrar suas conquistas e desfrutar da vida. Você merece!",
            ],
            year: [
                "Este ano promete ser de muito brilho e reconhecimento para você, Leão. Prepare-se para o sucesso!",
                "Sua criatividade estará em alta. Use-a para inovar e deixar sua marca no mundo.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua força leonina te fará superá-los com facilidade.",
                "Este é o seu ano para mostrar ao mundo todo o seu potencial e inspirar aqueles ao seu redor. Brilhe!",
            ],
        },
        virgo: {
            name: "Virgem",
            emoji: "♍",
            dates: "23 Ago - 22 Set",
            element: "Terra",
            modality: "Mutável",
            ruler: "Mercúrio",
            traits: {
                positive: ["Analítico", "Organizado", "Prático", "Diligente", "Prestativo", "Modesto"],
                negative: ["Crítico", "Perfeccionista", "Ansioso", "Hipocondríaco", "Exigente"],
            },
            love: [
                "Seu amor é prático e dedicado. Busque um parceiro que valorize sua atenção aos detalhes e seu cuidado.",
                "A dedicação virginiana é um presente. Demonstre seu afeto através de atos de serviço e apoio.",
                "No amor, você busca a perfeição. Evite a crítica excessiva e aprenda a aceitar as imperfeições do outro.",
                "Um relacionamento que ofereça estabilidade e rotina é o seu ideal. Construa uma base de confiança e respeito mútuo.",
                "Sua inteligência no amor é um charme. Use-a para resolver problemas e construir um relacionamento sólido.",
            ],
            career: [
                "Sua atenção aos detalhes e sua organização são trunfos no trabalho. Você é um excelente analista.",
                "No trabalho, você é eficiente e dedicado. Cuidado com o perfeccionismo excessivo. Aprenda a delegar.",
                "Sua busca por excelência te impulsiona. Invista em carreiras que exijam precisão e método.",
                "A rotina e a organização são importantes para você. Busque ambientes de trabalho estruturados e com clareza de funções.",
                "Sua capacidade de resolver problemas é um diferencial. Use-a para otimizar processos e melhorar resultados.",
            ],
            health: [
                "Sua mente está sempre ativa, o que pode gerar ansiedade. Pratique técnicas de relaxamento e cuide da sua alimentação.",
                "Cuidado com o sistema digestório e nervoso. Uma alimentação saudável e o controle do estresse são fundamentais.",
                "A natureza te acalma. Passe mais tempo ao ar livre e conecte-se com a terra para recarregar suas energias.",
                "Evite a autocrítica excessiva. Seja gentil consigo mesmo e celebre suas pequenas vitórias.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é organizado e cauteloso com o dinheiro. Suas finanças são bem administradas e planejadas.",
                "Sua atenção aos detalhes pode te guiar em bons investimentos. Pesquise e analise antes de tomar decisões.",
                "Cuidado com o perfeccionismo em suas finanças. Não se prenda a pequenos detalhes e perca grandes oportunidades.",
                "A segurança financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de planejar e economizar é um trunfo. Construa uma base sólida para sua segurança.",
            ],
            today: [
                "Hoje, sua mente estará mais analítica e organizada. Ótimo dia para resolver problemas e planejar o futuro.",
                "Aproveite para cuidar dos detalhes e organizar sua vida. A praticidade virginiana estará em alta.",
                "Cuidado com a autocrítica excessiva. Seja gentil consigo mesmo e celebre suas pequenas vitórias.",
                "Um dia favorável para o trabalho e para aprimorar suas habilidades. Busque a excelência.",
                "Foque em sua saúde e bem-estar. Cuide do seu corpo e da sua mente.",
            ],
            week: [
                "Esta semana, sua organização será um trunfo. Planeje suas tarefas e execute-as com precisão.",
                "Aproveite para aprimorar suas habilidades e conhecimentos. Cursos e leituras serão muito benéficos.",
                "Cuidado com a ansiedade. Encontre momentos de tranquilidade para equilibrar sua mente.",
                "Sua dedicação será notada no trabalho. Continue com seu ritmo constante e colha os frutos.",
                "A semana pede mais cuidado com sua saúde. Priorize o descanso e uma alimentação equilibrada.",
            ],
            month: [
                "Este mês, o universo te convida a organizar sua vida e a buscar a perfeição em tudo o que faz. Não se contente com menos!",
                "Sua mente estará mais afiada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com o perfeccionismo excessivo. Aprenda a delegar e a confiar nos outros.",
                "Este é um mês para cuidar da sua saúde e do seu bem-estar. Invista em você!",
            ],
            year: [
                "Este ano promete ser de muito trabalho e conquistas para você, Virgem. Prepare-se para o sucesso!",
                "Sua organização e atenção aos detalhes serão seus maiores trunfos. Use-os para alcançar seus objetivos.",
                "Um ano para aprimorar suas habilidades e conhecimentos. Invista em seu desenvolvimento pessoal e profissional.",
                "Desafios podem surgir, mas sua resiliência virginiana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua inteligência e sua capacidade de servir. Deixe sua marca no mundo!",
            ],
        },
        libra: {
            name: "Libra",
            emoji: "♎",
            dates: "23 Set - 22 Out",
            element: "Ar",
            modality: "Cardinal",
            ruler: "Vênus",
            traits: {
                positive: ["Justo", "Diplomático", "Charmoso", "Sociável", "Equilibrado", "Esteta"],
                negative: ["Indeciso", "Superficial", "Dependente", "Fútil", "Evita conflitos"],
            },
            love: [
                "Seu amor é harmonioso e romântico. Busque um parceiro que valorize a beleza e a justiça.",
                "O charme libriano é irresistível. Demonstre seu afeto através de gestos de carinho e atenção.",
                "No amor, você busca o equilíbrio. Evite a indecisão e aprenda a tomar suas próprias decisões.",
                "Um relacionamento que ofereça parceria e cumplicidade é o seu ideal. Construa uma base de amor e respeito mútuo.",
                "Sua diplomacia no amor é um trunfo. Use-a para resolver conflitos e manter a paz no relacionamento.",
            ],
            career: [
                "Sua diplomacia e seu senso de justiça brilham em carreiras que envolvem negociação e mediação. Você é um excelente conciliador.",
                "No trabalho, você é um bom mediador. Cuidado com a indecisão e a busca excessiva por aprovação. Confie em si mesmo.",
                "Sua busca por harmonia te impulsiona. Invista em áreas que permitam expressar sua criatividade e seu senso estético.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitas interações sociais.",
                "Sua capacidade de trabalhar em equipe é um diferencial. Use-a para construir relações harmoniosas e produtivas.",
            ],
            health: [
                "Sua saúde é geralmente boa, mas o estresse pode afetar seus rins e sua bexiga. Beba bastante água e evite o excesso de açúcar.",
                "A beleza e a harmonia são importantes para sua saúde. Cuide da sua aparência e do seu ambiente.",
                "Cuidado com a indecisão, que pode gerar ansiedade. Tome suas decisões com confiança e siga em frente.",
                "A socialização é importante para sua saúde mental. Conecte-se com amigos e familiares.",
                "O equilíbrio é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é equilibrado com o dinheiro, mas pode ser indeciso em grandes investimentos. Busque aconselhamento financeiro.",
                "Sua diplomacia pode te guiar em bons negócios. Negocie e busque as melhores condições para seus investimentos.",
                "Cuidado com gastos impulsivos com luxos desnecessários. Priorize o que realmente importa para sua segurança.",
                "A parceria financeira é importante para você. Busque um parceiro que compartilhe seus valores e objetivos.",
                "Sua busca por justiça pode te levar a investir em causas sociais e projetos com impacto positivo.",
            ],
            today: [
                "Hoje, sua diplomacia estará em alta. É um excelente dia para resolver conflitos e buscar a harmonia.",
                "Aproveite para cuidar da sua aparência e do seu ambiente. A beleza libriana estará em evidência.",
                "Cuidado com a indecisão. Tome suas decisões com confiança e siga em frente.",
                "Um dia favorável para o amor e para fortalecer seus relacionamentos. Demonstre seu carinho e afeto.",
                "Foque em sua busca por equilíbrio. Encontre a paz interior e a harmonia em suas ações.",
            ],
            week: [
                "Esta semana, sua diplomacia será um trunfo. Resolva conflitos e construa pontes em seus relacionamentos.",
                "Aproveite para cuidar da sua beleza e do seu bem-estar. Invista em você!",
                "Cuidado com a superficialidade. Busque a profundidade em suas interações e em seus sentimentos.",
                "Sua busca por harmonia será recompensada. Encontre a paz interior e a tranquilidade.",
                "A semana pede mais interação social. Conecte-se com amigos e familiares.",
            ],
            month: [
                "Este mês, o universo te convida a buscar o equilíbrio em todas as áreas da sua vida. Não se contente com menos!",
                "Sua diplomacia estará mais aguçada do que nunca. Use-a para resolver problemas e criar soluções harmoniosas.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com a indecisão. Tome suas decisões com confiança e siga em frente.",
                "Este é um mês para cuidar da sua beleza e do seu bem-estar. Invista em você!",
            ],
            year: [
                "Este ano promete ser de muito equilíbrio e harmonia para você, Libra. Prepare-se para a paz!",
                "Sua diplomacia será seu maior trunfo. Use-a para resolver conflitos e construir pontes.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua busca por justiça te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua beleza e sua capacidade de harmonizar o mundo. Deixe sua marca!",
            ],
        },
        scorpio: {
            name: "Escorpião",
            emoji: "♏",
            dates: "23 Out - 21 Nov",
            element: "Água",
            modality: "Fixo",
            ruler: "Plutão (e Marte)",
            traits: {
                positive: ["Intenso", "Apaixonado", "Determinado", "Leal", "Misterioso", "Resiliente"],
                negative: ["Ciumento", "Vingativo", "Obsessivo", "Controlador", "Desconfiado"],
            },
            love: [
                "Seu amor é profundo e transformador. Busque um parceiro que valorize sua intensidade e sua lealdade.",
                "A paixão escorpiana é avassaladora. Demonstre seu afeto com gestos de entrega e cumplicidade.",
                "No amor, você busca a verdade e a profundidade. Evite o ciúme e a possessividade. Confie no seu parceiro.",
                "Um relacionamento que ofereça intensidade e transformação é o seu ideal. Construa uma base de confiança e respeito mútuo.",
                "Sua lealdade no amor é inabalável. Cuidado para não ser controlador. Dê espaço e confie no seu parceiro.",
            ],
            career: [
                "Sua determinação e sua capacidade de investigação brilham em carreiras que exigem profundidade e análise. Você é um excelente investigador.",
                "No trabalho, você é focado e estratégico. Cuidado com a obsessão e o desejo de controle. Aprenda a delegar.",
                "Sua ambição te leva a grandes conquistas. Busque carreiras que permitam expressar sua intensidade e seu poder de transformação.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitos desafios.",
                "Sua resiliência é um trunfo. Use-a para superar obstáculos e alcançar o sucesso duradouro.",
            ],
            health: [
                "Sua vitalidade é alta, mas o estresse pode afetar seus órgãos reprodutores e seu sistema excretor. Cuide da sua sexualidade e da sua alimentação.",
                "A intensidade escorpiana precisa ser canalizada. Pratique exercícios físicos e técnicas de relaxamento.",
                "Cuidado com a obsessão e o desejo de controle, que podem gerar ansiedade. Busque o equilíbrio emocional.",
                "A transformação é importante para sua saúde. Esteja aberto a mudanças e a novos hábitos.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é estratégico com o dinheiro e busca o poder financeiro. Suas finanças são bem administradas e planejadas.",
                "Sua intuição pode te guiar em bons investimentos. Confie em seus pressentimentos, mas com análise.",
                "Cuidado com a obsessão por dinheiro. Busque o equilíbrio entre o prazer e a responsabilidade financeira.",
                "A independência financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de investigar e analisar pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua intensidade estará em alta. É um excelente dia para se aprofundar em projetos e resolver mistérios.",
                "Aproveite para se conectar com sua intuição e seus sentimentos mais profundos. A verdade escorpiana será revelada.",
                "Cuidado com o ciúme e a possessividade. Confie nos outros e dê espaço.",
                "Um dia favorável para o amor e para fortalecer seus relacionamentos. Demonstre seu afeto com entrega.",
                "Foque em sua transformação pessoal. Deixe o passado para trás e abrace o novo.",
            ],
            week: [
                "Esta semana, sua determinação será um trunfo. Supere obstáculos e alcance seus objetivos com maestria.",
                "Aproveite para se aprofundar em seus projetos. Sua capacidade de investigação será valorizada.",
                "Cuidado com a obsessão. Encontre momentos de relaxamento para equilibrar sua mente.",
                "Sua paixão estará em evidência. Ótimo período para reacender a chama no amor ou iniciar um novo romance.",
                "A semana pede mais transformação e renovação. Deixe o velho para trás e abrace o novo.",
            ],
            month: [
                "Este mês, o universo te convida a se aprofundar em seus sentimentos e a buscar a verdade em todas as áreas da sua vida. Não se contente com a superfície!",
                "Sua intuição estará mais aguçada do que nunca. Confie em seus pressentimentos e siga sua voz interior.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com o controle excessivo. Aprenda a delegar e a confiar nos outros.",
                "Este é um mês para se transformar e renascer. Deixe o passado para trás e abrace o novo!",
            ],
            year: [
                "Este ano promete ser de grandes transformações e renovações para você, Escorpião. Prepare-se para o novo!",
                "Sua determinação será seu maior trunfo. Use-a para superar obstáculos e alcançar seus objetivos.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua resiliência escorpiana te fará superá-los com facilidade.",
                "Este é o seu ano para se transformar e renascer. Deixe sua marca no mundo com sua intensidade e seu poder!",
            ],
        },
        sagittarius: {
            name: "Sagitário",
            emoji: "♐",
            dates: "22 Nov - 21 Dez",
            element: "Fogo",
            modality: "Mutável",
            ruler: "Júpiter",
            traits: {
                positive: ["Otimista", "Aventureiro", "Filosófico", "Honesto", "Generoso", "Independente"],
                negative: ["Irresponsável", "Exagerado", "Impaciente", "Tato zero", "Inconstante"],
            },
            love: [
                "Seu amor é livre e aventureiro. Busque um parceiro que compartilhe sua sede por novas experiências.",
                "A paixão sagitariana é contagiante. Demonstre seu afeto com bom humor e otimismo.",
                "No amor, você precisa de liberdade e espaço. Evite a rotina e busque sempre a novidade.",
                "Um relacionamento que ofereça aventura e aprendizado é o seu ideal. Compartilhe seus sonhos e viagens.",
                "Sua honestidade no amor é um trunfo. Cuidado para não ser indelicado. Expresse seus sentimentos com carinho.",
            ],
            career: [
                "Sua mente filosófica e sua sede por conhecimento brilham em carreiras que envolvem viagens e aprendizado. Você é um excelente explorador.",
                "No trabalho, você é otimista e entusiasta. Cuidado com a irresponsabilidade e a falta de foco. Mantenha seus compromissos.",
                "Sua ambição te leva a grandes conquistas. Busque carreiras que permitam expressar sua liberdade e seu espírito aventureiro.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitas oportunidades de crescimento.",
                "Sua generosidade é um trunfo. Use-a para motivar sua equipe e construir um ambiente de trabalho positivo.",
            ],
            health: [
                "Sua vitalidade é alta, mas o estresse pode afetar seus quadris e suas coxas. Pratique exercícios físicos e atividades ao ar livre.",
                "A alegria é sua melhor medicina. Busque atividades que te tragam prazer e bem-estar.",
                "Cuidado com o excesso de otimismo, que pode levar a imprudências. Mantenha a cautela e a atenção.",
                "A liberdade é fundamental para sua saúde. Busque hobbies que aliviem a tensão e promovam a paz interior.",
                "A alimentação balanceada e o sono adequado são essenciais para sustentar sua energia inesgotável. Cuide-se!",
            ],
            finance: [
                "Você é otimista com o dinheiro, mas pode ser impulsivo em gastos. Planeje suas finanças com cuidado.",
                "Sua sorte pode te guiar em bons investimentos. Acredite em seu potencial, mas com análise.",
                "Cuidado com o excesso de confiança em suas finanças. Evite gastos desnecessários e impulsivos.",
                "A independência financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de explorar novas oportunidades pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua energia estará em alta. É um excelente dia para explorar novos horizontes e aprender algo novo.",
                "Aproveite para se conectar com sua filosofia de vida e seus ideais. Sua sabedoria sagitariana será valorizada.",
                "Cuidado com a impaciência. Respire fundo antes de agir e tome decisões com calma.",
                "Um dia favorável para o amor e para demonstrar seu afeto com bom humor e otimismo.",
                "Foque em suas metas pessoais. A energia de hoje favorece a autoafirmação e a conquista.",
            ],
            week: [
                "Esta semana, sua busca por aventura será recompensada. Novas experiências podem surgir em sua vida.",
                "Aproveite para aprender algo novo. Cursos e leituras serão muito benéficos.",
                "Cuidado com a irresponsabilidade. Mantenha seus compromissos e seja mais focado.",
                "Sua paixão estará em evidência. Ótimo período para reacender a chama no amor ou iniciar um novo romance.",
                "A semana pede mais liberdade e espontaneidade. Não se prenda a rotinas e explore o novo.",
            ],
            month: [
                "Este mês, o universo te convida a expandir seus horizontes e a buscar o conhecimento. Não se limite!",
                "Sua mente estará borbulhando de ideias. Use-as para inovar e criar coisas novas.",
                "Um período para fortalecer seus laços sociais e ampliar sua rede de contatos.",
                "Cuidado com a inconstância em seus projetos. Mantenha o foco para alcançar seus objetivos.",
                "Este é um mês para se expressar e compartilhar suas ideias com o mundo. Sua voz importa!",
            ],
            year: [
                "Este ano promete ser de muito aprendizado e expansão para você, Sagitário. Prepare-se para novas aventuras!",
                "Sua mente estará mais afiada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um ano para fortalecer seus relacionamentos e construir pontes. A comunicação será chave.",
                "Desafios podem surgir, mas sua adaptabilidade sagitariana te fará superá-los com facilidade.",
                "Este é o seu ano para se expressar e compartilhar seus talentos com o mundo. Brilhe!",
            ],
        },
        capricorn: {
            name: "Capricórnio",
            emoji: "♑",
            dates: "22 Dez - 19 Jan",
            element: "Terra",
            modality: "Cardinal",
            ruler: "Saturno",
            traits: {
                positive: ["Responsável", "Disciplinado", "Ambicioso", "Prático", "Paciente", "Determinado"],
                negative: ["Pessimista", "Rígido", "Frio", "Materialista", "Controlador"],
            },
            love: [
                "Seu amor é sério e comprometido. Busque um parceiro que valorize sua lealdade e sua ambição.",
                "A dedicação capricorniana é um presente. Demonstre seu afeto através de gestos de apoio e segurança.",
                "No amor, você busca a estabilidade. Evite o pessimismo e aprenda a expressar seus sentimentos com mais leveza.",
                "Um relacionamento que ofereça segurança e um futuro sólido é o seu ideal. Construa uma base de confiança e respeito mútuo.",
                "Sua responsabilidade no amor é um trunfo. Cuidado para não ser controlador. Dê espaço e confie no seu parceiro.",
            ],
            career: [
                "Sua ambição e sua disciplina brilham em carreiras que exigem responsabilidade e liderança. Você é um excelente gestor.",
                "No trabalho, você é focado e estratégico. Cuidado com o excesso de trabalho e o pessimismo. Busque o equilíbrio.",
                "Sua busca por sucesso te impulsiona. Invista em carreiras que ofereçam reconhecimento e crescimento.",
                "A rotina e a organização são importantes para você. Busque ambientes de trabalho estruturados e com clareza de funções.",
                "Sua capacidade de planejar e executar é um diferencial. Use-a para alcançar seus objetivos e construir seu legado.",
            ],
            health: [
                "Sua saúde é geralmente robusta, mas o estresse pode afetar seus ossos e suas articulações. Pratique exercícios físicos e cuide da sua postura.",
                "A disciplina é importante para sua saúde. Mantenha uma rotina saudável e cuide da sua alimentação.",
                "Cuidado com o pessimismo, que pode gerar ansiedade. Busque o otimismo e a leveza em sua vida.",
                "A natureza te acalma. Passe mais tempo ao ar livre e conecte-se com a terra para recarregar suas energias.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é cauteloso e ambicioso com o dinheiro. Suas finanças são bem administradas e planejadas.",
                "Sua disciplina pode te guiar em bons investimentos. Invista em projetos de longo prazo e construa seu legado.",
                "Cuidado com o materialismo excessivo. Busque o equilíbrio entre o prazer e a responsabilidade financeira.",
                "A segurança financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de planejar e economizar é um trunfo. Construa uma base sólida para sua segurança.",
            ],
            today: [
                "Hoje, sua disciplina estará em alta. É um excelente dia para focar em suas metas e responsabilidades.",
                "Aproveite para planejar o futuro e organizar suas finanças. A praticidade capricorniana estará em evidência.",
                "Cuidado com o pessimismo. Busque o otimismo e a leveza em suas interações.",
                "Um dia favorável para o trabalho e para aprimorar suas habilidades. Busque a excelência.",
                "Foque em sua segurança e estabilidade. Construa uma base sólida para o seu futuro.",
            ],
            week: [
                "Esta semana, sua ambição será um trunfo. Supere obstáculos e alcance seus objetivos com maestria.",
                "Aproveite para planejar seus próximos passos na carreira. Novas oportunidades podem surgir.",
                "Cuidado com o excesso de trabalho. Encontre momentos de relaxamento para equilibrar sua mente.",
                "Sua disciplina será recompensada. Continue com seu ritmo constante e colha os frutos.",
                "A semana pede mais responsabilidade e foco. Mantenha seus compromissos e seja mais produtivo.",
            ],
            month: [
                "Este mês, o universo te convida a focar em seus objetivos de longo prazo e a construir seu legado. Não se desvie do caminho!",
                "Sua disciplina estará mais aguçada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com o pessimismo. Busque o otimismo e a leveza em sua vida.",
                "Este é um mês para cuidar da sua saúde e do seu bem-estar. Invista em você!",
            ],
            year: [
                "Este ano promete ser de muito trabalho e conquistas para você, Capricórnio. Prepare-se para o sucesso!",
                "Sua ambição será seu maior trunfo. Use-a para alcançar seus objetivos e construir seu legado.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua resiliência capricorniana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua disciplina e sua capacidade de realizar. Deixe sua marca no mundo!",
            ],
        },
        aquarius: {
            name: "Aquário",
            emoji: "♒",
            dates: "20 Jan - 18 Fev",
            element: "Ar",
            modality: "Fixo",
            ruler: "Urano (e Saturno)",
            traits: {
                positive: ["Inovador", "Independente", "Humanitário", "Original", "Intelectual", "Amigável"],
                negative: ["Rebelde", "Excêntrico", "Distante", "Teimoso", "Imprevisível"],
            },
            love: [
                "Seu amor é livre e intelectual. Busque um parceiro que valorize sua originalidade e sua independência.",
                "A mente aquariana é um charme. Demonstre seu afeto através de conversas inteligentes e ideias inovadoras.",
                "No amor, você precisa de liberdade e espaço. Evite a rotina e busque sempre a novidade.",
                "Um relacionamento que ofereça amizade e companheirismo é o seu ideal. Construa uma base de respeito mútuo.",
                "Sua originalidade no amor é um trunfo. Cuidado para não ser distante. Demonstre seus sentimentos com carinho.",
            ],
            career: [
                "Sua mente inovadora e sua visão humanitária brilham em carreiras que envolvem tecnologia e causas sociais. Você é um excelente visionário.",
                "No trabalho, você é original e criativo. Cuidado com a rebeldia e a falta de foco. Mantenha seus compromissos.",
                "Sua busca por inovação te impulsiona. Invista em áreas que permitam expressar sua criatividade e seu talento.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitas oportunidades de inovar.",
                "Sua capacidade de trabalhar em equipe é um diferencial. Use-a para construir relações harmoniosas e produtivas.",
            ],
            health: [
                "Sua vitalidade é alta, mas o estresse pode afetar suas pernas e seus tornozelos. Pratique exercícios físicos e atividades ao ar livre.",
                "A liberdade é fundamental para sua saúde. Busque hobbies que aliviem a tensão e promovam a paz interior.",
                "Cuidado com a excentricidade, que pode gerar isolamento. Conecte-se com amigos e familiares.",
                "A inovação é importante para sua saúde. Esteja aberto a novas terapias e tratamentos.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é inovador com o dinheiro, mas pode ser imprevisível em gastos. Planeje suas finanças com cuidado.",
                "Sua originalidade pode te guiar em bons investimentos. Acredite em seu potencial, mas com análise.",
                "Cuidado com a rebeldia em suas finanças. Evite gastos desnecessários e impulsivos.",
                "A independência financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de inovar pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua mente estará mais inovadora e original. É um excelente dia para criar e experimentar coisas novas.",
                "Aproveite para se conectar com amigos e grupos. Sua energia aquariana será valorizada.",
                "Cuidado com a rebeldia. Esteja aberto a ouvir os outros e a compartilhar suas ideias.",
                "Um dia favorável para o amor e para fortalecer seus relacionamentos. Demonstre seu afeto com inteligência.",
                "Foque em suas metas humanitárias. A energia de hoje favorece a ajuda ao próximo e a causas sociais.",
            ],
            week: [
                "Esta semana, sua originalidade será um trunfo. Inove em seus projetos e surpreenda a todos.",
                "Aproveite para se conectar com amigos e grupos. Novas ideias podem surgir em suas interações.",
                "Cuidado com a distância emocional. Demonstre seus sentimentos com carinho e afeto.",
                "Sua mente estará borbulhando de ideias. Ótimo período para aprender algo novo e expandir seus conhecimentos.",
                "A semana pede mais liberdade e independência. Não se prenda a rotinas e explore o novo.",
            ],
            month: [
                "Este mês, o universo te convida a inovar e a buscar a originalidade em todas as áreas da sua vida. Não se contente com o comum!",
                "Sua mente estará mais afiada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com a rebeldia. Mantenha o foco no que realmente importa e no seu crescimento pessoal.",
                "Este é um mês para se expressar e compartilhar suas ideias com o mundo. Sua voz importa!",
            ],
            year: [
                "Este ano promete ser de muita inovação e originalidade para você, Aquário. Prepare-se para o novo!",
                "Sua mente estará mais afiada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua resiliência aquariana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua inteligência e sua capacidade de inovar. Deixe sua marca no mundo!",
            ],
        },
        pisces: {
            name: "Peixes",
            emoji: "♓",
            dates: "19 Fev - 20 Mar",
            element: "Água",
            modality: "Mutável",
            ruler: "Netuno (e Júpiter)",
            traits: {
                positive: ["Empático", "Intuitivo", "Compassivo", "Sonhador", "Artístico", "Sensível"],
                negative: ["Fugitivo", "Vítima", "Indeciso", "Ingênuo", "Melancólico"],
            },
            love: [
                "Seu amor é romântico e altruísta. Busque um parceiro que valorize sua sensibilidade e sua compaixão.",
                "A intuição pisciana é um guia. Demonstre seu afeto através de gestos de carinho e compreensão.",
                "No amor, você busca a conexão espiritual. Evite a idealização e aprenda a lidar com a realidade.",
                "Um relacionamento que ofereça sonho e magia é o seu ideal. Construa uma base de amor e cumplicidade.",
                "Sua empatia no amor é um trunfo. Cuidado para não se anular. Dê espaço para suas próprias necessidades.",
            ],
            career: [
                "Sua intuição e sua criatividade brilham em carreiras que envolvem arte e ajuda ao próximo. Você é um excelente curador.",
                "No trabalho, você é sensível e compassivo. Cuidado com a fuga da realidade e a indecisão. Mantenha o foco.",
                "Sua busca por significado te impulsiona. Invista em áreas que permitam expressar sua sensibilidade e sua imaginação.",
                "A rotina pode ser entediante. Procure ambientes de trabalho dinâmicos e com muitas oportunidades de criar.",
                "Sua capacidade de se adaptar é um diferencial. Use-a para se destacar em diferentes projetos e equipes.",
            ],
            health: [
                "Suas emoções afetam diretamente sua saúde. Busque atividades que promovam o equilíbrio emocional, como yoga e meditação.",
                "Cuidado com os pés e o sistema linfático. Use sapatos confortáveis e beba bastante água.",
                "A água te acalma. Banhos relaxantes e momentos perto do mar ou rios são terapêuticos para você.",
                "Evite a fuga da realidade com vícios. Busque o equilíbrio e a moderação em sua vida.",
                "O sono adequado é essencial para sua recuperação. Priorize o descanso e momentos de tranquilidade.",
            ],
            finance: [
                "Você é intuitivo com o dinheiro, mas pode ser ingênuo em investimentos. Busque aconselhamento financeiro.",
                "Sua criatividade pode te guiar em bons negócios. Acredite em seu potencial, mas com análise.",
                "Cuidado com a fuga da realidade em suas finanças. Evite gastos desnecessários e impulsivos.",
                "A segurança financeira é importante para você. Busque formas de aumentar sua renda e diversificar seus investimentos.",
                "Sua capacidade de sonhar pode gerar bons retornos. Invista em suas ideias e confie em seu potencial.",
            ],
            today: [
                "Hoje, sua intuição estará em alta. É um excelente dia para se conectar com sua espiritualidade e seus sonhos.",
                "Aproveite para expressar sua criatividade e sua arte. Sua sensibilidade pisciana será valorizada.",
                "Cuidado com a indecisão. Confie em seus sentimentos e siga seu coração.",
                "Um dia favorável para o amor e para fortalecer seus relacionamentos. Demonstre seu afeto com compaixão.",
                "Foque em sua busca por significado. Encontre a paz interior e a harmonia em suas ações.",
            ],
            week: [
                "Esta semana, sua intuição será um guia. Confie em seus pressentimentos e siga sua voz interior.",
                "Aproveite para se conectar com sua espiritualidade e seus sonhos. Meditação e yoga serão muito benéficos.",
                "Cuidado com a fuga da realidade. Mantenha os pés no chão e seja mais prático.",
                "Sua criatividade estará em evidência. Ótimo período para expressar sua arte e seus talentos.",
                "A semana pede mais empatia e compaixão. Ajude o próximo e seja mais solidário.",
            ],
            month: [
                "Este mês, o universo te convida a se conectar com sua espiritualidade e a buscar o significado em todas as áreas da sua vida. Não se contente com a superfície!",
                "Sua intuição estará mais aguçada do que nunca. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um período para fortalecer seus relacionamentos e construir laços duradouros.",
                "Cuidado com a indecisão. Tome suas decisões com confiança e siga em frente.",
                "Este é um mês para cuidar da sua saúde e do seu bem-estar. Invista em você!",
            ],
            year: [
                "Este ano promete ser de muita espiritualidade e criatividade para você, Peixes. Prepare-se para o novo!",
                "Sua intuição será seu maior trunfo. Use-a para resolver problemas e criar soluções inovadoras.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas sua resiliência pisciana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua sensibilidade e sua capacidade de sonhar. Deixe sua marca no mundo!",
            ],
        },
    };

    generateSignTopicResponse(sign, topic) {
        const data = this.astrologicalData[sign];
        if (!data) return this.generateGenericResponse();

        const responses = data[topic];
        if (responses && responses.length > 0) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            return `Para ${data.name} em ${this.translateTopic(topic)}: ${responses[randomIndex]} ${data.emoji}`;
        }
        return `Como ${data.name}, você tem uma energia única! No campo de ${this.translateTopic(topic)}, as estrelas indicam que você deve focar em ${data.traits.positive[0].toLowerCase()} e evitar ${data.traits.negative[0].toLowerCase()}. ${data.emoji}`;
    }

    generateSignOverview(sign) {
        const data = this.astrologicalData[sign];
        if (!data) return this.generateGenericResponse();

        const positiveTrait = data.traits.positive[Math.floor(Math.random() * data.traits.positive.length)];
        const negativeTrait = data.traits.negative[Math.floor(Math.random() * data.traits.negative.length)];

        return `Ah, ${data.name} ${data.emoji}! Nascidos entre ${data.dates}, vocês são do elemento ${data.element} e regidos por ${data.ruler}. Sua natureza ${positiveTrait.toLowerCase()} é uma grande força, mas cuidado com a tendência a ser ${negativeTrait.toLowerCase()}. As estrelas te convidam a explorar sua ${data.modality.toLowerCase()} e a buscar o equilíbrio.`;
    }

    generateGeneralTopicResponse(topic) {
        const generalResponses = {
            love: [
                "O amor está no ar! As energias cósmicas favorecem a conexão e a paixão. Abra seu coração para novas possibilidades.",
                "No campo amoroso, a comunicação é a chave. Expresse seus sentimentos com clareza e ouça o outro com empatia.",
                "Vênus em trânsito indica um período de harmonia e romance. Aproveite para fortalecer seus laços afetivos.",
                "Cuidado com a idealização. O amor real é construído com base na aceitação e no respeito mútuo.",
                "As estrelas sugerem um encontro inesperado. Esteja aberto a novas pessoas e experiências.",
            ],
            career: [
                "Sua carreira está em ascensão! Marte em bom aspecto traz energia e determinação para seus projetos.",
                "No trabalho, a organização e o planejamento são essenciais. Mantenha o foco e a disciplina para alcançar seus objetivos.",
                "Júpiter em trânsito indica um período de expansão e novas oportunidades profissionais. Esteja atento!",
                "Cuidado com a procrastinação. Aja com proatividade e não deixe para depois o que pode fazer agora.",
                "As estrelas sugerem um reconhecimento merecido. Seu esforço será recompensado em breve.",
            ],
            health: [
                "Sua saúde está em equilíbrio. Continue cuidando do seu corpo e da sua mente com carinho.",
                "A energia cósmica favorece a vitalidade. Pratique exercícios físicos e mantenha uma alimentação saudável.",
                "A Lua em bom aspecto indica um período de bem-estar emocional. Busque atividades que te tragam paz e tranquilidade.",
                "Cuidado com o estresse. Encontre momentos de relaxamento e autocuidado para recarregar suas energias.",
                "As estrelas sugerem uma nova rotina de bem-estar. Experimente algo novo e cuide de si mesmo.",
            ],
            luck: [
                "A sorte está ao seu lado! Júpiter em bom aspecto traz oportunidades e abundância para sua vida.",
                "As energias cósmicas favorecem a prosperidade. Esteja aberto a receber e a compartilhar suas bênçãos.",
                "Um período de boas surpresas. Acredite em seu potencial e siga sua intuição.",
                "Cuidado com a ganância. A verdadeira sorte está em valorizar o que você já tem e em ser grato.",
                "As estrelas sugerem um golpe de sorte inesperado. Esteja atento aos sinais do universo.",
            ],
            today: [
                "Hoje, as energias cósmicas favorecem a introspecção e o autoconhecimento. Conecte-se com sua essência.",
                "Um dia para resolver pendências e organizar sua vida. A praticidade será sua aliada.",
                "Aproveite para se conectar com a natureza e recarregar suas energias. Momentos de paz são essenciais.",
                "Cuidado com a impulsividade. Respire fundo antes de agir e tome decisões com calma.",
                "As estrelas sugerem um dia de aprendizado e crescimento. Esteja aberto a novas experiências.",
            ],
            week: [
                "Esta semana, as energias cósmicas favorecem a comunicação e a interação social. Conecte-se com o mundo.",
                "Um período para inovar e criar coisas novas. Sua criatividade estará em alta.",
                "Aproveite para fortalecer seus relacionamentos e construir pontes. A diplomacia será chave.",
                "Cuidado com o estresse. Encontre momentos de relaxamento e autocuidado para recarregar suas energias.",
                "As estrelas sugerem uma semana de oportunidades e crescimento. Esteja atento aos sinais do universo.",
            ],
            month: [
                "Este mês, as energias cósmicas favorecem a transformação e a renovação. Deixe o velho para trás e abrace o novo.",
                "Um período para se aprofundar em seus sentimentos e a buscar a verdade em todas as áreas da sua vida.",
                "Aproveite para fortalecer seus laços familiares e a cuidar do seu lar. Seu porto seguro.",
                "Cuidado com a indecisão. Tome suas decisões com confiança e siga em frente.",
                "As estrelas sugerem um mês de autodescoberta e crescimento pessoal. Invista em você!",
            ],
            year: [
                "Este ano promete ser de grandes transformações e conquistas para todos os signos. Prepare-se para o novo!",
                "As energias cósmicas favorecem a inovação e a criatividade. Use seus talentos para deixar sua marca no mundo.",
                "Um ano para fortalecer seus relacionamentos e construir laços duradouros.",
                "Desafios podem surgir, mas a resiliência humana te fará superá-los com facilidade.",
                "Este é o seu ano para brilhar com sua luz interior e inspirar aqueles ao seu redor. Acredite em você!",
            ],
            compatibility: [
                "A compatibilidade astral vai além do signo solar. Mas signos do mesmo elemento (como Fogo com Fogo) costumam ter uma química instantânea!",
                "Para uma análise de compatibilidade mais profunda, eu precisaria dos signos de ambos. Qual o seu e o do seu interesse amoroso/amigo?",
                "A atração entre signos opostos pode ser muito forte, mas também desafiadora. Complementaridade é a chave.",
                "Signos de Terra e Água tendem a formar pares estáveis e emocionais. Já Fogo e Ar trazem dinamismo e intelecto.",
                "Lembre-se que a compatibilidade é apenas um guia. O amor e o respeito mútuo são sempre os pilares de qualquer relação.",
            ],
            astralMap: [
                "Seu mapa astral é como um retrato do céu no momento do seu nascimento. Ele revela sua personalidade, destino e potencial único.",
                "Para ter seu mapa astral completo, você precisaria da data, hora e local exatos do seu nascimento. É uma ferramenta poderosa de autoconhecimento.",
                "O mapa astral mostra a posição de todos os planetas e casas astrológicas, revelando detalhes sobre amor, carreira, família e muito mais.",
                "Cada planeta no seu mapa astral representa uma área da sua vida. O Sol é sua essência, a Lua suas emoções, Mercúrio sua comunicação, e assim por diante.",
                "Estudar seu mapa astral é uma jornada fascinante de autodescoberta. Ele te ajuda a entender seus talentos e desafios.",
            ],
            moon: [
                "A Lua rege nossas emoções e intuição. Cada fase lunar tem significados especiais e influencia nosso humor e energia.",
                "A Lua Nova é para novos começos, a Crescente para crescimento, a Cheia para culminação e a Minguante para liberação.",
                "Para saber a influência exata da Lua em você, precisaríamos saber em qual signo e casa ela estava no seu nascimento.",
                "A Lua também influencia as marés e os ciclos da natureza. Conectar-se com ela pode trazer mais harmonia à sua vida.",
                "Sua fase lunar de nascimento pode revelar muito sobre sua personalidade emocional e como você lida com seus sentimentos.",
            ],
            mercury: [
                "Mercúrio rege a comunicação, inteligência e negócios. Ele influencia como pensamos, aprendemos e nos expressamos.",
                "Quando Mercúrio está retrógrado, pode haver confusões nas comunicações, atrasos e mal-entendidos. É um período para revisar e refletir.",
                "A posição de Mercúrio no seu mapa astral indica seu estilo de comunicação e suas habilidades intelectuais.",
                "Mercúrio é um planeta rápido, e seus trânsitos diários afetam nossa capacidade de raciocínio e interação.",
                "Para ter uma comunicação mais clara, alinhe-se com a energia de Mercúrio. Pense antes de falar e seja objetivo.",
            ],
            venus: [
                "Vênus rege o amor, beleza e valores. Sua posição no mapa astral mostra como você ama, o que valoriza na vida e como se relaciona.",
                "Vênus em bom aspecto traz harmonia nos relacionamentos e atrai prosperidade. É um período para desfrutar dos prazeres da vida.",
                "Sua Vênus natal revela seu estilo de flerte, o que te atrai e como você expressa afeto.",
                "Vênus também está ligada às finanças e à estética. Ela influencia seu gosto por arte, moda e luxo.",
                "Para atrair mais amor e beleza para sua vida, conecte-se com a energia de Vênus. Cuide de si mesmo e do seu ambiente.",
            ],
            mars: [
                "Marte rege a ação, coragem e desejo. Ele mostra sua força de vontade, como você enfrenta desafios e sua energia sexual.",
                "Marte em bom aspecto traz energia, iniciativa e determinação para seus projetos. É um período para agir e conquistar.",
                "Seu Marte natal revela sua assertividade, sua paixão e como você lida com a raiva e a competição.",
                "Marte também está ligado à sua saúde física e à sua capacidade de se defender. Ele influencia sua vitalidade.",
                "Para ter mais energia e coragem, alinhe-se com a energia de Marte. Pratique exercícios físicos e defenda seus ideais.",
            ],
            jupiter: [
                "Júpiter é o planeta da sorte, expansão e sabedoria. Ele traz oportunidades de crescimento, abundância e otimismo para sua vida.",
                "Júpiter em bom aspecto indica um período de sorte e prosperidade. Aproveite para expandir seus horizontes e aprender algo novo.",
                "Seu Júpiter natal revela suas crenças, sua filosofia de vida e onde você encontra mais sorte e crescimento.",
                "Júpiter também está ligado à educação superior, viagens e espiritualidade. Ele influencia sua busca por significado.",
                "Para atrair mais sorte e abundância, conecte-se com a energia de Júpiter. Seja otimista, generoso e acredite em seu potencial.",
            ],
            saturn: [
                "Saturno rege as lições de vida, responsabilidade e disciplina. Seus ciclos trazem aprendizados importantes para nosso crescimento e amadurecimento.",
                "Saturno em bom aspecto traz estrutura, disciplina e maturidade para seus projetos. É um período para construir bases sólidas.",
                "Seu Saturno natal revela seus desafios, suas responsabilidades e onde você precisa desenvolver mais disciplina e paciência.",
                "Saturno também está ligado à carreira, autoridade e tempo. Ele influencia sua busca por reconhecimento e legado.",
                "Para superar desafios e construir um futuro sólido, alinhe-se com a energia de Saturno. Seja responsável, disciplinado e paciente.",
            ],
            general: [
                "As estrelas estão sempre em movimento, e com elas, as energias que nos influenciam. Mantenha-se aberto às mudanças.",
                "O universo tem um plano maior para você. Confie no processo e siga sua intuição.",
                "Cada dia é uma nova oportunidade de crescimento e aprendizado. Aproveite ao máximo!",
                "Lembre-se que você é o criador da sua realidade. Use o poder do pensamento positivo para atrair o que deseja.",
                "As energias cósmicas são um guia, mas o livre arbítrio é seu. Faça suas escolhas com sabedoria e amor.",
            ],
        };

        const responses = generalResponses[topic];
        if (responses && responses.length > 0) {
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        }
        return this.generateGenericResponse();
    }

    generateGenericResponse() {
        const genericResponses = [
            "Que pergunta interessante! 🌙 Posso ajudar com informações sobre astrologia, horóscopo, signos do zodíaco, compatibilidade amorosa, e muito mais. O que você gostaria de saber?",
            "As estrelas dizem que a curiosidade é o primeiro passo para a sabedoria. Qual o seu signo para eu te ajudar melhor?",
            "O universo é vasto e cheio de mistérios. Me diga o que te intriga e eu farei o meu melhor para te guiar.",
            "Para uma resposta mais precisa, preciso de mais detalhes. Você gostaria de saber sobre um signo específico ou um tópico geral?",
            "Estou aqui para desvendar os segredos do cosmos para você. Faça sua pergunta!",
        ];
        const randomIndex = Math.floor(Math.random() * genericResponses.length);
        return genericResponses[randomIndex];
    }

    translateTopic(topic) {
        const translations = {
            love: "amor",
            career: "carreira",
            health: "saúde",
            luck: "sorte",
            today: "hoje",
            week: "esta semana",
            month: "este mês",
            year: "este ano",
            compatibility: "compatibilidade",
            astralMap: "mapa astral",
            moon: "a Lua",
            mercury: "Mercúrio",
            venus: "Vênus",
            mars: "Marte",
            jupiter: "Júpiter",
            saturn: "Saturno",
            general: "previsões gerais",
        };
        return translations[topic] || topic;
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chat
if (typeof window !== "undefined") {
    window.cosmicAIChat = new AIChatBot();
}
