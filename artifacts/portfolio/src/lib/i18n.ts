export type Lang = "en" | "es" | "fr" | "de" | "it" | "pt";

export interface Translations {
  navExperience: string;
  navProjects: string;
  navContact: string;
  navOverview: string;
  sectionIntro: string;
  tagline: string;
  workingAt: string;
  building: string;
  studyingAt: string;
  fluentIn: string;
  bio1: string;
  bio2: string;
  bio3: string;
  bio3Link: string;
  sectionExperience: string;
  sectionProjects: string;
  sectionSkills: string;
  sectionLanguages: string;
  sectionFindMe: string;
  orMailMe: string;
  exp1Title: string;
  exp1Period: string;
  exp1p1: string; exp1p2: string; exp1p3: string; exp1p4: string;
  exp2Title: string;
  exp2Period: string;
  exp2p1: string; exp2p2: string;
  inDevelopment: string;
  proj1Desc: string;
  proj2Desc: string;
  proj3Desc: string;
  skillLang: string;
  skillData: string;
  skillTools: string;
  skillLearning: string;
  langSpanish: string; langPortuguese: string; langEnglish: string;
  langFrench: string; langGerman: string; langItalian: string;
  langNative: string; langNativeLevel: string;
  cmdCopyEmail: string;
  langsBio: string;
}

