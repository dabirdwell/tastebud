"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#flavor-map", label: "Flavor Map" },
  { href: "/recipes", label: "Recipes" },
  { href: "/planner", label: "Planner" },
  { href: "/shopping", label: "Shopping" },
  { href: "/pantry", label: "Pantry" },
  { href: "/seasonal", label: "Seasonal" },
  { href: "/learn", label: "Learn" },
  { href: "/#mentors", label: "Mentors" },
];

export default function Nav({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold tracking-tight text-copper">TasteBud</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                active === link.label
                  ? "text-copper font-medium"
                  : "hover:text-copper transition-colors"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="hidden sm:inline-flex rounded-full bg-copper px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-copper-light"
          >
            Join Waitlist
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground/70 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm py-1 ${
                active === link.label
                  ? "text-copper font-medium"
                  : "text-foreground/70 hover:text-copper transition-colors"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/"
            className="block mt-3 text-center rounded-full bg-copper px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-copper-light"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
