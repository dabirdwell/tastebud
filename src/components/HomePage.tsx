"use client";

import Link from "next/link";
import { useProgress, type UserProgress } from "@/lib/useProgress";
import GettingStartedTour from "./GettingStartedTour";

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
  getProgress?: (p: UserProgress) => { value: number; max: number; label: string };
}

const FEATURES: FeatureCard[] = [
  {
    title: "Flavor Map",
    description:
      "Interactive radar chart mapping six taste axes — discover which cuisines and ingredients match your palate.",
    icon: "🗺️",
    href: "/flavor-map",
    gradient: "from-amber-500/10 to-transparent",
    getProgress: (p) => ({
      value: p.flavorMapCompleted ? 1 : 0,
      max: 1,
      label: p.flavorMapCompleted ? "Complete" : "Not started",
    }),
  },
  {
    title: "Recipes",
    description:
      "25+ curated dishes from 10 global cuisines with full flavor profiles, step-by-step instructions, and timers.",
    icon: "📖",
    href: "/recipes",
    gradient: "from-red-500/10 to-transparent",
    getProgress: (p) => ({
      value: p.recipesViewed.length,
      max: 25,
      label: `${p.recipesViewed.length} of 25 explored`,
    }),
  },
  {
    title: "Learn",
    description:
      "Flavor science cards and a full curriculum — the Maillard reaction, umami receptors, molecular pairing, and more.",
    icon: "🔬",
    href: "/learn",
    gradient: "from-blue-500/10 to-transparent",
    getProgress: (p) => ({
      value: p.flavorCardsStudied.length,
      max: 20,
      label: `${p.flavorCardsStudied.length} of 20 studied`,
    }),
  },
  {
    title: "AI Mentors",
    description:
      "Five legendary chef personalities — Julia Child, Pépin, Bourdain, Adrià, and Bottura — each with unique teaching styles.",
    icon: "👩‍🍳",
    href: "/mentors",
    gradient: "from-purple-500/10 to-transparent",
    getProgress: (p) => {
      const total = p.mentorConversations.reduce((s, m) => s + m.count, 0);
      return {
        value: total,
        max: 10,
        label: `${total} conversation${total !== 1 ? "s" : ""}`,
      };
    },
  },
  {
    title: "Smart Pantry",
    description:
      "Enter what you have on hand and instantly see which recipes you can make, with smart substitution suggestions.",
    icon: "🥘",
    href: "/pantry",
    gradient: "from-green-500/10 to-transparent",
    getProgress: (p) => ({
      value: p.pantryItems.length,
      max: 30,
      label: `${p.pantryItems.length} item${p.pantryItems.length !== 1 ? "s" : ""} tracked`,
    }),
  },
  {
    title: "Cooking Timer",
    description:
      "Chain multiple timers together for complex dishes. Presets for steak dinners, pasta, and more — always accessible.",
    icon: "⏱️",
    href: "#timer",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    title: "Seasonal Calendar",
    description:
      "Month-by-month guide to what's at peak freshness in your region, with cooking notes for every ingredient.",
    icon: "📅",
    href: "/seasonal",
    gradient: "from-emerald-500/10 to-transparent",
  },
];

const TOOLS = [
  { label: "Meal Planner", href: "/planner", icon: "📋" },
  { label: "Shopping List", href: "/shopping", icon: "🛒" },
  { label: "My Progress", href: "/progress", icon: "📊" },
];

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Start exploring flavor science",
    features: [
      "Basic flavor map (3 ingredients)",
      "Julia Child mentor only",
      "10 recipes per month",
      "Flavor science cards",
    ],
    cta: "Get Started",
    href: "/login",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$4.99",
    period: "/mo",
    description: "Unlock the full flavor library",
    features: [
      "Full ingredient library",
      "All 5 AI mentors",
      "Unlimited recipes",
      "AR flavor features",
      "Smart pantry & planner",
    ],
    cta: "Upgrade to Plus",
    tier: "plus",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    description: "For serious culinary creators",
    features: [
      "Everything in Plus",
      "VR cooking experiences",
      "Custom AI mentor creation",
      "Commercial use license",
      "Priority support",
    ],
    cta: "Go Pro",
    tier: "pro",
    highlighted: true,
  },
  {
    name: "Academy",
    price: "$19.99",
    period: "/mo",
    description: "Teach flavor science at scale",
    features: [
      "Everything in Pro",
      "Classroom curriculum tools",
      "Bulk student accounts",
      "Certification program",
      "Admin dashboard",
    ],
    cta: "Start Academy",
    tier: "academy",
    highlighted: false,
  },
];

function MiniProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1 rounded-full bg-border overflow-hidden mt-3">
      <div
        className="h-full rounded-full bg-copper/70 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function HomePage() {
  const { progress, loaded, setTourCompleted } = useProgress();

  const showTour = loaded && !progress.tourCompleted;

  const hasProgress =
    loaded &&
    (progress.recipesViewed.length > 0 ||
      progress.flavorCardsStudied.length > 0 ||
      progress.mentorConversations.length > 0 ||
      progress.pantryItems.length > 0 ||
      progress.flavorMapCompleted);

  const overallPct = loaded
    ? Math.round(
        ([
          Math.min(progress.flavorMapCompleted ? 1 : 0, 1),
          Math.min(progress.recipesViewed.length / 25, 1),
          Math.min(progress.flavorCardsStudied.length / 20, 1),
          Math.min(
            progress.mentorConversations.reduce((s, m) => s + m.count, 0) /
              10,
            1
          ),
          Math.min(progress.pantryItems.length / 30, 1),
        ].reduce((a, b) => a + b, 0) /
          5) *
          100
      )
    : 0;

  return (
    <>
      {showTour && <GettingStartedTour onDismiss={setTourCompleted} />}

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 md:py-36 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-copper/5 to-transparent pointer-events-none" />
        <p className="text-sm font-medium tracking-widest uppercase text-copper mb-4">
          Brain Mastery Series
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
          Develop Your <span className="text-copper">Palate</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl text-foreground/60 leading-relaxed">
          Flavor science meets cooking confidence
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/flavor-map"
            className="rounded-full bg-copper px-10 py-3.5 text-base font-semibold text-background transition-colors hover:bg-copper-light"
          >
            Start Exploring
          </Link>
          <Link
            href="/progress"
            className="rounded-full border border-copper/40 px-10 py-3.5 text-base font-semibold text-copper transition-colors hover:bg-copper/10"
          >
            My Progress
          </Link>
        </div>
      </section>

      {/* Progress summary for returning users */}
      {hasProgress && (
        <section className="px-6 -mt-8 mb-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/progress"
              className="flex items-center justify-between rounded-xl border border-copper/20 bg-copper/5 px-6 py-4 hover:border-copper/40 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 shrink-0">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-full h-full -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-border"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-copper"
                      strokeDasharray={`${overallPct * 0.942} ${94.2 - overallPct * 0.942}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-copper">
                    {overallPct}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Welcome back</p>
                  <p className="text-xs text-foreground/50">
                    {progress.recipesViewed.length} recipes &middot;{" "}
                    {progress.flavorCardsStudied.length} cards &middot;{" "}
                    {progress.mentorConversations.reduce(
                      (s, m) => s + m.count,
                      0
                    )}{" "}
                    chats
                  </p>
                </div>
              </div>
              <span className="text-xs text-copper group-hover:text-copper-light transition-colors hidden sm:inline">
                View details &rarr;
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* 7 Feature Cards */}
      <section id="features" className="py-20 px-6 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to{" "}
            <span className="text-copper">See Flavor</span>
          </h2>
          <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
            Seven tools to understand taste — from interactive charts to AI
            mentors to curated recipes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const prog =
                feature.getProgress && loaded
                  ? feature.getProgress(progress)
                  : null;
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="rounded-xl border border-border bg-background p-8 hover:border-copper/30 transition-all group relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{feature.icon}</span>
                      {prog && prog.value > 0 && (
                        <span className="text-[11px] font-medium text-copper bg-copper/10 px-2 py-0.5 rounded-full">
                          {prog.value >= prog.max ? "Done" : prog.label}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-copper mb-3 group-hover:text-copper-light transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                    {prog && <MiniProgressBar value={prog.value} max={prog.max} />}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick tools strip */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {TOOLS.map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm text-foreground/70 hover:border-copper/30 hover:text-copper transition-colors"
              >
                <span>{tool.icon}</span>
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How TasteBud <span className="text-copper">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                number: "1",
                title: "Discover your flavor profile",
                description:
                  "Drag the interactive radar chart to map your taste preferences across six axes — sweet, salty, umami, sour, bitter, and spicy.",
                icon: "🎯",
              },
              {
                number: "2",
                title: "Learn the science",
                description:
                  "Explore flavor cards that explain why certain ingredients pair together, from molecular chemistry to regional traditions.",
                icon: "🧪",
              },
              {
                number: "3",
                title: "Cook with confidence",
                description:
                  "Use your knowledge to improvise in the kitchen — swap ingredients, balance dishes, and create your own signature flavors.",
                icon: "🔥",
              },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10 text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  <span className="text-copper">{step.number}.</span>{" "}
                  {step.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/learn"
              className="rounded-full bg-copper px-10 py-3.5 text-base font-semibold text-background transition-colors hover:bg-copper-light"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your <span className="text-copper">Path</span>
          </h2>
          <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
            From casual cook to culinary educator — pick the tier that fits your
            journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`rounded-xl border p-8 flex flex-col ${
                  t.highlighted
                    ? "border-copper bg-copper/5 ring-1 ring-copper/20"
                    : "border-border bg-background"
                }`}
              >
                {t.highlighted && (
                  <span className="text-xs font-semibold tracking-widest uppercase text-copper mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{t.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-3xl font-bold">{t.price}</span>
                  {t.period && (
                    <span className="text-foreground/50 text-sm">
                      {t.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/50 mb-6">
                  {t.description}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground/70"
                    >
                      <span className="text-copper mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.href || `/login?next=/checkout&tier=${t.tier}`}
                  className={`block text-center rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    t.highlighted
                      ? "bg-copper text-background hover:bg-copper-light"
                      : "border border-border text-foreground hover:border-copper/30 hover:text-copper"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
