"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { INGREDIENTS, AXIS_CONFIG, type Ingredient, type FlavorProfile } from "@/data/ingredients";

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  total: number
): [number, number] {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function computeComposite(ingredients: Ingredient[]): FlavorProfile {
  if (ingredients.length === 0) {
    return { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  }
  const composite: FlavorProfile = { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  for (const ing of ingredients) {
    for (const key of AXIS_CONFIG) {
      composite[key.key] += ing.flavorProfile[key.key];
    }
  }
  // Average then clamp to 0-100
  for (const key of AXIS_CONFIG) {
    composite[key.key] = Math.min(100, Math.round(composite[key.key] / ingredients.length));
  }
  return composite;
}

// Hexagonal grid point for a ring
function hexPoint(cx: number, cy: number, radius: number, index: number): [number, number] {
  const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function hexagonPath(cx: number, cy: number, radius: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => hexPoint(cx, cy, radius, i));
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
}

function RadarChart({
  profile,
  size,
  animate,
}: {
  profile: FlavorProfile;
  size: number;
  animate: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const rings = [0.25, 0.5, 0.75, 1.0];

  const points = AXIS_CONFIG.map((axis, i) => {
    const val = profile[axis.key] / 100;
    return polarToCartesian(cx, cy, maxRadius * val, i, 6);
  });

  const polygonPoints = points.map((p) => p.join(",")).join(" ");

  // Determine balance — if all axes within 25 of each other, warm glow; else cool shift
  const vals = AXIS_CONFIG.map((a) => profile[a.key]);
  const maxVal = Math.max(...vals);
  const minVal = Math.min(...vals);
  const balanced = maxVal - minVal < 30;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg"
    >
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={balanced ? "#b87333" : "#4a6fa5"}
            stopOpacity={0.15}
          />
          <stop offset="100%" stopColor="transparent" stopOpacity={0} />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={maxRadius * 1.1} fill="url(#radarGlow)" />

      {/* Hexagonal rings */}
      {rings.map((r) => (
        <path
          key={r}
          d={hexagonPath(cx, cy, maxRadius * r)}
          fill="none"
          stroke="#2a2a22"
          strokeWidth={1}
          opacity={0.4 + r * 0.2}
        />
      ))}

      {/* Axis lines */}
      {AXIS_CONFIG.map((axis, i) => {
        const [ex, ey] = polarToCartesian(cx, cy, maxRadius, i, 6);
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={ex}
            y2={ey}
            stroke="#2a2a22"
            strokeWidth={1}
            opacity={0.5}
          />
        );
      })}

      {/* Filled flavor shape */}
      <polygon
        points={polygonPoints}
        fill={balanced ? "rgba(184, 115, 51, 0.25)" : "rgba(74, 111, 165, 0.2)"}
        stroke={balanced ? "#d4956b" : "#6a8fc5"}
        strokeWidth={2}
        filter="url(#glow)"
        style={{
          transition: animate ? "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
      />

      {/* Data points with pulse animation */}
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        const val = profile[axis.key];
        return (
          <g key={axis.key}>
            {/* Pulse ring */}
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
            <circle
              cx={px}
              cy={py}
              r={5}
              fill={axis.color}
              stroke="#0a0a08"
              strokeWidth={2}
              style={{
                transition: animate ? "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              }}
            />
          </g>
        );
      })}

      {/* Axis labels */}
      {AXIS_CONFIG.map((axis, i) => {
        const [lx, ly] = polarToCartesian(cx, cy, maxRadius + 28, i, 6);
        return (
          <text
            key={axis.key}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={axis.color}
            fontSize={11}
            fontWeight={600}
            className="select-none"
          >
            {axis.label}
          </text>
        );
      })}

      {/* Value labels */}
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        const val = profile[axis.key];
        if (val === 0) return null;
        return (
          <text
            key={`val-${axis.key}`}
            x={px}
            y={py - 12}
            textAnchor="middle"
            fill="#e8e0d4"
            fontSize={10}
            fontWeight={500}
            opacity={0.8}
          >
            {val}
          </text>
        );
      })}

      {/* Center label when empty */}
      {AXIS_CONFIG.every((a) => profile[a.key] === 0) && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#e8e0d4"
          fontSize={12}
          opacity={0.4}
        >
          Drop ingredients here
        </text>
      )}
    </svg>
  );
}

function IngredientChip({
  ingredient,
  onDragStart,
}: {
  ingredient: Ingredient;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, ingredient)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border
                 cursor-grab active:cursor-grabbing hover:border-copper/50 hover:bg-surface-light
                 transition-all duration-200 select-none group"
    >
      <span className="text-base">{ingredient.emoji}</span>
      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
        {ingredient.name}
      </span>
    </div>
  );
}

