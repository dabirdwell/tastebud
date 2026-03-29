import Nav from "@/components/Nav";

const FEATURES = [
  {
    title: "FlavorMap",
    description:
      "Interactive radar chart mapping six taste axes — drag, adjust, and discover which cuisines match your palate.",
    icon: "🗺️",
    href: "/pantry",
  },
  {
    title: "Smart Pantry",
    description:
      "Enter what you have on hand and instantly see which recipes you can make, with smart substitution suggestions.",
    icon: "🥘",
    href: "/pantry",
  },
  {
    title: "Cooking Timers",
    description:
      "Chain multiple timers together for complex dishes. Presets for steak dinners, pasta, and more — with audio alerts.",
    icon: "⏱️",
    href: "#",
  },
  {
    title: "Seasonal Calendar",
    description:
      "Month-by-month guide to what\u2019s at peak freshness in your region, with cooking notes for every ingredient.",
    icon: "📅",
    href: "/seasonal",
  },
  {
    title: "20 Flavor Cards",
    description:
      "Bite-sized science lessons covering the Maillard reaction, umami receptors, molecular pairing, and more.",
    icon: "🔬",
    href: "/learn",
  },
  {
    title: "15 Recipes",
    description:
      "Curated dishes from 10 global cuisines, each with full flavor profiles, step-by-step instructions, and built-in timers.",
    icon: "📖",
    href: "/recipes",
  },
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

const STEPS = [
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
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 md:py-36 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-copper/5 to-transparent pointer-events-none" />
        <p className="text-sm font-medium tracking-widest uppercase text-copper mb-4">
          Brain Mastery Series
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
          Develop Your{" "}
          <span className="text-copper">Palate</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl text-foreground/60 leading-relaxed">
          Flavor science meets cooking confidence
        </p>
        <div className="mt-10">
          <a
            href="#features"
            className="rounded-full bg-copper px-10 py-3.5 text-base font-semibold text-background transition-colors hover:bg-copper-light"
          >
            Start Exploring
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 bg-surface border-y border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to{" "}
            <span className="text-copper">See Flavor</span>
          </h2>
          <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16">
            From interactive charts to curated recipes, TasteBud gives you the
            tools to understand taste — not just follow instructions.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <a
                key={feature.title}
                href={feature.href}
                className="rounded-xl border border-border bg-background p-8 hover:border-copper/30 transition-colors group"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-copper mb-3 group-hover:text-copper-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How TasteBud Works */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How TasteBud <span className="text-copper">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
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
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a
              href="/learn"
              className="rounded-full bg-copper px-10 py-3.5 text-base font-semibold text-background transition-colors hover:bg-copper-light"
            >
              Start Exploring
            </a>
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
            From casual cook to culinary educator — pick the tier that fits your journey.
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
                    <span className="text-foreground/50 text-sm">{t.period}</span>
                  )}
                </div>
                <p className="text-sm text-foreground/50 mb-6">{t.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/70">
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

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 mt-auto">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
          </div>
          <a
            href="https://humanityandai.com/brain-mastery/"
            className="text-sm text-foreground/50 hover:text-copper transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Part of the Brain Mastery series
          </a>
          <p className="text-sm text-foreground/30">
            &copy; 2026 Fawkes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
