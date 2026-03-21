import FlavorWheel from "@/components/FlavorWheel";

const FEATURES = [
  {
    title: "Interactive Flavor Map",
    description:
      "A first-of-its-kind 2D/2.5D canvas where flavor relationships become visible. Drag ingredients, see molecular connections, and learn why flavors work together — not just that they do.",
    detail:
      "Six axes — Sweet, Salty, Umami, Sour, Bitter, Spicy — mapped to real taste receptor categories. Every ingredient is a node with a six-dimensional flavor vector.",
  },
  {
    title: "AI Culinary Mentors",
    description:
      "Learn from AI personas inspired by culinary legends. Each mentor has a distinct teaching philosophy, voice, and curriculum focus.",
    mentors: [
      {
        name: "Julia Child",
        focus: "Joy & Fearlessness",
        tier: "Free",
      },
      {
        name: "Jacques Pépin",
        focus: "Classical Technique",
        tier: "Pro",
      },
      {
        name: "Anthony Bourdain",
        focus: "Bold Exploration",
        tier: "Pro",
      },
      {
        name: "Ferran Adrià",
        focus: "Molecular Innovation",
        tier: "Pro",
      },
      {
        name: "Massimo Bottura",
        focus: "Tradition Meets Creativity",
        tier: "Pro",
      },
    ],
  },
  {
    title: "Gamified Progression",
    description:
      "Grow from Seed to Master through structured courses, challenges, and rank tests. Earn XP, maintain streaks, and unlock achievements — all tied to genuine culinary understanding.",
    ranks: ["Seed", "Sprout", "Leaf", "Bloom", "Harvest", "Master"],
  },
  {
    title: "Challenge Mode",
    description:
      'Chopped-style creative problem-solving. Mystery Basket, Flavor Fix, Speed Pairing, Cuisine Translator, and Substitution Sprint — each designed to sharpen your flavor intuition.',
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Flavor Map (3 ingredients)",
      "200 core ingredients",
      "Julia Child mentor",
      "Module 1: The Five Tastes",
      "1 challenge per day",
      "Daily Flavor challenge",
      "Full rank progression",
      "Streak tracking",
      "5 saved flavor maps",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "/month",
    features: [
      "Unlimited ingredients on map",
      "Full library (2,000+ items)",
      "All 5 AI mentors",
      "All course modules",
      "Unlimited challenges",
      "Community sharing",
      "Unlimited saved maps",
      "Recipe generation",
      "Ingredient photo recognition",
      "Advanced analytics",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold tracking-tight text-copper">
              TasteBud
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            <a href="#features" className="hover:text-copper transition-colors">
              Features
            </a>
            <a href="#flavor-map" className="hover:text-copper transition-colors">
              Flavor Map
            </a>
            <a href="#mentors" className="hover:text-copper transition-colors">
              Mentors
            </a>
            <a href="#pricing" className="hover:text-copper transition-colors">
              Pricing
            </a>
          </div>
          <button className="rounded-full bg-copper px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-copper-light">
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-copper/5 to-transparent pointer-events-none" />
        <p className="text-sm font-medium tracking-widest uppercase text-copper mb-4">
          Brain Mastery Series
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-tight">
          See Flavor.{" "}
          <span className="text-copper">Balance Taste.</span>
          <br />
          Create Magic.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/60 leading-relaxed">
          TasteBud transforms cooking from recipe-following into intuitive
          creation. Learn flavor theory through an interactive Flavor Map, AI
          mentorship from culinary legends, and gamified progression that builds
          real understanding.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="rounded-full bg-copper px-8 py-3 text-base font-semibold text-background transition-colors hover:bg-copper-light">
            Start Learning — Free
          </button>
          <a
            href="#flavor-map"
            className="rounded-full border border-border px-8 py-3 text-base font-medium transition-colors hover:bg-surface-light"
          >
            See the Flavor Map
          </a>
        </div>
        <p className="mt-6 text-xs text-foreground/40">
          No credit card required. Free tier includes full rank progression.
        </p>
      </section>

      {/* Flavor Map Demo */}
      <section
        id="flavor-map"
        className="py-20 px-6 bg-surface border-y border-border"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                The <span className="text-copper">Flavor Map</span>
              </h2>
              <p className="text-foreground/60 leading-relaxed max-w-lg">
                Every ingredient has a six-dimensional flavor profile. Drag
                ingredients onto the map and watch relationships emerge — shared
                aroma compounds, harmony, discord, and balance become visible in
                real time.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {[
                  { label: "Node size", meaning: "Flavor intensity" },
                  { label: "Color shift", meaning: "Balance state" },
                  { label: "Connections", meaning: "Shared compounds" },
                  { label: "Glow/pulse", meaning: "Ingredient synergy" },
                ].map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-lg bg-surface-light border border-border p-3"
                  >
                    <p className="text-xs text-copper font-medium">
                      {signal.label}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {signal.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <FlavorWheel size={340} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Learn to <span className="text-copper">Create</span>, Not Just Cook
          </h2>
          <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
            Every cooking app tells you what to cook. None teach you to see
            flavor. TasteBud bridges the gap between molecular food science and
            your kitchen.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-surface p-8 hover:border-copper/30 transition-colors"
              >
                <h3 className="text-xl font-semibold text-copper mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.mentors && (
                  <div className="space-y-2">
                    {feature.mentors.map((mentor) => (
                      <div
                        key={mentor.name}
                        className="flex items-center justify-between rounded-lg bg-surface-light px-4 py-2 text-sm"
                      >
                        <span className="font-medium">{mentor.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-foreground/40">
                            {mentor.focus}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              mentor.tier === "Free"
                                ? "bg-copper/20 text-copper"
                                : "bg-border text-foreground/50"
                            }`}
                          >
                            {mentor.tier}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {feature.ranks && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {feature.ranks.map((rank, i) => (
                      <span
                        key={rank}
                        className="text-xs px-3 py-1 rounded-full border border-border"
                        style={{
                          borderColor: [
                            "#8b6914",
                            "#90b860",
                            "#3a9e3a",
                            "#d4a017",
                            "#c8912e",
                            "#b87333",
                          ][i],
                          color: [
                            "#8b6914",
                            "#90b860",
                            "#3a9e3a",
                            "#d4a017",
                            "#c8912e",
                            "#b87333",
                          ][i],
                        }}
                      >
                        {rank}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Mentors Section */}
      <section id="mentors" className="py-20 px-6 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn from <span className="text-copper">Culinary Legends</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto mb-12">
            AI mentor personas — not impersonations — inspired by the legacy and
            philosophy of the world&apos;s greatest culinary minds.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Julia Child",
                philosophy: "Joy and fearlessness",
                style: "Encouraging, embraces mistakes",
                quote: '"Never apologize!"',
                unlocked: "Free tier",
              },
              {
                name: "Jacques Pépin",
                philosophy: "Classical technique",
                style: "Patient, methodical",
                quote: '"Technique is the foundation of confidence."',
                unlocked: "Seed rank",
              },
              {
                name: "Anthony Bourdain",
                philosophy: "Bold exploration",
                style: "Storytelling, irreverent",
                quote: '"Your body is not a temple, it\'s an amusement park."',
                unlocked: "Sprout rank",
              },
              {
                name: "Ferran Adrià",
                philosophy: "Molecular innovation",
                style: "Scientific, experimental",
                quote: '"Creativity means not copying."',
                unlocked: "Bloom rank",
              },
              {
                name: "Massimo Bottura",
                philosophy: "Tradition meets creativity",
                style: "Artistic, philosophical",
                quote: '"The past is a springboard, not a sofa."',
                unlocked: "Harvest rank",
              },
            ].map((mentor) => (
              <div
                key={mentor.name}
                className="rounded-xl border border-border bg-background p-6 text-left hover:border-copper/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-copper">
                  {mentor.name}
                </h3>
                <p className="text-sm text-foreground/40 mt-1">
                  {mentor.philosophy}
                </p>
                <p className="text-sm text-foreground/60 mt-3 italic">
                  {mentor.quote}
                </p>
                <p className="text-sm text-foreground/50 mt-3">
                  {mentor.style}
                </p>
                <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-copper/10 text-copper">
                  {mentor.unlocked}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Start Free.{" "}
            <span className="text-copper">Go Pro</span> When Ready.
          </h2>
          <p className="text-center text-foreground/50 max-w-xl mx-auto mb-12">
            Full rank progression and streak tracking are free forever. Pro
            unlocks the complete ingredient library, all mentors, and unlimited
            everything.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 ${
                  plan.highlight
                    ? "border-copper bg-surface shadow-lg shadow-copper/5"
                    : "border-border bg-surface"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-copper text-background mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-copper">
                    {plan.price}
                  </span>
                  <span className="text-foreground/40">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-foreground/70"
                    >
                      <span className="text-copper mt-0.5">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-copper text-background hover:bg-copper-light"
                      : "border border-border hover:bg-surface-light"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">
              Brain Mastery Series
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
