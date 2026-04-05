"use client";

import { useState, useEffect } from "react";
import { MENTORS, type MentorProfile } from "@/data/mentors";
import { useSubscription, type SubscriptionTier } from "@/hooks/useSubscription";
import Link from "next/link";

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: "Free", color: "#4ade80" },
  plus: { label: "Plus", color: "#60a5fa" },
  pro: { label: "Pro", color: "#c084fc" },
  academy: { label: "Academy", color: "#f59e0b" },
};

const STORAGE_KEY = "tastebud-mentor";

export default function MentorProfiles() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const { hasAccess, startCheckout } = useSubscription();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelectedMentor(saved);
    setHydrated(true);
  }, []);

  const selectMentor = (mentor: MentorProfile) => {
    if (!hasAccess(mentor.tier as SubscriptionTier)) return;
    setSelectedMentor(mentor.id);
    localStorage.setItem(STORAGE_KEY, mentor.id);
  };

  if (!hydrated) return null;

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Choose Your <span className="text-copper">Cooking Mentor</span>
        </h1>
        <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
          Five culinary legends, each with a unique teaching philosophy.
          Pick your mentor and start a conversation.
        </p>

        {/* Mentor profile cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MENTORS.map((mentor) => {
            const isSelected = selectedMentor === mentor.id;
            const tierInfo = TIER_LABELS[mentor.tier];
            const isLocked = !hasAccess(mentor.tier as SubscriptionTier);

            return (
              <button
                key={mentor.id}
                onClick={() => {
                  if (isLocked) {
                    startCheckout(mentor.tier as "plus" | "pro" | "academy");
                    return;
                  }
                  selectMentor(mentor);
                }}
                className={`text-left rounded-2xl border p-6 transition-all duration-300 group relative ${isLocked ? "opacity-60" : ""}`}
                style={{
                  borderColor: isSelected
                    ? "var(--copper)"
                    : "var(--border)",
                  backgroundColor: isSelected
                    ? "rgba(184, 115, 51, 0.08)"
                    : "var(--surface)",
                }}
              >
                {/* Tier badge */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: `${tierInfo.color}15`,
                    color: tierInfo.color,
                    border: `1px solid ${tierInfo.color}30`,
                  }}
                >
                  {tierInfo.label}
                </span>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{mentor.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-copper">{mentor.title}</p>
                  </div>
                </div>

                <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                  {mentor.personality}
                </p>

                <p className="text-xs text-foreground/40 leading-relaxed mb-4">
                  {mentor.teachingStyle}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.specialties.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper/70"
                    >
                      {s}
                    </span>
                  ))}
                  {mentor.specialties.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper/70">
                      +{mentor.specialties.length - 4}
                    </span>
                  )}
                </div>

                {/* Greeting preview */}
                <p className="text-xs italic text-foreground/30 line-clamp-2">
                  &ldquo;{mentor.greeting}&rdquo;
                </p>

                <div
                  className="mt-4 text-center text-xs font-medium py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--copper)"
                      : "transparent",
                    color: isSelected ? "#0a0a08" : "var(--copper)",
                    border: isSelected
                      ? "none"
                      : "1px solid rgba(184, 115, 51, 0.3)",
                  }}
                >
                  {isSelected ? "✓ Selected" : isLocked ? `Upgrade to ${tierInfo.label}` : "Select mentor"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat CTA */}
        {selectedMentor && (
          <div className="text-center">
            <Link
              href={`/chat?mentor=${selectedMentor}`}
              className="inline-flex items-center gap-2 rounded-xl bg-copper px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-copper-light"
            >
              Start Chatting with{" "}
              {MENTORS.find((m) => m.id === selectedMentor)?.name}
              <span className="text-lg">
                {MENTORS.find((m) => m.id === selectedMentor)?.emoji}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
