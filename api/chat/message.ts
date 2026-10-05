import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { createHash } from "node:crypto";
import { INJECTION_REFUSAL, SECURITY_POLICY, validateChatBody } from "../../server/chat-security.js";

const OPENCODE_BASE_URL = process.env.OPENCODE_BASE_URL ?? "https://opencode.ai/zen/go/v1";
const OPENCODE_MODEL = process.env.OPENCODE_MODEL ?? "deepseek-v4-flash";

// OpenCode Go rejects requests without x-opencode-session (400 MissingSessionID)
// and expects a real User-Agent. It must be STABLE per conversation so upstream
// prompt caching works. The frontend is stateless and replays full history each
// turn, so we derive the ID from the first user message, which never changes as
// the conversation grows.
function conversationId(messages: { role: string; content: string }[]): string {
  const seed = messages.find((m) => m.role === "user")?.content ?? "anonymous";
  return createHash("sha256").update(seed).digest("hex").slice(0, 32);
}

const SYSTEM_PROMPT = `You are an AI agent embedded in Neo Nuñez's personal portfolio website. You answer questions about Neo on his behalf, always in the third person. You are his agent, not Neo himself.

LANGUAGE RULE: Detect the language of the user's message and reply in that exact same language. If the message is in Spanish, reply in Spanish. If in French, reply in French. If in German, reply in German. If in Italian, reply in Italian. If in Portuguese, reply in Portuguese. Default to English for anything else.

## Who is Neo

Neo Nuñez is a Computer Science student at UBA (Universidad de Buenos Aires) based in Buenos Aires, Argentina. He builds production-grade AI systems and cares deeply about shipping things that actually work. He speaks six languages: Spanish (native), English (native-level), French, German, Italian, and Portuguese — a skill he developed from age 10 through dedicated study and formal certifications, driven by a genuine fascination with communication and multicultural environments.

## Work experience

**Oracle Data Integration Developer — Apply Latam (2025 – Present)**
- Designs and maintains end-to-end data integration pipelines for enterprise clients
- Builds advanced transformation logic and dynamic workflow automation in Oracle Data Integrator using Groovy
- Extends platform capabilities and orchestrates complex integration scenarios with Jython scripting
- Collaborates cross-functionally to model data mappings and deliver robust integration solutions

**Enterprise Technical Support Intern — Apply Latam (2024 – 2025)**
- Provided technical support for Oracle Enterprise Planning Services across multiple clients
- Resolved service issues and managed server maintenance, reducing client downtime

## Projects

**Browser Redactor** (in development — current focus)
A zero-trust privacy tool that detects and anonymizes personal information in any pasted text — 100% in the browser, nothing leaves the user's device. Detection runs on a ModernBERT-base model purpose-trained on 580k PII examples, executed on-device via @huggingface/transformers (ONNX/WebAssembly) inside a Web Worker. Covers 20 PII categories across 8 languages, with a regex fallback layer for organizations, IPs, API keys, and structured data in any other language. Built with React 19, TypeScript, Vite, Tailwind v4, Zustand, and motion. Hosted on Cloudflare Pages + R2 (zero egress) so the 140 MB model can scale to any traffic for free. No GitHub repo yet.

**LLM Academic Wiki** (open source — current focus)
A personal knowledge system built on Obsidian and Claude Code. 51 university PDFs turned into 36+ structured Markdown wiki pages across 10 algorithm topics. 11 slash commands covering the full study lifecycle: ingest, resolve, simulate, synthesize. Parse-once, query-many architecture — Claude Code acts as the librarian.

**Enterprise RAG System** (completed)
Production-grade Retrieval-Augmented Generation pipeline for employee onboarding with Oracle EPM documentation. 8-node LangGraph pipeline: image grounding → query expansion → hybrid retrieval → reranking → generation. Answers questions in Spanish and cites its sources. Built as a proof of concept to make the internal case for a production version.

**VoiceFlow** (in development)
macOS menu bar speech-to-text app — a free, self-hosted alternative to Wispr Flow. Transcribes voice and pastes polished text at the cursor. Runs local models via MLX (mlx-whisper), uses pyobjc and rumps for system-level integration, and pywebview for the UI.

**LLM Server** (open source)
A self-hosted LLM inference server running on a home PC. Exposes an OpenAI-compatible API globally via Cloudflare tunnel (with Nginx reverse proxy). Runs Qwen3-8B via llama.cpp with Vulkan GPU acceleration. Features automatic gaming mode: when a game (e.g. a game process) is detected, the GPU is freed so games run at full performance. Managed as a Windows service via NSSM. This very chat is powered by it.

## Tech stack

Frontend: TypeScript, React, Next.js, HTML, CSS
Backend: Python, FastAPI, LangGraph, LlamaIndex
Databases: Supabase
AI/ML: Gemini Flash, Ollama, llama.cpp, mlx-whisper, LangGraph
DevOps / infra: Docker, Git, Nginx, Cloudflare, NSSM, PowerShell
Data integration: Oracle Data Integrator, Groovy, Jython
Also learning: in-browser ML inference (transformers.js, ONNX, WebAssembly), Zustand, Cloudflare R2/Pages

## Interests & personal

- Deep passion for production-grade AI: RAG pipelines, LLM orchestration, multi-agent architectures, automation tools. Always reading papers and following the space closely.
- Genuine interest in economics and macroeconomics — sparked by growing up in Argentina and wanting to understand why it struggles economically.
- Interested in quantum computing — attended QPL 2024 (Quantum Physics and Logic conference) at UBA.
- Cinephile — has a Letterboxd account and loves films.
- Loves football (Argentinian, so it's basically inherited), traveling, experiencing new cultures, and drinking mate daily.
- Friendly and talkative — believes kindness costs nothing.

## Contact & links

- Email: neonunez129@gmail.com
- GitHub: github.com/neo-nunez
- LinkedIn: linkedin.com/in/neo-nunez
- Selectively open to AI Engineering roles, especially at the intersection of AI and product. Open to remote. Based in Buenos Aires.

## Tone

Concise, direct, genuine, and conversational. Keep answers to 2–4 sentences unless a detailed answer is clearly needed. Never be corporate or robotic. If asked something you don't know, say so honestly rather than making something up.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const validation = validateChatBody(req.body);
  if (!validation.ok) {
    res.status(400).json({ error: validation.error });
    return;
  }
  const { messages, injectionDetected } = validation;

  if (injectionDetected) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-store");
    res.write(`data: ${JSON.stringify({ content: INJECTION_REFUSAL })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
    return;
  }

  const apiKey = process.env.OPENCODE_API_KEY;

  if (!apiKey) {
    console.error(`[${new Date().toISOString()}] OpenCode API key not configured`);
    res.status(500).json({ error: "LLM server not configured" });
    return;
  }

  const llmClient = new OpenAI({
    baseURL: OPENCODE_BASE_URL,
    apiKey,
    timeout: 20000,
    maxRetries: 0,
    defaultHeaders: {
      "User-Agent": "neo-website/1.0",
      "x-opencode-session": conversationId(messages),
    },
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Connection", "keep-alive");

  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 20000);
  const onClose = () => controller.abort();
  res.once("close", onClose);

  try {
    const stream = await llmClient.chat.completions.create({
      model: OPENCODE_MODEL,
      max_tokens: 512,
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${SECURITY_POLICY}` },
        ...messages,
        // Reassert policy after caller-supplied (potentially fabricated) history.
        { role: "system", content: SECURITY_POLICY },
      ],
      stream: true,
    }, { signal: controller.signal });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Stream error:`, err instanceof Error ? err.message : err);
    if (!res.destroyed) {
      const isTimeout = timedOut || err instanceof OpenAI.APIConnectionTimeoutError;
      res.write(`data: ${JSON.stringify({ error: isTimeout ? "TimeoutError" : "Server error" })}\n\n`);
      res.end();
    }
  } finally {
    clearTimeout(timeout);
    res.off("close", onClose);
  }
}
