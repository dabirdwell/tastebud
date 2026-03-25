"use client";

import { useState, useEffect, useMemo } from "react";
import { RECIPES } from "@/data/recipes";
import { INGREDIENTS } from "@/data/ingredients";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MEALS = ["breakfast", "lunch", "dinner"] as const;

type MealPlan = Record<string, Record<string, string | null>>;

// Categorize ingredients for the shopping list
const CATEGORY_MAP: Record<string, string> = {
  // Produce
  tomato: "Produce", onion: "Produce", garlic: "Produce", mushroom: "Produce",
  carrot: "Produce", "bell pepper": "Produce", celery: "Produce", potato: "Produce",
  spinach: "Produce", broccoli: "Produce", corn: "Produce", avocado: "Produce",
  cucumber: "Produce", "bean sprouts": "Produce", lime: "Produce", lemon: "Produce",
  cabbage: "Produce", "green papaya": "Produce", "cherry tomatoes": "Produce",
  eggplant: "Produce", zucchini: "Produce", lettuce: "Produce", scallion: "Produce",
  "green beans": "Produce", "thai basil": "Produce", "bamboo shoots": "Produce",
  "napa cabbage": "Produce", cilantro: "Produce", ginger: "Produce",
  "scotch bonnet": "Produce", "green chili": "Produce", shallot: "Produce",
  "thai chili": "Produce", orange: "Produce", apple: "Produce", strawberry: "Produce",

  // Proteins
  chicken: "Proteins", salmon: "Proteins", shrimp: "Proteins", beef: "Proteins",
  pork: "Proteins", tofu: "Proteins", egg: "Proteins", eggs: "Proteins",
  "ground pork": "Proteins", "pork belly": "Proteins", "pork shoulder": "Proteins",
  "chicken thighs": "Proteins", "sashimi fish": "Proteins", paneer: "Proteins",
  "raw beef": "Proteins",

  // Dairy
  parmesan: "Dairy", butter: "Dairy", cream: "Dairy", cheese: "Dairy",
  "pecorino romano": "Dairy", "crème fraîche": "Dairy", feta: "Dairy",
  "sour cream": "Dairy", yogurt: "Dairy", "heavy cream": "Dairy",
  "cotija cheese": "Dairy",

  // Pantry
  "rice noodles": "Pantry", pasta: "Pantry", "tonnarelli pasta": "Pantry",
  rice: "Pantry", flour: "Pantry", sugar: "Pantry", salt: "Pantry",
  "olive oil": "Pantry", "soy sauce": "Pantry", vinegar: "Pantry",
  "sushi rice": "Pantry", "sushi vinegar": "Pantry", nori: "Pantry",
  "palm sugar": "Pantry", "tamarind paste": "Pantry", "fish sauce": "Pantry",
  "sesame oil": "Pantry", "coconut milk": "Pantry", honey: "Pantry",
  "dark chocolate": "Pantry", peanuts: "Pantry", "peanut butter": "Pantry",
  "masa harina": "Pantry", hominy: "Pantry", "dried chilies": "Pantry",
  "corn tortillas": "Pantry", lentils: "Pantry", "red lentils": "Pantry",
  chickpeas: "Pantry", "pasta water": "Pantry", "miso paste": "Pantry",
  "dashi stock": "Pantry", "curry paste": "Pantry", ramen: "Pantry",
  "ramen noodles": "Pantry", grits: "Pantry", "injera bread": "Pantry",
  mayonnaise: "Pantry", "tenkasu": "Pantry", "okonomiyaki sauce": "Pantry",
  "corn ear": "Pantry",

  // Spices
  "chili flakes": "Spices", "black pepper": "Spices", cumin: "Spices",
  paprika: "Spices", cinnamon: "Spices", turmeric: "Spices", oregano: "Spices",
  basil: "Spices", thyme: "Spices", "bay leaf": "Spices", saffron: "Spices",
  "berbere spice": "Spices", "niter kibbeh": "Spices", "garam masala": "Spices",
  "kashmiri chili": "Spices", "biryani masala": "Spices", "coriander": "Spices",
  "mitmita spice": "Spices", "cayenne": "Spices", "chili powder": "Spices",
  "ancho chili": "Spices", "guajillo chili": "Spices", kimchi: "Spices",
  "gochugaru": "Spices", "gochujang": "Spices",
};

const CATEGORY_ORDER = ["Produce", "Proteins", "Dairy", "Pantry", "Spices"];
const CATEGORY_EMOJI: Record<string, string> = {
  Produce: "🥬",
  Proteins: "🥩",
  Dairy: "🧀",
  Pantry: "🫙",
  Spices: "🌶️",
};

function categorize(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, cat] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return cat;
  }
  return "Pantry"; // default
}

interface ShoppingItem {
  name: string;
  emoji: string;
  count: number;
  category: string;
  inPantry: boolean;
}

