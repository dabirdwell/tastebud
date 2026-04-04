"use client";

import Link from "next/link";
import { useProgress } from "@/lib/useProgress";

const STAT_CARDS = [
  {
    key: "recipes" as const,
    label: "Recipes Explored",
    icon: "📖",
    href: "/recipes",
    getValue: (p: ReturnType<typeof useProgress>["progress"]) =>
      p.recipesViewed.length,
    target: 25,
  },
  {
    key: "cards" as const,
    label: "Flavor Cards Studied",
    icon: "🔬",
    href: "/learn",
    getValue: (p: ReturnType<typeof useProgress>["progress"]) =>
      p.flavorCardsStudied.length,
    target: 20,
  },
  {
    key: "mentors" as const,
    label: "Mentor Conversations",
    icon: "👩‍🍳",
    href: "/mentors",
    getValue: (p: ReturnType<typeof useProgress>["progress"]) =>
      p.mentorConversations.reduce((sum, m) => sum + m.count, 0),
    target: 10,
  },
  {
    key: "pantry" as const,
    label: "Pantry Items Added",
    icon: "🥘",
    href: "/pantry",
    getValue: (p: ReturnType<typeof useProgress>["progress"]) =>
      p.pantryItems.length,
    target: 30,
  },
  {
    key: "flavormap" as const,
    label: "Flavor Map Profile",
    icon: "🗺️",
    href: "/flavor-map",
    getValue: (p: ReturnType<typeof useProgress>["progress"]) =>
      p.flavorMapCompleted ? 1 : 0,
    target: 1,
  },
];

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 rounded-full bg-border overflow-hidden">
      <div
        className="h-full rounded-full bg-copper transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function daysSince(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function ProfileDashboard() {
  const { progress, loaded } = useProgress();

  if (!loaded) {
    return (
      <div className="py-20 text-center text-foreground/30">
        Loading your progress...
      </div>
    );
  }

  const totalScore = STAT_CARDS.reduce(
    (sum, s) => sum + Math.min(s.getValue(progress) / s.target, 1),
    0
  );
  const overallPct = Math.round((totalScore / STAT_CARDS.length) * 100);

  const memberDays = daysSince(progress.firstVisit);
  const mentorNames: Record<string, string> = {
    julia: "Julia Child",
    pepin: "Jacques Pépin",
    bourdain: "Anthony Bourdain",
    adria: "Ferran Adrià",
    bottura: "Massimo Bottura",
  };

  return (
    <div className="py-12 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Your <span className="text-copper">Progress</span>
          </h1>
          <p className="text-foreground/50 max-w-lg mx-auto">
            Track your culinary education journey across all TasteBud features.
          </p>
        </div>

        {/* Overall progress ring */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-32 h-32 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-border"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-copper"
                strokeDasharray={`${overallPct * 2.64} ${264 - overallPct * 2.64}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-copper">{overallPct}%</span>
            </div>
          </div>
          <p className="text-foreground/50 text-sm">
            Overall completion &middot; Member for {memberDays}{" "}
            {memberDays === 1 ? "day" : "days"}
          </p>
        </div>

        {/* Stat cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {STAT_CARDS.map((stat) => {
            const val = stat.getValue(progress);
            const isComplete = val >= stat.target;
            return (
              <Link
                key={stat.key}
                href={stat.href}
                className="rounded-xl border border-border bg-surface p-6 hover:border-copper/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{stat.icon}</span>
                  {isComplete && (
                    <span className="text-xs font-semibold text-copper bg-copper/10 px-2 py-1 rounded-full">
                      Complete
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-foreground/50 mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold mb-3">
                  <span className="text-copper">{val}</span>
                  <span className="text-foreground/30 text-base font-normal">
                    {" "}
                    / {stat.target}
                  </span>
                </p>
                <ProgressBar value={val} max={stat.target} />
              </Link>
            );
          })}
        </div>

        {/* Mentor breakdown */}
        {progress.mentorConversations.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-6 mb-12">
            <h2 className="text-lg font-semibold mb-4">
              Mentor <span className="text-copper">Conversations</span>
            </h2>
            <div className="space-y-3">
              {progress.mentorConversations.map((m) => (
                <div key={m.mentorId} className="flex items-center justify-between">
                  <span className="text-sm text-foreground/70">
                    {mentorNames[m.mentorId] || m.mentorId}
                  </span>
                  <span className="text-sm font-medium text-copper">
                    {m.count} {m.count === 1 ? "message" : "messages"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-6">
            Keep <span className="text-copper">Going</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {!progress.flavorMapCompleted && (
              <Link
                href="/flavor-map"
                className="rounded-full bg-copper px-6 py-3 text-sm font-semibold text-background hover:bg-copper-light transition-colors"
              >
                Complete Your Flavor Map
              </Link>
            )}
            {progress.flavorCardsStudied.length < 5 && (
              <Link
                href="/learn"
                className="rounded-full border border-copper/40 px-6 py-3 text-sm font-semibold text-copper hover:bg-copper/10 transition-colors"
              >
                Study More Flavor Cards
              </Link>
            )}
            {progress.recipesViewed.length < 5 && (
              <Link
                href="/recipes"
                className="rounded-full border border-copper/40 px-6 py-3 text-sm font-semibold text-copper hover:bg-copper/10 transition-colors"
              >
                Explore Recipes
              </Link>
            )}
            {progress.mentorConversations.length === 0 && (
              <Link
                href="/mentors"
                className="rounded-full border border-copper/40 px-6 py-3 text-sm font-semibold text-copper hover:bg-copper/10 transition-colors"
              >
                Talk to a Mentor
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
