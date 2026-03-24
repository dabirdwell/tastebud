"use client";

import { useState, useMemo, useCallback } from "react";
import {
  INGREDIENTS,
  AXIS_CONFIG,
  type Ingredient,
  type FlavorProfile,
} from "@/data/ingredients";
import { RECIPES, computeRecipeProfile, type Recipe } from "@/data/recipes";

/* ── helpers ─────────────────────────────────────────────────────── */

const CATEGORIES = Array.from(new Set(INGREDIENTS.map((i) => i.category)));

function computeComposite(items: Ingredient[]): FlavorProfile {
  const p: FlavorProfile = { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  if (items.length === 0) return p;
  const keys: (keyof FlavorProfile)[] = ["sweet", "salty", "umami", "sour", "bitter", "spicy"];
  for (const ing of items) {
    for (const k of keys) p[k] += ing.flavorProfile[k];
  }
  for (const k of keys) p[k] = Math.min(100, Math.round(p[k] / items.length));
  return p;
}

/** Fuzzy ingredient matching: normalize strings and check inclusion */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function ingredientMatches(pantryName: string, recipeName: string): boolean {
  const a = normalize(pantryName);
  const b = normalize(recipeName);
  // exact or substring match
  if (a === b || b.includes(a) || a.includes(b)) return true;
  // partial word match (e.g. "chicken" matches "chicken thigh", "chicken legs")
  const aWords = pantryName.toLowerCase().split(/\s+/);
  const bWords = recipeName.toLowerCase().split(/\s+/);
  return aWords.some((w) => bWords.some((bw) => bw.includes(w) || w.includes(bw)));
}

/* ── substitution map ─────────────────────────────────────────── */

const SUBSTITUTIONS: Record<string, string[]> = {
  "Rice Noodles": ["glass noodles", "thin spaghetti"],
  "Tamarind Paste": ["lime juice + brown sugar"],
  "Fish Sauce": ["soy sauce + lime juice", "Worcestershire sauce"],
  "Palm Sugar": ["brown sugar", "honey"],
  "Pecorino Romano": ["Parmesan", "aged Asiago"],
  "Tonnarelli Pasta": ["spaghetti", "bucatini"],
  "Chilhuacle Negro": ["ancho chili + guajillo"],
  "Mexican Chocolate": ["dark chocolate + cinnamon"],
  "Chashu Pork": ["braised pork belly", "slow-cooked pork shoulder"],
  "White Miso": ["red miso (sweeter result)", "soy sauce + butter"],
  "Berbere Spice": ["paprika + cayenne + cumin + cinnamon"],
  "Niter Kibbeh": ["ghee + turmeric + fenugreek", "clarified butter"],
  "Gochugaru": ["crushed red pepper + paprika"],
  "Kashmiri Chili": ["paprika + pinch of cayenne"],
  "Fenugreek Leaves": ["celery leaves", "dried fenugreek (half amount)"],
  "Garam Masala": ["allspice + cumin + coriander"],
  "Green Curry Paste": ["serrano + basil + lemongrass paste"],
  "Thai Basil": ["Italian basil + fresh mint"],
  "Kaffir Lime Leaves": ["lime zest"],
  "Saffron": ["turmeric + paprika (color, not flavor)"],
  "Pastis": ["anise extract + vodka"],
  "Herbes de Provence": ["thyme + oregano + rosemary"],
  "Cotija Cheese": ["feta", "Parmesan"],
  "Guajillo Chili": ["ancho chili", "New Mexico chili"],
  "Ancho Chili": ["guajillo chili", "pasilla chili"],
  "Paneer": ["firm tofu", "halloumi"],
  "Amchur Powder": ["lemon juice", "tamarind paste"],
  "Biryani Masala": ["garam masala + turmeric + cinnamon"],
  "Mitmita Spice": ["cayenne + cardamom + clove"],
  "Korerima": ["cardamom"],
  "Ayib Cheese": ["ricotta", "cottage cheese"],
  "Dashi": ["vegetable broth + soy sauce"],
  "Bonito Flakes": ["kombu + dried shiitake"],
  "Kewpie Mayo": ["mayo + rice vinegar + pinch of sugar"],
  "Okonomiyaki Sauce": ["Worcestershire + ketchup + soy sauce"],
  "Wasabi": ["horseradish + mustard"],
  "Nori": ["toasted sesame seeds (for garnish)"],
  "Rouille": ["aioli + cayenne + smoked paprika"],
  "Dried Shrimp": ["shrimp paste", "extra fish sauce"],
  "Thai Chilies": ["serrano peppers", "habanero (less, hotter)"],
  "Green Papaya": ["jicama", "kohlrabi"],
  "Thai Eggplant": ["regular eggplant (cubed small)"],
  "Hominy": ["white beans (different texture)"],
  "Red Lentils": ["yellow lentils", "split peas"],
  "Collard Greens": ["kale", "Swiss chard"],
  "Pork Bone Broth": ["chicken broth + soy sauce"],
  "Anchovy Stock": ["dashi", "fish sauce + water"],
  "Coriander Powder": ["cumin (half amount)"],
  "Lard": ["vegetable shortening", "butter"],
};

interface RecipeMatch {
  recipe: Recipe;
  profile: FlavorProfile;
  matched: string[];
  missing: string[];
  percentage: number;
}

function matchRecipes(pantryIds: Set<string>): RecipeMatch[] {
  const pantryNames = INGREDIENTS.filter((i) => pantryIds.has(i.id)).map((i) => i.name);

  return RECIPES.map((recipe) => {
    const matched: string[] = [];
    const missing: string[] = [];

    for (const ri of recipe.ingredients) {
      if (pantryNames.some((pn) => ingredientMatches(pn, ri.name))) {
        matched.push(ri.name);
      } else {
        missing.push(ri.name);
      }
    }

    const percentage = Math.round((matched.length / recipe.ingredients.length) * 100);
    return { recipe, profile: computeRecipeProfile(recipe), matched, missing, percentage };
  })
    .filter((m) => m.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);
}

/* ── radar chart (reusable mini) ─────────────────────────────────── */

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function RadarChart({
  profile,
  size = 280,
  label,
}: {
  profile: FlavorProfile;
  size?: number;
  label?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.4;
  const n = AXIS_CONFIG.length;

  const rings = [0.25, 0.5, 0.75, 1];
  const points = AXIS_CONFIG.map((a, i) => {
    const angle = (360 / n) * i;
    const val = profile[a.key] / 100;
    return polarToCartesian(cx, cy, R * val, angle);
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  const values = Object.values(profile);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const balanced = max - min < 30;

  return (
    <svg width={size} height={size} className="mx-auto">
      <defs>
        <radialGradient id={`radar-glow-${size}-${label ?? ""}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={balanced ? "#b87333" : "#4a6fa5"} stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R * 1.1} fill={`url(#radar-glow-${size}-${label ?? ""})`} />
      {rings.map((s) => (
        <polygon
          key={s}
          points={Array.from({ length: n })
            .map((_, i) => {
              const p = polarToCartesian(cx, cy, R * s, (360 / n) * i);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {AXIS_CONFIG.map((a, i) => {
        const angle = (360 / n) * i;
        const end = polarToCartesian(cx, cy, R, angle);
        const lbl = polarToCartesian(cx, cy, R + 18, angle);
        return (
          <g key={a.key}>
            <line x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="var(--border)" strokeWidth="1" opacity="0.4" />
            <text
              x={lbl.x}
              y={lbl.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={a.color}
              fontSize="11"
              fontWeight="600"
            >
              {a.label}
            </text>
          </g>
        );
      })}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill={balanced ? "rgba(184,115,51,0.25)" : "rgba(74,111,165,0.25)"}
        stroke={balanced ? "#b87333" : "#4a6fa5"}
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <circle
          key={AXIS_CONFIG[i].key}
          cx={p.x}
          cy={p.y}
          r="4"
          fill={AXIS_CONFIG[i].color}
          stroke="var(--background)"
          strokeWidth="1.5"
        />
      ))}
      {label && (
        <text x={cx} y={size - 4} textAnchor="middle" fill="var(--foreground)" fontSize="12" opacity="0.5">
          {label}
        </text>
      )}
    </svg>
  );
}

/* ── mini radar for recipe cards ──────────────────────────────────── */

function MiniRadar({ profile, size = 100 }: { profile: FlavorProfile; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.38;
  const n = AXIS_CONFIG.length;

  const points = AXIS_CONFIG.map((a, i) => {
    const angle = (360 / n) * i;
    const val = profile[a.key] / 100;
    return polarToCartesian(cx, cy, R * val, angle);
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg width={size} height={size} className="shrink-0">
      <polygon
        points={Array.from({ length: n })
          .map((_, i) => {
            const p = polarToCartesian(cx, cy, R, (360 / n) * i);
            return `${p.x},${p.y}`;
          })
          .join(" ")}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="rgba(184,115,51,0.3)" stroke="#b87333" strokeWidth="1.5" />
    </svg>
  );
}

/* ── main component ──────────────────────────────────────────────── */

export default function PantryMode() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setSelected(new Set()), []);

  const filteredIngredients = useMemo(() => {
    return INGREDIENTS.filter((i) => {
      const matchesSearch = !search || i.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || i.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const selectedIngredients = useMemo(
    () => INGREDIENTS.filter((i) => selected.has(i.id)),
    [selected],
  );

  const composite = useMemo(() => computeComposite(selectedIngredients), [selectedIngredients]);

  const matches = useMemo(() => matchRecipes(selected), [selected]);

  // Smart suggestions: recipes that are close (1-3 missing ingredients)
  const smartSuggestions = useMemo(() => {
    if (selected.size === 0) return [];
    return matches
      .filter((m) => m.missing.length >= 1 && m.missing.length <= 3 && m.percentage >= 40)
      .slice(0, 3);
  }, [matches, selected.size]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-copper mb-3">Pantry Mode</h1>
        <p className="text-foreground/60 max-w-xl mx-auto text-sm sm:text-base">
          Select the ingredients you have on hand. We&apos;ll find recipes you can make and show
          your pantry&apos;s aggregate flavor profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ── Left: Ingredient selector ──────────────────────────── */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-copper">Your Ingredients</h2>
              {selected.size > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-foreground/40 hover:text-copper transition-colors"
                >
                  Clear all ({selected.size})
                </button>
              )}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper/50 mb-3"
            />

            {/* Category filters */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button
                onClick={() => setCategoryFilter(null)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  categoryFilter === null
                    ? "bg-copper text-background"
                    : "bg-surface-light text-foreground/60 hover:text-copper"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    categoryFilter === cat
                      ? "bg-copper text-background"
                      : "bg-surface-light text-foreground/60 hover:text-copper"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Ingredient list */}
            <div className="max-h-[420px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {filteredIngredients.map((ing) => {
                const isSelected = selected.has(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggle(ing.id)}
                    className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                      isSelected
                        ? "bg-copper/15 border border-copper/40 text-copper"
                        : "border border-transparent hover:bg-surface-light text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span className="text-base">{ing.emoji}</span>
                    <span className="flex-1">{ing.name}</span>
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.5 4.5L6 12L2.5 8.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
              {filteredIngredients.length === 0 && (
                <p className="text-center text-foreground/30 text-sm py-6">No ingredients found</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Results ─────────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8">
          {/* Flavor profile radar */}
          {selected.size > 0 && (
            <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-copper mb-2">Pantry Flavor Profile</h2>
              <p className="text-foreground/40 text-xs mb-4">
                Aggregate flavor signature of your {selected.size} selected ingredient
                {selected.size !== 1 ? "s" : ""}
              </p>
              <RadarChart profile={composite} size={300} label="Your Pantry" />
              {/* Flavor bars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-4 max-w-md mx-auto">
                {AXIS_CONFIG.map((a) => (
                  <div key={a.key} className="flex items-center gap-2">
                    <span className="text-xs w-12 text-right" style={{ color: a.color }}>
                      {a.label}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${composite[a.key]}%`,
                          backgroundColor: a.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-foreground/40 w-6">{composite[a.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart suggestions */}
          {smartSuggestions.length > 0 && (
            <div className="rounded-2xl border border-copper/20 bg-copper/5 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-copper mb-1 flex items-center gap-2">
                <span className="text-base">💡</span> Almost There
              </h2>
              <p className="text-foreground/40 text-xs mb-4">
                You&apos;re just a few ingredients away from these recipes
              </p>
              <div className="space-y-3">
                {smartSuggestions.map((m) => {
                  const pantryNames = selectedIngredients.map((i) => i.name);
                  const matchedDisplay = m.matched.slice(0, 3).join(", ");
                  return (
                    <div key={m.recipe.id} className="rounded-xl bg-background/60 border border-border p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="font-semibold text-foreground text-sm">{m.recipe.name}</span>
                          <span className="text-xs text-foreground/30 ml-2">{m.recipe.cuisine}</span>
                        </div>
                        <span className="shrink-0 text-xs font-medium text-copper-light bg-copper/15 px-2 py-0.5 rounded-full">
                          {m.missing.length} away
                        </span>
                      </div>
                      <p className="text-xs text-foreground/50 mb-2">
                        You have {matchedDisplay}
                        {m.matched.length > 3 ? ` + ${m.matched.length - 3} more` : ""}
                        {" — "}
                        {m.missing.length === 1
                          ? "just 1 ingredient to go!"
                          : `only ${m.missing.length} ingredients to go!`}
                      </p>
                      <div className="space-y-1.5">
                        {m.missing.map((name) => {
                          const subs = SUBSTITUTIONS[name];
                          return (
                            <div key={name} className="flex items-start gap-2 text-xs">
                              <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                              <div>
                                <span className="text-foreground/70 font-medium">{name}</span>
                                {subs && subs.length > 0 && (
                                  <span className="text-foreground/40 ml-1">
                                    — try {subs.slice(0, 2).join(" or ")} instead
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recipe matches */}
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-copper mb-1">Recipe Matches</h2>
            <p className="text-foreground/40 text-xs mb-5">
              {selected.size === 0
                ? "Select ingredients to see what you can cook"
                : matches.length === 0
                  ? "No recipes match your current pantry"
                  : `${matches.length} recipe${matches.length !== 1 ? "s" : ""} found`}
            </p>

            {selected.size === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <span className="text-5xl sm:text-6xl block mb-4 opacity-30">🍳</span>
                <p className="text-foreground/30 text-sm">
                  Your pantry is empty. Add ingredients to discover recipes.
                </p>
              </div>
            ) : matches.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <span className="text-5xl sm:text-6xl block mb-4 opacity-30">🔍</span>
                <p className="text-foreground/30 text-sm">
                  Try adding more common ingredients like eggs, butter, or garlic.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((m) => {
                  const isExpanded = expandedRecipe === m.recipe.id;
                  return (
                    <button
                      key={m.recipe.id}
                      onClick={() => setExpandedRecipe(isExpanded ? null : m.recipe.id)}
                      className="w-full text-left rounded-xl border border-border bg-background/50 hover:border-copper/30 transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                        <MiniRadar profile={m.profile} size={64} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground text-sm truncate">
                              {m.recipe.name}
                            </span>
                            <span className="text-xs text-foreground/30">{m.recipe.cuisine}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-foreground/40">
                            <span
                              className={`font-medium ${
                                m.recipe.difficulty === "Easy"
                                  ? "text-green-500"
                                  : m.recipe.difficulty === "Medium"
                                    ? "text-amber-500"
                                    : "text-red-400"
                              }`}
                            >
                              {m.recipe.difficulty}
                            </span>
                            <span>{m.recipe.time} min</span>
                            <span>
                              {m.matched.length}/{m.recipe.ingredients.length} ingredients
                            </span>
                          </div>
                        </div>
                        {/* Match percentage badge */}
                        <div className="shrink-0 text-center">
                          <div
                            className={`text-lg sm:text-xl font-bold ${
                              m.percentage >= 80
                                ? "text-green-500"
                                : m.percentage >= 50
                                  ? "text-amber-500"
                                  : "text-foreground/40"
                            }`}
                          >
                            {m.percentage}%
                          </div>
                          <div className="text-[10px] text-foreground/30 uppercase tracking-wider">
                            match
                          </div>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="border-t border-border px-3 sm:px-4 py-3 sm:py-4 space-y-3">
                          <p className="text-xs text-foreground/50 leading-relaxed">
                            {m.recipe.description}
                          </p>
                          <div className="space-y-1.5">
                            <p className="text-xs font-medium text-foreground/60">Ingredients:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {m.recipe.ingredients.map((ri) => {
                                const have = m.matched.includes(ri.name);
                                return (
                                  <span
                                    key={ri.name}
                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs ${
                                      have
                                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                    }`}
                                    title={!have && SUBSTITUTIONS[ri.name] ? `Sub: ${SUBSTITUTIONS[ri.name].join(", ")}` : undefined}
                                  >
                                    <span>{ri.emoji}</span>
                                    <span>{ri.name}</span>
                                    {!have && SUBSTITUTIONS[ri.name] ? (
                                      <span className="text-[10px] opacity-60">→ {SUBSTITUTIONS[ri.name][0]}</span>
                                    ) : !have ? (
                                      <span className="text-[10px] opacity-60">missing</span>
                                    ) : null}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-xs font-medium text-foreground/60">Techniques:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {m.recipe.techniques.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-surface-light px-2.5 py-0.5 text-xs text-foreground/50"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
