# TasteBud

**Explore Flavor, Learn to Cook.**

TasteBud is a gamified culinary education platform — part of the Brain Mastery series by Humanity & AI. It makes flavor theory visible, interactive, and playful, transforming cooking from recipe-following into intuitive creation through AI mentorship and an interactive Flavor Map.

## Features

- **Flavor Map** — Interactive 2D canvas with six taste axes (Sweet, Salty, Umami, Sour, Bitter, Spicy). Drag ingredients, see molecular connections and balance in real time.
- **AI Culinary Mentors** — Chat with AI personas inspired by Julia Child, Jacques Pépin, and Anthony Bourdain. Each mentor has a distinct teaching philosophy and voice.
- **Recipe Explorer** — Browse curated recipes from 10 global cuisines with flavor profiles and technique guides.
- **Pantry Mode** — Enter what you have on hand and discover what you can cook, with smart ingredient matching and aggregate flavor analysis.
- **Flavor Science** — Six-axis taste modeling mapped to real receptor categories and molecular compounds.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **AI:** Anthropic Claude (AI mentor chat)
- **Hosting:** Vercel

## Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd tastebud

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/mentor/route.ts   # AI mentor chat API endpoint
│   ├── globals.css            # Dark warm theme (bg #0a0a08, copper accents)
│   ├── layout.tsx             # Root layout with Geist fonts
│   ├── page.tsx               # Landing page
│   ├── pantry/page.tsx        # Pantry Mode page
│   └── recipes/page.tsx       # Recipe Explorer page
├── components/
│   ├── FlavorMap.tsx           # Interactive drag-and-drop flavor map
│   ├── FlavorWheel.tsx         # SVG flavor radar chart
│   ├── MentorChat.tsx          # AI mentor chat interface
│   ├── PantryMode.tsx          # Pantry ingredient matcher
│   └── RecipeExplorer.tsx      # Recipe browser with flavor profiles
└── data/
    ├── ingredients.ts          # Ingredient database with flavor vectors
    ├── mentors.ts              # Mentor persona definitions
    └── recipes.ts              # Recipe collection
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for Claude AI mentor chat |

## License

Proprietary — Fawkes
