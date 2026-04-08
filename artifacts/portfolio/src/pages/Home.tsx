import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Building2,
  BrainCircuit,
  Mic,
  LayoutGrid,
  GraduationCap,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  ArrowUp,
  ChevronRight,
  Briefcase,
  Code2,
  Mail,
} from "lucide-react";
import {
  SiNextdotjs,
  SiFastapi,
  SiSupabase,
  SiPython,
  SiReact,
  SiExpo,
  SiTypescript,
  SiApple,
  SiLangchain,
  SiGooglegemini,
} from "react-icons/si";

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = "en" | "es" | "fr" | "de" | "it" | "pt";

interface Translations {
  navExperience: string;
  navProjects: string;
  navContact: string;
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

const t: Record<Lang, Translations> = {
  en: {
    navExperience: "Experience", navProjects: "Projects", navContact: "Contact",
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
    navExperience: "Experiencia", navProjects: "Proyectos", navContact: "Contacto",
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
    navExperience: "Expérience", navProjects: "Projets", navContact: "Contact",
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
    navExperience: "Erfahrung", navProjects: "Projekte", navContact: "Kontakt",
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
    navExperience: "Esperienza", navProjects: "Progetti", navContact: "Contatto",
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
    navExperience: "Experiência", navProjects: "Projetos", navContact: "Contato",
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

const LANGUAGES: { code: Lang; flag: string; name: string }[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "es", flag: "🇦🇷", name: "Español" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-white/[0.08] bg-white/[0.04] text-[#e4e4e7] align-middle leading-none font-medium whitespace-nowrap">
      <span className="flex items-center opacity-90">{icon}</span>
      {children}
    </span>
  );
}

function FlagBadge({ flag, label, compact }: { flag: string; label: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 ${compact ? "px-1.5 py-0.5" : "px-2 py-1"} text-xs rounded-md border border-white/[0.08] bg-white/[0.04] text-[#e4e4e7] align-middle leading-none font-medium whitespace-nowrap`}>
      <span className="text-sm leading-none">{flag}</span>
      {label}
    </span>
  );
}

const TECH_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  "Next.js":      { icon: SiNextdotjs,   color: "#e4e4e7" },
  "FastAPI":      { icon: SiFastapi,     color: "#009688" },
  "LangGraph":    { icon: SiLangchain,   color: "#5eead4" },
  "LlamaIndex":   { icon: BrainCircuit,  color: "#a78bfa" },
  "Supabase":     { icon: SiSupabase,    color: "#3ECF8E" },
  "Gemini Flash": { icon: SiGooglegemini,color: "#4285F4" },
  "Python":       { icon: SiPython,      color: "#4b8bbe" },
  "mlx-whisper":  { icon: SiApple,       color: "#aaa"    },
  "pyobjc":       { icon: SiApple,       color: "#aaa"    },
  "rumps":        { icon: SiApple,       color: "#aaa"    },
  "pywebview":    { icon: SiPython,      color: "#4b8bbe" },
  "React Native": { icon: SiReact,       color: "#61DAFB" },
  "Expo":         { icon: SiExpo,        color: "#e4e4e7" },
  "TypeScript":   { icon: SiTypescript,  color: "#3178C6" },
};

function TechBadge({ label }: { label: string }) {
  const tech = TECH_ICONS[label];
  if (!tech) return <Badge icon={null}>{label}</Badge>;
  const Icon = tech.icon;
  return (
    <Badge icon={<Icon size={11} style={{ color: tech.color, flexShrink: 0 }} />}>
      {label}
    </Badge>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="link-anim inline-flex items-center gap-1.5 text-[#888] hover:text-[#e4e4e7] text-sm pb-px">
      {children}
    </a>
  );
}

function Divider() {
  return <div className="border-t border-white/[0.06] my-10" />;
}

// Hover row — subtle left accent + bg tint, no layout shift
function HoverRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/[0.02]"
      style={{ boxShadow: "inset 0 0 0 0 transparent" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "inset 2px 0 0 rgba(255,255,255,0.09)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "inset 0 0 0 0 transparent")}>
      {children}
    </div>
  );
}

// Fade-up on scroll, once
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay }}>
      {children}
    </motion.div>
  );
}