function ActiveIngredientTag({
  ingredient,
  onRemove,
}: {
  ingredient: Ingredient;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-copper/15 border border-copper/30 text-sm">
      <span>{ingredient.emoji}</span>
      <span className="text-foreground/90">{ingredient.name}</span>
      <button
        onClick={() => onRemove(ingredient.id)}
        className="ml-1 w-4 h-4 rounded-full bg-foreground/10 hover:bg-foreground/20
                   flex items-center justify-center text-foreground/50 hover:text-foreground/80
                   transition-colors text-xs leading-none"
        aria-label={`Remove ${ingredient.name}`}
      >
        x
      </button>
    </div>
  );
}

export default function FlavorMap() {
  const [activeIngredients, setActiveIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  // Enable animation after first render so initial state doesn't animate
  useEffect(() => {
    setAnimate(true);
  }, []);

  const composite = computeComposite(activeIngredients);

  const categories = Array.from(new Set(INGREDIENTS.map((i) => i.category)));

  const filteredIngredients = INGREDIENTS.filter((ing) => {
    const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = useCallback((e: React.DragEvent, ingredient: Ingredient) => {
    e.dataTransfer.setData("text/plain", ingredient.id);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const id = e.dataTransfer.getData("text/plain");
      const ingredient = INGREDIENTS.find((i) => i.id === id);
      if (ingredient && !activeIngredients.some((i) => i.id === id)) {
        setActiveIngredients((prev) => [...prev, ingredient]);
      }
    },
    [activeIngredients]
  );

  const addIngredient = useCallback(
    (ingredient: Ingredient) => {
      if (!activeIngredients.some((i) => i.id === ingredient.id)) {
        setActiveIngredients((prev) => [...prev, ingredient]);
      }
    },
    [activeIngredients]
  );

  const removeIngredient = useCallback((id: string) => {
    setActiveIngredients((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setActiveIngredients([]);
  }, []);

  // Flavor balance tip
  const tip = getTip(composite, activeIngredients.length);

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Flavor Map</h2>
        <p className="text-foreground/50 text-sm">
          Drag ingredients onto the map to visualize and balance your flavor profile
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar — Ingredient Library */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground
                         placeholder:text-foreground/30 text-sm focus:outline-none focus:border-copper/50
                         transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                !selectedCategory
                  ? "bg-copper/20 text-copper-light border border-copper/30"
                  : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-copper/20 text-copper-light border border-copper/30"
                    : "bg-surface text-foreground/50 border border-border hover:text-foreground/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ingredient list */}
          <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredIngredients.map((ing) => {
              const isActive = activeIngredients.some((i) => i.id === ing.id);
              return (
                <div key={ing.id} className={isActive ? "opacity-40 pointer-events-none" : ""}>
                  <div
                    onClick={() => !isActive && addIngredient(ing)}
                    onKeyDown={(e) => e.key === "Enter" && !isActive && addIngredient(ing)}
                    role="button"
                    tabIndex={isActive ? -1 : 0}
                  >
                    <IngredientChip ingredient={ing} onDragStart={handleDragStart} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center — Radar Chart + Drop Zone */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <div
            ref={dropRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-2xl p-6 transition-all duration-300 ${
              isDragOver
                ? "bg-copper/10 border-2 border-dashed border-copper/40 scale-[1.02]"
                : "bg-surface/50 border-2 border-transparent"
            }`}
          >
            <RadarChart profile={composite} size={380} animate={animate} />
          </div>

          {/* Active ingredients */}
          {activeIngredients.length > 0 && (
            <div className="space-y-3 w-full max-w-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/40 uppercase tracking-wider font-medium">
                  In your dish ({activeIngredients.length})
                </span>
                <button
                  onClick={clearAll}
                  className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeIngredients.map((ing) => (
                  <ActiveIngredientTag
                    key={ing.id}
                    ingredient={ing}
                    onRemove={removeIngredient}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Flavor tip */}
          {tip && (
            <div className="px-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-foreground/60 max-w-md text-center">
              {tip}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getTip(profile: FlavorProfile, count: number): string | null {
  if (count === 0) return null;
  if (count === 1) return "Add more ingredients to see how flavors combine.";

  const vals = AXIS_CONFIG.map((a) => ({ key: a.label, val: profile[a.key] }));
  vals.sort((a, b) => b.val - a.val);

  const dominant = vals[0];
  const weakest = vals[vals.length - 1];

  if (dominant.val - weakest.val < 20) {
    return "Nicely balanced! This profile has even flavor distribution.";
  }

  const suggestions: Record<string, string> = {
    Sweet: "Try adding acid (lemon, vinegar) to cut the sweetness.",
    Salty: "Balance with a touch of sweetness or acid.",
    Umami: "Great depth! A squeeze of citrus can brighten this.",
    Sour: "Add sweetness or fat (butter, olive oil) to round it out.",
    Bitter: "A little honey or salt can tame the bitterness.",
    Spicy: "Dairy or sweetness can temper the heat.",
  };

  return `Strong ${dominant.key.toLowerCase()} presence. ${suggestions[dominant.key] || ""}`;
}
