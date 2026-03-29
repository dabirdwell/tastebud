"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getMentorById, MENTORS, type MentorProfile } from "@/data/mentors";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface MentorChatProps {
  mentorId?: string;
  initialContext?: string;
}

export default function MentorChat({
  mentorId = "julia",
  initialContext,
}: MentorChatProps) {
  const [mentor, setMentor] = useState<MentorProfile>(
    () => getMentorById(mentorId) ?? MENTORS[0]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greetingSent = useRef(false);

  // Show greeting on mount or mentor change
  useEffect(() => {
    const m = getMentorById(mentorId) ?? MENTORS[0];
    setMentor(m);
    setMessages([{ role: "assistant", content: m.greeting }]);
    setInput(initialContext ?? "");
    greetingSent.current = true;
  }, [mentorId, initialContext]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    // Send all messages except the greeting (which is display-only)
    const apiMessages = [...messages.slice(1), userMessage];
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          mentorId: mentor.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Try again — the kitchen never closes.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Chat header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{mentor.emoji}</span>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {mentor.name}
          </h2>
          <p className="text-xs text-copper">{mentor.title}</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        {/* Messages */}
        <div className="h-[28rem] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-copper/15 text-foreground"
                    : "bg-surface-light text-foreground/80 border border-border"
                }`}
              >
                {msg.role === "assistant" && (
                  <span className="text-xs text-copper font-medium block mb-1">
                    {mentor.emoji} {mentor.name}
                  </span>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-surface-light border border-border rounded-2xl px-4 py-3">
                <span className="text-xs text-copper font-medium block mb-1">
                  {mentor.emoji} {mentor.name}
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-copper/40 animate-pulse" />
                  <span
                    className="w-2 h-2 rounded-full bg-copper/40 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-copper/40 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${mentor.name} anything...`}
              rows={1}
              className="flex-1 resize-none rounded-xl bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-copper/50 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-copper px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-copper-light disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-foreground/20 mt-2 text-center">
            AI mentor persona — not an impersonation. Shift+Enter for new line.
          </p>
        </div>
      </div>
    </div>
  );
}
