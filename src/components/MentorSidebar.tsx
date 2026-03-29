"use client";

import { useState, useEffect } from "react";
import { MENTORS, getMentorById, type MentorProfile } from "@/data/mentors";
import Link from "next/link";

const STORAGE_KEY = "tastebud-mentor";

export default function MentorSidebar({ techniques }: { techniques: string[] }) {
  const [mentor, setMentor] = useState<MentorProfile | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = getMentorById(saved);
      if (found) setMentor(found);
    }
  }, []);

  if (!mentor) return null;

  // Pick specialties relevant to the recipe techniques
  const techLower = techniques.map((t) => t.toLowerCase()).join(" ");
  const relevantSpecialties = mentor.specialties.filter((s) =>
    techLower.split(/\s+/).some((w) => w.length > 2 && s.toLowerCase().includes(w))
  );
  const displaySpecialties =
    relevantSpecialties.length > 0
      ? relevantSpecialties.slice(0, 3)
      : mentor.specialties.slice(0, 3);

  return (
    <div
      className="rounded-xl border border-copper/20 bg-copper/5 overflow-hidden transition-all"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <span className="text-xl">{mentor.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-copper">
            {mentor.name}&rsquo;s Tips
          </p>
          <p className="text-[10px] text-foreground/30">{mentor.title}</p>
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
          <p className="text-xs text-foreground/50 leading-relaxed italic">
            &ldquo;{mentor.greeting.slice(0, 120)}…&rdquo;
          </p>

          <div className="flex flex-wrap gap-1.5">
            {displaySpecialties.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper/70"
              >
                {s}
              </span>
            ))}
          </div>

          <Link
            href={`/chat?mentor=${mentor.id}`}
            className="block text-center text-[10px] text-copper pt-2 transition-colors hover:opacity-80"
          >
            Ask {mentor.name} →
          </Link>

          <a
            href="/mentors"
            className="block text-center text-[10px] text-foreground/30 transition-colors hover:opacity-80"
          >
            Change mentor →
          </a>
        </div>
      )}
    </div>
  );
}
