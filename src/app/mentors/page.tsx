import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MentorProfiles from "@/components/MentorProfiles";

export const metadata: Metadata = {
  title: "Cooking Mentors — TasteBud",
  description:
    "Meet three AI cooking mentors — Anthony Bourdain, Jacques Pépin, and Julia Child — each with a unique philosophy. Pick your mentor and ask them anything about cooking.",
};

export default function MentorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav active="Mentors" />

      <main className="flex-1">
        <MentorProfiles />
      </main>

      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">Mentor Kitchen</span>
          </div>
          <p className="text-sm text-foreground/30">&copy; 2026 Fawkes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
