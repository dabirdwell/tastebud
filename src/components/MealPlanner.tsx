"use client";

import { useState, useEffect, useCallback } from "react";
import { RECIPES, type Recipe } from "@/data/recipes";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const MEALS = ["breakfast", "lunch", "dinner"] as const;
const MEAL_LABELS: Record<string, string> = {
  breakfast: "🌅 Breakfast",
  lunch: "☀️ Lunch",
  dinner: "🌙 Dinner",
};

type MealPlan = Record<string, Record<string, string | null>>;

function emptyPlan(): MealPlan {
  const plan: MealPlan = {};
  for (const day of DAYS) {
    plan[day] = {};
    for (const meal of MEALS) {
      plan[day][meal] = null;
    }
  }
  return plan;
}

function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}

// Quick plan generators
function budgetWeek(): MealPlan {
  const easy = RECIPES.filter(
    (r) => r.difficulty === "Easy" || r.ingredients.length <= 6
  );
  return fillPlan(easy);
}

function worldTour(): MealPlan {
  const cuisines = [...new Set(RECIPES.map((r) => r.cuisine))];
  const plan = emptyPlan();
  DAYS.forEach((day, i) => {
    const cuisine = cuisines[i % cuisines.length];
    const pool = RECIPES.filter((r) => r.cuisine === cuisine);
    for (const meal of MEALS) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (pick) plan[day][meal] = pick.id;
    }
  });
  return plan;
}

function quickMeals(): MealPlan {
  const fast = RECIPES.filter((r) => r.time <= 30);
  return fillPlan(fast.length >= 3 ? fast : RECIPES.filter((r) => r.time <= 45));
}

function fillPlan(pool: Recipe[]): MealPlan {
  const plan = emptyPlan();
  for (const day of DAYS) {
    for (const meal of MEALS) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (pick) plan[day][meal] = pick.id;
    }
  }
  return plan;
}

function randomizePlan(): MealPlan {
  return fillPlan(RECIPES);
}

