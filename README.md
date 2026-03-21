# TasteBud

**See Flavor. Balance Taste. Create Magic.**

TasteBud is a gamified culinary education platform — the third app in the Brain Mastery series. It makes flavor theory visible, interactive, and playful, transforming cooking from recipe-following into intuitive creation through AI mentorship and an interactive Flavor Map.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Realtime)
- **AI:** Claude Sonnet (mentors) + Claude Haiku (scoring, recognition)
- **Payments:** Stripe ($4.99/mo Pro tier)
- **Visualization:** SVG/Canvas Flavor Map (Three.js + D3.js planned)
- **State:** Zustand (planned)
- **Hosting:** Vercel

## Core Features

- **Flavor Map** — Interactive 2D/2.5D canvas with six taste axes (Sweet, Salty, Umami, Sour, Bitter, Spicy). Drag ingredients, see molecular connections and balance in real time.
- **AI Culinary Mentors** — Learn from personas inspired by Julia Child, Jacques Pépin, Anthony Bourdain, Ferran Adrià, and Massimo Bottura.
- **Gamified Progression** — Rank system (Seed → Master), XP, streaks, achievements, and "Tasting" rank tests.
- **Challenge Mode** — Mystery Basket, Flavor Fix, Speed Pairing, Cuisine Translator, Substitution Sprint.
- **Ingredient Library** — 500+ ingredients at MVP, each with six-axis flavor vectors, aroma compounds, cultural context, and transformation data.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Dark warm theme (bg #0a0a08, copper accents)
│   ├── layout.tsx           # Root layout with Geist fonts
│   └── page.tsx             # Landing page
└── components/
    └── FlavorWheel.tsx      # Interactive SVG flavor radar chart
```

## Design Language

- **Dark warm base** — `#0a0a08` background
- **Copper accents** — `#b87333` primary, `#d4956b` light, `#8b5a2b` dark
- **Saffron/amber highlights** — `#f4c430`, `#c8912e`
- **Flavor axis colors** — Sweet (pink), Salty (white), Umami (deep red), Sour (yellow-green), Bitter (dark green), Spicy (orange)

## Pricing

| Feature | Free | Pro ($4.99/mo) |
|---------|------|----------------|
| Flavor Map | 3 ingredients | Unlimited |
| Ingredient Library | 200 | 2,000+ |
| AI Mentor | Julia Child | All 5 mentors |
| Courses | Module 1 | All modules |
| Challenges | 1/day | Unlimited |

## License

Proprietary — Fawkes
