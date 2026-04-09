import { useState, useRef, useEffect } from "react";
import { Send, Loader } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED = [
  "What are you building?",
  "Your tech stack?",
  "Open to opportunities?",
  "Languages you speak?",
  "Tell me about yourself",
  "Current job?",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div className="mt-6">
      {/* Label */}
      <p className="text-sm font-medium text-[var(--c-fg)] mb-1">Ask Neo</p>
      <p className="text-xs text-[var(--c-dim)] mb-3 leading-relaxed">
        Curious about my work or background? Ask anything — answers are AI-generated.
      </p>

      {/* Chat box */}
      <div className="border border-[var(--c-border)] rounded-lg overflow-hidden flex flex-col" style={{ height: "280px" }}>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 && (
            <p className="text-[11px] text-[var(--c-deeper)] italic mt-1">Ask a question to get started.</p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <span className={`text-[10px] font-mono shrink-0 mt-0.5 ${msg.role === "user" ? "text-[var(--c-faint)]" : "text-[var(--c-dim)]"}`}>
                {msg.role === "user" ? "you" : "neo"}
              </span>
              <p className={`text-xs leading-relaxed ${msg.role === "user" ? "text-[var(--c-muted)] text-right" : "text-[var(--c-soft)]"}`}>
                {msg.content}
                {msg.role === "assistant" && streaming && i === messages.length - 1 && msg.content === "" && (
                  <Loader size={10} className="animate-spin inline ml-1 text-[var(--c-dim)]" />
                )}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggested pills — horizontal scroll */}
        <div className="flex gap-1.5 px-4 py-2 overflow-x-auto border-t border-[var(--c-border-thin)]" style={{ scrollbarWidth: "none" }}>
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={streaming}
              className="shrink-0 text-[10px] px-2.5 py-1 rounded-full border border-[var(--c-border)] text-[var(--c-dim)] hover:text-[var(--c-muted)] hover:border-[var(--c-border-strong)] transition-colors disabled:opacity-30 whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-t border-[var(--c-border-thin)]">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask anything about Neo…"
            disabled={streaming}
            className="flex-1 text-xs bg-transparent outline-none text-[var(--c-fg)] placeholder:text-[var(--c-deeper)] disabled:opacity-60"
          />
          <button
            onClick={() => send(input)}
            disabled={streaming || !input.trim()}
            className="text-[var(--c-dim)] hover:text-[var(--c-muted)] transition-colors disabled:opacity-30"
          >
            {streaming ? <Loader size={12} className="animate-spin" /> : <Send size={12} />}
          </button>
        </div>

      </div>
    </div>
  );
}