// Language dropdown
function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[#888] hover:text-[#e4e4e7] transition-colors text-xs font-medium px-2 py-1 rounded-md border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07]"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="uppercase tracking-wide">{current.code}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute right-0 top-full mt-1.5 w-36 rounded-lg border border-white/[0.08] bg-[#1a1a1a] shadow-xl overflow-hidden z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors text-left
                ${l.code === lang ? "text-[#e4e4e7] bg-white/[0.06]" : "text-[#888] hover:text-[#e4e4e7] hover:bg-white/[0.04]"}`}
            >
              <span className="text-sm">{l.flag}</span>
              {l.name}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Section indicator — left sidebar
function SectionIndicator({ active, sections }: { active: string; sections: { id: string; label: string }[] }) {
  return (
    <div className="fixed left-7 top-[72px] z-30 hidden xl:flex flex-col gap-5 py-6">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => {
              if (s.id === "intro") window.scrollTo({ top: 0, behavior: "smooth" });
              else document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 group text-left"
          >
            <span
              className="block h-px transition-all duration-300"
              style={{
                width: isActive ? "16px" : "8px",
                backgroundColor: isActive ? "rgba(228,228,231,0.5)" : "rgba(228,228,231,0.12)",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap"
              style={{ color: isActive ? "rgba(228,228,231,0.55)" : "rgba(228,228,231,0.15)" }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Command palette
type CmdItem = { label: string; icon: React.ReactNode; hint?: string; action: () => void };

function CommandPalette({ items, open, onClose }: { items: CmdItem[]; open: boolean; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  idxRef.current = idx;

  useEffect(() => {
    if (!open) { setIdx(0); return; }
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => (i + 1) % items.length); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setIdx(i => (i - 1 + items.length) % items.length); }
      if (e.key === "Enter")     { items[idxRef.current]?.action(); }
      if (e.key === "Escape")    { onClose(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, items, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" style={{ backdropFilter: "blur(4px)" }} />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[400px] mx-4 rounded-xl border border-white/[0.1] bg-[#161616] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
              <p className="text-[10px] uppercase tracking-widest text-[#444] font-medium">Navigate</p>
            </div>

            {/* Items */}
            <div className="py-1.5">
              {items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  onMouseEnter={() => setIdx(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                    ${i === idx ? "bg-white/[0.06] text-[#e4e4e7]" : "text-[#888] hover:text-[#e4e4e7]"}`}
                >
                  <span className="flex items-center opacity-60">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.hint && <span className="text-[10px] text-[#444] font-mono">{item.hint}</span>}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/[0.06] flex gap-4">
              <span className="text-[10px] text-[#333]">↑↓ navigate</span>
              <span className="text-[10px] text-[#333]">↵ select</span>
              <span className="text-[10px] text-[#333]">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const tr = t[lang];

  const [copied, setCopied]           = useState(false);
  const [cmdOpen, setCmdOpen]         = useState(false);
  const [activeSection, setActive]    = useState("intro");

  // Title + dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.title = "Neo Nuñez — AI Engineer";
  }, []);

  // ⌘K / Ctrl+K toggle
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  // Section tracking — pure midpoint for intro→languages, bottom-detection for contact
  useEffect(() => {
    const ids = ["intro", "experience", "projects", "skills", "languages"];

    const update = () => {
      // Contact only when the user cannot scroll any further
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (atBottom) { setActive("contact"); return; }

      // Every other section: whichever midpoint is closest to the viewport centre wins
      const mid = window.scrollY + window.innerHeight / 2;
      let closest = ids[0];
      let minDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const elMid = window.scrollY + el.getBoundingClientRect().top + el.offsetHeight / 2;
        const dist = Math.abs(mid - elMid);
        if (dist < minDist) { minDist = dist; closest = id; }
      }
      setActive(closest);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Command palette items
  const scrollTo = (id: string) => {
    setCmdOpen(false);
    if (id === "intro") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cmdItems: CmdItem[] = [
    { label: tr.sectionIntro,      icon: <ArrowUp size={13} />,       hint: "↑",   action: () => scrollTo("intro") },
    { label: tr.navExperience,     icon: <ChevronRight size={13} />,  hint: "§1",  action: () => scrollTo("experience") },
    { label: tr.navProjects,       icon: <ChevronRight size={13} />,  hint: "§2",  action: () => scrollTo("projects") },
    { label: tr.navContact,        icon: <ChevronRight size={13} />,  hint: "§3",  action: () => scrollTo("contact") },
    { label: "GitHub",             icon: <ExternalLink size={13} />,  hint: "↗",   action: () => { window.open("https://github.com/neo-nunez", "_blank"); setCmdOpen(false); } },
    { label: "LinkedIn",           icon: <ExternalLink size={13} />,  hint: "↗",   action: () => { window.open("https://linkedin.com/in/neo-nunez", "_blank"); setCmdOpen(false); } },
    { label: tr.cmdCopyEmail,      icon: <Copy size={13} />,          hint: "⌘C",  action: () => { navigator.clipboard.writeText("neonunez129@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); setCmdOpen(false); } },
  ];

  const sections = [
    { id: "intro",      label: tr.sectionIntro },
    { id: "experience", label: tr.navExperience },
    { id: "projects",   label: tr.navProjects },
    { id: "skills",     label: tr.sectionSkills },
    { id: "languages",  label: tr.sectionLanguages },
    { id: "contact",    label: tr.navContact },
  ];

  // Stagger delays for intro items
  const introDelay = [0.05, 0.12, 0.19, 0.26];
  const nameChars = "Neo Nuñez".split("");

  return (
    <div className="min-h-screen bg-[#121212] text-[#e4e4e7] antialiased">

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px 128px",
        }} />

      {/* Section indicator */}
      <SectionIndicator active={activeSection} sections={sections} />

      {/* Command palette */}
      <CommandPalette items={cmdItems} open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-40"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", backgroundColor: "rgba(18,18,18,0.75)" }}>
        <nav className="px-8 py-3.5 flex items-center justify-between max-w-[780px] mx-auto">
          <a href="/" className="font-mono text-sm text-[#e4e4e7] opacity-80 hover:opacity-100 tracking-tight">nn_</a>
          <div className="flex items-center gap-5">
            <a href="#experience" className="link-anim text-[#888] hover:text-[#e4e4e7] pb-px flex items-center" aria-label={tr.navExperience}>
              <Briefcase size={15} className="md:hidden" />
              <span className="hidden md:inline text-sm">{tr.navExperience}</span>
            </a>
            <a href="#projects" className="link-anim text-[#888] hover:text-[#e4e4e7] pb-px flex items-center" aria-label={tr.navProjects}>
              <Code2 size={15} className="md:hidden" />
              <span className="hidden md:inline text-sm">{tr.navProjects}</span>
            </a>
            <a href="#contact" className="link-anim text-[#888] hover:text-[#e4e4e7] pb-px flex items-center" aria-label={tr.navContact}>
              <Mail size={15} className="md:hidden" />
              <span className="hidden md:inline text-sm">{tr.navContact}</span>
            </a>
            <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer"
              className="text-[#888] hover:text-[#e4e4e7] transition-colors" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/neo-nunez" target="_blank" rel="noreferrer"
              className="text-[#888] hover:text-[#e4e4e7] transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* ⌘K hint */}
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-[#444] hover:text-[#666] transition-colors text-[10px] font-mono border border-white/[0.05] rounded px-1.5 py-0.5"
              aria-label="Open command palette"
            >
              <span>⌘K</span>
            </button>
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>
        </nav>
        {/* Mobile: active section label — hidden on xl+ where sidebar is visible */}
        <div className="xl:hidden border-t border-white/[0.04]">
          <div className="max-w-[780px] mx-auto px-8 py-1.5 flex items-center gap-2">
            <span className="block h-px w-3 bg-white/20" />
            <span className="text-[9px] uppercase tracking-widest text-[#444] font-medium">
              {sections.find(s => s.id === activeSection)?.label ?? ""}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="pt-24 pb-24 px-8 max-w-[640px] mx-auto">

        {/* ── Intro section ── */}
        <div id="intro">

          {/* Name — character-by-character reveal */}
          <h1 className="text-2xl font-semibold text-[#e4e4e7] mb-3 flex flex-wrap">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 + i * 0.028 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[0] }}
            className="text-[#888] text-sm leading-relaxed mb-6">
            {tr.tagline}
          </motion.p>

          {/* Status lines */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[1] }}
            className="space-y-2.5 text-sm leading-relaxed mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#888]">{tr.workingAt}</span>
              <Badge icon={<Building2 size={11} className="text-[#60a5fa]" />}>Apply Latam</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#888]">{tr.building}</span>
              <Badge icon={<BrainCircuit size={11} className="text-[#a78bfa]" />}>Enterprise RAG System</Badge>
              <Badge icon={<Mic size={11} className="text-[#34d399]" />}>VoiceFlow</Badge>
              <Badge icon={<LayoutGrid size={11} className="text-[#fb923c]" />}>FocusPad</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#888]">{tr.studyingAt}</span>
              <Badge icon={<GraduationCap size={11} className="text-[#f472b6]" />}>UBA — Computer Science</Badge>
            </div>
            <div className="flex items-center gap-1 flex-nowrap">
              <span className="text-[#888] shrink-0 mr-1">{tr.fluentIn}</span>
              <FlagBadge flag="🇦🇷" label={tr.langSpanish} compact />
              <FlagBadge flag="🇬🇧" label={tr.langEnglish} compact />
              <FlagBadge flag="🇫🇷" label={tr.langFrench} compact />
              <FlagBadge flag="🇩🇪" label={tr.langGerman} compact />
              <FlagBadge flag="🇮🇹" label={tr.langItalian} compact />
              <FlagBadge flag="🇧🇷" label={tr.langPortuguese} compact />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: introDelay[2] }}
            className="space-y-4 text-sm leading-[1.85] text-[#aaa]">
            <p>
              {tr.bio1.split("github.com/neo-nunez")[0]}
              <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer"
                className="link-anim text-[#e4e4e7] pb-px">
                github.com/neo-nunez
              </a>
              {tr.bio1.split("github.com/neo-nunez")[1]}
            </p>
            <p>{tr.bio2}</p>
            <p>
              {tr.bio3}{" "}
              <a href="mailto:neonunez129@gmail.com"
                className="link-anim text-[#e4e4e7] pb-px">
                {tr.bio3Link}
              </a>.
            </p>
          </motion.div>

        </div>{/* end #intro */}

        <Divider />

        {/* ── Experience ── */}
        <section id="experience">
          <FadeUp>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">{tr.sectionExperience}</h2>
          </FadeUp>
          <div className="space-y-6">
            <FadeUp delay={0.05}>
              <HoverRow>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-sm font-medium text-[#e4e4e7]">{tr.exp1Title}</h3>
                  <span className="text-xs text-[#555] whitespace-nowrap">{tr.exp1Period}</span>
                </div>
                <p className="text-xs text-[#666] mb-3">Apply Latam · Buenos Aires</p>
                <ul className="space-y-1.5 text-sm text-[#888] leading-relaxed">
                  <li>{tr.exp1p1}</li>
                  <li>{tr.exp1p2}</li>
                  <li>{tr.exp1p3}</li>
                  <li>{tr.exp1p4}</li>
                </ul>
              </HoverRow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <HoverRow>
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-sm font-medium text-[#e4e4e7]">{tr.exp2Title}</h3>
                  <span className="text-xs text-[#555] whitespace-nowrap">{tr.exp2Period}</span>
                </div>
                <p className="text-xs text-[#666] mb-3">Apply Latam · Buenos Aires</p>
                <ul className="space-y-1.5 text-sm text-[#888] leading-relaxed">
                  <li>{tr.exp2p1}</li>
                  <li>{tr.exp2p2}</li>
                </ul>
              </HoverRow>
            </FadeUp>
          </div>
        </section>

        <Divider />

        {/* ── Projects ── */}
        <section id="projects">
          <FadeUp>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">{tr.sectionProjects}</h2>
          </FadeUp>
          <div className="space-y-4">
            {[
              { name: "Enterprise RAG System", desc: tr.proj1Desc, tags: ["Next.js", "FastAPI", "LangGraph", "LlamaIndex", "Supabase", "Gemini Flash"] },
              { name: "VoiceFlow",             desc: tr.proj2Desc, tags: ["Python", "mlx-whisper", "pyobjc", "rumps", "pywebview"] },
              { name: "FocusPad",              desc: tr.proj3Desc, tags: ["React Native", "Expo", "TypeScript"] },
            ].map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.06}>
                <HoverRow>
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="text-sm font-medium text-[#e4e4e7]">{p.name}</h3>
                    <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer"
                      className="text-xs text-[#555] hover:text-[#888] transition-colors whitespace-nowrap">
                      {tr.inDevelopment}
                    </a>
                  </div>
                  <p className="text-sm text-[#888] leading-relaxed mb-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(label => <TechBadge key={label} label={label} />)}
                  </div>
                </HoverRow>
              </FadeUp>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Skills ── */}
        <FadeUp>
          <section id="skills">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">{tr.sectionSkills}</h2>
            <div className="space-y-3 text-sm text-[#888]">
              {[
                { label: tr.skillLang,     value: "Python · JavaScript · TypeScript · Groovy · Jython · SQL · HTML · CSS" },
                { label: "AI / ML",        value: "LangGraph · LlamaIndex · RAG · LLM orchestration · Gemini · Ollama · mlx-whisper · prompt engineering" },
                { label: "Frameworks",     value: "FastAPI · Next.js · React Native (Expo)" },
                { label: tr.skillData,     value: "Oracle ODI · ETL/ELT · Supabase · data warehousing" },
                { label: tr.skillTools,    value: "Git · Docker · Cursor · Google Workspace" },
                { label: tr.skillLearning, value: "ML fundamentals · neural networks · fine-tuning · reinforcement learning" },
              ].map(row => (
                <div key={row.label} className="grid gap-x-6" style={{ gridTemplateColumns: "7rem 1fr" }}>
                  <span className="text-[#555] text-xs self-start pt-[3px] leading-relaxed">{row.label}</span>
                  <span className="leading-relaxed">{row.value}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Languages ── */}
        <FadeUp>
          <section id="languages">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-5">{tr.sectionLanguages}</h2>
            <p className="text-sm leading-[1.85] text-[#888] mb-6">{tr.langsBio}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-[#888]">
              {[
                { name: tr.langSpanish,    level: tr.langNative,      cert: "#" },
                { name: tr.langPortuguese, level: tr.langNativeLevel,  cert: "#" },
                { name: tr.langEnglish,    level: "C1 · Cambridge",    cert: "#" },
                { name: tr.langFrench,     level: "B2 · Alliance Fr.", cert: "#" },
                { name: tr.langGerman,     level: "B2 · Goethe",       cert: "#" },
                { name: tr.langItalian,    level: "B1 · Dante Aligh.", cert: "#" },
              ].map(({ name, level, cert }) => (
                <div key={name} className="flex items-center justify-between gap-2">
                  <a
                    href={cert}
                    target="_blank"
                    rel="noreferrer"
                    className="group link-anim inline-flex items-center gap-1.5 text-[#e4e4e7] pb-px hover:text-white"
                  >
                    {name}
                    <ExternalLink
                      size={10}
                      className="opacity-25 group-hover:opacity-60 transition-opacity shrink-0"
                    />
                  </a>
                  <span className="text-[#555] text-xs shrink-0">{level}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Contact ── */}
        <FadeUp>
          <section id="contact">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-5">{tr.sectionFindMe}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
              <SocialLink href="https://github.com/neo-nunez">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/neo-nunez">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </SocialLink>
            </div>
            <p className="text-sm text-[#888]">
              {tr.orMailMe}{" "}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("neonunez129@gmail.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="link-anim inline-flex items-center gap-1.5 text-[#e4e4e7] cursor-pointer pb-px"
              >
                {copied
                  ? <><Check size={12} className="text-[#34d399]" /><span className="text-[#34d399]">Copied!</span></>
                  : "neonunez129@gmail.com"
                }
              </button>
            </p>
            <p className="text-sm text-[#555] mt-3">
              You can also{" "}
              <a href="/cv.pdf" download
                className="link-anim text-[#888] hover:text-[#e4e4e7] pb-px inline-flex items-center gap-1"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                download my CV
              </a>
              .
            </p>
          </section>
        </FadeUp>

      </main>
    </div>
  );
}
