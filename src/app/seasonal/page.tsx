import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SeasonalCalendar from "@/components/SeasonalCalendar";

export const metadata: Metadata = {
  title: "Seasonal Calendar — What's in Season — TasteBud",
  description:
    "Discover what's in season month by month in Oklahoma and the Southern US. Peak ingredients, cooking notes, and harvest timing for your region.",
};

export default function SeasonalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav active="Seasonal" />

      <main className="flex-1">
        <SeasonalCalendar />
      </main>

      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">Seasonal Calendar</span>
          </div>
          <p className="text-sm text-foreground/30">&copy; 2026 Fawkes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
