"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { AXIS_CONFIG, INGREDIENTS, type FlavorProfile } from "@/data/ingredients";
import { useSubscription } from "@/hooks/useSubscription";

const STORAGE_KEY = "tastebud-flavor-profile";
const SCALE_MAX = 10;

// --- Cuisine & ingredient matching data ---

interface CuisineProfile {
  name: string;
  emoji: string;
  description: string;
  profile: FlavorProfile;
}

const CUISINES: CuisineProfile[] = [
  {
    name: "Thai",
    emoji: "🇹🇭",
    description: "Bold balance of sweet, sour, salty, and spicy",
    profile: { sweet: 70, salty: 60, umami: 50, sour: 70, bitter: 20, spicy: 80 },
  },
  {
    name: "Japanese",
    emoji: "🇯🇵",
    description: "Clean, umami-forward with subtle complexity",
    profile: { sweet: 30, salty: 50, umami: 90, sour: 20, bitter: 20, spicy: 15 },
  },
  {
    name: "Mexican",
    emoji: "🇲🇽",
    description: "Rich layers of heat, earthiness, and bright acid",
    profile: { sweet: 30, salty: 50, umami: 40, sour: 60, bitter: 30, spicy: 75 },
  },
  {
    name: "Italian",
    emoji: "🇮🇹",
    description: "Savory depth with fresh herbs and balanced acid",
    profile: { sweet: 40, salty: 50, umami: 70, sour: 40, bitter: 35, spicy: 15 },
  },
  {
    name: "Indian",
    emoji: "🇮🇳",
    description: "Complex spice layers with warmth and richness",
    profile: { sweet: 35, salty: 40, umami: 40, sour: 30, bitter: 40, spicy: 85 },
  },
  {
    name: "French",
    emoji: "🇫🇷",
    description: "Butter-rich, technique-driven, balanced elegance",
    profile: { sweet: 40, salty: 45, umami: 60, sour: 30, bitter: 25, spicy: 10 },
  },
  {
    name: "Korean",
    emoji: "🇰🇷",
    description: "Fermented depth with heat and sweetness",
    profile: { sweet: 40, salty: 55, umami: 75, sour: 35, bitter: 15, spicy: 70 },
  },
  {
    name: "Ethiopian",
    emoji: "🇪🇹",
    description: "Warm spice blends with sour injera and rich stews",
    profile: { sweet: 20, salty: 35, umami: 40, sour: 50, bitter: 40, spicy: 65 },
  },
  {
    name: "Chinese (Sichuan)",
    emoji: "🇨🇳",
    description: "Numbing heat with deep umami and aromatic spice",
    profile: { sweet: 25, salty: 50, umami: 70, sour: 30, bitter: 20, spicy: 90 },
  },
  {
    name: "Mediterranean",
    emoji: "🫒",
    description: "Bright, herbal, olive oil-forward simplicity",
    profile: { sweet: 30, salty: 40, umami: 45, sour: 45, bitter: 40, spicy: 15 },
  },
  {
    name: "Peruvian",
    emoji: "🇵🇪",
    description: "Citrus-bright with chili heat and earthy roots",
    profile: { sweet: 30, salty: 40, umami: 45, sour: 65, bitter: 20, spicy: 55 },
  },
  {
    name: "Southern US",
    emoji: "🍗",
    description: "Sweet, rich, smoky comfort with buttery depth",
    profile: { sweet: 60, salty: 55, umami: 55, sour: 20, bitter: 15, spicy: 30 },
  },
];

function profileDistance(a: FlavorProfile, b: FlavorProfile): number {
  return AXIS_CONFIG.reduce((sum, axis) => {
    const diff = a[axis.key] - b[axis.key];
    return sum + diff * diff;
  }, 0);
}

function matchCuisines(userProfile: FlavorProfile, count: number): CuisineProfile[] {
  // Convert 0-10 scale to 0-100 for comparison
  const scaled: FlavorProfile = { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  for (const axis of AXIS_CONFIG) {
    scaled[axis.key] = userProfile[axis.key] * 10;
  }
  return [...CUISINES]
    .sort((a, b) => profileDistance(scaled, a.profile) - profileDistance(scaled, b.profile))
    .slice(0, count);
}

function matchIngredients(userProfile: FlavorProfile, count: number) {
  const scaled: FlavorProfile = { sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 };
  for (const axis of AXIS_CONFIG) {
    scaled[axis.key] = userProfile[axis.key] * 10;
  }
  return [...INGREDIENTS]
    .sort((a, b) => profileDistance(scaled, a.flavorProfile) - profileDistance(scaled, b.flavorProfile))
    .slice(0, count);
}

// --- Geometry helpers ---

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

function hexPoint(cx: number, cy: number, radius: number, index: number): [number, number] {
  const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
}

function hexagonPath(cx: number, cy: number, radius: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => hexPoint(cx, cy, radius, i));
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
}