export default function ShoppingList() {
  const [plan, setPlan] = useState<MealPlan>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [pantryIds, setPantryIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [hidePantry, setHidePantry] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tastebud-meal-plan");
      if (saved) setPlan(JSON.parse(saved));
    } catch {}
    try {
      const savedChecked = localStorage.getItem("tastebud-shopping-checked");
      if (savedChecked) setChecked(new Set(JSON.parse(savedChecked)));
    } catch {}
    // Check for pantry data (ingredient IDs the user has selected in PantryMode)
    try {
      const savedPantry = localStorage.getItem("tastebud-pantry");
      if (savedPantry) setPantryIds(new Set(JSON.parse(savedPantry)));
    } catch {}
  }, []);

  const toggleCheck = (name: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      localStorage.setItem(
        "tastebud-shopping-checked",
        JSON.stringify([...next])
      );
      return next;
    });
  };

  // Aggregate ingredients from all planned meals
  const items = useMemo(() => {
    const map = new Map<string, ShoppingItem>();

    // Build a set of pantry ingredient names for deduction
    const pantryNames = new Set(
      INGREDIENTS.filter((ing) => pantryIds.has(ing.id)).map((ing) =>
        ing.name.toLowerCase()
      )
    );

    for (const day of DAYS) {
      for (const meal of MEALS) {
        const recipeId = plan[day]?.[meal];
        if (!recipeId) continue;
        const recipe = RECIPES.find((r) => r.id === recipeId);
        if (!recipe) continue;

        for (const ing of recipe.ingredients) {
          const key = ing.name.toLowerCase();
          const existing = map.get(key);
          if (existing) {
            existing.count++;
          } else {
            map.set(key, {
              name: ing.name,
              emoji: ing.emoji,
              count: 1,
              category: categorize(ing.name),
              inPantry: pantryNames.has(key),
            });
          }
        }
      }
    }

    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [plan, pantryIds]);

  const grouped = useMemo(() => {
    const groups: Record<string, ShoppingItem[]> = {};
    for (const cat of CATEGORY_ORDER) groups[cat] = [];
    for (const item of items) {
      if (hidePantry && item.inPantry) continue;
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [items, hidePantry]);

  const totalItems = Object.values(grouped).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const copyToClipboard = () => {
    const lines: string[] = ["🛒 TasteBud Shopping List", ""];
    for (const cat of CATEGORY_ORDER) {
      const catItems = grouped[cat];
      if (!catItems?.length) continue;
      lines.push(`${CATEGORY_EMOJI[cat]} ${cat}`);
      for (const item of catItems) {
        const check = checked.has(item.name) ? "✅" : "⬜";
        const qty = item.count > 1 ? ` (×${item.count})` : "";
        lines.push(`  ${check} ${item.emoji} ${item.name}${qty}`);
      }
      lines.push("");
    }
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!Object.keys(plan).length || totalItems === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-copper mb-4">Shopping List</h1>
        <p className="text-foreground/50 mb-6">
          Your shopping list is empty. Plan some meals first!
        </p>
        <a
          href="/planner"
          className="inline-block rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors"
        >
          Go to Meal Planner
        </a>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-copper mb-2">
          Shopping List
        </h1>
        <p className="text-foreground/60">
          {totalItems} items from your meal plan
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <a
          href="/planner"
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground/70 hover:border-copper hover:text-copper transition-colors"
        >
          ← Edit Plan
        </a>
        {pantryIds.size > 0 && (
          <button
            onClick={() => setHidePantry(!hidePantry)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              hidePantry
                ? "border-saffron text-saffron"
                : "border-border text-foreground/70 hover:border-saffron hover:text-saffron"
            }`}
          >
            {hidePantry ? "✓ Pantry items hidden" : "Hide pantry items"}
          </button>
        )}
        <button
          onClick={copyToClipboard}
          className="rounded-full bg-copper px-5 py-2 text-sm font-medium text-background hover:bg-copper-light transition-colors"
        >
          {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
        </button>
      </div>

      {/* Grouped Items */}
      <div className="space-y-6">
        {CATEGORY_ORDER.map((cat) => {
          const catItems = grouped[cat];
          if (!catItems?.length) return null;
          return (
            <div key={cat}>
              <h2 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>{CATEGORY_EMOJI[cat]}</span>
                {cat}
                <span className="text-foreground/30 font-normal">
                  ({catItems.length})
                </span>
              </h2>
              <div className="space-y-1">
                {catItems.map((item) => (
                  <label
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      checked.has(item.name)
                        ? "bg-surface-light/50 opacity-50"
                        : "bg-surface hover:bg-surface-light"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked.has(item.name)}
                      onChange={() => toggleCheck(item.name)}
                      className="w-4 h-4 rounded accent-copper"
                    />
                    <span className="text-base">{item.emoji}</span>
                    <span
                      className={`flex-1 text-sm ${
                        checked.has(item.name)
                          ? "line-through text-foreground/40"
                          : "text-foreground/90"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.count > 1 && (
                      <span className="text-xs text-copper font-medium bg-copper/10 px-2 py-0.5 rounded-full">
                        ×{item.count}
                      </span>
                    )}
                    {item.inPantry && !hidePantry && (
                      <span className="text-[10px] text-saffron/70 bg-saffron/10 px-1.5 py-0.5 rounded">
                        in pantry
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
