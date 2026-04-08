import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  Terminal,
  Database,
  Cpu,
  Layers,
  Globe,
  BookOpen
} from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import avatarImg from "@/assets/avatar.png";

// Reusable animated section component
const Section = ({ 
  children, 
  className = "", 
  id 
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  // Dark mode enforcement since this is a dark theme portfolio
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f8fafc] font-sans selection:bg-[#00e5ff] selection:text-black overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00e5ff] rounded-full mix-blend-screen filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0055ff] rounded-full mix-blend-screen filter blur-[150px]" />
      </div>

      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-[#0a0c10]/50 border-b border-white/5">
        <div className="font-mono text-sm tracking-widest text-[#00e5ff]">NN_</div>
        <div className="hidden md:flex gap-8 text-sm font-mono text-zinc-400">
          <a href="#about" className="hover:text-[#00e5ff] transition-colors">01. About</a>
          <a href="#experience" className="hover:text-[#00e5ff] transition-colors">02. Experience</a>
          <a href="#projects" className="hover:text-[#00e5ff] transition-colors">03. Projects</a>
          <a href="#contact" className="hover:text-[#00e5ff] transition-colors">04. Contact</a>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <section className="min-h-[100dvh] flex flex-col justify-center pt-20">
          <motion.div style={{ opacity, y }} className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#00e5ff] font-mono tracking-widest mb-6"
            >
              INITIATING SEQUENCE...
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            >
              Neo Nuñez.
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-zinc-500 mb-8"
            >
              I build intelligent systems.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
            >
              AI Engineer & Oracle Data Integration Developer based in Buenos Aires. 
              Focused on crafting production-grade RAG pipelines, data architecture, 
              and precise automation tools. Fluent in six languages, driven by curiosity.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <a href="#projects" className="px-8 py-4 bg-[#00e5ff] text-black font-semibold rounded hover:bg-white transition-colors duration-300">
                View Architecture
              </a>
              <div className="flex gap-6">
                <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#00e5ff] transition-colors">
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/neo-nunez" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#00e5ff] transition-colors">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce"
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* About Section */}
        <Section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[#00e5ff] text-xl">01.</span>
              <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
              <div className="h-px bg-white/10 flex-1 ml-4"></div>
            </div>
            
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                I am an AI Engineer with a background in enterprise data integration. My focus lies in 
                bridging the gap between complex data architectures and cutting-edge artificial intelligence.
              </p>
              <p>
                Currently working at <span className="text-[#00e5ff]">Apply Latam</span>, I design and maintain 
                end-to-end data pipelines using Oracle Data Integrator, leveraging advanced scripting to 
                automate dynamic workflows and orchestrate complex integration scenarios.
              </p>
              <p>
                Beyond enterprise systems, I am deeply invested in the AI ecosystem—building RAG pipelines, 
                exploring LLM orchestration frameworks, and developing tools that augment human capabilities. 
                I'm seeking roles where I can design, build, and ship intelligent systems that solve real-world problems.
              </p>
              
              <div className="pt-6">
                <p className="font-mono text-[#00e5ff] mb-4">Core Technologies:</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> Python / JavaScript</li>
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> LangGraph / LlamaIndex</li>
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> Next.js / React Native</li>
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> Oracle ODI / Supabase</li>
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> Groovy / Jython</li>
                  <li className="flex items-center gap-2"><span className="text-[#00e5ff]">▹</span> FastAPI / Docker</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative group mx-auto max-w-md w-full">
            <div className="absolute inset-0 bg-[#00e5ff] rounded translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src={avatarImg} 
              alt="Neo Nuñez - AI Abstract" 
              className="relative z-10 w-full h-auto rounded grayscale hover:grayscale-0 transition-all duration-500 bg-[#0a0c10] border border-white/10"
            />
            <div className="absolute inset-0 z-20 bg-[#00e5ff]/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 rounded pointer-events-none"></div>
          </div>
        </Section>

        {/* Experience Section */}
        <Section id="experience">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#00e5ff] text-xl">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
            <div className="h-px bg-white/10 flex-1 ml-4"></div>
          </div>

          <div className="space-y-16 max-w-4xl mx-auto">
            <div className="relative pl-8 md:pl-0 border-l border-white/10 md:border-none">
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-white/10"></div>
              
              {/* Job 1 */}
              <div className="relative mb-16 md:pl-12">
                <div className="absolute -left-[33px] md:-left-1.5 top-1.5 w-3 h-3 bg-[#00e5ff] rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                <h3 className="text-2xl font-bold text-white flex flex-col md:flex-row md:items-center gap-2">
                  Oracle Data Integration Developer 
                  <span className="hidden md:inline text-[#00e5ff]">@</span>
                  <span className="text-[#00e5ff]">Apply Latam</span>
                </h3>
                <p className="font-mono text-zinc-500 mt-2 mb-6">2025 — Present | Buenos Aires</p>
                <ul className="space-y-4 text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Designed, developed, and maintained end-to-end data integration pipelines for enterprise clients.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Leveraged Groovy scripting for advanced transformation logic, custom event handlers, and dynamic workflow automation in Oracle Data Integrator.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Utilized Jython scripting to extend platform capabilities, automate tasks, and orchestrate complex integration scenarios.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Collaborated with cross-functional teams to gather requirements, model data mappings, and deliver robust integration solutions.</span>
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="relative md:pl-12">
                <div className="absolute -left-[33px] md:-left-1.5 top-1.5 w-3 h-3 bg-zinc-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white flex flex-col md:flex-row md:items-center gap-2">
                  Internship (Enterprise Support)
                  <span className="hidden md:inline text-[#00e5ff]">@</span>
                  <span className="text-[#00e5ff]">Apply Latam</span>
                </h3>
                <p className="font-mono text-zinc-500 mt-2 mb-6">2024 — 2025 | Buenos Aires</p>
                <ul className="space-y-4 text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Served on the enterprise technical support team for Oracle Enterprise Planning Services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Resolved technical issues reducing client downtime through structured troubleshooting methodology.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00e5ff] mt-1">▹</span>
                    <span>Managed server maintenance tasks across multiple clients ensuring system reliability.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#00e5ff] text-xl">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold">Architecture & Systems</h2>
            <div className="h-px bg-white/10 flex-1 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#11141b] border border-white/5 rounded p-8 flex flex-col h-full group hover:border-[#00e5ff]/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <Database className="text-[#00e5ff]" size={40} />
                <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
              </div>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-zinc-200 group-hover:text-[#00e5ff] transition-colors">Enterprise RAG System</h3>
              </div>
              <p className="text-zinc-400 mb-8 flex-1 leading-relaxed">
                Production-grade Retrieval-Augmented Generation system designed for employee onboarding using Oracle EPM documentation. Built for precision and scale.
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500">
                <span>Next.js</span>
                <span>FastAPI</span>
                <span>LangGraph</span>
                <span>LlamaIndex</span>
                <span>Supabase</span>
                <span>Gemini Flash</span>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#11141b] border border-white/5 rounded p-8 flex flex-col h-full group hover:border-[#00e5ff]/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <Terminal className="text-[#00e5ff]" size={40} />
                <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-zinc-200 group-hover:text-[#00e5ff] transition-colors">VoiceFlow</h3>
              </div>
              <p className="text-zinc-400 mb-8 flex-1 leading-relaxed">
                macOS menu bar speech-to-text application. A lightweight, self-hosted alternative to Wispr Flow running native models via MLX.
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500">
                <span>Python</span>
                <span>mlx-whisper</span>
                <span>pyobjc</span>
                <span>rumps</span>
                <span>pywebview</span>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#11141b] border border-white/5 rounded p-8 flex flex-col h-full group hover:border-[#00e5ff]/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <Layers className="text-[#00e5ff]" size={40} />
                <a href="https://github.com/neo-nunez" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-zinc-200 group-hover:text-[#00e5ff] transition-colors">FocusPad</h3>
              </div>
              <p className="text-zinc-400 mb-8 flex-1 leading-relaxed">
                Comprehensive personal iOS productivity suite encompassing reminders, notes, tasks, calendar, daily planner, and habit tracking.
              </p>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500">
                <span>React Native</span>
                <span>Expo</span>
                <span>TypeScript</span>
              </div>
            </motion.div>

          </div>
        </Section>

        {/* Global Context / Languages / Ed */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Education & Learning */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-[#00e5ff]" size={24} />
                <h3 className="text-2xl font-bold">Education & Learning</h3>
              </div>
              
              <div className="space-y-8">
                <div className="bg-[#11141b] p-6 rounded border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-2">Bachelor of Computer Science</h4>
                  <p className="text-[#00e5ff] font-mono text-sm mb-4">University of Buenos Aires (UBA) — In Progress</p>
                  <p className="text-zinc-400 text-sm">
                    Currently self-studying ML fundamentals, data structures, algorithms, and statistics for AI to accelerate academic curriculum.
                  </p>
                </div>
                
                <div className="bg-[#11141b] p-6 rounded border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-2">High School: Specialization in Science</h4>
                  <p className="text-zinc-500 font-mono text-sm">San Antonio de Padua, Merlo — 2015-2023</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="text-[#00e5ff]" size={24} />
                <h3 className="text-2xl font-bold">Linguistics</h3>
              </div>
              
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Language structural understanding deeply influences how I approach code and system design.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Spanish</span>
                  <span className="text-xs font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded">Native</span>
                </div>
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Portuguese</span>
                  <span className="text-xs font-mono text-[#00e5ff] bg-[#00e5ff]/10 px-2 py-1 rounded">Native-Level</span>
                </div>
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">English</span>
                    <span className="text-xs font-mono text-zinc-500">C1</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">Cambridge FCE</span>
                </div>
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">French</span>
                    <span className="text-xs font-mono text-zinc-500">B2</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">Alliance Française</span>
                </div>
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">German</span>
                    <span className="text-xs font-mono text-zinc-500">B2</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">Goethe Institut</span>
                </div>
                <div className="bg-[#11141b] p-4 rounded border border-white/5 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">Italian</span>
                    <span className="text-xs font-mono text-zinc-500">B1</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">Istituto Dante Alighieri</span>
                </div>
              </div>
            </div>

          </div>
        </Section>

        {/* Interests & Currently Learning */}
        <Section className="border-y border-white/5 my-12 bg-[#0a0c10]/50 backdrop-blur-sm -mx-6 md:-mx-12 px-6 md:px-12">
          <div className="max-w-4xl mx-auto py-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Currently Exploring</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['ML fundamentals', 'Neural networks', 'Fine-tuning', 'Reinforcement learning', 'AI agent systems', 'Software architecture', 'Personal finance', 'Open-source tooling'].map((interest, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 text-zinc-300 rounded-full text-sm font-medium border border-white/5 hover:border-[#00e5ff]/50 transition-colors">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="pb-32 text-center max-w-2xl mx-auto">
          <span className="font-mono text-[#00e5ff] text-xl block mb-4">04. Next Steps</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Initialize Communication</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Currently exploring roles in AI Engineering where I can design and ship robust, intelligent systems. 
            Whether you have an opportunity, a question, or just want to discuss neural networks and data architecture, 
            my inbox is open.
          </p>
          
          <a 
            href="mailto:neonunez129@gmail.com" 
            className="inline-block px-10 py-5 bg-transparent border-2 border-[#00e5ff] text-[#00e5ff] font-mono font-medium rounded hover:bg-[#00e5ff]/10 transition-all duration-300"
          >
            Say Hello
          </a>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 font-mono text-sm">
            <div className="flex gap-6">
              <a href="mailto:neonunez129@gmail.com" className="flex items-center gap-2 hover:text-[#00e5ff] transition-colors">
                <Mail size={16} /> neonunez129@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <Phone size={16} /> (011) 23542329
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Buenos Aires, Argentina
            </div>
          </div>
        </Section>

      </main>

      <footer className="text-center py-6 text-zinc-600 font-mono text-xs">
        <p>Built by Neo Nuñez. Deployed with precision.</p>
      </footer>
    </div>
  );
}