/** Project a pointer position onto an axis and return 0-SCALE_MAX value */
function projectOntoAxis(
  px: number,
  py: number,
  cx: number,
  cy: number,
  axisIndex: number,
  maxRadius: number
): number {
  const angle = (Math.PI * 2 * axisIndex) / 6 - Math.PI / 2;
  const axisX = Math.cos(angle);
  const axisY = Math.sin(angle);
  const dx = px - cx;
  const dy = py - cy;
  // Scalar projection onto axis direction
  const projection = dx * axisX + dy * axisY;
  const ratio = Math.max(0, Math.min(1, projection / maxRadius));
  return Math.round(ratio * SCALE_MAX);
}

// --- Interactive Radar Chart ---

function InteractiveRadar({
  profile,
  onChange,
  size,
}: {
  profile: FlavorProfile;
  onChange: (key: keyof FlavorProfile, value: number) => void;
  size: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingAxis, setDraggingAxis] = useState<number | null>(null);
  const [hoverAxis, setHoverAxis] = useState<number | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.34;
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  const points = AXIS_CONFIG.map((axis, i) => {
    const val = profile[axis.key] / SCALE_MAX;
    return polarToCartesian(cx, cy, maxRadius * val, i, 6);
  });

  const polygonPoints = points.map((p) => p.join(",")).join(" ");

  const getSVGPoint = useCallback(
    (e: React.PointerEvent | PointerEvent): [number, number] => {
      const svg = svgRef.current;
      if (!svg) return [0, 0];
      const rect = svg.getBoundingClientRect();
      const scaleX = size / rect.width;
      const scaleY = size / rect.height;
      return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
    },
    [size]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, axisIndex: number) => {
      e.preventDefault();
      (e.target as Element).setPointerCapture(e.pointerId);
      setDraggingAxis(axisIndex);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingAxis === null) return;
      const [px, py] = getSVGPoint(e);
      const val = projectOntoAxis(px, py, cx, cy, draggingAxis, maxRadius);
      onChange(AXIS_CONFIG[draggingAxis].key, val);
    },
    [draggingAxis, getSVGPoint, cx, cy, maxRadius, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingAxis(null);
  }, []);

  // Gradient stops based on axis colors
  const gradientId = "flavorGradient";

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-lg touch-none select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <defs>
        {/* Radial gradient using all axis colors */}
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b87333" stopOpacity={0.5} />
          <stop offset="50%" stopColor="#d4956b" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#e8a0bf" stopOpacity={0.15} />
        </radialGradient>
        {/* Glow filter for the shape */}
        <filter id="shapeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for the filled shape that mixes axis colors */}
        <linearGradient id="fingerprint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8a0bf" stopOpacity={0.4} />
          <stop offset="25%" stopColor="#c0392b" stopOpacity={0.35} />
          <stop offset="50%" stopColor="#e67e22" stopOpacity={0.3} />
          <stop offset="75%" stopColor="#a8c256" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#dcdcdc" stopOpacity={0.3} />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <circle cx={cx} cy={cy} r={maxRadius * 1.15} fill={`url(#${gradientId})`} opacity={0.3} />

      {/* Hexagonal grid rings with scale labels */}
      {rings.map((r, ri) => (
        <g key={r}>
          <path
            d={hexagonPath(cx, cy, maxRadius * r)}
            fill="none"
            stroke="#2a2a22"
            strokeWidth={1}
            opacity={0.4 + r * 0.2}
          />
          {/* Scale number on first axis (top) */}
          {ri < rings.length && (
            <text
              x={cx + 8}
              y={cy - maxRadius * r + 4}
              fill="#e8e0d4"
              fontSize={8}
              opacity={0.3}
            >
              {Math.round(r * SCALE_MAX)}
            </text>
          )}
        </g>
      ))}

      {/* Axis lines */}
      {AXIS_CONFIG.map((axis, i) => {
        const [ex, ey] = polarToCartesian(cx, cy, maxRadius, i, 6);
        const isActive = draggingAxis === i || hoverAxis === i;
        return (
          <line
            key={axis.key}
            x1={cx}
            y1={cy}
            x2={ex}
            y2={ey}
            stroke={isActive ? axis.color : "#2a2a22"}
            strokeWidth={isActive ? 2 : 1}
            opacity={isActive ? 0.8 : 0.5}
            style={{ transition: "all 0.15s ease" }}
          />
        );
      })}

      {/* Filled flavor fingerprint shape */}
      <polygon
        points={polygonPoints}
        fill="url(#fingerprint)"
        stroke="#d4956b"
        strokeWidth={2}
        strokeLinejoin="round"
        filter="url(#shapeGlow)"
        style={{ transition: draggingAxis !== null ? "none" : "all 0.3s ease" }}
      />

      {/* Draggable handle points */}
      {AXIS_CONFIG.map((axis, i) => {
        const [px, py] = points[i];
        const val = profile[axis.key];
        const isActive = draggingAxis === i;
        const isHover = hoverAxis === i;
        const handleRadius = isActive ? 10 : isHover ? 8 : 6;

        return (
          <g key={axis.key}>
            {/* Invisible hit area for easier grabbing */}
            <circle
              cx={px}
              cy={py}
              r={18}
              fill="transparent"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => handlePointerDown(e, i)}
              onPointerEnter={() => setHoverAxis(i)}
              onPointerLeave={() => setHoverAxis(null)}
            />
            {/* Outer glow ring when active */}
            {(isActive || isHover) && (
              <circle
                cx={px}
                cy={py}
                r={handleRadius + 4}
                fill="none"
                stroke={axis.color}
                strokeWidth={1.5}
                opacity={0.4}
                className={isActive ? "" : "animate-pulse"}
              />
            )}
            {/* Main handle */}
            <circle
              cx={px}
              cy={py}
              r={handleRadius}
              fill={axis.color}
              stroke="#0a0a08"
              strokeWidth={2}
              className="cursor-grab active:cursor-grabbing"
              style={{ transition: "r 0.15s ease" }}
              onPointerDown={(e) => handlePointerDown(e, i)}
              onPointerEnter={() => setHoverAxis(i)}
              onPointerLeave={() => setHoverAxis(null)}
            />
            {/* Value label near point */}
            <text
              x={px}
              y={py - handleRadius - 6}
              textAnchor="middle"
              fill="#e8e0d4"
              fontSize={11}
              fontWeight={600}
              opacity={val > 0 ? 0.9 : 0.4}
            >
              {val}
            </text>
          </g>
        );
      })}

      {/* Axis labels */}
      {AXIS_CONFIG.map((axis, i) => {
        const [lx, ly] = polarToCartesian(cx, cy, maxRadius + 32, i, 6);
        const isActive = draggingAxis === i || hoverAxis === i;
        return (
          <text
            key={axis.key}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={axis.color}
            fontSize={isActive ? 13 : 11}
            fontWeight={isActive ? 700 : 600}
            className="select-none"
            style={{ transition: "all 0.15s ease" }}
          >
            {axis.label}
          </text>
        );
      })}

      {/* Center prompt when all zeros */}
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
          Drag points to set your flavor profile
        </text>
      )}
    </svg>
  );
}

