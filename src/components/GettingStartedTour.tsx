"use client";

import { useState } from "react";
import Link from "next/link";

const TOUR_STEPS = [
  {
    number: 1,
    title: "Map Your Flavor Profile",
    description:
      "Start with the Flavor Map — drag the radar chart to discover your taste preferences across six axes: sweet, salty, umami, sour, bitter, and spicy.",
    icon: "🗺️",
    href: "/flavor-map",
    cta: "Open Flavor Map",
  },
  {
    number: 2,
    title: "Explore Global Recipes",
    description:
      "Browse 25+ curated dishes from 10 cuisines — each with full flavor profiles, step-by-step instructions, and built-in cooking timers.",
    icon: "📖",
    href: "/recipes",
    cta: "Browse Recipes",
  },
  {
    number: 3,
    title: "Learn the Science of Taste",
    description:
      "Dive into bite-sized flavor cards and a full curriculum covering the Maillard reaction, umami, molecular pairing, and more.",
    icon: "🔬",
    href: "/learn",
    cta: "Start Learning",
  },
];

export default function GettingStartedTour({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  const [step, setStep] = useState(0);

  const current = TOUR_STEPS[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-2xl border border-copper/30 bg-surface p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-medium tracking-widest uppercase text-copper">
            Getting Started &middot; {step + 1} / {TOUR_STEPS.length}
          </p>
          <button
            onClick={onDismiss}
            className="text-foreground/30 hover:text-foreground/60 transition-colors text-sm"
          >
            Skip tour
          </button>
        </div>

        <div className="text-center">
          <span className="text-5xl block mb-4">{current.icon}</span>
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-copper">{current.number}.</span>{" "}
            {current.title}
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-8">
            {current.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {TOUR_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-copper"
                  : i < step
                    ? "w-2 bg-copper/40"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step < TOUR_STEPS.length - 1 ? (
            <>
              <Link
                href={current.href}
                onClick={onDismiss}
                className="flex-1 text-center rounded-full border border-copper/40 text-copper px-6 py-3 text-sm font-semibold hover:bg-copper/10 transition-colors"
              >
                {current.cta}
              </Link>
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 rounded-full bg-copper text-background px-6 py-3 text-sm font-semibold hover:bg-copper-light transition-colors"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onDismiss}
                className="flex-1 text-center rounded-full border border-border text-foreground/60 px-6 py-3 text-sm font-semibold hover:border-copper/30 transition-colors"
              >
                Explore on My Own
              </button>
              <Link
                href={current.href}
                onClick={onDismiss}
                className="flex-1 text-center rounded-full bg-copper text-background px-6 py-3 text-sm font-semibold hover:bg-copper-light transition-colors"
              >
                {current.cta}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
