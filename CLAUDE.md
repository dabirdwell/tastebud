# CLAUDE.md — TasteBud

## PRODUCT VISION — READ BEFORE ANY SPRINT
The current app is Phase 1 (recipe browser + mentors). The FULL product is an interactive Flavor Map platform.
**Architecture spec (952 lines):** `Fawkes/Products and Services/TasteBud/TasteBud_Architecture_Spec.md`
**Platform spec (403 lines):** `Fawkes/Products and Services/TasteBud/TasteBud_Platform.md`
**Gap analysis:** `Fawkes/Products and Services/Spec_vs_Reality_Gap_Analysis.md`

Key features NOT YET BUILT that are in the spec:
- Flavor Map: 2D/3D interactive canvas, six axes, Three.js, drag ingredients to see relationships
- 500-item ingredient database with six-axis flavor vectors
- Aroma compound system (FlavorDB2 cross-references)
- Five AI mentors with distinct prompt architectures (Julia Child, Pépin, Bourdain, Adrià, Bottura)
- Full curriculum: 5 modules, 30+ lessons, capstones
- Five challenge types (Mystery Basket, Flavor Fix, Speed Pairing, Cuisine Translator, Substitution Sprint)
- Six-rank progression (Seed → Master) with Tasting rank tests
- Four pricing tiers: Free / Plus $4.99 / Pro $9.99 / Academy $19.99

Do NOT build features that conflict with this roadmap.

## Project
TasteBud is a flavor education app — learn to cook through taste, not just recipes. AI mentors teach different culinary philosophies. Free app.

## Tech Stack
Next.js (App Router), Tailwind CSS, Anthropic API (mentor conversations)

## Build
```bash
npm run build
```

## Key Routes
- `/` — Landing page
- `/recipes/` — Structured recipe browser (25+ recipes)
- `/learn/` — Flavor science cards
- `/mentors/` — AI mentor personalities
- `/pantry/` — Smart pantry suggestions
- `/planner/` — Weekly meal planner
- `/seasonal/` — Seasonal ingredient guide
- `/shopping/` — Shopping list

## Git Rules
- `git add` specific files only — NEVER `git add -A`