export default function MealPlanner() {
  const [plan, setPlan] = useState<MealPlan>(emptyPlan);
  const [picker, setPicker] = useState<{ day: string; meal: string } | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [dragRecipe, setDragRecipe] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tastebud-meal-plan");
      if (saved) setPlan(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
  const savePlan = useCallback(
    (newPlan: MealPlan) => {
      setPlan(newPlan);
      localStorage.setItem("tastebud-meal-plan", JSON.stringify(newPlan));
    },
    []
  );

  const assignRecipe = (day: string, meal: string, recipeId: string) => {
    const newPlan = { ...plan, [day]: { ...plan[day], [meal]: recipeId } };
    savePlan(newPlan);
    setPicker(null);
    setSearch("");
  };

  const clearSlot = (day: string, meal: string) => {
    const newPlan = { ...plan, [day]: { ...plan[day], [meal]: null } };
    savePlan(newPlan);
  };

  // Stats
  const plannedRecipes = DAYS.flatMap((day) =>
    MEALS.map((meal) => plan[day]?.[meal]).filter(Boolean)
  );
  const totalTime = plannedRecipes.reduce((sum, id) => {
    const r = getRecipeById(id!);
    return sum + (r?.time ?? 0);
  }, 0);
  const cuisineSet = new Set(
    plannedRecipes.map((id) => getRecipeById(id!)?.cuisine).filter(Boolean)
  );

  const filteredRecipes = RECIPES.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-copper mb-2">
          Weekly Meal Planner
        </h1>
        <p className="text-foreground/60">
          Plan your week, explore new cuisines, and generate your shopping list.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
        <div className="bg-surface border border-border rounded-lg px-4 py-2">
          <span className="text-foreground/50">Meals planned:</span>{" "}
          <span className="text-copper font-medium">{plannedRecipes.length}/21</span>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-2">
          <span className="text-foreground/50">Total prep:</span>{" "}
          <span className="text-copper font-medium">
            {Math.floor(totalTime / 60)}h {totalTime % 60}m
          </span>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-2">
          <span className="text-foreground/50">Cuisines:</span>{" "}
          <span className="text-copper font-medium">{cuisineSet.size} varieties</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => savePlan(emptyPlan())}
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground/70 hover:border-copper hover:text-copper transition-colors"
        >
          Clear Week
        </button>
        <button
          onClick={() => savePlan(randomizePlan())}
          className="rounded-full border border-border px-4 py-2 text-sm text-foreground/70 hover:border-copper hover:text-copper transition-colors"
        >
          🎲 Randomize
        </button>
        <button
          onClick={() => savePlan(budgetWeek())}
          className="rounded-full bg-surface-light border border-border px-4 py-2 text-sm text-foreground/70 hover:border-saffron hover:text-saffron transition-colors"
        >
          💰 Budget Week
        </button>
        <button
          onClick={() => savePlan(worldTour())}
          className="rounded-full bg-surface-light border border-border px-4 py-2 text-sm text-foreground/70 hover:border-saffron hover:text-saffron transition-colors"
        >
          🌍 World Tour
        </button>
        <button
          onClick={() => savePlan(quickMeals())}
          className="rounded-full bg-surface-light border border-border px-4 py-2 text-sm text-foreground/70 hover:border-saffron hover:text-saffron transition-colors"
        >
          ⚡ Quick Meals
        </button>
        <a
          href="/shopping"
          className="rounded-full bg-copper px-5 py-2 text-sm font-medium text-background hover:bg-copper-light transition-colors"
        >
          🛒 Shopping List
        </a>
      </div>

      {/* Weekly Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] grid grid-cols-8 gap-px bg-border rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="bg-surface p-3" />
          {DAYS.map((day) => (
            <div
              key={day}
              className="bg-surface p-3 text-center text-sm font-semibold text-copper"
            >
              {day}
            </div>
          ))}

          {/* Meal rows */}
          {MEALS.map((meal) => (
            <MealRow
              key={meal}
              meal={meal}
              plan={plan}
              onClickSlot={(day) => setPicker({ day, meal })}
              onClear={clearSlot}
              onDragStart={setDragRecipe}
              onDrop={(day) => {
                if (dragRecipe) {
                  assignRecipe(day, meal, dragRecipe);
                  setDragRecipe(null);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Recipe sidebar from library */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground/80 mb-3">
          Drag recipes to the planner
        </h2>
        <div className="flex flex-wrap gap-2">
          {RECIPES.map((r) => (
            <div
              key={r.id}
              draggable
              onDragStart={() => setDragRecipe(r.id)}
              className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs cursor-grab hover:border-copper transition-colors select-none"
            >
              <span className="text-foreground/90">{r.name}</span>
              <span className="text-foreground/40 ml-1.5">{r.cuisine} · {r.time}m</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Picker Modal */}
      {picker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => {
            setPicker(null);
            setSearch("");
          }}
        >
          <div
            className="bg-surface border border-border rounded-2xl w-full max-w-md mx-4 max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-copper mb-2">
                {picker.day} — {MEAL_LABELS[picker.meal]}
              </h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes..."
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-foreground/40 focus:border-copper outline-none"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {filteredRecipes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => assignRecipe(picker.day, picker.meal, r.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-surface-light transition-colors group"
                >
                  <div className="text-sm font-medium text-foreground/90 group-hover:text-copper">
                    {r.name}
                  </div>
                  <div className="text-xs text-foreground/40">
                    {r.cuisine} · {r.difficulty} · {r.time} min ·{" "}
                    {r.ingredients.length} ingredients
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function MealRow({
  meal,
  plan,
  onClickSlot,
  onClear,
  onDragStart,
  onDrop,
}: {
  meal: string;
  plan: MealPlan;
  onClickSlot: (day: string) => void;
  onClear: (day: string, meal: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (day: string) => void;
}) {
  return (
    <>
      <div className="bg-surface p-3 flex items-center text-xs font-medium text-foreground/60">
        {MEAL_LABELS[meal]}
      </div>
      {DAYS.map((day) => {
        const recipeId = plan[day]?.[meal];
        const recipe = recipeId ? getRecipeById(recipeId) : null;
        return (
          <div
            key={`${day}-${meal}`}
            className="bg-background p-2 min-h-[80px] flex items-center justify-center transition-colors hover:bg-surface-light"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onDrop(day);
            }}
          >
            {recipe ? (
              <div
                className="w-full text-center group cursor-grab"
                draggable
                onDragStart={() => onDragStart(recipe.id)}
              >
                <div className="text-xs font-medium text-foreground/90 leading-tight">
                  {recipe.name}
                </div>
                <div className="text-[10px] text-foreground/40 mt-0.5">
                  {recipe.time}m · {recipe.cuisine}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear(day, meal);
                  }}
                  className="text-[10px] text-foreground/20 hover:text-red-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => onClickSlot(day)}
                className="text-foreground/20 hover:text-copper text-xl transition-colors"
                title="Add recipe"
              >
                +
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}
