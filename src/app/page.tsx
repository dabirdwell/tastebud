import Nav from "@/components/Nav";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav />
      <main className="flex-1">
        <HomePage />
      </main>
      <footer className="border-t border-border py-12 px-6 mt-auto">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌱</span>
            <span className="font-bold text-copper">TasteBud</span>
          </div>
          <a
            href="https://humanityandai.com/brain-mastery/"
            className="text-sm text-foreground/50 hover:text-copper transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Part of the Brain Mastery series
          </a>
          <p className="text-sm text-foreground/30">
            &copy; 2026 Fawkes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
