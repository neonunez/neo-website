import { useState, useRef, useEffect } from "react";
import { Send, Loader, Sparkles, Server } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLine } from "@/components/shared";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED = [
  "What is Neo building?",
  "His tech stack?",
  "Open to opportunities?",
  "Languages he speaks?",
  "Tell me about Neo",
  "His current job?",
];

function InitialState() {
  return (
    <motion.div
      key="initial"
      className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--c-border-strong)] bg-[var(--c-surface-2)]">
        <Server size={14} className="text-[var(--c-muted)]" />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-[var(--c-fg)]">Running on a self-hosted LLM</p>
        <p className="text-[11px] text-[var(--c-muted)] leading-relaxed max-w-[280px]">
          This chat is powered by <span className="text-[var(--c-soft)]">qwen3-8b</span> running
          on Neo's private LLM Server — an open-source project exposing local models via an
          OpenAI-compatible API.
        </p>
      </div>
      <Link
        href="/projects/llm-server"
        className="text-[10px] text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors"
      >
        See the project →
      </Link>
    </motion.div>
  );
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setStreaming(true);

    const aiMsg: Message = { role: "assistant", content: "" };
    setMessages([...next, aiMsg]);

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.content) {
              full += parsed.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full };
                return updated;
              });
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Something went wrong. Try again." };
        return updated;
      });
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="mt-8 pt-8 relative">
      <AnimatedLine className="absolute top-0 left-0 right-0" />

      {/* Label */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--c-fg)] opacity-80" />
          <h3 className="text-base font-semibold text-[var(--c-fg)]">Ask Neo's Agent</h3>
        </div>
        <Link
          href="/projects/llm-server"
          className="text-[10px] text-[var(--c-faint)] hover:text-[var(--c-muted)] transition-colors font-mono"
        >
          powered by llm-server ↗
        </Link>
      </div>
      <p className="text-sm text-[var(--c-muted)] mb-5 leading-relaxed max-w-lg">
        Try this interactive AI agent to pull context directly from Neo's projects, experience, and tech stack — running on a self-hosted model.
      </p>

      <div
        className="border border-[var(--c-border-thin)] bg-[var(--c-surface)] rounded-2xl overflow-hidden flex flex-col shadow-sm"
        style={{
          height: "280px",
        }}
      >
        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 relative">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <InitialState key="initial" />
            ) : (
              <motion.div
                key="messages"
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <span className={`text-[10px] font-mono shrink-0 mt-0.5 ${msg.role === "user" ? "text-[var(--c-muted)]" : "text-[var(--c-soft)]"}`}>
                      {msg.role === "user" ? "you" : "agent"}
                    </span>
                    <p className={`text-xs leading-relaxed ${msg.role === "user" ? "text-[var(--c-soft)] text-right" : "text-[var(--c-fg)]"}`}>
                      {msg.content}
                      {msg.role === "assistant" && streaming && i === messages.length - 1 && msg.content === "" && (
                        <Loader size={10} className="animate-spin inline ml-1 text-[var(--c-dim)]" />
                      )}
                    </p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggested pills — horizontal scroll */}
        <AnimatedLine delay={0.4} className="shrink-0" />
        <div className="flex gap-1.5 px-4 py-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={streaming}
              className="shrink-0 text-[10px] px-2.5 py-1 rounded-full border border-[var(--c-border-strong)] text-[var(--c-soft)] hover:text-[var(--c-fg)] hover:bg-[var(--c-surface-2)] hover:border-[var(--c-dim)] transition-[background-color,border-color,color] duration-150 disabled:opacity-30 whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <AnimatedLine delay={0.5} className="shrink-0" />
        <div className="flex items-center gap-3 px-4 py-2.5">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask me anything about Neo…"
            disabled={streaming}
            className="flex-1 text-xs bg-transparent outline-none text-[var(--c-fg)] placeholder:text-[var(--c-muted)] disabled:opacity-60"
          />
          <button
            onClick={() => send(input)}
            disabled={streaming || !input.trim()}
            className="text-[var(--c-soft)] hover:text-[var(--c-fg)] transition-colors disabled:opacity-30"
          >
            {streaming ? <Loader size={12} className="animate-spin" /> : <Send size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
