"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MENTORS, type Mentor } from "@/data/mentors";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function MentorChat() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor>(MENTORS[2]); // Julia Child default
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const switchMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setMessages([]);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          mentorId: selectedMentor.id,
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
    <div className="mx-auto max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Ask Your <span className="text-copper">Mentor</span>
      </h2>
      <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-10">
        Choose a culinary legend and ask anything about flavor, technique, or
        food culture.
      </p>

      {/* Mentor selector */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {MENTORS.map((mentor) => (
          <button
            key={mentor.id}
            onClick={() => switchMentor(mentor)}
            className={`flex-1 rounded-xl border p-4 text-left transition-all ${
              selectedMentor.id === mentor.id
                ? "border-copper bg-copper/10"
                : "border-border bg-surface hover:border-copper/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{mentor.emoji}</span>
              <span className="font-semibold text-sm">{mentor.name}</span>
            </div>
            <p className="text-xs text-foreground/40">{mentor.philosophy}</p>
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-4xl mb-4">{selectedMentor.emoji}</span>
              <p className="text-foreground/40 text-sm max-w-sm">
                <span className="text-copper font-medium">
                  {selectedMentor.name}
                </span>{" "}
                is ready. Ask about flavor pairings, technique, cultural
                traditions, or what to do with that lonely eggplant.
              </p>
              <p className="text-foreground/25 text-xs mt-3 italic">
                &ldquo;{selectedMentor.quote}&rdquo;
              </p>
            </div>
          )}

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
                    {selectedMentor.emoji} {selectedMentor.name}
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
                  {selectedMentor.emoji} {selectedMentor.name}
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
              placeholder={`Ask ${selectedMentor.name} anything...`}
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