// --- Main component ---

export default function FlavorMap() {
  const { hasAccess } = useSubscription();
  const [profile, setProfile] = useState<FlavorProfile>({
    sweet: 0,
    salty: 0,
    umami: 0,
    sour: 0,
    bitter: 0,
    spicy: 0,
  });
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate it has all keys and values are in range
        const valid = AXIS_CONFIG.every(
          (a) => typeof parsed[a.key] === "number" && parsed[a.key] >= 0 && parsed[a.key] <= SCALE_MAX
        );
        if (valid) {
          setProfile(parsed);
        }
      }
    } catch {
      // ignore corrupt data
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, loaded]);

  const handleChange = useCallback((key: keyof FlavorProfile, value: number) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile({ sweet: 0, salty: 0, umami: 0, sour: 0, bitter: 0, spicy: 0 });
  }, []);

  const hasValues = AXIS_CONFIG.some((a) => profile[a.key] > 0);
  const cuisines = hasValues ? matchCuisines(profile, 3) : [];
  const ingredientLimit = hasAccess("plus") ? 10 : 3;
  const ingredients = hasValues ? matchIngredients(profile, ingredientLimit) : [];

  // Avoid hydration mismatch by not rendering suggestions until loaded
  if (!loaded) {
    return (
      <section className="w-full max-w-5xl mx-auto py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Flavor Map</h2>
          <p className="text-foreground/50 text-sm">Loading your flavor profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Flavor Map</h2>
        <p className="text-foreground/50 text-sm">
          Drag each point to set your flavor preferences and discover your flavor fingerprint
        </p>
      </div>

      {/* Radar chart */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <InteractiveRadar profile={profile} onChange={handleChange} size={420} />
        </div>

        {/* Slider controls for precise adjustment */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 w-full max-w-lg">
          {AXIS_CONFIG.map((axis) => (
            <div key={axis.key} className="flex items-center gap-2">
              <span className="text-xs font-medium w-12 shrink-0" style={{ color: axis.color }}>
                {axis.label}
              </span>
              <input
                type="range"
                min={0}
                max={SCALE_MAX}
                step={1}
                value={profile[axis.key]}
                onChange={(e) => handleChange(axis.key, Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none bg-border accent-copper cursor-pointer"
                aria-label={`${axis.label} intensity`}
              />
              <span className="text-xs text-foreground/50 w-5 text-right tabular-nums">
                {profile[axis.key]}
              </span>
            </div>
          ))}
        </div>

        {hasValues && (
          <button
            onClick={resetProfile}
            className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            Reset profile
          </button>
        )}
      </div>

      {/* Suggestions */}
      {hasValues && (
        <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Cuisine matches */}
          <div>
            <h3 className="text-sm font-semibold text-copper uppercase tracking-wider mb-4">
              Cuisines for You
            </h3>
            <div className="space-y-3">
              {cuisines.map((cuisine, i) => (
                <div
                  key={cuisine.name}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border hover:border-copper/30 transition-colors"
                >
                  <span className="text-2xl">{cuisine.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{cuisine.name}</span>
                      {i === 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-copper/15 text-copper font-medium">
                          Best match
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground/50 mt-0.5">{cuisine.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredient matches */}
          <div>
            <h3 className="text-sm font-semibold text-copper uppercase tracking-wider mb-4">
              Ingredients to Try
            </h3>
            <div className="space-y-3">
              {ingredients.map((ing, i) => {
                // Show mini flavor bars
                const dominant = AXIS_CONFIG.reduce((best, axis) =>
                  ing.flavorProfile[axis.key] > ing.flavorProfile[best.key] ? axis : best
                );
                return (
                  <div
                    key={ing.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border hover:border-copper/30 transition-colors"
                  >
                    <span className="text-2xl">{ing.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{ing.name}</span>
                        {i === 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-copper/15 text-copper font-medium">
                            Best match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/50 mt-0.5">
                        {ing.category} &middot; strong in{" "}
                        <span style={{ color: dominant.color }}>{dominant.label.toLowerCase()}</span>
                      </p>
                      {/* Mini flavor bars */}
                      <div className="flex gap-0.5 mt-2">
                        {AXIS_CONFIG.map((axis) => (
                          <div
                            key={axis.key}
                            className="flex-1 h-1 rounded-full bg-border overflow-hidden"
                            title={`${axis.label}: ${ing.flavorProfile[axis.key]}`}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${ing.flavorProfile[axis.key]}%`,
                                backgroundColor: axis.color,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ask a Mentor CTA */}
          <div className="md:col-span-2 text-center mt-4">
            <Link
              href={`/chat?mentor=julia&context=${encodeURIComponent(
                `Based on my flavor profile (sweet: ${profile.sweet}, salty: ${profile.salty}, umami: ${profile.umami}, sour: ${profile.sour}, bitter: ${profile.bitter}, spicy: ${profile.spicy}), suggest recipes that match my taste preferences.`
              )}`}
              className="inline-flex items-center gap-2 rounded-xl bg-copper px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-copper-light"
            >
              👩‍🍳 Ask a Mentor About Your Profile
            </Link>
            <p className="text-xs text-foreground/30 mt-2">
              Get personalized recipe suggestions based on your flavor map
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