export const t: Record<Lang, Translations> = {
  en: {
    navExperience: "Experience", navProjects: "Projects", navContact: "Contact", navOverview: "Overview",
    sectionIntro: "Introduction",
    tagline: "Hey! I'm Neo, an AI Engineer and Oracle Data Integration Developer based in Buenos Aires.",
    workingAt: "Working at", building: "Building", studyingAt: "Studying at", fluentIn: "Fluent in",
    bio1: "I have a deep interest in building production-grade AI systems — RAG pipelines, LLM orchestration, and automation tools. I enjoy bridging the gap between complex data architectures and cutting-edge AI methods. You can find my open-source work on github.com/neo-nunez.",
    bio2: "Outside of coding, I find that speaking six languages has shaped how I think about structure, pattern recognition, and ambiguity — skills that transfer directly to systems design. I'm deeply interested in software architecture, personal productivity, open-source tooling, and economics.",
    bio3: "Currently seeking an AI Engineering role where I can design, build, and ship intelligent systems that solve real-world problems. If you're around Buenos Aires or working remotely,",
    bio3Link: "reach out",
    sectionExperience: "Experience", sectionProjects: "Projects", sectionSkills: "Technical Skills",
    sectionLanguages: "Languages", sectionFindMe: "Find me on", orMailMe: "Or mail me at",
    exp1Title: "Oracle Data Integration Developer", exp1Period: "2025 — Present",
    exp1p1: "Designed and maintained end-to-end data integration pipelines for enterprise clients.",
    exp1p2: "Built advanced transformation logic and dynamic workflow automation in Oracle Data Integrator using Groovy.",
    exp1p3: "Extended platform capabilities and orchestrated complex integration scenarios with Jython scripting.",
    exp1p4: "Collaborated cross-functionally to model data mappings and deliver robust integration solutions.",
    exp2Title: "Enterprise Technical Support — Intern", exp2Period: "2024 — 2025",
    exp2p1: "Provided technical support for Oracle Enterprise Planning Services across multiple clients.",
    exp2p2: "Resolved service issues and managed server maintenance, reducing client downtime.",
    inDevelopment: "In development",
    proj1Desc: "Production-grade Retrieval-Augmented Generation system for employee onboarding with Oracle EPM documentation.",
    proj2Desc: "macOS menu bar speech-to-text app. A self-hosted alternative to Wispr Flow running local models via MLX.",
    proj3Desc: "Personal iOS productivity app — reminders, notes, tasks, calendar, planner, and habit tracker.",
    skillLang: "Languages", skillData: "Data", skillTools: "Tools", skillLearning: "Learning",
    langSpanish: "Spanish", langPortuguese: "Portuguese", langEnglish: "English",
    langFrench: "French", langGerman: "German", langItalian: "Italian",
    langNative: "Native", langNativeLevel: "Native-level",
    cmdCopyEmail: "Copy email",
    langsBio: "Growing up, I devoted myself to learning languages through dedicated classes and formal certifications — driven by a deep passion for multicultural environments and the belief that language is the most direct bridge between people.",
  },
  es: {
    navExperience: "Experiencia", navProjects: "Proyectos", navContact: "Contacto", navOverview: "Resumen",
    sectionIntro: "Introducción",
    tagline: "¡Hola! Soy Neo, Ingeniero de IA y Desarrollador de Integración de Datos Oracle en Buenos Aires.",
    workingAt: "Trabajando en", building: "Construyendo", studyingAt: "Estudiando en", fluentIn: "Hablo",
    bio1: "Tengo un profundo interés en construir sistemas de IA de nivel productivo — pipelines RAG, orquestación de LLMs y herramientas de automatización. Me apasiona cerrar la brecha entre arquitecturas de datos complejas y los últimos avances en IA. Podés encontrar mi trabajo en github.com/neo-nunez.",
    bio2: "Más allá del código, hablar seis idiomas moldeó mi forma de pensar sobre la estructura, el reconocimiento de patrones y la ambigüedad — habilidades que se transfieren directamente al diseño de sistemas. Me interesan la arquitectura de software, la productividad personal, el open-source y la economía.",
    bio3: "Estoy buscando un rol de Ingeniería en IA donde pueda diseñar, construir y lanzar sistemas inteligentes que resuelvan problemas reales. Si estás en Buenos Aires o trabajás de forma remota,",
    bio3Link: "escribime",
    sectionExperience: "Experiencia", sectionProjects: "Proyectos", sectionSkills: "Habilidades Técnicas",
    sectionLanguages: "Idiomas", sectionFindMe: "Encuéntrame en", orMailMe: "O escribime a",
    exp1Title: "Desarrollador Oracle Data Integration", exp1Period: "2025 — Presente",
    exp1p1: "Diseñé y mantuve pipelines de integración de datos de extremo a extremo para clientes empresariales.",
    exp1p2: "Construí lógica de transformación avanzada y automatización de flujos de trabajo en Oracle Data Integrator con Groovy.",
    exp1p3: "Extendí las capacidades de la plataforma y orquesté escenarios de integración complejos con scripting en Jython.",
    exp1p4: "Colaboré de manera transversal para modelar mapeos de datos y entregar soluciones de integración robustas.",
    exp2Title: "Pasante de Soporte Técnico Empresarial", exp2Period: "2024 — 2025",
    exp2p1: "Brindé soporte técnico para Oracle Enterprise Planning Services a múltiples clientes.",
    exp2p2: "Resolví incidencias y gestioné el mantenimiento de servidores, reduciendo el tiempo de inactividad.",
    inDevelopment: "En desarrollo",
    proj1Desc: "Sistema RAG de nivel productivo para la incorporación de empleados usando documentación de Oracle EPM.",
    proj2Desc: "App de dictado en la barra de menú de macOS. Alternativa auto-alojada a Wispr Flow con modelos locales via MLX.",
    proj3Desc: "App personal de productividad para iOS — recordatorios, notas, tareas, calendario, planificador y seguimiento de hábitos.",
    skillLang: "Lenguajes", skillData: "Datos", skillTools: "Herramientas", skillLearning: "Aprendiendo",
    langSpanish: "Español", langPortuguese: "Portugués", langEnglish: "Inglés",
    langFrench: "Francés", langGerman: "Alemán", langItalian: "Italiano",
    langNative: "Nativo", langNativeLevel: "Nivel nativo",
    cmdCopyEmail: "Copiar email",
    langsBio: "Desde pequeño, me dediqué a aprender idiomas a través de clases especializadas y certificaciones formales — motivado por una profunda pasión por los entornos multiculturales y la convicción de que el idioma es el puente más directo entre las personas.",
  },
  fr: {
    navExperience: "Expérience", navProjects: "Projets", navContact: "Contact", navOverview: "Aperçu",
    sectionIntro: "Introduction",
    tagline: "Bonjour ! Je suis Neo, Ingénieur IA et Développeur d'Intégration de Données Oracle à Buenos Aires.",
    workingAt: "Travaille chez", building: "En construction", studyingAt: "Étudie à", fluentIn: "Parle",
    bio1: "J'ai un intérêt profond pour la construction de systèmes d'IA de niveau production — pipelines RAG, orchestration de LLM et outils d'automatisation. J'aime combler le fossé entre les architectures de données complexes et les méthodes d'IA de pointe. Mon travail open-source se trouve sur github.com/neo-nunez.",
    bio2: "Au-delà du code, parler six langues a façonné ma façon de penser la structure, la reconnaissance de patterns et l'ambiguïté — des compétences directement transposables à la conception de systèmes. Je m'intéresse à l'architecture logicielle, la productivité personnelle, l'open-source et l'économie.",
    bio3: "Je cherche actuellement un poste d'Ingénieur IA où je peux concevoir, construire et déployer des systèmes intelligents. Si vous êtes à Buenos Aires ou travaillez à distance,",
    bio3Link: "contactez-moi",
    sectionExperience: "Expérience", sectionProjects: "Projets", sectionSkills: "Compétences Techniques",
    sectionLanguages: "Langues", sectionFindMe: "Retrouvez-moi sur", orMailMe: "Ou écrivez-moi à",
    exp1Title: "Développeur Oracle Data Integration", exp1Period: "2025 — Présent",
    exp1p1: "Conçu et maintenu des pipelines d'intégration de données bout en bout pour des clients entreprise.",
    exp1p2: "Développé une logique de transformation avancée et une automatisation des flux dans Oracle Data Integrator avec Groovy.",
    exp1p3: "Étendu les capacités de la plateforme et orchestré des scénarios d'intégration complexes avec Jython.",
    exp1p4: "Collaboré entre équipes pour modéliser les mappings de données et livrer des solutions d'intégration robustes.",
    exp2Title: "Stagiaire Support Technique Entreprise", exp2Period: "2024 — 2025",
    exp2p1: "Fourni un support technique pour Oracle Enterprise Planning Services auprès de multiples clients.",
    exp2p2: "Résolu des incidents et géré la maintenance des serveurs, réduisant les temps d'arrêt.",
    inDevelopment: "En développement",
    proj1Desc: "Système RAG de niveau production pour l'intégration des employés avec la documentation Oracle EPM.",
    proj2Desc: "Application macOS de dictée dans la barre de menu. Alternative auto-hébergée à Wispr Flow via MLX.",
    proj3Desc: "Application iOS de productivité personnelle — rappels, notes, tâches, calendrier, planificateur et suivi des habitudes.",
    skillLang: "Langages", skillData: "Données", skillTools: "Outils", skillLearning: "Apprentissage",
    langSpanish: "Espagnol", langPortuguese: "Portugais", langEnglish: "Anglais",
    langFrench: "Français", langGerman: "Allemand", langItalian: "Italien",
    langNative: "Natif", langNativeLevel: "Niveau natif",
    cmdCopyEmail: "Copier l'email",
    langsBio: "En grandissant, je me suis consacré à l'apprentissage des langues grâce à des cours spécialisés et des certifications formelles — animé par une passion profonde pour les environnements multiculturels et la conviction que la langue est le pont le plus direct entre les personnes.",
  },
  de: {
    navExperience: "Erfahrung", navProjects: "Projekte", navContact: "Kontakt", navOverview: "Übersicht",
    sectionIntro: "Einführung",
    tagline: "Hallo! Ich bin Neo, KI-Ingenieur und Oracle Data Integration Entwickler aus Buenos Aires.",
    workingAt: "Arbeite bei", building: "Im Aufbau", studyingAt: "Studiere an", fluentIn: "Spreche",
    bio1: "Ich interessiere mich leidenschaftlich für den Aufbau produktionsreifer KI-Systeme — RAG-Pipelines, LLM-Orchestrierung und Automatisierungstools. Ich verbinde komplexe Datenarchitekturen mit modernster KI. Meine Open-Source-Arbeit gibt es auf github.com/neo-nunez.",
    bio2: "Außerhalb des Programmierens hat das Sprechen von sechs Sprachen mein Denken über Struktur, Mustererkennung und Mehrdeutigkeit geprägt — Fähigkeiten, die sich direkt auf Systemdesign übertragen. Ich interessiere mich für Softwarearchitektur, Produktivität, Open-Source und Wirtschaft.",
    bio3: "Ich suche eine KI-Ingenieur-Stelle, wo ich intelligente Systeme entwerfen, entwickeln und liefern kann. Falls Sie in Buenos Aires sind oder remote arbeiten,",
    bio3Link: "melden Sie sich gerne",
    sectionExperience: "Berufserfahrung", sectionProjects: "Projekte", sectionSkills: "Technische Fähigkeiten",
    sectionLanguages: "Sprachen", sectionFindMe: "Folge mir auf", orMailMe: "Oder schreib mir an",
    exp1Title: "Oracle Data Integration Entwickler", exp1Period: "2025 — Heute",
    exp1p1: "End-to-End-Datenintegrationspipelines für Unternehmenskunden entworfen und gepflegt.",
    exp1p2: "Fortgeschrittene Transformationslogik und dynamische Workflow-Automatisierung in Oracle Data Integrator mit Groovy entwickelt.",
    exp1p3: "Plattformfähigkeiten erweitert und komplexe Integrationsszenarien mit Jython orchestriert.",
    exp1p4: "Teamübergreifend zusammengearbeitet, um Datenmappings zu modellieren und robuste Integrationslösungen zu liefern.",
    exp2Title: "Praktikant Technischer Unternehmenssupport", exp2Period: "2024 — 2025",
    exp2p1: "Technischen Support für Oracle Enterprise Planning Services bei mehreren Kunden bereitgestellt.",
    exp2p2: "Serviceprobleme gelöst und Serverwartung durchgeführt, um Ausfallzeiten zu reduzieren.",
    inDevelopment: "In Entwicklung",
    proj1Desc: "Produktionsreifes RAG-System für das Onboarding von Mitarbeitern mit Oracle EPM-Dokumentation.",
    proj2Desc: "macOS-Menüleisten-App für Sprache-zu-Text. Eine selbstgehostete Alternative zu Wispr Flow über MLX.",
    proj3Desc: "Persönliche iOS-Produktivitäts-App — Erinnerungen, Notizen, Aufgaben, Kalender, Planer und Gewohnheitstracking.",
    skillLang: "Sprachen", skillData: "Daten", skillTools: "Werkzeuge", skillLearning: "Lernend",
    langSpanish: "Spanisch", langPortuguese: "Portugiesisch", langEnglish: "Englisch",
    langFrench: "Französisch", langGerman: "Deutsch", langItalian: "Italienisch",
    langNative: "Muttersprache", langNativeLevel: "Muttersprachniveau",
    cmdCopyEmail: "E-Mail kopieren",
    langsBio: "Schon in meiner Kindheit widmete ich mich dem Sprachenlernen durch gezielte Kurse und formelle Zertifizierungen — angetrieben von einer tiefen Leidenschaft für multikulturelle Umgebungen und der Überzeugung, dass Sprache die direkteste Brücke zwischen Menschen ist.",
  },
  it: {
    navExperience: "Esperienza", navProjects: "Progetti", navContact: "Contatto", navOverview: "Panoramica",
    sectionIntro: "Introduzione",
    tagline: "Ciao! Sono Neo, Ingegnere AI e Sviluppatore Oracle Data Integration a Buenos Aires.",
    workingAt: "Lavoro presso", building: "Costruendo", studyingAt: "Studio a", fluentIn: "Parlo",
    bio1: "Ho un profondo interesse per la costruzione di sistemi AI di livello produttivo — pipeline RAG, orchestrazione di LLM e strumenti di automazione. Mi piace colmare il divario tra architetture dati complesse e metodi AI all'avanguardia. Il mio lavoro open-source si trova su github.com/neo-nunez.",
    bio2: "Al di là del codice, parlare sei lingue ha plasmato il mio modo di pensare alla struttura, al riconoscimento di pattern e all'ambiguità — competenze che si trasferiscono direttamente al design dei sistemi. Mi interessano l'architettura software, la produttività personale, l'open-source e l'economia.",
    bio3: "Sto cercando un ruolo da AI Engineer dove posso progettare, costruire e distribuire sistemi intelligenti che risolvono problemi reali. Se sei a Buenos Aires o lavori da remoto,",
    bio3Link: "scrivimi",
    sectionExperience: "Esperienza", sectionProjects: "Progetti", sectionSkills: "Competenze Tecniche",
    sectionLanguages: "Lingue", sectionFindMe: "Trovami su", orMailMe: "O scrivimi a",
    exp1Title: "Sviluppatore Oracle Data Integration", exp1Period: "2025 — Presente",
    exp1p1: "Progettato e mantenuto pipeline di integrazione dati end-to-end per clienti enterprise.",
    exp1p2: "Costruito logica di trasformazione avanzata e automazione dei workflow in Oracle Data Integrator con Groovy.",
    exp1p3: "Esteso le capacità della piattaforma e orchestrato scenari di integrazione complessi con Jython.",
    exp1p4: "Collaborato tra team per modellare mappature dati e consegnare soluzioni di integrazione robuste.",
    exp2Title: "Tirocinante Supporto Tecnico Enterprise", exp2Period: "2024 — 2025",
    exp2p1: "Fornito supporto tecnico per Oracle Enterprise Planning Services a più clienti.",
    exp2p2: "Risolto problemi di servizio e gestito la manutenzione dei server, riducendo i tempi di inattività.",
    inDevelopment: "In sviluppo",
    proj1Desc: "Sistema RAG di livello produttivo per l'onboarding dei dipendenti con documentazione Oracle EPM.",
    proj2Desc: "App macOS nella barra dei menu per il riconoscimento vocale. Alternativa self-hosted a Wispr Flow via MLX.",
    proj3Desc: "App iOS personale di produttività — promemoria, note, attività, calendario, pianificatore e tracker delle abitudini.",
    skillLang: "Linguaggi", skillData: "Dati", skillTools: "Strumenti", skillLearning: "Imparando",
    langSpanish: "Spagnolo", langPortuguese: "Portoghese", langEnglish: "Inglese",
    langFrench: "Francese", langGerman: "Tedesco", langItalian: "Italiano",
    langNative: "Madrelingua", langNativeLevel: "Livello madrelingua",
    cmdCopyEmail: "Copia email",
    langsBio: "Fin dall'infanzia, mi sono dedicato all'apprendimento delle lingue attraverso corsi specializzati e certificazioni formali — spinto da una profonda passione per gli ambienti multiculturali e dalla convinzione che la lingua sia il ponte più diretto tra le persone.",
  },
  pt: {
    navExperience: "Experiência", navProjects: "Projetos", navContact: "Contato", navOverview: "Visão Geral",
    sectionIntro: "Introdução",
    tagline: "Olá! Sou Neo, Engenheiro de IA e Desenvolvedor de Integração de Dados Oracle em Buenos Aires.",
    workingAt: "Trabalhando em", building: "Construindo", studyingAt: "Estudando em", fluentIn: "Falo",
    bio1: "Tenho um profundo interesse em construir sistemas de IA de nível produtivo — pipelines RAG, orquestração de LLMs e ferramentas de automação. Gosto de conectar arquiteturas de dados complexas com os métodos mais avançados de IA. Você pode encontrar meu trabalho em github.com/neo-nunez.",
    bio2: "Além do código, falar seis idiomas moldou como penso sobre estrutura, reconhecimento de padrões e ambiguidade — habilidades que se transferem diretamente para o design de sistemas. Tenho interesse em arquitetura de software, produtividade pessoal, ferramentas open-source e economia.",
    bio3: "Estou em busca de uma função de Engenharia de IA onde possa projetar, construir e entregar sistemas inteligentes. Se você está em Buenos Aires ou trabalha remotamente,",
    bio3Link: "entre em contato",
    sectionExperience: "Experiência", sectionProjects: "Projetos", sectionSkills: "Habilidades Técnicas",
    sectionLanguages: "Idiomas", sectionFindMe: "Encontre-me em", orMailMe: "Ou me envie um e-mail em",
    exp1Title: "Desenvolvedor Oracle Data Integration", exp1Period: "2025 — Presente",
    exp1p1: "Projetei e mantive pipelines de integração de dados de ponta a ponta para clientes corporativos.",
    exp1p2: "Construí lógica de transformação avançada e automação de fluxo de trabalho no Oracle Data Integrator com Groovy.",
    exp1p3: "Estendi as capacidades da plataforma e orquestrei cenários de integração complexos com Jython.",
    exp1p4: "Colaborei entre equipes para modelar mapeamentos de dados e entregar soluções de integração robustas.",
    exp2Title: "Estagiário de Suporte Técnico Empresarial", exp2Period: "2024 — 2025",
    exp2p1: "Forneci suporte técnico para Oracle Enterprise Planning Services a múltiplos clientes.",
    exp2p2: "Resolvi problemas de serviço e gerenciei manutenção de servidores, reduzindo tempo de inatividade.",
    inDevelopment: "Em desenvolvimento",
    proj1Desc: "Sistema RAG de nível produtivo para integração de funcionários com documentação Oracle EPM.",
    proj2Desc: "App macOS na barra de menu para ditado. Alternativa auto-hospedada ao Wispr Flow via MLX.",
    proj3Desc: "App iOS pessoal de produtividade — lembretes, notas, tarefas, calendário, planejador e rastreador de hábitos.",
    skillLang: "Linguagens", skillData: "Dados", skillTools: "Ferramentas", skillLearning: "Aprendendo",
    langSpanish: "Espanhol", langPortuguese: "Português", langEnglish: "Inglês",
    langFrench: "Francês", langGerman: "Alemão", langItalian: "Italiano",
    langNative: "Nativo", langNativeLevel: "Nível nativo",
    cmdCopyEmail: "Copiar email",
    langsBio: "Desde a infância, dediquei-me ao aprendizado de idiomas por meio de aulas especializadas e certificações formais — movido por uma profunda paixão por ambientes multiculturais e pela crença de que o idioma é a ponte mais direta entre as pessoas.",
  },
};

export const LANGUAGES: { code: Lang; flag: string; name: string }[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "es", flag: "🇦🇷", name: "Español" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
];
