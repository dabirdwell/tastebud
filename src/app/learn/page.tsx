import type { Metadata } from "next";
import Nav from "@/components/Nav";
import CurriculumHub from "@/components/CurriculumHub";

export const metadata: Metadata = {
  title: "Learn — Curriculum — TasteBud",
  description:
    "5 modules, 15 lessons, and 25 challenges covering taste foundations, flavor combinations, cooking techniques, world cuisines, and recipe creation.",
};

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav active="Learn" />

      <main className="flex-1">
        <CurriculumHub />
      </main>

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
