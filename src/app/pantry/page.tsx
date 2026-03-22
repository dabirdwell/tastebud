import type { Metadata } from "next";
import PantryMode from "@/components/PantryMode";

export const metadata: Metadata = {
  title: "Pantry Mode — TasteBud",
  description:
    "Select the ingredients you have on hand and discover recipes you can make with your pantry.",
};

export default function PantryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold tracking-tight text-copper">TasteBud</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            <a href="/#features" className="hover:text-copper transition-colors">
              Features
            </a>
            <a href="/#flavor-map" className="hover:text-copper transition-colors">
              Flavor Map
            </a>
            <a href="/recipes" className="hover:text-copper transition-colors">
              Recipes
            </a>
            <a href="/pantry" className="text-copper font-medium">
              Pantry
            </a>
            <a href="/#mentors" className="hover:text-copper transition-colors">
              Mentors
            </a>
          </div>
          <a
            href="/"
            className="rounded-full bg-copper px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-copper-light"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <PantryMode />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">Brain Mastery Series</span>
          </div>
          <p className="text-sm text-foreground/30">&copy; 2026 Fawkes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
