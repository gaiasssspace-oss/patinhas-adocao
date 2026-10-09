// Dados dos projetos da ONG.
// Os cartões da página "Projetos" são gerados a partir desta lista.
const projetos = [
    {
        id: "resgate",
        titulo: "Resgate de animais",
        descricao: "Nossa equipe atende denúncias de abandono e maus-tratos em São Paulo, recolhe cães e gatos em situação de risco e leva cada um para avaliação veterinária.",
        badges: [
            { tipo: "erro", texto: "Urgente" },
            { tipo: "info", texto: "Voluntariado" }
        ],
        acoes: [
            "Informe animais em situação de risco",
            "Ajude no transporte até a clínica",
            "Doe cobertores e caixas de transporte"
        ]
    },
    {
        id: "feira",
        titulo: "Feira de adoção",
        descricao: "Aos sábados, os animais prontos para adoção ficam em um espaço aberto ao público, onde as famílias podem conhecê-los, brincar e conversar com a equipe.",
        badges: [
            { tipo: "sucesso", texto: "Todo sábado" },
            { tipo: "info", texto: "Voluntariado" }
        ],
        acoes: [
            "Vá conhecer os animais e tire suas dúvidas",
            "Seja voluntário na organização do evento",
            "Divulgue a feira nas redes sociais"
        ]
    },
    {
        id: "castracao",
        titulo: "Castração solidária",
        descricao: "Campanha com preço acessível ou gratuita para tutores de baixa renda. A castração é uma das formas mais eficazes de reduzir o abandono.",
        badges: [
            { tipo: "sucesso", texto: "Inscrições abertas" },
            { tipo: "alerta", texto: "Precisa de doação" }
        ],
        acoes: [
            "Cadastre seu animal na campanha",
            "Apoie com uma doação para custear cirurgias",
            "Ajude na triagem dos atendimentos"
        ]
    },
    {
        id: "lar-temporario",
        titulo: "Lar temporário",
        descricao: "Voluntários recebem um animal em casa até que ele seja adotado. Nós fornecemos ração e acompanhamento veterinário durante todo o período.",
        badges: [
            { tipo: "alerta", texto: "Vagas limitadas" },
            { tipo: "info", texto: "Voluntariado" }
        ],
        acoes: [
            "Ofereça sua casa por algumas semanas",
            "Ajude a socializar o animal",
            "Divulgue o animal para encontrar um lar definitivo"
        ]
    }
];
