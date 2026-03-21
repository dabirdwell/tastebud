"use client";

import { useState } from "react";

interface FlavorProfile {
  sweet: number;
  salty: number;
  umami: number;
  sour: number;
  bitter: number;
  spicy: number;
}

const AXES: { key: keyof FlavorProfile; label: string; color: string }[] = [
  { key: "sweet", label: "Sweet", color: "#e8a0bf" },
  { key: "umami", label: "Umami", color: "#c0392b" },
  { key: "spicy", label: "Spicy", color: "#e67e22" },
  { key: "bitter", label: "Bitter", color: "#1a5c2a" },
  { key: "sour", label: "Sour", color: "#a8c256" },
  { key: "salty", label: "Salty", color: "#dcdcdc" },
];

const DEFAULT_PROFILE: FlavorProfile = {
  sweet: 60,
  salty: 40,
  umami: 75,
  sour: 30,
  bitter: 20,
  spicy: 50,
};

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

export default function FlavorWheel({
  profile = DEFAULT_PROFILE,
  size = 320,
  interactive = true,
}: {
  profile?: FlavorProfile;
  size?: number;
  interactive?: boolean;
}) {
  const [values, setValues] = useState<FlavorProfile>(profile);

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const rings = [0.25, 0.5, 0.75, 1.0];

  const points = AXES.map((axis, i) => {
    const val = values[axis.key] / 100;
    return polarToCartesian(cx, cy, maxRadius * val, i, AXES.length);
  });

  const polygonPoints = points.map((p) => p.join(",")).join(" ");

  function handleAxisClick(key: keyof FlavorProfile) {
    if (!interactive) return;
    setValues((prev) => ({
      ...prev,
      [key]: prev[key] >= 100 ? 10 : prev[key] + 15,
    }));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Background rings */}
        {rings.map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={maxRadius * r}
            fill="none"
            stroke="#2a2a22"
            strokeWidth={1}
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {AXES.map((axis, i) => {
          const [ex, ey] = polarToCartesian(cx, cy, maxRadius, i, AXES.length);
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

        {/* Filled shape */}
        <polygon
          points={polygonPoints}
          fill="rgba(184, 115, 51, 0.2)"
          stroke="#b87333"
          strokeWidth={2}
        />

        {/* Data points */}
        {AXES.map((axis, i) => {
          const [px, py] = points[i];
          return (
            <circle
              key={axis.key}
              cx={px}
              cy={py}
              r={6}
              fill={axis.color}
              stroke="#0a0a08"
              strokeWidth={2}
              className={interactive ? "cursor-pointer hover:r-[8]" : ""}
              onClick={() => handleAxisClick(axis.key)}
            />
          );
        })}

        {/* Labels */}
        {AXES.map((axis, i) => {
          const [lx, ly] = polarToCartesian(
            cx,
            cy,
            maxRadius + 24,
            i,
            AXES.length
          );
          return (
            <text
              key={axis.key}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={axis.color}
              fontSize={12}
              fontWeight={600}
              className="select-none"
            >
              {axis.label}
            </text>
          );
        })}

        {/* Value labels */}
        {AXES.map((axis, i) => {
          const [px, py] = points[i];
          return (
            <text
              key={`val-${axis.key}`}
              x={px}
              y={py - 12}
              textAnchor="middle"
              fill="#e8e0d4"
              fontSize={10}
              opacity={0.7}
            >
              {values[axis.key]}
            </text>
          );
        })}
      </svg>

      {interactive && (
        <p className="text-xs text-foreground/50">
          Click any point to adjust its value
        </p>
      )}
    </div>
  );
}
