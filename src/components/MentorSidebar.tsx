"use client";

import { useState, useEffect, useMemo } from "react";
import { MENTORS, type Mentor, type MentorTip } from "@/data/mentors";

const STORAGE_KEY = "tastebud-mentor";

const MENTOR_COLORS: Record<string, { accent: string; text: string; bg: string; border: string }> = {
  bold: { accent: "#e53e3e", text: "#fc8181", bg: "rgba(229, 62, 62, 0.08)", border: "rgba(229, 62, 62, 0.25)" },
  classique: { accent: "#3182ce", text: "#63b3ed", bg: "rgba(49, 130, 206, 0.08)", border: "rgba(49, 130, 206, 0.25)" },
  joy: { accent: "#d69e2e", text: "#f6e05e", bg: "rgba(214, 158, 46, 0.08)", border: "rgba(214, 158, 46, 0.25)" },
};

const CATEGORY_LABELS: Record<MentorTip["category"], string> = {
  knife: "Knife Skills",
  seasoning: "Seasoning",
  timing: "Timing",
  plating: "Plating",
};

const CATEGORY_ICONS: Record<MentorTip["category"], string> = {
  knife: "🔪",
  seasoning: "🧂",
  timing: "⏱",
  plating: "🍽",
};

/**
 * Picks contextual tips based on recipe techniques/steps.
 * Falls back to a random selection if no context matches.
 */
function pickContextualTips(mentor: Mentor, techniques: string[]): MentorTip[] {
  const techLower = techniques.map((t) => t.toLowerCase()).join(" ");

  const scored = mentor.tips.map((tip) => {
    let score = 0;
    if (tip.category === "knife" && /chop|dice|slice|cut|julienne|mince|brunoise|knife/.test(techLower)) score += 2;
    if (tip.category === "seasoning" && /season|salt|spice|herb|marinate|brine|rub/.test(techLower)) score += 2;
    if (tip.category === "timing" && /simmer|braise|roast|bake|rest|reduce|caramelize/.test(techLower)) score += 2;
    if (tip.category === "plating" && /plate|garnish|serve|present|arrange/.test(techLower)) score += 2;
    return { tip, score };
  });

  // Sort by score descending, then pick top 3 from different categories
  scored.sort((a, b) => b.score - a.score);

  const picked: MentorTip[] = [];
  const usedCategories = new Set<string>();

  for (const item of scored) {
    if (picked.length >= 3) break;
    if (!usedCategories.has(item.tip.category)) {
      picked.push(item.tip);
      usedCategories.add(item.tip.category);
    }
  }

  // Fill remaining slots if needed
  for (const item of scored) {
    if (picked.length >= 3) break;
    if (!picked.includes(item.tip)) {
      picked.push(item.tip);
    }
  }

  return picked;
}

export default function MentorSidebar({ techniques }: { techniques: string[] }) {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = MENTORS.find((m) => m.id === saved);
      if (found) setMentor(found);
    }
  }, []);

  const tips = useMemo(() => {
    if (!mentor) return [];
    return pickContextualTips(mentor, techniques);
  }, [mentor, techniques]);

  if (!mentor) return null;

  const colors = MENTOR_COLORS[mentor.id];

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all"
      style={{ borderColor: colors.border, backgroundColor: colors.bg }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <span className="text-xl">{mentor.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: colors.text }}>
            {mentor.name}&rsquo;s Tips
          </p>
          <p className="text-[10px] text-foreground/30">{mentor.style}</p>
        </div>
        <span
          className="text-foreground/30 text-xs transition-transform"
          style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-sm shrink-0 mt-0.5">{CATEGORY_ICONS[tip.category]}</span>
              <div>
                <p
                  className="text-[10px] font-medium uppercase tracking-wider mb-0.5"
                  style={{ color: colors.text }}
                >
                  {CATEGORY_LABELS[tip.category]}
                </p>
                <p className="text-xs text-foreground/60 leading-relaxed">{tip.tip}</p>
              </div>
            </div>
          ))}

          <a
            href="/mentors"
            className="block text-center text-[10px] pt-2 transition-colors hover:opacity-80"
            style={{ color: colors.text }}
          >
            Change mentor →
          </a>
        </div>
      )}
    </div>
  );
}
