"use client";

import { useState } from "react";
import { SEASONAL_DATA } from "@/data/seasonalIngredients";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SEASON_LABELS: Record<string, { label: string; emoji: string }> = {
  "0": { label: "Winter", emoji: "❄️" },
  "1": { label: "Winter", emoji: "❄️" },
  "2": { label: "Spring", emoji: "🌱" },
  "3": { label: "Spring", emoji: "🌱" },
  "4": { label: "Spring", emoji: "🌱" },
  "5": { label: "Summer", emoji: "☀️" },
  "6": { label: "Summer", emoji: "☀️" },
  "7": { label: "Summer", emoji: "☀️" },
  "8": { label: "Fall", emoji: "🍂" },
  "9": { label: "Fall", emoji: "🍂" },
  "10": { label: "Fall", emoji: "🍂" },
  "11": { label: "Winter", emoji: "❄️" },
};

export default function SeasonalCalendar() {
  const currentMonth = new Date().getMonth();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  const currentData = SEASONAL_DATA[currentMonth];
  const season = SEASON_LABELS[String(currentMonth)];

  function toggleMonth(index: number) {
    setExpandedMonth(expandedMonth === index ? null : index);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero: What's in Season NOW */}
      <section className="mb-12 sm:mb-16">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-10"
          style={{
            background: `linear-gradient(135deg, var(--surface) 0%, ${currentData.color}22 50%, var(--surface) 100%)`,
            border: "1px solid var(--border)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-5 text-[10rem] sm:text-[14rem] leading-none select-none pointer-events-none"
            aria-hidden="true"
          >
            {season.emoji}
          </div>

          <div className="relative">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-copper mb-2">
              {season.emoji} {season.label} · Oklahoma &amp; Southern US
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 tracking-tight">
              What&rsquo;s in Season{" "}
              <span className="text-copper">Now</span>
            </h1>
            <p className="text-foreground/50 mb-6 sm:mb-8 text-sm sm:text-base">
              {currentData.name} — peak-season ingredients from your region
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {currentData.ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="group rounded-xl p-3 sm:p-4 transition-all duration-200 hover:scale-[1.03] cursor-default"
                  style={{
                    background: "var(--surface-light)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span className="text-xl sm:text-2xl block mb-1">{ing.emoji}</span>
                  <span className="text-sm font-medium block leading-tight">
                    {ing.name}
                  </span>
                  <span className="text-xs text-foreground/40 mt-1 block leading-snug line-clamp-2">
                    {ing.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12-Month Grid */}
      <section>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Seasonal Calendar
          </h2>
          <p className="text-foreground/50 text-sm mt-1">
            Tap any month to see the full ingredient list with cooking notes
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {SEASONAL_DATA.map((month, index) => {
            const isCurrentMonth = index === currentMonth;
            const isExpanded = expandedMonth === index;

            return (
              <div
                key={month.name}
                className={`col-span-1 ${isExpanded ? "sm:col-span-3 md:col-span-4 col-span-2" : ""}`}
              >
                <button
                  onClick={() => toggleMonth(index)}
                  className={`w-full text-left rounded-xl p-4 sm:p-5 transition-all duration-200 ${
                    isExpanded ? "rounded-b-none" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    background: isCurrentMonth
                      ? `linear-gradient(135deg, ${month.color}33 0%, var(--surface-light) 100%)`
                      : "var(--surface)",
                    border: isCurrentMonth
                      ? `1px solid ${month.color}88`
                      : "1px solid var(--border)",
                    borderBottom: isExpanded ? "none" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: month.color }}
                      />
                      <span className="font-semibold text-sm sm:text-base">
                        {month.name}
                      </span>
                      {isCurrentMonth && (
                        <span
                          className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${month.color}33`,
                            color: month.color,
                          }}
                        >
                          Now
                        </span>
                      )}
                    </div>
                    <svg
                      className={`w-4 h-4 text-foreground/30 transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Collapsed preview: ingredient emojis */}
                  {!isExpanded && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {month.ingredients.slice(0, 8).map((ing) => (
                        <span
                          key={ing.name}
                          className="text-sm sm:text-base"
                          title={ing.name}
                        >
                          {ing.emoji}
                        </span>
                      ))}
                      {month.ingredients.length > 8 && (
                        <span className="text-xs text-foreground/30 self-center ml-1">
                          +{month.ingredients.length - 8}
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Expanded ingredient list */}
                {isExpanded && (
                  <div
                    className="rounded-b-xl p-4 sm:p-6 space-y-2"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderTop: "none",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {month.ingredients.map((ing) => (
                        <div
                          key={ing.name}
                          className="flex gap-3 rounded-lg p-3 transition-colors"
                          style={{
                            background: "var(--surface-light)",
                          }}
                        >
                          <span className="text-xl flex-shrink-0 mt-0.5">
                            {ing.emoji}
                          </span>
                          <div className="min-w-0">
                            <span className="font-medium text-sm block">
                              {ing.name}
                            </span>
                            <span className="text-xs text-foreground/50 block leading-relaxed mt-0.5">
                              {month.name}: {ing.note}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Regional note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-foreground/30">
          Based on Oklahoma &amp; Southern US growing seasons (USDA Zones 6b–8a).
          Exact availability varies by year and microclimate.
        </p>
      </div>
    </div>
  );
}
