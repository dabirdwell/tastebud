"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import MentorChat from "@/components/MentorChat";
import { MENTORS, getMentorsForTier } from "@/data/mentors";

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: "Free", color: "#4ade80" },
  plus: { label: "Plus $4.99/mo", color: "#60a5fa" },
  pro: { label: "Pro $9.99/mo", color: "#c084fc" },
  academy: { label: "Academy $19.99/mo", color: "#f59e0b" },
};

// For now, default to free tier (auth/billing not yet built)
const USER_TIER = "free";

function ChatContent() {
  const searchParams = useSearchParams();
  const mentorParam = searchParams.get("mentor");
  const contextParam = searchParams.get("context");

  const [activeMentorId, setActiveMentorId] = useState<string>(
    mentorParam ?? "julia"
  );

  useEffect(() => {
    if (mentorParam) setActiveMentorId(mentorParam);
  }, [mentorParam]);

  const availableMentors = getMentorsForTier(USER_TIER);
  const availableIds = new Set(availableMentors.map((m) => m.id));

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Ask Your <span className="text-copper">Mentor</span>
      </h1>
      <p className="text-center text-foreground/50 max-w-xl mx-auto mb-10 text-sm">
        Choose a culinary legend and ask anything about flavor, technique, or
        food culture.
      </p>

      {/* Mentor selector bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {MENTORS.map((mentor) => {
          const isActive = activeMentorId === mentor.id;
          const isAvailable = availableIds.has(mentor.id);
          const tierInfo = TIER_LABELS[mentor.tier];

          return (
            <button
              key={mentor.id}
              onClick={() => {
                if (isAvailable) setActiveMentorId(mentor.id);
              }}
              disabled={!isAvailable}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                isActive
                  ? "border-copper bg-copper/10 text-foreground"
                  : isAvailable
                    ? "border-border bg-surface hover:border-copper/30 text-foreground/70"
                    : "border-border/50 bg-surface/50 text-foreground/30 cursor-not-allowed"
              }`}
            >
              <span className="text-lg">{mentor.emoji}</span>
              <span className="font-medium">{mentor.name}</span>
              {!isAvailable && (
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: `${tierInfo.color}15`,
                    color: tierInfo.color,
                    border: `1px solid ${tierInfo.color}30`,
                  }}
                >
                  {tierInfo.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Locked mentor message */}
      {!availableIds.has(activeMentorId) && (
        <div className="text-center mb-8 p-6 rounded-xl border border-border bg-surface">
          <p className="text-foreground/60 text-sm">
            This mentor requires an upgrade to{" "}
            <span className="text-copper font-medium">
              {TIER_LABELS[MENTORS.find((m) => m.id === activeMentorId)?.tier ?? "plus"]?.label}
            </span>
            . Julia Child is available on the free tier.
          </p>
        </div>
      )}

      {/* Chat component */}
      {availableIds.has(activeMentorId) && (
        <MentorChat
          key={activeMentorId}
          mentorId={activeMentorId}
          initialContext={contextParam ?? undefined}
        />
      )}
    </>
  );
}

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav />

      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <Suspense
            fallback={
              <div className="text-center py-20 text-foreground/30">
                Loading chat...
              </div>
            }
          >
            <ChatContent />
          </Suspense>
        </div>
      </main>

      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">
              Mentor Chat
            </span>
          </div>
          <p className="text-sm text-foreground/30">
            &copy; 2026 Fawkes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
