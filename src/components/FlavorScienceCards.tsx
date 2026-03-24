"use client";

import { useState } from "react";
import { FLAVOR_SCIENCE_CARDS, type FlavorScienceCard } from "@/data/flavorScience";

/* ── Diagram SVGs ─────────────────────────────────────────────── */

function DiagramIcon({ type, size = 120 }: { type: string; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;

  const diagrams: Record<string, React.ReactNode> = {
    maillard: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="maillardGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f5e6d3" />
            <stop offset="40%" stopColor="#d4956b" />
            <stop offset="70%" stopColor="#8b5a2b" />
            <stop offset="100%" stopColor="#3d1f00" />
          </linearGradient>
        </defs>
        <rect x="20" y="15" width={size - 40} height={size - 30} rx="8" fill="url(#maillardGrad)" />
        <text x={cx} y="35" textAnchor="middle" fill="#f5e6d3" fontSize="8" fontWeight="600">280°F+</text>
        <text x={cx} y={cy - 5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">AMINO ACIDS</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#ffd" fontSize="7">+ SUGARS</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="#f5e6d3" fontSize="7">→ 500+ compounds</text>
        <line x1="30" y1={cy + 30} x2={size - 30} y2={cy + 30} stroke="#f5e6d3" strokeWidth="0.5" opacity="0.4" />
        <text x={cx} y={size - 20} textAnchor="middle" fill="#ffd" fontSize="7" opacity="0.7">flavor + color + aroma</text>
      </svg>
    ),
    onion: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <ellipse cx={cx} cy={cy + 10} rx="35" ry="30" fill="#c4a35a" opacity="0.3" />
        <ellipse cx={cx} cy={cy + 10} rx="25" ry="22" fill="#c4a35a" opacity="0.4" />
        <ellipse cx={cx} cy={cy + 10} rx="15" ry="14" fill="#c4a35a" opacity="0.5" />
        <line x1={cx} y1={cy - 20} x2={cx - 15} y2="10" stroke="#6b8e23" strokeWidth="2" />
        <line x1={cx} y1={cy - 20} x2={cx + 10} y2="15" stroke="#6b8e23" strokeWidth="2" />
        <text x={cx + 30} y={cy - 5} fill="#e8e0d4" fontSize="7" opacity="0.8">CUT</text>
        <path d={`M${cx + 27} ${cy - 3} L${cx + 20} ${cy + 5}`} stroke="#e8e0d4" strokeWidth="0.5" opacity="0.5" markerEnd="" />
        <text x={cx} y={size - 15} textAnchor="middle" fill="#a8c256" fontSize="7">syn-propanethial-S-oxide → 😢</text>
      </svg>
    ),
    salt: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x="15" y="30" width="40" height="60" rx="4" fill="none" stroke="#dcdcdc" strokeWidth="1.5" opacity="0.6" />
        <text x="35" y="55" textAnchor="middle" fill="#dcdcdc" fontSize="7">BITTER</text>
        <text x="35" y="65" textAnchor="middle" fill="#dcdcdc" fontSize="7">receptors</text>
        <text x="35" y="80" textAnchor="middle" fill="#c0392b" fontSize="8" fontWeight="700">BLOCKED</text>
        <line x1="60" y1={cy} x2="75" y2={cy} stroke="#dcdcdc" strokeWidth="1" strokeDasharray="3 2" />
        <text x="73" y={cy - 5} fill="#dcdcdc" fontSize="10">🧂</text>
        <rect x="80" y="30" width="28" height="60" rx="4" fill="none" stroke="#e8a0bf" strokeWidth="1.5" opacity="0.6" />
        <text x="94" y="55" textAnchor="middle" fill="#e8a0bf" fontSize="7">SWEET</text>
        <text x="94" y="65" textAnchor="middle" fill="#e8a0bf" fontSize="7">receptors</text>
        <text x="94" y="80" textAnchor="middle" fill="#e8a0bf" fontSize="8" fontWeight="700">ENHANCED</text>
      </svg>
    ),
    altitude: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polygon points={`${cx},15 20,${size - 20} ${size - 20},${size - 20}`} fill="none" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.4" />
        <text x={cx} y="35" textAnchor="middle" fill="#e8e0d4" fontSize="7">5,000 ft</text>
        <text x={cx} y="48" textAnchor="middle" fill="#e8a0bf" fontSize="6">↓ pressure</text>
        <text x="25" y={size - 30} fill="#e67e22" fontSize="6">Gas expands ↑</text>
        <text x={cx + 15} y={size - 30} fill="#4a6fa5" fontSize="6">Boils at 203°F</text>
        <line x1="20" y1={cy + 10} x2={size - 20} y2={cy + 10} stroke="#2a2a22" strokeWidth="0.5" strokeDasharray="3 2" />
        <text x={cx} y={cy + 7} textAnchor="middle" fill="#dcdcdc" fontSize="6">sea level: 212°F</text>
      </svg>
    ),
    umami: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx="35" cy={cy} r="20" fill="none" stroke="#c0392b" strokeWidth="1.5" opacity="0.5" />
        <text x="35" y={cy - 3} textAnchor="middle" fill="#c0392b" fontSize="7" fontWeight="600">GLU</text>
        <text x="35" y={cy + 8} textAnchor="middle" fill="#c0392b" fontSize="6">glutamate</text>
        <text x={cx} y={cy} textAnchor="middle" fill="#e8e0d4" fontSize="12">+</text>
        <circle cx="85" cy={cy} r="20" fill="none" stroke="#e67e22" strokeWidth="1.5" opacity="0.5" />
        <text x="85" y={cy - 3} textAnchor="middle" fill="#e67e22" fontSize="7" fontWeight="600">IMP</text>
        <text x="85" y={cy + 8} textAnchor="middle" fill="#e67e22" fontSize="6">nucleotide</text>
        <text x={cx} y={size - 18} textAnchor="middle" fill="#d4956b" fontSize="8" fontWeight="700">= 8x UMAMI</text>
        <text x={cx} y="18" textAnchor="middle" fill="#e8e0d4" fontSize="7" opacity="0.6">synergistic effect</text>
      </svg>
    ),
    capsaicin: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r="30" fill="none" stroke="#e67e22" strokeWidth="1.5" opacity="0.4" />
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#e67e22" fontSize="8" fontWeight="600">TRPV1</text>
        <text x={cx} y={cy + 2} textAnchor="middle" fill="#e8e0d4" fontSize="6">heat receptor</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill="#c0392b" fontSize="6">{">"}109°F = PAIN</text>
        <text x={cx} y="15" textAnchor="middle" fill="#e67e22" fontSize="7">🌶️ capsaicin</text>
        <path d={`M${cx} 22 L${cx} ${cy - 32}`} stroke="#e67e22" strokeWidth="1" strokeDasharray="2 2" markerEnd="" />
        <text x={cx} y={size - 15} textAnchor="middle" fill="#e8a0bf" fontSize="7">→ endorphins → euphoria</text>
      </svg>
    ),
    crunch: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <ellipse cx={cx - 20} cy={cy} rx="15" ry="20" fill="none" stroke="#dcdcdc" strokeWidth="1.5" opacity="0.4" />
        <text x={cx - 20} y={cy - 3} textAnchor="middle" fill="#dcdcdc" fontSize="6">EAR</text>
        <text x={cx - 20} y={cy + 6} textAnchor="middle" fill="#dcdcdc" fontSize="5">auditory</text>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${cx + 2 + i * 10} ${cy - 15 + i * 3} Q${cx + 7 + i * 10} ${cy} ${cx + 2 + i * 10} ${cy + 15 - i * 3}`}
            fill="none"
            stroke="#a8c256"
            strokeWidth="1"
            opacity={0.7 - i * 0.15}
          />
        ))}
        <text x={cx + 25} y={cy} textAnchor="middle" fill="#a8c256" fontSize="8">CRUNCH</text>
        <text x={cx} y="18" textAnchor="middle" fill="#e8e0d4" fontSize="7" opacity="0.6">sound → freshness</text>
        <text x={cx} y={size - 15} textAnchor="middle" fill="#e8a0bf" fontSize="7">+15% perceived flavor</text>
      </svg>
    ),
    acid: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path d={`M25 ${cy - 10} C30 ${cy - 20} 40 ${cy - 20} 45 ${cy - 10} S55 ${cy + 5} 50 ${cy - 10}`} fill="none" stroke="#4a6fa5" strokeWidth="1.5" opacity="0.6" />
        <text x="40" y={cy + 8} textAnchor="middle" fill="#4a6fa5" fontSize="6">folded protein</text>
        <text x={cx} y={cy - 15} fill="#a8c256" fontSize="10">H⁺</text>
        <path d={`M${cx + 5} ${cy - 10} L${cx + 15} ${cy - 5}`} stroke="#a8c256" strokeWidth="1" />
        <line x1="75" y1={cy - 10} x2="100" y2={cy - 10} stroke="#e67e22" strokeWidth="1.5" opacity="0.6" strokeDasharray="5 3" />
        <text x="88" y={cy + 8} textAnchor="middle" fill="#e67e22" fontSize="6">denatured</text>
        <text x={cx} y="18" textAnchor="middle" fill="#a8c256" fontSize="7">acid denaturation</text>
        <text x={cx} y={size - 15} textAnchor="middle" fill="#e8e0d4" fontSize="7" opacity="0.7">&ldquo;cooking&rdquo; without heat</text>
      </svg>
    ),
    fat: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx="35" cy={cy} r="18" fill="#b87333" opacity="0.2" stroke="#b87333" strokeWidth="1" />
        <text x="35" y={cy - 3} textAnchor="middle" fill="#d4956b" fontSize="7">FAT</text>
        <text x="35" y={cy + 7} textAnchor="middle" fill="#d4956b" fontSize="5">lipophilic</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={32 + (i % 2) * 6} cy={cy - 6 + Math.floor(i / 2) * 8} r="2" fill="#e67e22" opacity="0.7" />
        ))}
        <path d={`M55 ${cy} L70 ${cy}`} stroke="#d4956b" strokeWidth="1" markerEnd="" />
        <text x={cx + 4} y={cy - 2} fill="#e8e0d4" fontSize="7">→</text>
        <circle cx="90" cy={cy} r="12" fill="none" stroke="#e8a0bf" strokeWidth="1" strokeDasharray="2 2" />
        <text x="90" y={cy + 3} textAnchor="middle" fill="#e8a0bf" fontSize="6">tongue</text>
        <text x={cx} y="18" textAnchor="middle" fill="#d4956b" fontSize="7">fat dissolves + carries flavor</text>
      </svg>
    ),
    fermentation: (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x="30" y="25" width={size - 60} height={size - 50} rx="6" fill="none" stroke="#a8c256" strokeWidth="1" opacity="0.4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={40 + (i * 12)}
            cy={cy + Math.sin(i * 1.5) * 8}
            r="3"
            fill="#a8c256"
            opacity={0.4 + i * 0.1}
          />
        ))}
        <text x={cx} y="18" textAnchor="middle" fill="#a8c256" fontSize="7">microbes at work</text>
        <text x={cx} y={cy - 15} textAnchor="middle" fill="#e8e0d4" fontSize="6">sugars + proteins</text>
        <text x={cx} y={cy + 25} textAnchor="middle" fill="#d4956b" fontSize="6">→ acids, esters, glutamate</text>
        <text x={cx} y={size - 15} textAnchor="middle" fill="#e67e22" fontSize="7">complexity over time</text>
      </svg>
    ),
  };

  return diagrams[type] ?? (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r="30" fill="none" stroke="#b87333" strokeWidth="1" opacity="0.3" />
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#b87333" fontSize="10">?</text>
    </svg>
  );
}

/* ── Category badge colors ────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  Chemistry: "border-amber/40 text-amber bg-amber/10",
  Biology: "border-green-600/40 text-green-500 bg-green-500/10",
  Perception: "border-purple-500/40 text-purple-400 bg-purple-500/10",
  Physics: "border-blue-500/40 text-blue-400 bg-blue-500/10",
};

/* ── Single card ──────────────────────────────────────────────── */

function ScienceCard({ card }: { card: FlavorScienceCard }) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CATEGORY_COLORS[card.category] ?? "border-border text-foreground/50";

  return (
    <div className="rounded-2xl border border-border bg-surface hover:border-copper/30 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 sm:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-background border border-border p-2 flex items-center justify-center">
            <DiagramIcon type={card.diagram} size={120} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-2xl">{card.icon}</span>
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${catColor}`}>
                {card.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{card.title}</h3>
            <p className="text-sm text-copper-light font-medium leading-relaxed">{card.headline}</p>
          </div>
          <div className="shrink-0 mt-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`text-foreground/30 transition-transform ${expanded ? "rotate-180" : ""}`}
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border px-5 sm:px-6 py-5 space-y-5">
          {/* Explanation */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-foreground/40 mb-2">The Science</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">{card.explanation}</p>
          </div>

          {/* Try This */}
          <div className="rounded-xl bg-copper/5 border border-copper/20 p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-copper mb-3 flex items-center gap-2">
              <span className="text-base">🧪</span>
              Try This: {card.tryThis.title}
            </h4>
            <ol className="space-y-2 mb-4">
              {card.tryThis.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/70">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-copper/20 text-copper text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <div className="pt-3 border-t border-copper/10">
              <p className="text-xs font-medium text-copper/80 mb-1">Why it works:</p>
              <p className="text-xs text-foreground/50 leading-relaxed">{card.tryThis.whyItWorks}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */

export default function FlavorScienceCards() {
  const [filter, setFilter] = useState<string | null>(null);
  const categories = Array.from(new Set(FLAVOR_SCIENCE_CARDS.map((c) => c.category)));

  const filtered = filter
    ? FLAVOR_SCIENCE_CARDS.filter((c) => c.category === filter)
    : FLAVOR_SCIENCE_CARDS;

  return (
    <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-sm font-medium tracking-widest uppercase text-copper mb-3">Flavor Science</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          The <span className="text-copper">Science</span> Behind Every Bite
        </h1>
        <p className="text-foreground/50 text-sm max-w-xl mx-auto">
          10 surprising food science facts that will change how you taste, cook, and think about flavor.
          Each card includes a hands-on experiment you can try at home.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            !filter
              ? "bg-copper/20 text-copper-light border border-copper/30"
              : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
          }`}
        >
          All ({FLAVOR_SCIENCE_CARDS.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(filter === cat ? null : cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-copper/20 text-copper-light border border-copper/30"
                : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((card) => (
          <ScienceCard key={card.id} card={card} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-foreground/30 text-sm">
          No cards match this filter.
        </div>
      )}
    </section>
  );
}
