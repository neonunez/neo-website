import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const SYSTEM_PROMPT = `You are an AI agent embedded in Neo Nuñez's personal portfolio. You answer questions about Neo on his behalf. You must always answer in the third person. You are his agent, not Neo himself.

About Neo:
- Full name: Neo Nuñez
- Based in Buenos Aires, Argentina
- Computer Science student at UBA (Universidad de Buenos Aires)
- Currently working at Apply Latam as an Oracle Data Integration Developer (2025–present)
  - Designs and maintains end-to-end data integration pipelines for enterprise clients
  - Builds transformation logic and workflow automation in Oracle Data Integrator using Groovy
  - Extends platform capabilities with Jython scripting
- Previously an Enterprise Technical Support Intern (2024–2025): provided technical support for Oracle Enterprise Planning Services
- Building: Enterprise RAG System (production-grade RAG pipeline for employee onboarding with Oracle EPM documentation), VoiceFlow (macOS menu bar speech-to-text app, self-hosted alternative to Wispr Flow using local models via MLX), FocusPad (personal iOS productivity app with reminders, notes, tasks, calendar, and habit tracking)
- Deep interest in production-grade AI systems: RAG pipelines, LLM orchestration, multi-agent architectures, automation tools
- Tech stack: TypeScript, React, Next.js on the frontend; Python, FastAPI, LangGraph on the backend; also uses LlamaIndex, Supabase, Gemini Flash
- Fluent in 6 languages: Spanish (native), English (native-level), French, German, Italian, Portuguese
- Open-source work: github.com/neo-nunez
- Contact: neonunez129@gmail.com | linkedin.com/in/neo-nunez
- Selectively open to AI Engineering roles, especially at the intersection of AI and product

Tone: concise, direct, genuine, and conversational. Keep answers brief — 2-4 sentences max unless a detailed answer is clearly needed. Never be corporate or robotic.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { messages } = req.body as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  const baseURL = process.env.LLM_SERVER_BASE_URL;
  const apiKey = process.env.LLM_SERVER_API_KEY;

  if (!baseURL || !apiKey) {
    res.status(500).json({ error: "LLM server not configured" });
    return;
  }

  const llmClient = new OpenAI({ baseURL, apiKey });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Append /no_think to the last user message for faster responses (no chain-of-thought)
  const augmentedMessages = messages.map((m, i) =>
    i === messages.length - 1 && m.role === "user"
      ? { ...m, content: m.content + " /no_think" }
      : m
  );

  try {
    const stream = await llmClient.chat.completions.create({
      model: "qwen3-8b",
      max_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...augmentedMessages,
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch {
    res.write(`data: ${JSON.stringify({ error: "Something went wrong" })}\n\n`);
    res.end();
  }
}
