"use client";

import { useState, useMemo } from "react";
import { RECIPES, CUISINES, DIFFICULTIES, ALL_TAGS, getRecipeFlavorProfile, type Recipe } from "@/data/recipes";
import { AXIS_CONFIG, type FlavorProfile } from "@/data/ingredients";
import MentorSidebar from "@/components/MentorSidebar";

/* ------------------------------------------------------------------ */
/*  Radar Chart (self-contained, matches FlavorMap aesthetic)          */
/* ------------------------------------------------------------------ */

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  total: number,
): [number, number] {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function hexagonPath(cx: number, cy: number, radius: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as [number, number];
  });
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
}

function MiniRadar({ profile, size }: { profile: FlavorProfile; size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const rings = [0.5, 1.0];

  const points = AXIS_CONFIG.map((axis, i) => {
    const val = profile[axis.key] / 100;
    return polarToCartesian(cx, cy, maxRadius * val, i, 6);
  });

  const polygonPoints = points.map((p) => p.join(",")).join(" ");

  const vals = AXIS_CONFIG.map((a) => profile[a.key]);
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals);
  const balanced = maxVal - minVal < 30;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      <defs>
        <radialGradient id="miniGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={balanced ? "#b87333" : "#4a6fa5"} stopOpacity={0.15} />
          <stop offset="100%" stopColor="transparent" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={maxRadius * 1.1} fill="url(#miniGlow)" />
      {rings.map((r) => (
        <path key={r} d={hexagonPath(cx, cy, maxRadius * r)} fill="none" stroke="#2a2a22" strokeWidth={1} opacity={0.4 + r * 0.2} />
      ))}
      {AXIS_CONFIG.map((axis, i) => {
        const [ex, ey] = polarToCartesian(cx, cy, maxRadius, i, 6);
        return <line key={axis.key} x1={cx} y1={cy} x2={ex} y2={ey} stroke="#2a2a22" strokeWidth={1} opacity={0.5} />;
      })}
      <polygon
        points={polygonPoints}
        fill={balanced ? "rgba(184, 115, 51, 0.25)" : "rgba(74, 111, 165, 0.2)"}
        stroke={balanced ? "#d4956b" : "#6a8fc5"}
        strokeWidth={1.5}
        style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        return <circle key={axis.key} cx={px} cy={py} r={3} fill={axis.color} stroke="#0a0a08" strokeWidth={1.5} />;
      })}
      {AXIS_CONFIG.map((axis, i) => {
        const [lx, ly] = polarToCartesian(cx, cy, maxRadius + 18, i, 6);
        return (
          <text key={axis.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={axis.color} fontSize={8} fontWeight={600}>
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-size Radar for the detail overlay                            */
/* ------------------------------------------------------------------ */

function FullRadar({ profile, size }: { profile: FlavorProfile; size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const rings = [0.25, 0.5, 0.75, 1.0];

  const points = AXIS_CONFIG.map((axis, i) => {
    const val = profile[axis.key] / 100;
    return polarToCartesian(cx, cy, maxRadius * val, i, 6);
  });

  const polygonPoints = points.map((p) => p.join(",")).join(" ");
  const vals = AXIS_CONFIG.map((a) => profile[a.key]);
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals);
  const balanced = maxVal - minVal < 30;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
      <defs>
        <radialGradient id="fullGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={balanced ? "#b87333" : "#4a6fa5"} stopOpacity={0.15} />
          <stop offset="100%" stopColor="transparent" stopOpacity={0} />
        </radialGradient>
        <filter id="detailGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={maxRadius * 1.1} fill="url(#fullGlow)" />
      {rings.map((r) => (
        <path key={r} d={hexagonPath(cx, cy, maxRadius * r)} fill="none" stroke="#2a2a22" strokeWidth={1} opacity={0.4 + r * 0.2} />
      ))}
      {AXIS_CONFIG.map((axis, i) => {
        const [ex, ey] = polarToCartesian(cx, cy, maxRadius, i, 6);
        return <line key={axis.key} x1={cx} y1={cy} x2={ex} y2={ey} stroke="#2a2a22" strokeWidth={1} opacity={0.5} />;
      })}
      <polygon
        points={polygonPoints}
        fill={balanced ? "rgba(184, 115, 51, 0.25)" : "rgba(74, 111, 165, 0.2)"}
        stroke={balanced ? "#d4956b" : "#6a8fc5"}
        strokeWidth={2}
        filter="url(#detailGlow)"
        style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        const val = profile[axis.key];
        return (
          <g key={axis.key}>
            {val > 50 && (
              <circle
                cx={px}
                cy={py}
                r={8}
                fill="none"
                stroke={axis.color}
                strokeWidth={1}
                opacity={0.3}
                className="animate-ping"
                style={{ transformOrigin: `${px}px ${py}px` }}
              />
            )}
            <circle cx={px} cy={py} r={5} fill={axis.color} stroke="#0a0a08" strokeWidth={2} />
          </g>
        );
      })}
      {AXIS_CONFIG.map((axis, i) => {
        const [lx, ly] = polarToCartesian(cx, cy, maxRadius + 28, i, 6);
        return (
          <text key={axis.key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={axis.color} fontSize={11} fontWeight={600}>
            {axis.label}
          </text>
        );
      })}
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        const val = profile[axis.key];
        if (val === 0) return null;
        return (
          <text key={`val-${axis.key}`} x={px} y={py - 12} textAnchor="middle" fill="#e8e0d4" fontSize={10} fontWeight={500} opacity={0.8}>
            {val}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function getDominantFlavors(profile: FlavorProfile): string[] {
  return AXIS_CONFIG
    .map((a) => ({ label: a.label, val: profile[a.key] }))
    .sort((a, b) => b.val - a.val)
    .slice(0, 3)
    .filter((f) => f.val > 15)
    .map((f) => f.label);
}

function getDifficultyStars(recipe: Recipe): number {
  if (recipe.difficultyLevel) return recipe.difficultyLevel;
  return recipe.difficulty === "Easy" ? 1 : recipe.difficulty === "Medium" ? 3 : 5;
}

function formatTimer(seconds: number): string {
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function DifficultyStars({ count }: { count: number }) {
  return (
    <span className="text-[10px] tracking-wide">
      <span className="text-amber-400">{"★".repeat(count)}</span>
      <span className="text-foreground/20">{"★".repeat(5 - count)}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Time filter options                                               */
/* ------------------------------------------------------------------ */

const TIME_FILTERS = [
  { label: "Any", max: Infinity },
  { label: "< 30 min", max: 30 },
  { label: "< 60 min", max: 60 },
  { label: "< 120 min", max: 120 },
] as const;

/* ------------------------------------------------------------------ */
/*  Recipe Detail Overlay                                             */
/* ------------------------------------------------------------------ */

function RecipeDetail({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const profile = getRecipeFlavorProfile(recipe);
  const dominant = getDominantFlavors(profile);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-medium tracking-widest uppercase text-copper mb-1">{recipe.cuisine}</p>
          <h2 className="text-2xl font-bold text-foreground">{recipe.name}</h2>
          <p className="text-foreground/50 text-sm mt-2 leading-relaxed">{recipe.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-foreground/40">
            <DifficultyStars count={getDifficultyStars(recipe)} />
            {recipe.prepTime != null && recipe.cookTime != null ? (
              <>
                <span className="px-2.5 py-0.5 rounded-full border border-border">Prep {recipe.prepTime}m</span>
                <span className="px-2.5 py-0.5 rounded-full border border-border">Cook {recipe.cookTime}m</span>
              </>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full border border-border">{recipe.time} min</span>
            )}
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {recipe.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/20 text-copper-light capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Flavor Map */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider">Flavor Profile</h3>
            <FullRadar profile={profile} size={320} />
            <div className="flex flex-wrap gap-2 justify-center">
              {dominant.map((f) => (
                <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-copper/15 border border-copper/30 text-copper-light">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients + Steps + Techniques */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-3">Ingredients</h3>
              <div className="space-y-1.5">
                {recipe.ingredients.map((ing) => {
                  const top = AXIS_CONFIG.reduce(
                    (best, a) => (ing.flavorProfile[a.key] > best.val ? { label: a.label, val: ing.flavorProfile[a.key] } : best),
                    { label: "", val: 0 },
                  );
                  return (
                    <div key={ing.name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background/50 border border-border/50">
                      <span className="text-base">{ing.emoji}</span>
                      <span className="text-sm text-foreground/80 flex-1">
                        {ing.amount && ing.unit && (
                          <span className="text-foreground/40 mr-1.5">{ing.amount} {ing.unit}</span>
                        )}
                        {ing.name}
                      </span>
                      {top.val > 30 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-light text-foreground/40">
                          {top.label} {top.val}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {recipe.steps && recipe.steps.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-3">Steps</h3>
                <ol className="space-y-3">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-copper/15 border border-copper/30 text-copper text-xs flex items-center justify-center font-medium">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-foreground/70 leading-relaxed">{step.instruction}</p>
                        {step.timerSeconds && (
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-surface-light border border-border text-foreground/40">
                            ⏱ {formatTimer(step.timerSeconds)}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-3">Key Techniques</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.techniques.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-surface-light border border-border text-foreground/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Mentor sidebar guide */}
            <MentorSidebar techniques={recipe.techniques} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recipe Card                                                       */
/* ------------------------------------------------------------------ */

function RecipeCard({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) {
  const profile = getRecipeFlavorProfile(recipe);
  const dominant = getDominantFlavors(profile);
  const totalTime = recipe.prepTime != null && recipe.cookTime != null ? recipe.prepTime + recipe.cookTime : recipe.time;

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl border border-border bg-surface p-6 hover:border-copper/40 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-medium tracking-widest uppercase text-copper mb-1">{recipe.cuisine}</p>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-copper-light transition-colors truncate">
            {recipe.name}
          </h3>
          <p className="text-foreground/40 text-xs mt-1 line-clamp-2">{recipe.description}</p>
        </div>
        <div className="shrink-0">
          <MiniRadar profile={profile} size={120} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-4">
        <DifficultyStars count={getDifficultyStars(recipe)} />
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-border text-foreground/40">{totalTime} min</span>
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex gap-1 ml-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-light border border-border text-foreground/30 capitalize">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-1.5 ml-auto">
          {dominant.map((f) => (
            <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-copper/10 text-copper-light/70">
              {f}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Explorer                                                     */
/* ------------------------------------------------------------------ */

export default function RecipeExplorer() {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTimeIdx, setSelectedTimeIdx] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const filtered = useMemo(() => {
    const maxTime = TIME_FILTERS[selectedTimeIdx].max;
    return RECIPES.filter((r) => {
      if (selectedCuisine && r.cuisine !== selectedCuisine) return false;
      if (selectedDifficulty && r.difficulty !== selectedDifficulty) return false;
      const totalTime = r.prepTime != null && r.cookTime != null ? r.prepTime + r.cookTime : r.time;
      if (totalTime > maxTime) return false;
      if (selectedTag && (!r.tags || !r.tags.includes(selectedTag))) return false;
      return true;
    });
  }, [selectedCuisine, selectedDifficulty, selectedTimeIdx, selectedTag]);

  return (
    <>
      <section className="w-full max-w-6xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest uppercase text-copper mb-3">Recipe Explorer</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            See the <span className="text-copper">Flavor DNA</span> of Great Dishes
          </h1>
          <p className="text-foreground/50 text-sm max-w-xl mx-auto">
            Browse recipes from around the world and see how their ingredients create unique flavor profiles on the map.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-10">
          {/* Cuisine */}
          <div className="space-y-2">
            <label className="text-xs text-foreground/40 uppercase tracking-wider font-medium">Cuisine</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCuisine(null)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  !selectedCuisine
                    ? "bg-copper/20 text-copper-light border border-copper/30"
                    : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                }`}
              >
                All
              </button>
              {CUISINES.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCuisine(selectedCuisine === c ? null : c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedCuisine === c
                      ? "bg-copper/20 text-copper-light border border-copper/30"
                      : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-xs text-foreground/40 uppercase tracking-wider font-medium">Difficulty</label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  !selectedDifficulty
                    ? "bg-copper/20 text-copper-light border border-copper/30"
                    : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                }`}
              >
                All
              </button>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === d ? null : d)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedDifficulty === d
                      ? "bg-copper/20 text-copper-light border border-copper/30"
                      : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-xs text-foreground/40 uppercase tracking-wider font-medium">Time</label>
            <div className="flex gap-1.5">
              {TIME_FILTERS.map((tf, i) => (
                <button
                  key={tf.label}
                  onClick={() => setSelectedTimeIdx(i)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedTimeIdx === i
                      ? "bg-copper/20 text-copper-light border border-copper/30"
                      : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-xs text-foreground/40 uppercase tracking-wider font-medium">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  !selectedTag
                    ? "bg-copper/20 text-copper-light border border-copper/30"
                    : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                }`}
              >
                All
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                    selectedTag === tag
                      ? "bg-copper/20 text-copper-light border border-copper/30"
                      : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-foreground/30 mb-4">
          {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setActiveRecipe(recipe)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground/30 text-sm">
            No recipes match your filters. Try broadening your search.
          </div>
        )}
      </section>

      {/* Detail overlay */}
      {activeRecipe && <RecipeDetail recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />}
    </>
  );
}
