"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MENTORS, type Mentor } from "@/data/mentors";
import { MENTOR_QA } from "@/data/mentorQA";

const MENTOR_COLORS: Record<string, { accent: string; accentLight: string; bg: string; border: string; bubble: string; text: string }> = {
  bourdain: {
    accent: "#e53e3e",
    accentLight: "#fc8181",
    bg: "rgba(229, 62, 62, 0.08)",
    border: "rgba(229, 62, 62, 0.25)",
    bubble: "rgba(229, 62, 62, 0.12)",
    text: "#fc8181",
  },
  pepin: {
    accent: "#3182ce",
    accentLight: "#63b3ed",
    bg: "rgba(49, 130, 206, 0.08)",
    border: "rgba(49, 130, 206, 0.25)",
    bubble: "rgba(49, 130, 206, 0.12)",
    text: "#63b3ed",
  },
  child: {
    accent: "#d69e2e",
    accentLight: "#f6e05e",
    bg: "rgba(214, 158, 46, 0.08)",
    border: "rgba(214, 158, 46, 0.25)",
    bubble: "rgba(214, 158, 46, 0.12)",
    text: "#f6e05e",
  },
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function MentorProfiles() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const colors = selectedMentor
    ? MENTOR_COLORS[selectedMentor.id]
    : null;

  const selectMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setMessages([]);
    setInput("");
  };

  const findBestMatch = (userInput: string): string | null => {
    if (!selectedMentor) return null;
    const qa = MENTOR_QA.find((m) => m.mentorId === selectedMentor.id);
    if (!qa) return null;

    const words = userInput.toLowerCase().split(/\s+/);

    let bestScore = 0;
    let bestAnswer: string | null = null;

    for (const pair of qa.pairs) {
      const qWords = pair.question.toLowerCase().split(/\s+/);
      let score = 0;
      for (const w of words) {
        if (w.length < 3) continue;
        if (qWords.some((qw) => qw.includes(w) || w.includes(qw))) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = pair.answer;
      }
    }

    return bestAnswer;
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || !selectedMentor) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const match = findBestMatch(trimmed);

    const fallbacks: Record<string, string> = {
      bourdain:
        "That's a good question, but it's not one I can riff on right now. Try asking me about bold flavors, street food, global cuisines, or how to stop being afraid of your spice rack. The world is wide — let's explore it.",
      pepin:
        "An interesting inquiry, but I must stay within my areas of expertise. Ask me about technique — knife skills, sauces, classical methods, or building flavor through proper fundamentals. The foundation is where we must begin.",
      child:
        "Oh, what a wonderful thought! But I'm better at other things — ask me about getting confident in the kitchen, making vegetables exciting, flavor pairing, or why butter is always the answer. Let's have some fun!",
    };

    const reply = match || fallbacks[selectedMentor.id] || "Try asking about my specialty areas!";

    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: reply },
    ]);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const qa = selectedMentor
    ? MENTOR_QA.find((m) => m.mentorId === selectedMentor.id)
    : null;

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Meet Your <span className="text-copper">Cooking Mentors</span>
        </h1>
        <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
          Three legendary culinary personalities, each with a unique philosophy.
          Pick your mentor and ask them anything about cooking.
        </p>

        {/* Mentor profile cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {MENTORS.map((mentor) => {
            const mc = MENTOR_COLORS[mentor.id];
            const isSelected = selectedMentor?.id === mentor.id;

            return (
              <button
                key={mentor.id}
                onClick={() => selectMentor(mentor)}
                className="text-left rounded-2xl border p-6 transition-all duration-300 group"
                style={{
                  borderColor: isSelected ? mc.accent : "var(--border)",
                  backgroundColor: isSelected ? mc.bg : "var(--surface)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{mentor.emoji}</span>
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: isSelected ? mc.text : "var(--foreground)" }}
                    >
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-foreground/40">{mentor.style}</p>
                  </div>
                </div>

                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: mc.text }}
                >
                  {mentor.philosophy}
                </p>

                <p className="text-sm text-foreground/50 leading-relaxed mb-4">
                  {mentor.id === "bourdain" &&
                    "Encourages bold exploration of global cuisines and street food. Challenges comfort zones with passion and cultural storytelling. Believes the best meals tell a story about people and place."}
                  {mentor.id === "pepin" &&
                    "Emphasizes classical technique as the path to kitchen freedom. Patient and methodical, focused on building a rock-solid foundation. Believes mastering fundamentals unlocks infinite improvisation."}
                  {mentor.id === "child" &&
                    "Makes cooking joyful and fearless. Celebrates mistakes as learning, encourages experimentation, and believes enthusiasm is the most important ingredient. Butter is always the answer."}
                </p>

                <p className="text-xs italic text-foreground/30">
                  &ldquo;{mentor.quote}&rdquo;
                </p>

                <div
                  className="mt-4 text-center text-xs font-medium py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isSelected ? mc.accent : "transparent",
                    color: isSelected ? "#0a0a08" : mc.text,
                    border: isSelected ? "none" : `1px solid ${mc.border}`,
                  }}
                >
                  {isSelected ? "Currently chatting" : "Start chatting"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Conversation area */}
        {selectedMentor && colors && (
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl font-bold text-center mb-2"
              style={{ color: colors.text }}
            >
              {selectedMentor.emoji} Chat with {selectedMentor.name}
            </h2>
            <p className="text-center text-foreground/40 text-sm mb-6">
              Ask a cooking question or pick a suggested topic below.
            </p>

            {/* Suggested questions */}
            {messages.length === 0 && qa && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {qa.pairs.slice(0, 4).map((pair, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(pair.question);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                    style={{
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  >
                    {pair.question}
                  </button>
                ))}
              </div>
            )}

            {/* Chat box */}
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: colors.border,
                backgroundColor: "var(--surface)",
              }}
            >
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <span className="text-5xl mb-4">{selectedMentor.emoji}</span>
                    <p className="text-foreground/40 text-sm max-w-sm">
                      <span className="font-medium" style={{ color: colors.text }}>
                        {selectedMentor.name}
                      </span>{" "}
                      is ready to share their wisdom. Ask a question or tap a
                      suggestion above.
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
                      className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              backgroundColor: colors.bubble,
                              color: "var(--foreground)",
                            }
                          : {
                              backgroundColor: "var(--surface-light)",
                              border: `1px solid ${colors.border}`,
                              color: "var(--foreground)",
                              opacity: 0.9,
                            }
                      }
                    >
                      {msg.role === "assistant" && (
                        <span
                          className="text-xs font-medium block mb-1"
                          style={{ color: colors.text }}
                        >
                          {selectedMentor.emoji} {selectedMentor.name}
                        </span>
                      )}
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="border-t p-4"
                style={{ borderColor: colors.border }}
              >
                <div className="flex gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Ask ${selectedMentor.name} anything...`}
                    rows={1}
                    className="flex-1 resize-none rounded-xl bg-background border px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--border)",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = colors.accent;
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "var(--border)";
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="rounded-xl px-5 py-3 text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: colors.accent,
                      color: "#0a0a08",
                    }}
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-foreground/20 mt-2 text-center">
                  Pre-written mentor responses — Shift+Enter for new line
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
