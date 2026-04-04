import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProfileDashboard from "@/components/ProfileDashboard";

export const metadata: Metadata = {
  title: "My Progress — TasteBud",
  description:
    "Track your culinary education journey — recipes explored, flavor cards studied, mentor conversations, and more.",
};

export default function ProgressPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav active="Progress" />

      <main className="flex-1">
        <ProfileDashboard />
      </main>

      <footer className="border-t border-border py-12 px-6 mt-auto">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
            <span className="text-foreground/30 text-sm ml-2">
              Brain Mastery Series
            </span>
          </div>
          <p className="text-sm text-foreground/30">
            &copy; 2026 Fawkes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
